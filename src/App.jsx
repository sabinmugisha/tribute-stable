import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Film, X, ShieldAlert, Image as ImageIcon, Plus, Sparkles,
  ChevronLeft, ChevronRight, Mail, Instagram, Heart, Anchor, Coffee
} from 'lucide-react';

// --- DATA CONFIGURATION ---
const galleryMedia = [
  { id: 1, url: '/1.jpeg', title: 'The Matriarch', description: 'The steady hand that guided us and the heart that held us all together.' },
  { id: 2, url: '/2.jpeg', title: 'Generations of Love', description: 'Watching her legacy grow through the eyes of her children and grandchildren.' },
  { id: 5, url: '/5.jpeg', title: 'Roots & Wings', description: 'She gave us the roots to know where we belong and the wings to fly.' },
  { id: 3, url: '/3.jpeg', title: 'The Sound of Laughter', description: 'A joy so infectious it became the background music of our childhood.' },
  { id: 7, url: '/7.jpeg', title: 'Family Traditions', description: 'Sharing joy and wisdom with the ones who matter most around her table.' },
  { id: 15, url: '/15.jpeg', title: 'Peace & Nature', description: 'Finding beauty in the simple things, a lesson she taught us all.' },
  { id: 4, url: '/4.jpeg', title: 'A Lifetime of Grace', description: 'Teaching us that strength is found in kindness and resilience in faith.' },
  { id: 6, url: '/6.jpeg', title: 'The Heart of Kigali', description: 'Walking through history with a face that reflects the spirit of a nation.' },
  { id: 8, url: '/8.jpeg', title: 'Quiet Wisdom', description: 'Her words were few, but her example spoke volumes to every generation.' },
  { id: 9, url: '/9.jpeg', title: 'Unbreakable Bonds', description: 'The strength of family is the greatest treasure she left behind.' },
  { id: 10, url: '/10.jpeg', title: 'A Timeless Spirit', description: 'A legacy of love that transcends years and reaches into the future.' },
  { id: 11, url: '/11.jpeg', title: 'Elegance & Faith', description: 'Moving through life with a grace that inspired everyone she touched.' },
  { id: 12, url: '/12.jpeg', title: 'Snapshots of Joy', description: 'Every memory of her is a gift that we carry in our hearts daily.' },
  { id: 13, url: '/13.jpeg', title: 'Our Path Forward', description: 'A journey marked by love, resilience, and an unwavering devotion to family.' },
  { id: 14, url: '/14.jpeg', title: 'The Face of Home', description: 'To look at her was to know you were safe, loved, and always welcome.' },
  { id: 16, url: '/16.jpeg', title: 'Her Eternal Light', description: 'The smile that brightened our darkest days continues to guide us.' },
  { id: 17, url: '/17.jpeg', title: 'Mother of Courage', description: 'Showing us how to stand tall with dignity in the face of any storm.' },
  { id: 18, url: '/18.jpeg', title: 'Our Eternal Hope', description: 'A beacon of hope that will shine through her grandchildren forever.' },
];

const legacyMilestones = [
  { id: 1, title: "A Gift to the World", desc: "A journey defined by grace and spirit.", image: "/1.jpeg" },
  { id: 2, title: "Building Foundations", desc: "Establishing roots of love and resilience.", image: "/2.jpeg" },
  { id: 3, title: "The Pillar of Wisdom", desc: "A beacon of guidance for generations.", image: "/3.jpeg" },
  { id: 4, title: "Living Ancestor", desc: "The peace of a life well-lived.", image: "/4.jpeg" },
  { id: 5, title: "Eternal Legacy", desc: "Her love remains our guiding light.", image: "/5.jpeg" },
  { id: 6, title: "Seeds of Kindness", desc: "Carrying her wisdom in every act.", image: "/6.jpeg" },
  { id: 7, title: "The Heart of Home", desc: "Where every soul found a warm welcome.", image: "/7.jpeg" },
  { id: 8, title: "Faith Unshaken", desc: "A devotion that inspired everyone.", image: "/8.jpeg" },
  { id: 9, title: "Silent Strength", desc: "Teaching us power through patience.", image: "/9.jpeg" },
  { id: 10, title: "The Joy of Family", desc: "Her greatest treasure was our unity.", image: "/10.jpeg" },
  { id: 11, title: "A Storyteller's Heart", desc: "Preserving history through her words.", image: "/11.jpeg" },
  { id: 12, title: "Grace in Motion", desc: "Moving through life with quiet dignity.", image: "/12.jpeg" },
  { id: 13, title: "The Weaver of Bonds", desc: "Connecting generations together.", image: "/13.jpeg" },
  { id: 14, title: "Legacy of Peace", desc: "A calm presence in every storm.", image: "/14.jpeg" },
  { id: 15, title: "Light Eternal", desc: "A smile that never truly leaves us.", image: "/15.jpeg" },
];

