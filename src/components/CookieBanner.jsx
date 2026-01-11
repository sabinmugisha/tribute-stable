import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show if they haven't made a choice yet
    const consent = localStorage.getItem('tribute_cookie_consent');
    if (!consent) {
      setTimeout(() => setShow(true), 2000); // Show after 2 seconds
    }
  }, []);

  const handleChoice = (choice) => {
    localStorage.setItem('tribute_cookie_consent', choice);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md"
        >
          <div className="bg-stone-900/90 border border-white/10 p-6 rounded-[2rem] backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-amber-500/10 rounded-full text-amber-500">
                <Cookie size={20} />
              </div>
              <h3 className="text-white font-serif italic">Cookie Preferences</h3>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed mb-6">
              We use cookies to understand how many family members are visiting Grandma's tribute and to improve the experience.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => handleChoice('accept')}
                className="flex-1 py-3 bg-amber-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-amber-500 transition-colors"
              >
                Accept All
              </button>
              <button 
                onClick={() => handleChoice('decline')}
                className="flex-1 py-3 bg-white/5 text-stone-400 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}