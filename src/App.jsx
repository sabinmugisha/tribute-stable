import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Heart, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Lock, 
  Unlock, 
  Play, 
  Pause, 
  Image as ImageIcon, 
  ArrowRight, 
  X, 
  Clock,
  ChevronLeft, 
  ChevronRight, 
  BookOpen,
  Flame // Using Flame instead of Candle
} from 'lucide-react';

const slides = ["/tate1.jpg", "/tate2.jpg", "/tate3.jpg"];
const galleryImages = ["/g1.jpg", "/g2.jpg", "/g3.jpg", "/g4.jpg", "/g5.jpg", "/g6.jpg"];

// Timeline moments with timestamps
const audioHighlights = [
  { time: 30, title: "Childhood Memory", emoji: "👧" },
  { time: 87, title: "First Job Story", emoji: "💼" },
  { time: 145, title: "Wedding Day", emoji: "💍" },
  { time: 210, title: "Motherhood", emoji: "👶" },
  { time: 285, title: "Grandchildren", emoji: "👵" }
];

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [index, setIndex] = useState(0);
  const [candles, setCandles] = useState(124);
  const [showGallery, setShowGallery] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioTime, setAudioTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentHighlight, setCurrentHighlight] = useState(null);
  const [showCandleEffect, setShowCandleEffect] = useState(false);
  const [candleMessages, setCandleMessages] = useState([
    "Sarah lit a candle • Just now",
    "Michael remembered • 5m ago",
    "Family gathered • 1h ago"
  ]);
  
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.1]);
  
  // Enhanced slideshow with varied timing
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500 + Math.random() * 2000); // Varied timing for organic feel
    return () => clearInterval(timer);
  }, []);

  // Audio player functionality
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setAudioDuration(audioRef.current.duration);
      });
      
      audioRef.current.addEventListener('timeupdate', () => {
        setAudioTime(audioRef.current.currentTime);
        
        // Check for highlights
        const highlight = audioHighlights.find(h => 
          Math.abs(audioRef.current.currentTime - h.time) < 2
        );
        if (highlight && currentHighlight?.time !== highlight.time) {
          setCurrentHighlight(highlight);
          setTimeout(() => setCurrentHighlight(null), 3000);
        }
      });
    }
  }, []);

  const toggleAudio = () => {
    if (audioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setAudioPlaying(!audioPlaying);
  };

  const jumpToHighlight = (time) => {
    audioRef.current.currentTime = time;
    audioRef.current.play();
    setAudioPlaying(true);
  };

  const addCandle = () => {
    setCandles(prev => prev + 1);
    setShowCandleEffect(true);
    
    // Add a new message
    const names = ["Alex", "Jenny", "Robert", "Emily", "David", "Lisa"];
    const verbs = ["honored", "remembered", "celebrated", "blessed", "cherished"];
    const name = names[Math.floor(Math.random() * names.length)];
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    
    setCandleMessages(prev => [
      `${name} ${verb} Tate • Just now`,
      ...prev.slice(0, 2)
    ]);
    
    setTimeout(() => setShowCandleEffect(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 font-sans overflow-x-hidden" ref={containerRef}>
      
      {/* THE CINEMATIC ENTRANCE */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
          >
            {/* Animated background */}
            <motion.div 
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 100%"],
                scale: [1, 1.1]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute inset-0 bg-gradient-to-br from-stone-900 via-black to-stone-800"
              style={{ backgroundImage: `url('/gate.jpg')`, backgroundSize: 'cover' }}
            >
              <div className="absolute inset-0 bg-black/70" />
            </motion.div>
            
            {/* Central portal */}
            <motion.div 
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity }
              }}
              className="relative z-10"
            >
              <motion.button 
                onClick={() => setHasEntered(true)}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex flex-col items-center gap-6"
              >
                {/* Glowing ring */}
                <motion.div 
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(255,255,255,0.1)",
                      "0 0 40px rgba(255,255,255,0.3)",
                      "0 0 20px rgba(255,255,255,0.1)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute w-32 h-32 rounded-full border border-white/30"
                />
                
                <div className="w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center backdrop-blur-xl bg-black/30 group-hover:bg-black/50 transition-all duration-500">
                  <Unlock className="text-white" size={32} />
                </div>
                
                <div className="text-center">
                  <span className="block text-xs tracking-[0.5em] uppercase text-white/70 font-light mb-1">ENTER THE</span>
                  <span className="block text-2xl font-serif italic text-white tracking-wider">Sanctuary</span>
                  <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-4"
                  >
                    <ArrowRight className="mx-auto text-white/50" size={16} />
                  </motion.div>
                </div>
              </motion.button>
            </motion.div>
            
            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * 100 - 50 + 'vw',
                  y: Math.random() * 100 - 50 + 'vh',
                  opacity: 0
                }}
                animate={{ 
                  y: [null, -100],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 4,
                  delay: i * 0.2,
                  repeat: Infinity
                }}
                className="absolute w-[1px] h-[1px] bg-white/30 rounded-full"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* DYNAMIC BACKGROUND WITH PARALLAX */}
      <div className="fixed inset-0 z-0">
        <motion.div 
          style={{ opacity: backgroundOpacity }}
          className="absolute inset-0 transition-opacity duration-1000"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: 0.4,
                scale: 1,
                transition: { duration: 4, ease: "easeOut" }
              }}
              exit={{ 
                opacity: 0,
                scale: 1.05,
                transition: { duration: 2 }
              }}
              className="absolute inset-0 bg-center bg-cover"
              style={{ 
                backgroundImage: `url(${slides[index]})`,
                filter: 'sepia(0.2) contrast(1.1)'
              }}
            />
          </AnimatePresence>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        
        {/* Subtle floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100],
                x: [0, Math.sin(i) * 50],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 10 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
              className="absolute w-[2px] h-[2px] bg-white/10 rounded-full"
              style={{
                left: `${(i * 7) % 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </div>

      {/* MAIN CONTENT JOURNEY */}
      <div className="relative z-10">
        
        {/* SECTION I: THE VOICE & TIMELINE */}
        <section className="min-h-screen flex items-center justify-center px-4 md:px-8 py-20">
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-center">
            
            {/* Audio Player with Timeline */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: audioPlaying ? 360 : 0 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Volume2 className="text-amber-500" size={28} />
                  </motion.div>
                  <h2 className="text-5xl lg:text-6xl font-serif italic text-white">
                    Her Voice
                  </h2>
                </div>
                <p className="text-stone-300/80 leading-relaxed text-lg max-w-2xl italic font-light">
                  "To hear a voice is to feel a presence. These recordings are the echoes of her laughter and the wisdom she shared with us through the years."
                </p>
              </div>
              
              {/* Enhanced Audio Player */}
              <div className="bg-black/40 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                <audio 
                  ref={audioRef} 
                  src="/Conversation-With-Tate.mp3" 
                  className="hidden"
                />
                
                <div className="space-y-6">
                  {/* Progress & Highlights */}
                  <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="absolute h-full bg-gradient-to-r from-amber-500 to-orange-400"
                      style={{ width: `${(audioTime / audioDuration) * 100 || 0}%` }}
                    />
                    
                    {/* Highlight Markers */}
                    {audioHighlights.map((highlight, i) => (
                      <button
                        key={i}
                        onClick={() => jumpToHighlight(highlight.time)}
                        className="absolute top-1/2 -translate-y-1/2 group"
                        style={{ left: `${(highlight.time / audioDuration) * 100}%` }}
                      >
                        <div className="relative">
                          <div className="w-3 h-3 rounded-full bg-white/20 group-hover:bg-amber-400 transition-colors" />
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs bg-black/80 px-2 py-1 rounded">
                            {highlight.emoji} {highlight.title}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleAudio}
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg"
                      >
                        {audioPlaying ? <Pause size={24} /> : <Play size={24} />}
                      </motion.button>
                      <div className="text-sm text-stone-400">
                        {Math.floor(audioTime / 60)}:{Math.floor(audioTime % 60).toString().padStart(2, '0')}
                        <span className="mx-2">/</span>
                        {Math.floor(audioDuration / 60)}:{Math.floor(audioDuration % 60).toString().padStart(2, '0')}
                      </div>
                    </div>
                    
                    {/* Current Highlight Display */}
                    <AnimatePresence>
                      {currentHighlight && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-black/50 px-4 py-2 rounded-full border border-amber-500/30 flex items-center gap-2"
                        >
                          <Clock size={14} />
                          <span className="text-sm">{currentHighlight.emoji} {currentHighlight.title}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Highlights List */}
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-2">
                      <Sparkles size={14} /> Timeline Moments
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {audioHighlights.map((highlight, i) => (
                        <button
                          key={i}
                          onClick={() => jumpToHighlight(highlight.time)}
                          className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm flex items-center gap-2"
                        >
                          <span>{highlight.emoji}</span>
                          <span>{highlight.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Side Quote */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />
              <blockquote className="pl-8 py-8">
                <div className="text-6xl font-serif text-amber-500/20 mb-4">"</div>
                <p className="text-stone-300/70 italic leading-relaxed text-lg mb-6">
                  Her words were not just sounds, but seeds planted in the hearts of those who listened. Each recording is a treasure, a moment preserved in time.
                </p>
                <div className="text-xs uppercase tracking-wider text-stone-500">
                  Family Memory
                </div>
              </blockquote>
            </motion.div>
          </div>
        </section>

        {/* SECTION II: CINEMATIC TRIBUTE */}
        <section className="min-h-screen flex items-center justify-center px-4 md:px-8 py-20">
          <div className="max-w-6xl w-full relative">
            {/* Film reel effect */}
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 hidden lg:block">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-40 h-40 border-2 border-white/10 rounded-full flex items-center justify-center"
              >
                <div className="w-32 h-32 border border-white/5 rounded-full" />
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              {/* Video Player with Cinematic Border */}
              <div className="relative aspect-video rounded-[3rem] overflow-hidden border-2 border-white/20 shadow-[0_0_100px_rgba(251,191,36,0.1)] group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10 blur-xl" />
                
                <video 
                  src="/tribute.mp4" 
                  controls 
                  className="w-full h-full object-cover relative z-10"
                  poster="/tate1.jpg"
                />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play size={32} className="text-white" />
                  </div>
                </div>
              </div>
              
              {/* Title Overlay */}
              <div className="absolute -bottom-6 right-8 bg-black/80 backdrop-blur-xl px-8 py-6 rounded-2xl border border-white/10">
                <h2 className="text-4xl font-serif italic text-white mb-2">Life in Motion</h2>
                <p className="text-stone-400 text-sm max-w-md italic">
                  "Our memories are not static photos, but moving moments of love. This film captures the essence of her spirit."
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION III: INTERACTIVE FEATURES */}
        <section className="min-h-screen flex items-center justify-center px-4 md:px-8 py-20">
          <div className="max-w-6xl w-full space-y-16">
            
            {/* Gallery Entrance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              onClick={() => setShowGallery(true)}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className="relative group cursor-pointer"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              
              <div className="relative bg-gradient-to-br from-stone-900/50 to-black/50 backdrop-blur-2xl rounded-[3rem] overflow-hidden border border-white/10 p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-white/5">
                        <ImageIcon size={28} className="text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-serif italic text-white">Visual Archives</h3>
                        <p className="text-stone-400 text-sm uppercase tracking-wider mt-1">The Family Album</p>
                      </div>
                    </div>
                    <p className="text-stone-300/80 leading-relaxed">
                      Step into a curated collection of moments that tell the story of a life well-lived. Each image is a window into cherished memories.
                    </p>
                    <div className="flex items-center gap-3 text-amber-400">
                      <ArrowRight size={20} />
                      <span className="text-sm font-medium">Enter the Gallery</span>
                    </div>
                  </div>
                  
                  {/* Image Grid Preview */}
                  <div className="grid grid-cols-3 gap-4">
                    {galleryImages.slice(0, 4).map((src, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className={`aspect-square rounded-2xl overflow-hidden ${
                          i === 0 ? 'col-span-2 row-span-2' : ''
                        }`}
                      >
                        <img 
                          src={src} 
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Candle Feature */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Eternal Flame */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/5 backdrop-blur-3xl p-12 rounded-[3rem] border border-amber-500/20 relative overflow-hidden">
                  
                  {/* Animated flame particles */}
                  {showCandleEffect && [...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        y: 0, 
                        x: Math.random() * 40 - 20,
                        opacity: 1,
                        scale: 0
                      }}
                      animate={{ 
                        y: -100,
                        opacity: 0,
                        scale: 1
                      }}
                      transition={{ 
                        duration: 1.5,
                        delay: i * 0.02
                      }}
                      className="absolute bottom-12 left-1/2 w-1 h-4 bg-gradient-to-t from-amber-400 to-transparent rounded-full"
                    />
                  ))}
                  
                  <div className="text-center space-y-8">
                    <div className="relative inline-block">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={addCandle}
                        className="relative group"
                      >
                        {/* Candle glow */}
                        <motion.div
                          animate={{
                            boxShadow: [
                              "0 0 30px rgba(251,191,36,0.5)",
                              "0 0 60px rgba(251,191,36,0.7)",
                              "0 0 30px rgba(251,191,36,0.5)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full blur-xl"
                        />
                        
                        {/* Candle button */}
                        <div className="relative w-24 h-24 rounded-full bg-gradient-to-b from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl">
                          <Flame fill="white" size={36} />
                        </div>
                      </motion.button>
                      
                      {/* Floating counter */}
                      <motion.div
                        initial={{ y: 0, opacity: 0 }}
                        animate={{ y: -20, opacity: 1 }}
                        transition={{ 
                          y: { repeat: Infinity, duration: 2, repeatType: "reverse" }
                        }}
                        className="absolute -top-8 left-1/2 -translate-x-1/2 text-amber-300 font-bold text-xl"
                      >
                        +{candles}
                      </motion.div>
                    </div>
                    
                    <div>
                      <h3 className="text-3xl font-serif italic text-white mb-2">Light a Candle</h3>
                      <p className="text-stone-400 mb-6">Join others in remembrance</p>
                      
                      {/* Recent candles */}
                      <div className="space-y-3 max-w-xs mx-auto">
                        {candleMessages.map((msg, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-sm bg-white/5 px-4 py-2 rounded-full flex items-center gap-2"
                          >
                            <div className="w-2 h-2 rounded-full bg-amber-400" />
                            <span className="text-stone-300">{msg}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Memory Wall */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-black/30 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10"
              >
                <h4 className="text-xl font-serif italic text-white mb-6 flex items-center gap-3">
                  <BookOpen size={20} /> Shared Memories
                </h4>
                <div className="space-y-4">
                  {[
                    "Her laughter could light up the darkest room",
                    "Always had a story for every occasion",
                    "Taught me the meaning of unconditional love",
                    "Her recipes are still our family treasure"
                  ].map((memory, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-amber-500/20 transition-colors"
                    >
                      <p className="text-stone-300 italic">{memory}</p>
                      <div className="text-xs text-stone-500 mt-2">— Family member</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* ENHANCED GALLERY OVERLAY */}
      <AnimatePresence>
        {showGallery && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl"
          >
            <div className="h-full overflow-y-auto">
              <div className="max-w-7xl mx-auto p-4 md:p-8">
                {/* Gallery Header */}
                <motion.header 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl p-6 rounded-2xl mb-8 border-b border-white/10"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-2">The Family Album</h2>
                      <p className="text-stone-400">A visual journey through cherished moments</p>
                    </div>
                    <button 
                      onClick={() => setShowGallery(false)}
                      className="p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all group"
                    >
                      <X size={24} className="group-hover:rotate-90 transition-transform" />
                    </button>
                  </div>
                  
                  {/* Gallery Stats */}
                  <div className="flex gap-8 mt-6 text-sm">
                    <div className="text-stone-400">
                      <span className="text-white font-bold">{galleryImages.length}</span> moments
                    </div>
                    <div className="text-stone-400">
                      <span className="text-white font-bold">{candles}</span> candles lit
                    </div>
                  </div>
                </motion.header>
                
                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                  {galleryImages.map((src, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1, transition: { delay: i * 0.05 } }}
                      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                      className="group relative cursor-pointer"
                    >
                      <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-stone-800 to-black">
                        <img 
                          src={src} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                      </div>
                      
                      {/* Overlay Info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                        <div className="text-white font-medium">
                          Memory #{i + 1}
                        </div>
                        <div className="text-stone-300 text-sm mt-2">
                          {["1985", "1992", "2001", "2008", "2015", "2020"][i]} • Family Archive
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="py-16 text-center relative overflow-hidden">
        {/* Subtle gradient line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-6xl font-serif text-amber-500/10 mb-4"
          >
            Tate
          </motion.div>
          <div className="text-[10px] tracking-[0.5em] uppercase text-stone-500 font-light">
            Forever in Our Hearts • 2026
          </div>
          <div className="mt-8 text-stone-600 text-sm max-w-md mx-auto">
            This memorial website was created with love to honor and celebrate a beautiful life
          </div>
        </div>
      </footer>
    </div>
  );
}