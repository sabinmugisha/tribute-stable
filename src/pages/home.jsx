import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { Sparkles, Anchor, Coffee, Heart } from 'lucide-react';

// --- DATA CONFIGURATION ---
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

export default function Home() {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const containerRef = useRef(null);

  // Auto-scroll logic that integrates with dragging
  useEffect(() => {
    const startInfiniteScroll = async () => {
      await controls.start({
        x: -2500, 
        transition: {
          duration: 50,
          ease: "linear",
          repeat: Infinity,
        },
      });
    };
    startInfiniteScroll();
  }, [controls]);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-stone-200">
      
      {/* --- REFINED HERO SECTION --- */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#0a0a0a] z-10" />
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }} 
            animate={{ scale: 1, opacity: 0.5 }} 
            transition={{ duration: 3 }} 
            className="w-full h-full"
          >
            <img 
              src="/99.jpeg" 
              alt="Portrait" 
              className="w-full h-full object-cover object-top grayscale"
            />
          </motion.div>
        </div>

        <div className="relative z-20 text-center px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
            <span className="text-amber-500/50 uppercase tracking-[0.8em] text-[10px] md:text-xs mb-8 block font-light">
              In Loving Memory
            </span>
            <h1 className="text-4xl md:text-6xl font-serif italic text-white mb-6 tracking-tight leading-snug">
              Mukagemusi Anastasie
            </h1>
            <div className="flex items-center justify-center gap-6 mb-10">
              <div className="h-[0.5px] w-12 bg-amber-500/30" />
              <span className="text-stone-300 font-light tracking-[0.4em] text-xs md:text-base italic">
                1941 — 2026
              </span>
              <div className="h-[0.5px] w-12 bg-amber-500/30" />
            </div>
            <p className="text-stone-400 font-light italic text-sm md:text-lg leading-relaxed opacity-80 max-w-2xl mx-auto">
              "Her existence was a masterclass in grace. To know her was to understand that love is not just a feeling, but a way of moving through the world."
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- INTERACTIVE MILESTONES (THE PATH SHE WALKED) --- */}
      <section className="py-24 bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-12 flex flex-col items-center md:items-start">
          <Sparkles className="text-amber-500/40 mb-4" size={28} />
          <h2 className="text-3xl font-serif italic text-white tracking-wide">The Path She Walked</h2>
          <p className="text-stone-500 text-[10px] uppercase tracking-[0.4em] mt-3">Drag to explore her legacy</p>
        </div>

        <div className="relative w-full cursor-grab active:cursor-grabbing">
          <motion.div 
            ref={containerRef}
            drag="x"
            dragConstraints={{ left: -4000, right: 0 }}
            animate={controls}
            style={{ x }}
            onDragStart={() => controls.stop()}
            onDragEnd={() => {
              controls.start({
                x: x.get() - 2500,
                transition: { duration: 50, ease: "linear", repeat: Infinity }
              });
            }}
            className="flex gap-8 px-8 w-max"
          >
            {infiniteMilestones.map((m, i) => (
              <motion.div 
                key={i} 
                className="relative w-[300px] md:w-[380px] aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/5 bg-stone-900/20 group"
                whileHover={{ y: -10 }}
              >
                {/* Color Reveal Image */}
                <img 
                  src={m.image} 
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 transition-all duration-1000 ease-out scale-105 group-hover:scale-100" 
                  alt={m.title} 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

                <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-amber-200 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-stone-400 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CHARACTER PILLARS --- */}
      <section className="py-32 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <div className="text-center space-y-6 group">
              <div className="w-20 h-20 rounded-full bg-amber-500/5 flex items-center justify-center mx-auto border border-amber-500/10 group-hover:border-amber-500/40 transition-colors duration-500">
                <Anchor className="text-amber-500/40 group-hover:text-amber-500 transition-colors" size={28} />
              </div>
              <h3 className="text-2xl font-serif italic text-white">Unwavering Faith</h3>
              <p className="text-stone-500 text-sm leading-relaxed font-light px-4">
                She lived her values every day. Her faith was the compass that guided her through every season of life.
              </p>
            </div>

            <div className="text-center space-y-6 group">
              <div className="w-20 h-20 rounded-full bg-amber-500/5 flex items-center justify-center mx-auto border border-amber-500/10 group-hover:border-amber-500/40 transition-colors duration-500">
                <Coffee className="text-amber-500/40 group-hover:text-amber-500 transition-colors" size={28} />
              </div>
              <h3 className="text-2xl font-serif italic text-white">Open Doors</h3>
              <p className="text-stone-500 text-sm leading-relaxed font-light px-4">
                No one was ever a stranger in her home. To her, hospitality was the highest and most sincere form of love.
              </p>
            </div>

            <div className="text-center space-y-6 group">
              <div className="w-20 h-20 rounded-full bg-amber-500/5 flex items-center justify-center mx-auto border border-amber-500/10 group-hover:border-amber-500/40 transition-colors duration-500">
                <Heart className="text-amber-500/40 group-hover:text-amber-500 transition-colors" size={28} />
              </div>
              <h3 className="text-2xl font-serif italic text-white">Silent Strength</h3>
              <p className="text-stone-500 text-sm leading-relaxed font-light px-4">
                She taught us that true power is found in a calm heart and the courage to stand firm in one's truth.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}