const infiniteMilestones = [...legacyMilestones, ...legacyMilestones];

export default function TateMemorial() {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [displayLimit, setDisplayLimit] = useState(6);

  useEffect(() => {
    const preventAction = (e) => e.preventDefault();
    document.addEventListener('contextmenu', preventAction);
    document.addEventListener('dragstart', preventAction);
    return () => {
      document.removeEventListener('contextmenu', preventAction);
      document.removeEventListener('dragstart', preventAction);
    };
  }, []);

  const nextImage = (e) => {
    e?.stopPropagation();
    setSelectedIdx((prev) => (prev + 1) % galleryMedia.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setSelectedIdx((prev) => (prev - 1 + galleryMedia.length) % galleryMedia.length);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 selection:bg-amber-500/20 select-none overflow-x-hidden font-sans">
      
      {/* CSS For Infinite Auto-Scroll */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-320px * 15 - 1rem * 15)); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 60s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* --- REFINED HERO SECTION --- */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Container - Optimized for all devices */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#0a0a0a] z-10" />
          <motion.div 
            initial={{ scale: 1.05, opacity: 0 }} 
            animate={{ scale: 1, opacity: 0.4 }} 
            transition={{ duration: 2.5 }} 
            className="w-full h-full"
          >
            <img 
              src="/99.jpeg" 
              alt="Mukagemusi Anastasie Portrait" 
              className="w-full h-full object-cover object-top md:object-center grayscale brightness-75"
            />
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <span className="text-amber-500/50 uppercase tracking-[0.8em] text-[10px] md:text-xs mb-8 block font-light">
              In Loving Memory
            </span>
            
            {/* Normalized Name Size */}
            <h1 className="text-3xl md:text-5xl font-serif italic text-white mb-6 tracking-tight leading-snug">
              Mukagemusi Anastasie
            </h1>

            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-[0.5px] w-8 bg-amber-500/30" />
              <span className="text-stone-300 font-light tracking-[0.3em] text-[10px] md:text-sm italic">
                1941 — 2026
              </span>
              <div className="h-[0.5px] w-8 bg-amber-500/30" />
            </div>

            {/* Tribute Quotes */}
            <div className="space-y-4 max-w-2xl mx-auto">
                <p className="text-stone-400 font-light italic text-sm md:text-lg leading-relaxed opacity-80">
                  "Her existence was a masterclass in grace. To know her was to understand that love is not just a feeling, but a way of moving through the world."
                </p>
                <div className="w-6 h-[1px] bg-amber-500/40 mx-auto" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-amber-500/40">Our Eternal Guide</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- AUTO-SCROLLING LEGACY SECTION --- */}
      <section className="py-24 bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Sparkles className="text-amber-500/40 mb-4" size={24} />
            <h2 className="text-2xl md:text-3xl font-serif italic text-white tracking-wide">The Path She Walked</h2>
            <div className="w-12 h-[1px] bg-amber-500/20 mt-4" />
          </div>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="animate-scroll gap-4 px-4">
            {infiniteMilestones.map((milestone, index) => (
              <div key={`${milestone.id}-${index}`} className="relative w-[280px] md:w-[320px] aspect-[3/4] rounded-2xl overflow-hidden group border border-white/5 bg-stone-900/20">
                <img src={milestone.image} className="absolute inset-0 w-full h-full object-cover grayscale opacity-10 group-hover:opacity-30 transition-all duration-1000" alt="BG" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-lg font-serif text-white mb-2 tracking-wide group-hover:text-amber-200 transition-colors">{milestone.title}</h3>
                  <p className="text-stone-500 text-xs md:text-sm font-light leading-relaxed">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CHARACTER PILLARS --- */}
      <section className="py-32 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-500/5 flex items-center justify-center mx-auto border border-amber-500/10"><Anchor className="text-amber-500/40" size={24} /></div>
              <h3 className="text-xl font-serif italic text-white">Unwavering Faith</h3>
              <p className="text-stone-500 text-sm leading-relaxed font-light">She lived her values every day. Her faith was the compass that guided her through every season of life.</p>
            </div>
            <div className="text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-500/5 flex items-center justify-center mx-auto border border-amber-500/10"><Coffee className="text-amber-500/40" size={24} /></div>
              <h3 className="text-xl font-serif italic text-white">Open Doors</h3>
              <p className="text-stone-500 text-sm leading-relaxed font-light">No one was ever a stranger in her home. To her, hospitality was the highest and most sincere form of love.</p>
            </div>
            <div className="text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-500/5 flex items-center justify-center mx-auto border border-amber-500/10"><Heart className="text-amber-500/40" size={24} /></div>
              <h3 className="text-xl font-serif italic text-white">Silent Strength</h3>
              <p className="text-stone-500 text-sm leading-relaxed font-light">She taught us that true power is found in a calm heart and the courage to stand firm in one's truth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- MASONRY GALLERY --- */}
      <section id="gallery" className="max-w-[1400px] mx-auto py-32 px-6">
        <div className="flex flex-col items-center mb-20 text-center">
          <ImageIcon className="text-amber-500/40 mb-4" size={32} />
          <h2 className="text-4xl font-serif italic text-white tracking-wide">Visual Archives</h2>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
          {galleryMedia.slice(0, displayLimit).map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} onClick={() => setSelectedIdx(i)} className="relative break-inside-avoid rounded-xl overflow-hidden cursor-pointer bg-stone-900 border border-white/5 group">
              <img src={item.url} className="w-full h-auto grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 block" alt={item.title} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
        {displayLimit < galleryMedia.length && (
          <div className="mt-20 flex justify-center">
            <button onClick={() => setDisplayLimit(galleryMedia.length)} className="group flex items-center gap-4 px-12 py-5 rounded-full border border-white/5 hover:bg-white/5 transition-all text-stone-300 text-[11px] uppercase tracking-[0.4em]">
              <Plus size={18} className="text-amber-500 group-hover:rotate-90 transition-transform" /> Explore Full Gallery
            </button>
          </div>
        )}
      </section>



        <section className="py-24 bg-[#0d0d0d] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Film className="text-amber-500/20 mb-8 mx-auto" size={28} />
          <div className="relative p-2 rounded-[3rem] bg-gradient-to-b from-white/10 to-transparent shadow-2xl">
            <div className="aspect-video rounded-[2.5rem] overflow-hidden bg-black relative shadow-2xl">
              <iframe className="w-full h-full" src="" title="Tribute" frameBorder="0" allowFullScreen />
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4" onClick={() => setSelectedIdx(null)}>
            <button className="absolute top-8 right-8 text-white/30 hover:text-white" onClick={() => setSelectedIdx(null)}><X size={40}/></button>
            <button className="absolute left-4 p-4 text-white/20 hover:text-white" onClick={prevImage}><ChevronLeft size={60}/></button>
            <button className="absolute right-4 p-4 text-white/20 hover:text-white" onClick={nextImage}><ChevronRight size={60}/></button>
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center" onClick={(e) => e.stopPropagation()}>
              <div className="lg:col-span-8 rounded-2xl overflow-hidden bg-stone-950">
                <img src={galleryMedia[selectedIdx].url} className="w-full h-auto max-h-[80vh] object-contain" alt="View" />
              </div>
              <div className="lg:col-span-4 space-y-8 text-left">
                <h3 className="text-3xl font-serif italic text-white">{galleryMedia[selectedIdx].title}</h3>
                <p className="text-stone-400 font-light italic">{galleryMedia[selectedIdx].description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FOOTER --- */}
      <footer className="py-24 border-t border-white/5 bg-[#080808]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-10">
          <div className="text-center space-y-4">
            <div className="text-[10px] tracking-[1em] text-stone-600 uppercase">Forever In Our Hearts</div>
            <p className="text-sm text-stone-500 font-light italic">Made by Sabin Mugisha</p>
          </div>
          <div className="flex items-center gap-10">
            <a href="mailto:sbdollar9@gmail.com" className="p-4 rounded-full bg-white/5 border border-white/5 text-stone-400 hover:text-amber-500 hover:border-amber-500/30 transition-all duration-500"><Mail size={22} /></a>
            <a href="https://instagram.com/sab1n.9th" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white/5 border border-white/5 text-stone-400 hover:text-amber-500 hover:border-amber-500/30 transition-all duration-500"><Instagram size={22} /></a>
          </div>
          <div className="flex items-center gap-4 px-8 py-3 bg-stone-900/40 rounded-full border border-white/5 opacity-40">
            <ShieldAlert size={14} className="text-amber-500" />
            <span className="text-[9px] uppercase tracking-[0.3em] text-stone-500">Digital Archive Protected</span>
          </div>
        </div>
      </footer>
    </div>
  );
}