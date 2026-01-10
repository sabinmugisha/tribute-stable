import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll to toggle transparency
  useEffect(() => {
    const handleScroll = () => {
      // Navbar becomes slightly visible after scrolling 40px
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
   
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out ${
        scrolled 
          ? 'bg-black/40 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl' 
          : 'bg-transparent py-8 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        
        {/* LOGO - Elegant serif style */}
        <Link 
          to="/" 
          className="relative group overflow-hidden"
        >
          <motion.span 
            className="text-amber-500/90 font-serif italic tracking-[0.4em] text-sm md:text-base block"
          >
            Memorial
          </motion.span>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-500/40 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
        </Link>

        {/* DESKTOP NAV - Minimalist & Spaced */}
        <div className="hidden md:flex gap-12 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative text-[10px] uppercase tracking-[0.5em] transition-all duration-300 hover:text-white ${
                location.pathname === link.path ? 'text-amber-500' : 'text-stone-400'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="nav-underline" 
                  className="absolute -bottom-2 left-0 w-full h-[1px] bg-amber-500" 
                />
              )}
            </Link>
          ))}
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          className="md:hidden p-2 text-stone-400 hover:text-amber-500 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU - Full Screen Blur */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden md:hidden"
          >
            <div className="flex flex-col items-center gap-10 py-16">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                >
                  <Link
                    to={link.path}
                    className="text-[11px] uppercase tracking-[0.6em] text-stone-300 hover:text-amber-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}