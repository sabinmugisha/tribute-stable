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
  Flame,
  AlertCircle,
  Shield,
  History,
  Mic,
  Mic2,
  Calendar,
  MapPin,
  Quote
} from 'lucide-react';

const slides = ["/tate1.jpg", "/tate2.jpg", "/tate3.jpg"];
const galleryImages = ["/g1.jpg", "/g2.jpg", "/g3.jpg", "/g4.jpg", "/g5.jpg", "/g6.jpg"];

// Voice stories with detailed metadata
const voiceStories = [
  {
    id: 1,
    title: "Hospital Story",
    subtitle: "A Moment of Healing",
    description: "In the quiet corridors of the hospital, she found strength not just for herself, but for everyone around her.",
    audio: "/Hospital story.mp3",
    duration: "3:45",
    year: "1998",
    location: "Kigali Central Hospital",
    icon: <Heart className="text-rose-500" size={20} />,
    color: "rose",
    quotes: [
      "Even in pain, she never stopped caring for others",
      "Her resilience became a source of hope for the medical staff"
    ]
  },
  {
    id: 2,
    title: "Genocide Against Tutsi",
    subtitle: "The Danger of Jali",
    description: "During the darkest days, she witnessed unimaginable courage and the extreme dangers faced by those who risked everything to protect others.",
    audio: "/Genocide story.mp3",
    duration: "4:20",
    year: "1994",
    location: "Jali, Rwanda",
    icon: <Shield className="text-amber-500" size={20} />,
    color: "amber",
    quotes: [
      "Jali was a place of both immense danger and incredible courage",
      "She spoke of neighbors becoming protectors in the face of evil"
    ]
  }
];

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [index, setIndex] = useState(0);
  const [candles, setCandles] = useState(124);
  const [showGallery, setShowGallery] = useState(false);
  const [activeVoice, setActiveVoice] = useState(1);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioTime, setAudioTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentVoice, setCurrentVoice] = useState(voiceStories[0]);
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

  // Enhanced gate animations
  const [gateProgress, setGateProgress] = useState(0);
  
  useEffect(() => {
    if (!hasEntered) {
      const interval = setInterval(() => {
        setGateProgress(prev => {
          if (prev >= 100) return 0;
          return prev + 0.5;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [hasEntered]);

  // Enhanced slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500 + Math.random() * 2000);
    return () => clearInterval(timer);
  }, []);

  // Audio player functionality
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleMetadata = () => {
      setAudioDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setAudioTime(audio.currentTime);
    };

    audio.addEventListener('loadedmetadata', handleMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', handleMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const toggleAudio = () => {
    if (audioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setAudioPlaying(!audioPlaying);
  };

  const selectVoice = (voiceId) => {
    setActiveVoice(voiceId);
    const voice = voiceStories.find(v => v.id === voiceId);
    setCurrentVoice(voice);
    
    // Reset audio
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioPlaying(false);
      setAudioTime(0);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
      
      {/* ENHANCED CINEMATIC ENTRANCE */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { 
                duration: 2,
                ease: "easeInOut"
              }
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
          >
            {/* Animated gate background */}
            <motion.div 
              animate={{ 
                scale: [1, 1.02, 1],
                opacity: [0.7, 0.9, 0.7]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity
              }}
              className="absolute inset-0 bg-gradient-to-br from-stone-900 via-black to-stone-800"
              style={{ 
                backgroundImage: `url('/gate.jpg')`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black/80" />
              
              {/* Animated gate bars */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: '-100%' }}
                    animate={{ y: gateProgress + '%' }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"
                    style={{ top: `${(i + 1) * 12}%` }}
                  />
                ))}
              </div>
            </motion.div>
            
            {/* Central portal with enhanced interactivity */}
            <motion.div 
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                rotate: { duration: 10, repeat: Infinity },
                scale: { duration: 4, repeat: Infinity }
              }}
              className="relative z-10"
            >
              <motion.button 
                onClick={() => setHasEntered(true)}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex flex-col items-center gap-8"
              >
                {/* Glowing rings */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute w-40 h-40 rounded-full border-2 border-amber-500/30"
                />
                
                <motion.div 
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                  className="relative"
                >
                  <div className="w-28 h-28 rounded-full border-2 border-white/20 flex items-center justify-center backdrop-blur-xl bg-black/40 group-hover:bg-black/60 transition-all duration-500">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                      <Unlock className="text-amber-300" size={36} />
                    </motion.div>
                  </div>
                  
                  {/* Rotating particles around the lock */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        rotate: 360,
                        x: 56 * Math.cos((i * Math.PI) / 4),
                        y: 56 * Math.sin((i * Math.PI) / 4)
                      }}
                      transition={{
                        rotate: { duration: 15 + i, repeat: Infinity, ease: "linear" },
                        x: { duration: 15 + i, repeat: Infinity, ease: "linear" },
                        y: { duration: 15 + i, repeat: Infinity, ease: "linear" }
                      }}
                      className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-amber-400/50"
                    />
                  ))}
                </motion.div>
                
                <div className="text-center space-y-2">
                  <span className="block text-xs tracking-[0.6em] uppercase text-white/60 font-light mb-2">
                    Enter Memorial
                  </span>
                  <span className="block text-3xl font-serif italic text-white tracking-wider bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                    Tate's Legacy
                  </span>
                  <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-6"
                  >
                    <ArrowRight className="mx-auto text-amber-300/70" size={20} />
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mt-2">Click to Enter</p>
                  </motion.div>
                </div>
              </motion.button>
            </motion.div>
            
            {/* Floating historical elements */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    y: '100vh',
                    x: Math.random() * 100 - 50 + 'vw',
                    opacity: 0
                  }}
                  animate={{ 
                    y: '-100vh',
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{ 
                    duration: 15 + Math.random() * 10,
                    delay: i * 1.5,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 10
                  }}
                  className="absolute text-white/10"
                  style={{
                    fontSize: `${Math.random() * 24 + 12}px`,
                    left: `${Math.random() * 100}%`
                  }}
                >
                  {['♥', '✿', '✧', '✦', '❀', '✶'][i % 6]}
                </motion.div>
              ))}
            </div>
            
            {/* Progress indicator */}
            <motion.div 
              className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-1 bg-white/10 rounded-full overflow-hidden"
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
                initial={{ width: '0%' }}
                animate={{ width: gateProgress + '%' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DYNAMIC BACKGROUND */}
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
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10">
        
        {/* ENHANCED VOICE SECTION */}
        <section className="min-h-screen flex items-center justify-center px-4 md:px-8 py-20">
          <div className="max-w-7xl w-full">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 rounded-full border-2 border-amber-500/20"
                  />
                  <Mic2 className="text-amber-400" size={32} />
                </div>
                <h2 className="text-5xl lg:text-7xl font-serif italic text-white">
                  Her <span className="text-amber-300">Voice</span>
                </h2>
              </div>
              <p className="text-stone-400 text-lg max-w-3xl mx-auto italic">
                "The stories she carried were not just memories, but lessons of resilience, courage, and humanity. 
                Listen to the echoes of her experiences."
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Left Panel: Story Selector */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-serif italic text-white flex items-center gap-3">
                  <History size={24} /> Historical Accounts
                </h3>
                
                {voiceStories.map((story) => (
                  <motion.button
                    key={story.id}
                    onClick={() => selectVoice(story.id)}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-6 rounded-2xl text-left transition-all duration-300 ${
                      activeVoice === story.id
                        ? `bg-gradient-to-r from-${story.color}-500/20 to-${story.color}-600/10 border-2 border-${story.color}-500/30`
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-${story.color}-500/10`}>
                        {story.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xl font-serif italic text-white">
                            {story.title}
                          </h4>
                          <span className={`text-xs px-2 py-1 rounded-full bg-${story.color}-500/20 text-${story.color}-300`}>
                            {story.duration}
                          </span>
                        </div>
                        <p className="text-stone-400 text-sm mb-3">
                          {story.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-stone-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} /> {story.year}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> {story.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
                
                {/* Context Panel */}
                <div className="mt-8 p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10">
                  <h4 className="text-lg font-serif italic text-white mb-4 flex items-center gap-2">
                    <Quote size={20} /> Context
                  </h4>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    These recordings preserve critical moments in both personal and national history. 
                    They serve as a bridge between generations, carrying forward the wisdom of lived experience.
                  </p>
                </div>
              </motion.div>

              {/* Center Panel: Enhanced Audio Player */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="lg:col-span-2"
              >
                <div className={`bg-gradient-to-br from-${currentVoice.color}-500/5 via-black/40 to-${currentVoice.color}-600/5 backdrop-blur-3xl rounded-3xl border-2 border-${currentVoice.color}-500/20 p-8 shadow-2xl`}>
                  {/* Current Story Header */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-3xl font-serif italic text-white">
                          {currentVoice.title}
                        </h3>
                        <p className="text-stone-400 mt-1">{currentVoice.subtitle}</p>
                      </div>
                      <div className={`px-4 py-2 rounded-full bg-${currentVoice.color}-500/20 text-${currentVoice.color}-300 text-sm flex items-center gap-2`}>
                        <AlertCircle size={16} /> Historical Recording
                      </div>
                    </div>
                    
                    {/* Timeline Bar */}
                    <div className="relative h-3 bg-white/10 rounded-full overflow-hidden mb-4">
                      <motion.div 
                        className={`absolute h-full bg-gradient-to-r from-${currentVoice.color}-500 to-${currentVoice.color}-600`}
                        style={{ width: `${(audioTime / audioDuration) * 100 || 0}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-stone-400">
                      <span>{formatTime(audioTime)}</span>
                      <span>{formatTime(audioDuration)}</span>
                    </div>
                  </div>
                  
                  {/* Audio Controls */}
                  <div className="flex items-center justify-center gap-8 mb-8">
                    <audio 
                      ref={audioRef} 
                      src={currentVoice.audio}
                      className="hidden"
                      onEnded={() => setAudioPlaying(false)}
                    />
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleAudio}
                      className={`w-20 h-20 rounded-full bg-gradient-to-br from-${currentVoice.color}-500 to-${currentVoice.color}-600 flex items-center justify-center shadow-2xl relative`}
                    >
                      {/* Glowing effect */}
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full blur-xl bg-current"
                      />
                      
                      {audioPlaying ? (
                        <Pause className="text-white" size={28} />
                      ) : (
                        <Play className="text-white ml-1" size={28} />
                      )}
                    </motion.button>
                    
                    <div className="flex-1 max-w-md">
                      <p className="text-stone-300 italic mb-4">
                        {activeVoice === 2 
                          ? "Speaking about the extreme dangers faced in Jali during the Genocide Against Tutsi"
                          : "Reflecting on moments of healing and humanity in difficult times"
                        }
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                          Recorded: {currentVoice.year}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                          Location: {currentVoice.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Key Quotes */}
                  <div className="border-t border-white/10 pt-8">
                    <h4 className="text-xl font-serif italic text-white mb-6 flex items-center gap-3">
                      <Quote className={`text-${currentVoice.color}-400`} /> Key Insights
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentVoice.quotes.map((quote, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`p-4 rounded-xl bg-${currentVoice.color}-500/10 border border-${currentVoice.color}-500/20`}
                        >
                          <p className="text-stone-200 italic">"{quote}"</p>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Special Context for Genocide Story */}
                    {activeVoice === 2 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 p-4 rounded-xl bg-amber-900/20 border border-amber-700/30"
                      >
                        <div className="flex items-start gap-3">
                          <Shield className="text-amber-400 mt-1" size={20} />
                          <div>
                            <h5 className="text-amber-300 font-medium mb-2">
                              Historical Context: Jali During Genocide
                            </h5>
                            <p className="text-stone-300 text-sm">
                              Jali was one of the most dangerous areas during the Genocide Against Tutsi. 
                              Despite immense risks, some individuals showed extraordinary courage, 
                              demonstrating humanity in the face of unimaginable darkness.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="flex justify-center mt-8 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                      className={`w-2 h-2 rounded-full bg-${currentVoice.color}-400`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
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