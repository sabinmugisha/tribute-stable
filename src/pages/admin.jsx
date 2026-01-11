import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Set your secret password here
    if (password === 'grandma2026') { 
      sessionStorage.setItem('isAdmin', 'true');
      navigate('/guestbook');
    } else {
      alert('Incorrect Password');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-stone-900/50 border border-white/10 p-10 rounded-[2.5rem] text-center">
        <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="text-amber-500" size={28} />
        </div>
        <h1 className="text-2xl font-serif italic text-white mb-2">Admin Portal</h1>
        <p className="text-stone-500 text-sm mb-8">Enter password to manage memories</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" 
            placeholder="Secret Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-amber-500/50 text-center"
          />
          <button type="submit" className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full transition-all flex items-center justify-center gap-2">
            Unlock Panel <ShieldCheck size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}