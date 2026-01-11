import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { db } from './firebase';
import { ref, onDisconnect, set, serverTimestamp } from "firebase/database";

// Components
import Navbar from './components/navbar';
import Footer from './components/footer';
import PrivacyLayer from './components/PrivacyLayer';

// Pages
import Home from './pages/home';
import Gallery from './pages/gallery';
import Guestbook from './pages/guestbook';
import Admin from './pages/admin';

export default function App() {
  
  useEffect(() => {
    // --- REAL-TIME ACTIVE USER TRACKING (Presence System) ---
    // This connects to Firebase to show "Active Now" in your Admin Dashboard
    const sessionId = Math.random().toString(36).substr(2, 9);
    const userStatusRef = ref(db, `status/active_users/${sessionId}`);

    // Set this browser session as "Active"
    set(userStatusRef, {
      active: true,
      lastSeen: serverTimestamp(),
    });

    // When the user closes the tab or window, Firebase deletes this session automatically
    onDisconnect(userStatusRef).remove();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] text-stone-200 select-none relative">
        {/* GLOBAL NAVIGATION */}
        <Navbar />
        
        {/* THE ENTRANCE GATE (Privacy / Cookie Consent)
            This is placed here so it overlays EVERY page (Home, Gallery, Guestbook) 
            until the user clicks "Accept". */}
        <PrivacyLayer /> 

        {/* WEBSITE ROUTES */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/guestbook" element={<Guestbook />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        
        {/* GLOBAL FOOTER */}
        <Footer />
      </div>
    </Router>
  );
}