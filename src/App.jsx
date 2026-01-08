import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Mic2, Film, Quote, X, Maximize2, ShieldAlert, 
  Image as ImageIcon, ChevronLeft, ChevronRight, Plus 
} from 'lucide-react';

// --- DATA CONFIGURATION ---
const galleryMedia = [
  { id: 1, url: '/1.jpeg', title: 'The Matriarch', description: 'The steady hand that guided us and the heart that held us all together.' },
  { id: 2, url: '/2.jpeg', title: 'Generations of Love', description: 'Watching her legacy grow through the eyes of her children and grandchildren.' },
  { id: 3, url: '/3.jpeg', title: 'The Sound of Laughter', description: 'A joy so infectious it became the background music of our childhood.' },
  { id: 4, url: '/4.jpeg', title: 'A Lifetime of Grace', description: 'Teaching us that strength is found in kindness and resilience in faith.' },
  { id: 5, url: '/5.jpeg', title: 'Roots & Wings', description: 'She gave us the roots to know where we belong and the wings to fly.' },
  { id: 6, url: '/6.jpeg', title: 'The Heart of Kigali', description: 'Walking through history with a face that reflects the spirit of a nation.' },
  { id: 7, url: '/7.jpeg', title: 'Family Traditions', description: 'Sharing joy and wisdom with the ones who matter most around her table.' },
  { id: 8, url: '/8.jpeg', title: 'Quiet Wisdom', description: 'Her words were few, but her example spoke volumes to every generation.' },
  { id: 9, url: '/9.jpeg', title: 'Unbreakable Bonds', description: 'The strength of family is the greatest treasure she left behind.' },
  { id: 10, url: '/10.jpeg', title: 'A Timeless Spirit', description: 'A legacy of love that transcends years and reaches into the future.' },
  { id: 11, url: '/11.jpeg', title: 'Elegance & Faith', description: 'Moving through life with a grace that inspired everyone she touched.' },
  { id: 12, url: '/12.jpeg', title: 'Snapshots of Joy', description: 'Every memory of her is a gift that we carry in our hearts daily.' },
  { id: 13, url: '/13.jpeg', title: 'Our Path Forward', description: 'A journey marked by love, resilience, and an unwavering devotion to family.' },
  { id: 14, url: '/14.jpeg', title: 'The Face of Home', description: 'To look at her was to know you were safe, loved, and always welcome.' },
  { id: 15, url: '/15.jpeg', title: 'Peace & Nature', description: 'Finding beauty in the simple things, a lesson she taught us all.' },
  { id: 16, url: '/16.jpeg', title: 'Her Eternal Light', description: 'The smile that brightened our darkest days continues to guide us.' },
  { id: 17, url: '/17.jpeg', title: 'Mother of Courage', description: 'Showing us how to stand tall with dignity in the face of any storm.' },
  { id: 18, url: '/18.jpeg', title: 'Our Eternal Hope', description: 'A beacon of hope that will shine through her grandchildren forever.' },
];

const voiceStories = [
  { id: 1, title: "Healing & Compassion", quote: "She taught us that the greatest medicine is a compassionate heart and a listening ear.", audio: "/Hospital story.mp3", year: "A Legacy", location: "Kigali" },
  { id: 2, title: "Strength & Protection", quote: "In times of darkness, During Genocide against Tutsi.", audio: "/Genocide story.mp3", year: "A Testament", location: "Jali" }
];

