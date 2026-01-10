import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Plus, X, ChevronLeft, ChevronRight, Film } from 'lucide-react';

const galleryMedia = [
  { id: 1, url: '/1.jpeg', title: 'The Matriarch', description: 'The steady hand that guided us.' },
  { id: 2, url: '/2.jpeg', title: 'Generations of Love', description: 'Watching her legacy grow.' },
  { id: 5, url: '/5.jpeg', title: 'Roots & Wings', description: 'She gave us the roots to belong.' },
  { id: 3, url: '/3.jpeg', title: 'The Sound of Laughter', description: 'A joy so infectious.' },
  { id: 7, url: '/7.jpeg', title: 'Family Traditions', description: 'Sharing joy around her table.' },
  { id: 15, url: '/15.jpeg', title: 'Peace & Nature', description: 'Finding beauty in simple things.' },
  { id: 4, url: '/4.jpeg', title: 'A Lifetime of Grace', description: 'Teaching us resilience in faith.' },
  { id: 6, url: '/6.jpeg', title: 'The Heart of Kigali', description: 'Reflecting the spirit of a nation.' },
  { id: 8, url: '/8.jpeg', title: 'Quiet Wisdom', description: 'Her example spoke volumes.' },
  { id: 9, url: '/9.jpeg', title: 'Unbreakable Bonds', description: 'The strength of family.' },
  { id: 10, url: '/10.jpeg', title: 'A Timeless Spirit', description: 'A legacy that transcends years.' },
  { id: 11, url: '/11.jpeg', title: 'Elegance & Faith', description: 'Moving with grace.' },
  { id: 12, url: '/12.jpeg', title: 'Snapshots of Joy', description: 'Every memory is a gift.' },
  { id: 13, url: '/13.jpeg', title: 'Our Path Forward', description: 'A journey marked by love.' },
  { id: 14, url: '/14.jpeg', title: 'The Face of Home', description: 'To look at her was to know you were safe.' },
  { id: 16, url: '/16.jpeg', title: 'Her Eternal Light', description: 'The smile that brightened dark days.' },
  { id: 17, url: '/17.jpeg', title: 'Mother of Courage', description: 'Showing us how to stand tall.' },
  { id: 18, url: '/18.jpeg', title: 'Our Eternal Hope', description: 'A beacon for her grandchildren.' },
];

export default function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [displayLimit, setDisplayLimit] = useState(8);

  const nextImage = (e) => { e?.stopPropagation(); setSelectedIdx((p) => (p + 1) % galleryMedia.length); };
  const prevImage = (e) => { e?.stopPropagation(); setSelectedIdx((p) => (p - 1 + galleryMedia.length) % galleryMedia.length); };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-[#0a0a0a]">
      
      {/* --- TOP SECTION: VIDEO TRIBUTE --- */}
      <section className="py-16 bg-gradient-to-b from-stone-900/20 to-transparent border-b border-white/5 mb-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center gap-4">
              <Film className="text-amber-500/30" size={28} />
              <h1 className="text-3xl md:text-4xl font-serif italic text-white tracking-wide">Remembrance in Motion</h1>
              <div className="w-12 h-[1px] bg-amber-500/20" />
            </div>

            <div className="relative p-2 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent shadow-2xl mx-auto max-w-4xl">
              <div className="aspect-video rounded-[2rem] overflow-hidden bg-black relative shadow-inner">
                {/* Replace with your actual Video URL */}
                <iframe 
                  className="w-full h-full" 
                  src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
                  title="Tribute Video" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- MASONRY GALLERY SECTION --- */}
      <section className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <ImageIcon className="text-amber-500/40 mb-4" size={24} />
          <h2 className="text-2xl font-serif italic text-white tracking-wide">Photo Archives</h2>
          <p className="text-stone-500 text-xs uppercase tracking-[0.3em] mt-2 font-light">Captured Moments of Grace</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
          {galleryMedia.slice(0, displayLimit).map((item, i) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedIdx(i)} 
              className="relative break-inside-avoid rounded-xl overflow-hidden cursor-pointer bg-stone-900 border border-white/5 group shadow-lg"
            >
              <img 
                src={item.url} 
                className="w-full h-auto grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105" 
                alt={item.title} 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </div>

        {displayLimit < galleryMedia.length && (
          <div className="mt-20 flex justify-center">
            <button 
              onClick={() => setDisplayLimit(galleryMedia.length)} 
              className="group flex items-center gap-4 px-12 py-5 rounded-full border border-white/5 hover:bg-white/5 transition-all text-stone-300 text-[11px] uppercase tracking-[0.4em]"
            >
              <Plus size={18} className="text-amber-500 group-hover:rotate-90 transition-transform" /> 
              View Complete Archive
            </button>
          </div>
        )}
      </section>

      {/* --- LIGHTBOX (MODAL) --- */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4" 
            onClick={() => setSelectedIdx(null)}
          >
            <button className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors" onClick={() => setSelectedIdx(null)}><X size={40}/></button>
            <button className="absolute left-4 p-4 text-white/20 hover:text-white transition-colors" onClick={prevImage}><ChevronLeft size={60}/></button>
            <button className="absolute right-4 p-4 text-white/20 hover:text-white transition-colors" onClick={nextImage}><ChevronRight size={60}/></button>
            
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center" onClick={(e) => e.stopPropagation()}>
              <div className="lg:col-span-8 rounded-2xl overflow-hidden bg-stone-950 shadow-2xl">
                <img src={galleryMedia[selectedIdx].url} className="w-full h-auto max-h-[80vh] object-contain" alt="View" />
              </div>
              <div className="lg:col-span-4 space-y-8 text-left p-4">
                <h3 className="text-3xl font-serif italic text-white">{galleryMedia[selectedIdx].title}</h3>
                <div className="w-12 h-[1px] bg-amber-500/30" />
                <p className="text-stone-400 font-light italic leading-relaxed text-lg">{galleryMedia[selectedIdx].description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}