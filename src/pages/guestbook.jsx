import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, User, Clock, Heart, Trash2, X, CheckCircle2, LogOut } from 'lucide-react';
import { db } from '../firebase'; 
import { ref, push, onValue, remove, update, serverTimestamp } from "firebase/database";

export default function Guestbook() {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ name: '', relation: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  // ADMIN CHECK: Checks if user logged in via /admin OR has the secret URL key
  const isAdmin = 
    sessionStorage.getItem('isAdmin') === 'true' || 
    new URLSearchParams(window.location.search).get('admin') === 'tribute123';

  // 1. Fetch data in Real-time from Firebase
  useEffect(() => {
    const messagesRef = ref(db, 'messages');
    return onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert Firebase object to array and reverse (newest first)
        const list = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).reverse();
        setMessages(list);
      } else {
        setMessages([]);
      }
    });
  }, []);

  // 2. Handle New Message Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.message.trim()) return;
    setIsSubmitting(true);

    try {
      const messagesRef = ref(db, 'messages');
      await push(messagesRef, {
        ...formData,
        likes: 0,
        createdAt: serverTimestamp(),
        date: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })
      });
      
      setFormData({ name: '', relation: '', message: '' });
      setShowThankYou(true); 
    } catch (err) {
      console.error("--- FIREBASE ERROR DETAIL ---");
      console.error("Code:", err.code);
      console.error("Message:", err.message);
      alert(`Google says: ${err.message}. Please check your Database Rules.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Handle Like (Incremental Count)
  const handleLike = (id, currentLikes) => {
    const messageRef = ref(db, `messages/${id}`);
    update(messageRef, {
      likes: (currentLikes || 0) + 1
    });
  };

  // 4. Handle Delete (Admin Only)
  const handleDelete = (id) => {
    if (window.confirm("Permanently delete this memory? This cannot be undone.")) {
      remove(ref(db, `messages/${id}`));
    }
  };

  // 5. Admin Logout
  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    window.location.href = '/guestbook';
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#0a0a0a] text-stone-200">
      
      {/* ADMIN INDICATOR BAR */}
      {isAdmin && (
        <div className="fixed top-24 left-0 right-0 z-40 flex justify-center px-6">
          <motion.div 
            initial={{ y: -50 }} animate={{ y: 0 }}
            className="bg-amber-600 text-white px-6 py-2 rounded-full text-[10px] font-bold tracking-widest flex items-center gap-4 shadow-2xl border border-white/20"
          >
            ADMIN MODE ACTIVE
            <button 
              onClick={handleLogout}
              className="bg-black/20 hover:bg-black/40 p-1.5 rounded-full transition-colors"
              title="Logout Admin"
            >
              <LogOut size={12} />
            </button>
          </motion.div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6">
        
        {/* THANK YOU MODAL */}
        <AnimatePresence>
          {showThankYou && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/90 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                className="bg-stone-900 border border-amber-500/30 p-10 rounded-[2.5rem] max-w-md w-full text-center relative shadow-2xl"
              >
                <button onClick={() => setShowThankYou(false)} className="absolute top-6 right-6 text-stone-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
                <CheckCircle2 className="text-amber-500 mx-auto mb-6" size={48} />
                <h2 className="text-2xl font-serif italic text-white mb-4">Thank You</h2>
                <p className="text-stone-400 leading-relaxed mb-8">
                  Your message has been added to Grandma's tribute. Thank you for your love and participation in honoring her memory.
                </p>
                <button 
                  onClick={() => setShowThankYou(false)}
                  className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full transition-all uppercase tracking-widest text-xs font-bold"
                >
                  Return to Guestbook
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <MessageSquare className="text-amber-500/40 mx-auto mb-4" size={32} />
          </motion.div>
          <h1 className="text-4xl font-serif italic text-white mb-4">Maternal Echoes</h1>
          <p className="text-stone-500 text-sm tracking-widest uppercase">A Shared Legacy of Love</p>
        </div>

        {/* FORM SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-stone-900/30 border border-white/5 p-8 rounded-[2rem] mb-20 backdrop-blur-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-amber-500/60 ml-2">Your Name</label>
                <input 
                  type="text" placeholder="e.g. Jean-Luc" value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-amber-500/50 transition-colors" required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-amber-500/60 ml-2">Relationship</label>
                <input 
                  type="text" placeholder="e.g. Grandson" value={formData.relation}
                  onChange={(e) => setFormData({...formData, relation: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-amber-500/60 ml-2">Your Message</label>
              <textarea 
                rows="4" placeholder="What is a memory of her that makes you smile?" value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-6 py-4 outline-none focus:border-amber-500/50 transition-colors resize-none" required
              />
            </div>
            <button 
              type="submit" disabled={isSubmitting} 
              className="group flex items-center justify-center gap-3 px-10 py-4 bg-amber-600/90 hover:bg-amber-500 text-white rounded-full transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Share Memory'} <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>

        {/* MESSAGES LIST */}
        <div className="space-y-8">
          <h2 className="text-xl font-serif italic text-stone-400 mb-8 border-l-2 border-amber-500/30 pl-4">Voices of the Family</h2>
          <AnimatePresence mode='popLayout'>
            {messages.length === 0 ? (
              <p className="text-stone-600 italic text-center py-10">Waiting for the first memory to be shared...</p>
            ) : (
              messages.map((msg) => (
                <motion.div 
                  key={msg.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] relative group hover:bg-white/[0.04] transition-colors"
                >
                  {/* DELETE BUTTON (Visible only if Admin) */}
                  {isAdmin && (
                    <button 
                      onClick={() => handleDelete(msg.id)}
                      className="absolute top-6 right-6 p-2 text-stone-700 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}

                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                      <User size={20} className="text-amber-500/50" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm">{msg.name || 'Anonymous'}</h4>
                      <span className="text-[10px] uppercase tracking-widest text-stone-500">{msg.relation || 'Tribute'}</span>
                    </div>
                  </div>

                  <p className="text-stone-400 font-light leading-relaxed italic text-base">"{msg.message}"</p>
                  
                  <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-stone-600 text-[10px]">
                      <Clock size={12} /> {msg.date}
                    </div>
                    
                    <motion.button 
                      whileTap={{ scale: 1.5 }}
                      onClick={() => handleLike(msg.id, msg.likes)}
                      className="flex items-center gap-2 text-xs text-stone-500 hover:text-rose-400 transition-colors"
                    >
                      <Heart 
                        size={16} 
                        fill={msg.likes > 0 ? "#fb7185" : "none"} 
                        className={msg.likes > 0 ? "text-rose-400" : "text-stone-600"} 
                      />
                      <span>{msg.likes || 0}</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}