export default function TateMemorial() {
  const [activeVoice, setActiveVoice] = useState(voiceStories[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [displayLimit, setDisplayLimit] = useState(8); 
  const audioRef = useRef(null);

  useEffect(() => {
    const preventAction = (e) => e.preventDefault();
    document.addEventListener('contextmenu', preventAction);
    document.addEventListener('dragstart', preventAction);
    return () => {
      document.removeEventListener('contextmenu', preventAction);
      document.removeEventListener('dragstart', preventAction);
    };
  }, []);

  const toggleAudio = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

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
      
      {/* SECTION 1: VOICE ARCHIVES */}
      <section id="voices" className="max-w-6xl mx-auto py-32 px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <Mic2 className="text-amber-500/40 mb-4" size={32} />
          <h2 className="text-4xl font-serif italic text-white tracking-wide">Wisdom Passed Down</h2>
          <div className="w-12 h-[1px] bg-amber-500/30 mt-4" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-3">
            {voiceStories.map((story) => (
              <button
                key={story.id}
                onClick={() => { setActiveVoice(story); setIsPlaying(false); setProgress(0); }}
                className={`w-full p-6 rounded-2xl text-left transition-all border ${
                  activeVoice.id === story.id ? 'bg-amber-500/10 border-amber-500/20' : 'bg-transparent border-transparent hover:bg-white/5'
                }`}
              >
                <p className="font-serif italic text-xl text-stone-300">{story.title}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mt-2">{story.location} • {story.year}</p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 bg-[#111] rounded-[3rem] p-12 border border-white/5 shadow-2xl relative">
            <Quote className="text-amber-500/5 absolute top-12 right-12" size={120} />
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-stone-200 mb-12">"{activeVoice.quote}"</p>
              <div className="flex items-center gap-8">
                <button onClick={toggleAudio} className="w-20 h-20 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
                  {isPlaying ? <Pause size={28} fill="black" /> : <Play size={28} fill="black" className="ml-1" />}
                </button>
                <div className="flex-1 space-y-3">
                  <div className="h-[2px] bg-stone-800 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-amber-500" animate={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-stone-500 tracking-[0.3em] uppercase">
                    <span>Legacy Record</span>
                    <span className="text-amber-500/60 tracking-normal italic font-serif text-xs capitalize">Grandmother's Voice</span>
                  </div>
                </div>
              </div>
            </div>
            <audio ref={audioRef} src={activeVoice.audio} onTimeUpdate={() => setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100)} onEnded={() => setIsPlaying(false)} controlsList="nodownload" />
          </div>
        </div>
      </section>

      {/* SECTION 2: CINEMATIC TRIBUTE */}
      <section id="tribute" className="py-32 bg-[#0d0d0d] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center mb-16 text-center">
            <Film className="text-amber-500/40 mb-4" size={32} />
            <h2 className="text-4xl font-serif italic text-white tracking-wide">A Journey in Motion</h2>
            <p className="text-stone-500 text-xs uppercase tracking-[0.4em] mt-4 font-light">Celebrating her beautiful legacy</p>
          </div>
          
          <div className="relative p-2 rounded-[3rem] bg-gradient-to-b from-white/10 to-transparent shadow-2xl">
            <div className="aspect-video rounded-[2.5rem] overflow-hidden bg-black relative group shadow-2xl">
              {/* YouTube Shorts Video Integration */}
              <iframe 
                className="w-full h-full object-cover"
                src="https://www.youtube.com/embed/Lrk3dnCasEI?autoplay=0&controls=1&rel=0" 
                title="Tate Memorial Tribute"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PROFESSIONAL MASONRY GALLERY */}
      <section id="gallery" className="max-w-[1400px] mx-auto py-32 px-6">
        <div className="flex flex-col items-center mb-20 text-center">
          <ImageIcon className="text-amber-500/40 mb-4" size={32} />
          <h2 className="text-5xl font-serif italic text-white tracking-wide">Visual Archives</h2>
          <p className="text-stone-500 text-[10px] uppercase tracking-[0.6em] mt-6 font-light">
            Roots of our family • Memories that guide us
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {galleryMedia.slice(0, displayLimit).map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onClick={() => setSelectedIdx(i)}
              className="relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer bg-stone-900 border border-white/5 group shadow-lg"
            >
              <img 
                src={item.url} 
                className="w-full h-auto grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 pointer-events-none"
                alt={item.title}
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 scale-75 group-hover:scale-100 transition-transform duration-500">
                  <Maximize2 size={24} className="text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-200 font-medium">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {displayLimit < galleryMedia.length && (
          <div className="mt-24 flex justify-center">
            <button 
              onClick={() => setDisplayLimit(prev => prev + 8)}
              className="group relative flex items-center gap-4 px-12 py-5 rounded-full overflow-hidden transition-all border border-white/5"
            >
              <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
              <Plus size={18} className="text-amber-500 group-hover:rotate-90 transition-transform duration-500" />
              <span className="relative text-[11px] uppercase tracking-[0.4em] text-stone-300 font-light">See More Memories</span>
            </button>
          </div>
        )}

        {/* LIGHTBOX */}
        <AnimatePresence>
          {selectedIdx !== null && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12"
              onClick={() => setSelectedIdx(null)}
            >
              <button className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors z-[110]" onClick={() => setSelectedIdx(null)}>
                <X size={40} strokeWidth={1} />
              </button>
              <button className="absolute left-4 md:left-10 p-4 text-white/20 hover:text-white transition-colors z-[110]" onClick={prevImage}>
                <ChevronLeft size={60} strokeWidth={1} />
              </button>
              <button className="absolute right-4 md:right-10 p-4 text-white/20 hover:text-white transition-colors z-[110]" onClick={nextImage}>
                <ChevronRight size={60} strokeWidth={1} />
              </button>

              <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center" onClick={(e) => e.stopPropagation()}>
                <motion.div key={selectedIdx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="lg:col-span-8 rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center bg-stone-950">
                  <img src={galleryMedia[selectedIdx].url} className="w-full h-auto max-h-[80vh] object-contain pointer-events-none" alt="Expanded" />
                </motion.div>
                <div className="lg:col-span-4 space-y-8 text-left">
                  <motion.div key={`text-${selectedIdx}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h3 className="text-4xl font-serif italic text-white mb-6 leading-tight">{galleryMedia[selectedIdx].title}</h3>
                    <p className="text-stone-400 leading-relaxed font-light text-base italic">{galleryMedia[selectedIdx].description}</p>
                  </motion.div>
                  <div className="pt-10 border-t border-white/5 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <ShieldAlert size={16} className="text-amber-500/40" />
                      <span className="text-[10px] uppercase tracking-[0.2em] text-stone-600 tracking-widest">Digital Content Protected</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* FOOTER */}
      <footer className="py-24 border-t border-white/5 text-center flex flex-col items-center gap-10">
        <div className="space-y-4">
          <div className="text-[10px] tracking-[1em] text-stone-600 uppercase">Forever In Our Hearts</div>
          <p className="text-sm text-stone-500 font-light">
            Made by <span className="text-stone-200 font-serif italic tracking-wide">Sabin Mugisha</span>
          </p>
        </div>
        <div className="flex items-center gap-4 px-8 py-3 bg-stone-900/40 rounded-full border border-white/5 opacity-50">
          <ShieldAlert size={14} className="text-amber-500" />
          <span className="text-[9px] uppercase tracking-[0.3em] text-stone-500">Encrypted Content Shield Active</span>
        </div>
      </footer>
    </div>
  );
}