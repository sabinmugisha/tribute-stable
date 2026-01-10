import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';
import Gallery from './pages/gallery';
import Guestbook from './pages/Guestbook';


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] text-stone-200 select-none">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/guestbook" element={<Guestbook />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}