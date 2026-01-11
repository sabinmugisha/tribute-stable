import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { ref, onValue, remove } from "firebase/database";
import { Users, Activity, MessageSquare, Heart, ShieldCheck, Trash2, Globe } from 'lucide-react';
import { Tooltip, ResponsiveContainer, AreaChart, Area, XAxis } from 'recharts';

export default function Admin() {
  // Stable Auth Initialization
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isAdmin') === 'true';
  });
  
  const [password, setPassword] = useState('');
  const [stats, setStats] = useState({ active: 0, totalViews: 0, messages: 0, likes: 0 });
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) return;

    // Connect to Firebase
    const activeRef = ref(db, 'status/active_users');
    const viewsRef = ref(db, 'stats/views');
    const msgsRef = ref(db, 'messages');

    // FIXED: Correct way to count children in Firebase Realtime DB
    const unsubActive = onValue(activeRef, (snap) => {
      const data = snap.val();
      const count = data ? Object.keys(data).length : 0;
      setStats(s => ({ ...s, active: count }));
    });

    const unsubViews = onValue(viewsRef, (snap) => {
      setStats(s => ({ ...s, totalViews: snap.val() || 0 }));
    });

    const unsubMsgs = onValue(msgsRef, (snap) => {
      const data = snap.val() || {};
      const msgs = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      const totalLikes = msgs.reduce((sum, m) => sum + (m.likes || 0), 0);
      setStats(s => ({ ...s, messages: msgs.length, likes: totalLikes }));
      setRecentMessages(msgs.reverse().slice(0, 5));
    });

    return () => { unsubActive(); unsubViews(); unsubMsgs(); };
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'grandma2026') {
      sessionStorage.setItem('isAdmin', 'true');
      setIsLoggedIn(true);
    } else {
      alert('Access Denied');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md bg-stone-900/40 p-10 rounded-[2.5rem] border border-white/5 text-center backdrop-blur-xl">
          <ShieldCheck className="mx-auto mb-6 text-amber-500" size={44} />
          <h2 className="text-2xl font-serif text-white mb-2 italic">Admin Portal</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 text-white text-center"
            />
            <button className="w-full py-4 bg-amber-600 rounded-full font-bold uppercase text-[10px] tracking-widest text-white">
              Unlock Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#060606] text-stone-300 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
            <h1 className="text-3xl font-serif italic text-white">Command Center</h1>
            <button onClick={() => {sessionStorage.clear(); setIsLoggedIn(false);}} className="px-6 py-2 bg-white/5 rounded-full text-[10px] uppercase tracking-widest">Sign Out</button>
        </header>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <MetricCard icon={<Activity size={18}/>} color="text-green-500" label="Active Users" value={stats.active} />
          <MetricCard icon={<Globe size={18}/>} color="text-blue-500" label="Total Views" value={stats.totalViews} />
          <MetricCard icon={<MessageSquare size={18}/>} color="text-amber-500" label="Memories" value={stats.messages} />
          <MetricCard icon={<Heart size={18}/>} color="text-rose-500" label="Total Likes" value={stats.likes} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-stone-900/20 border border-white/5 p-8 rounded-[3rem] min-h-[400px]">
            <h3 className="text-white font-serif italic mb-10">Traffic Overview</h3>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[{x:'Start', v:0}, {x:'Mid', v:stats.totalViews/2}, {x:'Now', v:stats.totalViews}]}>
                    <Tooltip contentStyle={{backgroundColor: '#1c1917', border: 'none', borderRadius: '15px'}} />
                    <Area type="monotone" dataKey="v" stroke="#d97706" fill="#d97706" fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
                </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-stone-900/20 border border-white/5 p-8 rounded-[3rem]">
            <h3 className="text-white font-serif italic mb-8">Latest Entries</h3>
            <div className="space-y-4">
              {recentMessages.map(m => (
                <div key={m.id} className="p-4 bg-white/[0.03] rounded-2xl border border-white/5 flex justify-between items-center">
                  <div className="truncate pr-2">
                    <p className="text-white text-[11px] font-bold">{m.name}</p>
                    <p className="text-stone-500 text-[10px] truncate">{m.message}</p>
                  </div>
                  <button onClick={() => remove(ref(db, `messages/${m.id}`))} className="text-stone-700 hover:text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, color }) {
  return (
    <div className="bg-stone-900/30 border border-white/5 p-8 rounded-[2.5rem]">
      <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-6 ${color}`}>{icon}</div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-1">{label}</p>
      <p className="text-3xl font-light text-white">{value}</p>
    </div>
  );
}