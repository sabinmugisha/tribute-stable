import React from 'react';
import { Mail, Instagram, ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-24 border-t border-white/5 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-10">
        <div className="text-center space-y-4">
          <div className="text-[10px] tracking-[1em] text-stone-600 uppercase">Forever In Our Hearts</div>
          <p className="text-sm text-stone-500 font-light italic">Made by Sabin Mugisha</p>
        </div>
        <div className="flex items-center gap-10">
          <a href="mailto:sbdollar9@gmail.com" className="p-4 rounded-full bg-white/5 border border-white/5 text-stone-400 hover:text-amber-500 transition-all"><Mail size={22} /></a>
          <a href="https://instagram.com/sab1n.9th" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white/5 border border-white/5 text-stone-400 hover:text-amber-500 transition-all"><Instagram size={22} /></a>
        </div>
        <div className="flex items-center gap-4 px-8 py-3 bg-stone-900/40 rounded-full border border-white/5 opacity-40">
          <ShieldAlert size={14} className="text-amber-500" />
          <span className="text-[9px] uppercase tracking-[0.3em] text-stone-500">Digital Archive Protected</span>
        </div>
      </div>
    </footer>
  );
}