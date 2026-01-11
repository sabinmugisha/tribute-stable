import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyLayer() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('tribute_privacy_consent');
    if (!consent) {
      setTimeout(() => setShow(true), 1500); 
    }
  }, []);

  const handleChoice = (choice) => {
    localStorage.setItem('tribute_privacy_consent', choice);
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
          <div className="bg-stone-900 border border-white/10 p-6 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-amber-500/10 rounded-full text-amber-500">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-white font-serif italic text-lg">Privacy Preferences</h3>
            </div>
            <p className="text-stone-400 text-[11px] leading-relaxed mb-6 font-light">
              To honor Grandma's memory and see how many people are joining us, we use light cookies to track visits.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => handleChoice('accept')}
                className="flex-1 py-3 bg-amber-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-amber-500 transition-all"
              >
                Accept
              </button>
              <button 
                onClick={() => handleChoice('decline')}
                className="flex-1 py-3 bg-white/5 text-stone-400 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
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