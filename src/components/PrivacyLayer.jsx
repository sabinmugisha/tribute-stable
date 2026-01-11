import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Eye, Heart } from 'lucide-react';

export default function PrivacyLayer() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if they already accepted
    const consent = localStorage.getItem('tribute_privacy_consent');
    if (!consent) {
      // Small delay so the background loads slightly first for a premium feel
      const timer = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (choice) => {
    localStorage.setItem('tribute_privacy_consent', choice);
    setShow(false);
    // You can trigger Google Analytics here if choice === 'accept'
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* FULL SCREEN BLUR OVERLAY */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-[#0a0a0a]/80 backdrop-blur-xl"
          />

          {/* CENTERED INTERACTIVE PANEL */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center px-6"
          >
            <div className="bg-stone-900 border border-white/10 p-10 rounded-[3rem] max-w-sm w-full shadow-2xl text-center relative overflow-hidden border-b-amber-500/20">
              
              {/* Soft Glow Effect */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 blur-[80px] rounded-full" />

              <div className="relative z-10">
                <div className="w-20 h-20 bg-amber-500/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-amber-500/10">
                  <Heart className="text-amber-600/60" size={32} />
                </div>

                <h2 className="text-2xl font-serif italic text-white mb-2">Welcome</h2>
                <p className="text-stone-500 text-[10px] uppercase tracking-[0.3em] mb-6">A Sacred Space</p>
                
                <p className="text-stone-400 text-sm leading-relaxed mb-10 font-light">
                  To honor Grandma's memory and keep this space private for the family, we use essential cookies to track visits.
                </p>

                <div className="space-y-3">
                  <button 
                    onClick={() => handleChoice('accept')}
                    className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-xl shadow-amber-900/20"
                  >
                    Accept & Enter
                  </button>
                  
                  <button 
                    onClick={() => handleChoice('decline')}
                    className="w-full py-4 bg-white/5 hover:bg-white/10 text-stone-500 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all"
                  >
                    Continue Without
                  </button>
                </div>

                <div className="mt-10 flex justify-center gap-8 text-stone-700">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} /> <span className="text-[9px] uppercase tracking-widest font-bold">Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock size={14} /> <span className="text-[9px] uppercase tracking-widest font-bold">Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}