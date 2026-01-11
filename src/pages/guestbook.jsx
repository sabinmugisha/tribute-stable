import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, User, Clock, Heart, Trash2, Pin, Printer, LogOut, CheckCircle2, X } from 'lucide-react';
import { db } from '../firebase'; 
import { ref, push, onValue, remove, update, serverTimestamp } from "firebase/database";
import { jsPDF } from "jspdf";

export default function Guestbook() {
  const [messages, setMessages] = useState([]);
  const [viewCount, setViewCount] = useState(0);
  const [formData, setFormData] = useState({ name: '', relation: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  // ADMIN CHECK
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    // 1. Fetch Messages & View Count
    const messagesRef = ref(db, 'messages');
    const viewsRef = ref(db, 'stats/views');

    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        // Sort: Pins first, then Newest first
        const sortedList = list.sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return (b.createdAt || 0) - (a.createdAt || 0);
        });
        setMessages(sortedList);
      }
    });

    onValue(viewsRef, (snapshot) => setViewCount(snapshot.val() || 0));

    // 2. Increment View Count once per session
    if (!sessionStorage.getItem('counted')) {
      const currentViews = viewCount;
      update(ref(db, 'stats'), { views: currentViews + 1 });
      sessionStorage.setItem('counted', 'true');
    }
  }, []);

  // --- ACTIONS ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.message.trim()) return;
    setIsSubmitting(true);
    try {
      await push(ref(db, 'messages'), {
        ...formData,
        likes: 0,
        isPinned: false,
        createdAt: serverTimestamp(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
      setFormData({ name: '', relation: '', message: '' });
      setShowThankYou(true);
    } catch (err) { alert("Error: Check Firebase Rules"); }
    finally { setIsSubmitting(false); }
  };

  const handleLike = (id, currentLikes) => {
    update(ref(db, `messages/${id}`), { likes: (currentLikes || 0) + 1 });
  };

  const handlePin = (id, currentStatus) => {
    update(ref(db, `messages/${id}`), { isPinned: !currentStatus });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this memory?")) remove(ref(db, `messages/${id}`));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Maternal Echoes: Tribute Guestbook", 20, 20);
    let y = 30;
    messages.forEach(m => {
      doc.text(`${m.name}: ${m.message}`, 20, y);
      y += 10;
    });
    doc.save("tribute.pdf");
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#0a0a0a] text-stone-200">
      
      {/* ADMIN TOP BAR */}
      {isAdmin && (
        <div className="fixed top-24 left-0 right-0 z-40 flex justify-center px-6">
          <div className="bg-amber-600 text-white px-6 py-2 rounded-full text-[10px] font-bold tracking-widest flex items-center gap-4 shadow-xl">
            ADMIN MODE
            <button onClick={generatePDF} title="Download PDF"><Printer size={14} /></button>
            <button onClick={() => {sessionStorage.clear(); window.location.reload();}}><LogOut size={14} /></button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <MessageSquare className="text-amber-500/40 mx-auto mb-4" size={32} />
          <h1 className="text-4xl font-serif italic text-white mb-2">Maternal Echoes</h1>
          <p className="text-stone-500 text-sm tracking-widest uppercase font-light">Share a memory for Grandma</p>
        </div>

        {/* INPUT FORM (RE-ADDED FOR USERS) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-stone-900/30 border border-white/5 p-8 rounded-[2rem] mb-20 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" placeholder="Your Name" value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-amber-500/50" required
              />
              <input 
                type="text" placeholder="Relationship (e.g. Grandson)" value={formData.relation}
                onChange={(e) => setFormData({...formData, relation: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-amber-500/50"
              />
            </div>
            <textarea 
              rows="4" placeholder="What is a memory that makes you smile?" value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-6 py-4 outline-none focus:border-amber-500/50 resize-none" required
            />
            <button type="submit" disabled={isSubmitting} className="group flex items-center justify-center gap-3 px-10 py-4 bg-amber-600/90 hover:bg-amber-500 text-white rounded-full transition-all">
              {isSubmitting ? 'Posting...' : 'Share Memory'} <Send size={16} />
            </button>
          </form>
        </motion.div>

        {/* MESSAGES LIST */}
        <div className="space-y-8">
          <AnimatePresence mode='popLayout'>
            {messages.map((msg) => (
              <motion.div key={msg.id} layout className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] relative group shadow-sm">
                
                {/* ADMIN TOOLS */}
                {isAdmin && (
                  <div className="absolute top-6 right-6 flex gap-2">
                    <button onClick={() => handlePin(msg.id, msg.isPinned)} className={`p-2 rounded-full ${msg.isPinned ? 'text-amber-500 bg-amber-500/10' : 'text-stone-700'}`}>
                      <Pin size={16} />
                    </button>
                    <button onClick={() => handleDelete(msg.id)} className="p-2 text-stone-700 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500/50">
                    <User size={18} />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium">{msg.name}</h4>
                    <span className="text-[10px] uppercase text-stone-500 tracking-widest">{msg.relation}</span>
                  </div>
                </div>
                <p className="text-stone-400 italic leading-relaxed">"{msg.message}"</p>
                <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] text-stone-600">
                  <span className="flex items-center gap-1"><Clock size={12}/> {msg.date}</span>
                  <button onClick={() => handleLike(msg.id, msg.likes)} className="flex items-center gap-2 hover:text-rose-400 transition-colors">
                    <Heart size={14} fill={msg.likes > 0 ? "currentColor" : "none"} className={msg.likes > 0 ? "text-rose-500" : ""} /> {msg.likes || 0}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* VIEW COUNTER */}
        <div className="mt-20 py-10 border-t border-white/5 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-600">
            Total Memorial Visits: <span className="text-amber-500/60 font-bold">{viewCount}</span>
          </p>
        </div>
      </div>

      {/* THANK YOU MODAL */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/90 backdrop-blur-sm">
            <div className="bg-stone-900 border border-amber-500/30 p-10 rounded-[2.5rem] max-w-md w-full text-center relative shadow-2xl">
              <CheckCircle2 className="text-amber-500 mx-auto mb-6" size={48} />
              <h2 className="text-2xl font-serif italic text-white mb-4">Thank You</h2>
              <p className="text-stone-400 mb-8 font-light leading-relaxed">Your message has been added to Grandma's tribute. Thank you for sharing your love.</p>
              <button onClick={() => setShowThankYou(false)} className="w-full py-4 bg-amber-600 text-white rounded-full text-xs font-bold uppercase">Return</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}