import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { db } from './firebase';
import { ref, onDisconnect, set, serverTimestamp } from "firebase/database";

// Components
import Navbar from './components/navbar';
import Footer from './components/footer';
import PrivacyLayer from './components/PrivacyLayer'; // Renamed from CookieBanner to bypass ad-blockers

// Pages
import Home from './pages/home';
import Gallery from './pages/gallery';
import Guestbook from './pages/guestbook';
import Admin from './pages/admin';

export default function App() {
  
  useEffect(() => {
    // --- REAL-TIME ACTIVE USER TRACKING (Presence System) ---
    // Generates a unique ID for this specific visitor session
    const sessionId = Math.random().toString(36).substr(2, 9);
    const userStatusRef = ref(db, `status/active_users/${sessionId}`);

    // Mark this session as active in Firebase
    set(userStatusRef, {
      active: true,
      lastSeen: serverTimestamp(),
    });

    // When the user closes the tab or leaves the site, 
    // Firebase will automatically delete this entry
    onDisconnect(userStatusRef).remove();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] text-stone-200 select-none relative">
        <Navbar />
        
        {/* The Privacy Popup (Cookie Consent) */}
        <PrivacyLayer /> 

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/guestbook" element={<Guestbook />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}