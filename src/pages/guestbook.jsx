import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, User, Clock, Heart } from 'lucide-react';

export default function Guestbook() {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ name: '', relation: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load messages from local storage on start
  useEffect(() => {
    const saved = localStorage.getItem('tribute_messages');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    setIsSubmitting(true);
    
    const newMessage = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      likes: 0
    };

    // Simulate a small delay for a "pro" feel
    setTimeout(() => {
      const updatedMessages = [newMessage, ...messages];
      setMessages(updatedMessages);
      localStorage.setItem('tribute_messages', JSON.stringify(updatedMessages));
      setFormData({ name: '', relation: '', message: '' });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#0a0a0a] text-stone-200">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <MessageSquare className="text-amber-500/40 mx-auto mb-4" size={32} />
          <h1 className="text-4xl font-serif italic text-white mb-4">Maternal Echoes</h1>
          <p className="text-stone-500 text-sm tracking-widest uppercase">Share a memory, a prayer, or a story</p>
        </div>

        {/* FORM */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-stone-900/30 border border-white/5 p-8 rounded-[2rem] mb-20 backdrop-blur-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-amber-500/60 ml-2">Your Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Jean-Luc"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-amber-500/50 transition-colors text-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-amber-500/60 ml-2">Relationship</label>
                <input 
                  type="text" 
                  placeholder="e.g. Grandson / Family Friend"
                  value={formData.relation}
                  onChange={(e) => setFormData({...formData, relation: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-amber-500/50 transition-colors text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-amber-500/60 ml-2">Your Message</label>
              <textarea 
                rows="4"
                placeholder="What is a memory of her that makes you smile?"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-6 py-4 outline-none focus:border-amber-500/50 transition-colors text-sm resize-none"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="group flex items-center justify-center gap-3 w-full md:w-auto px-10 py-4 bg-amber-600/90 hover:bg-amber-500 text-white rounded-full transition-all duration-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Sharing...' : 'Share Memory'} 
              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>

        {/* MESSAGES LIST */}
        <div className="space-y-8">
          <h2 className="text-xl font-serif italic text-stone-400 mb-8 border-l-2 border-amber-500/30 pl-4">Voices of the Family</h2>
          <AnimatePresence mode='popLayout'>
            {messages.length === 0 ? (
              <p className="text-stone-600 italic text-center py-10">No messages yet. Be the first to share.</p>
            ) : (
              messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] relative group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                        <User size={20} className="text-amber-500/50" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">{msg.name || 'Anonymous'}</h4>
                        <span className="text-[10px] uppercase tracking-widest text-stone-500">{msg.relation || 'Tribute'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-stone-600 text-[10px]">
                      <Clock size={12} /> {msg.date}
                    </div>
                  </div>
                  <p className="text-stone-400 font-light leading-relaxed italic text-base">"{msg.message}"</p>
                  
                  <div className="mt-6 pt-6 border-t border-white/5 flex justify-end">
                    <button className="flex items-center gap-2 text-[10px] text-stone-600 hover:text-amber-500 transition-colors">
                      <Heart size={14} /> Memorial Love
                    </button>
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