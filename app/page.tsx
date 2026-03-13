"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Menu as MenuIcon, 
  X, 
  Sparkles,
  Search 
} from "lucide-react";

// --- TypeScript Types ---
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
  gmapsUrl: string;
}

interface NavbarProps {
  onOrderClick: (itemName?: string) => void;
  onLocationClick: () => void;
}

const GlassCard = ({ children, className }: GlassCardProps) => (
  <div className={`backdrop-blur-2xl bg-white/40 border border-white/60 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] ${className}`}>
    {children}
  </div>
);

const MapModal = ({ isOpen, onClose, address, gmapsUrl }: MapModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" onClick={onClose}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-5xl h-[80vh] bg-white rounded-3xl p-1 relative overflow-hidden flex flex-col">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white rounded-full z-[10] text-zinc-900 shadow-lg hover:bg-orange-600 hover:text-white transition-colors"><X size={20} /></button>
          <iframe className="flex-grow rounded-2xl w-full" src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=B&output=embed`}></iframe>
          <div className="p-4 text-center">
            <a href={gmapsUrl} target="_blank" rel="noopener noreferrer" className="bg-orange-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest inline-flex items-center gap-2">
              <MapPin size={16} /> Find on Google Maps
            </a>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Navbar = ({ onOrderClick, onLocationClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "py-2" : "py-4 md:py-6"}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="backdrop-blur-xl bg-white/60 border border-white/80 rounded-full px-6 md:px-10 py-4 flex justify-between items-center shadow-lg">
          <div className="text-xl md:text-2xl font-black italic tracking-tighter text-orange-600 uppercase">PIZZA BROS.</div>
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
            <a href="#menu" className="hover:text-orange-600 transition-colors">Menu</a>
            <a href="#about" className="hover:text-orange-600 transition-colors">About</a>
            <button onClick={onLocationClick} className="hover:text-orange-600 transition-colors font-black uppercase tracking-[0.2em]">Location</button>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onOrderClick()} className="bg-orange-600 text-white px-5 md:px-8 py-2 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-orange-500 shadow-md">Order Now</button>
            <button className="md:hidden text-zinc-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function Home() {
  const [showAura, setShowAura] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const whatsappNumber = "919876543210"; 
  const address = "Pizza Brothers, Minal Residency, Bhopal";

  const handleOrder = (item = "") => {
    const msg = item ? `Hi, I want to order ${item}` : "Hi, I want to place an order";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 overflow-x-hidden font-sans pt-32">
      <Navbar onOrderClick={handleOrder} onLocationClick={() => setShowMap(true)} />
      
      {/* Hero */}
      <section className="text-center px-6">
        <h1 className="text-7xl md:text-9xl font-black italic uppercase">Pizza <span className="text-orange-600">Brothers</span></h1>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="w-72 h-72 md:w-[400px] md:h-[400px] mx-auto my-12 shadow-2xl rounded-full border-[12px] border-white overflow-hidden">
          <img src="/hero-pizza.png" alt="Pizza" className="w-full h-full object-cover" />
        </motion.div>
        <button onClick={() => document.getElementById('menu')?.scrollIntoView({behavior:'smooth'})} className="bg-orange-600 text-white px-12 py-5 rounded-2xl font-black text-lg uppercase shadow-xl hover:scale-105 transition-all">Explore Menu</button>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-32 px-6 max-w-6xl mx-auto">
        <h2 className="text-5xl font-black italic text-center mb-20 uppercase">Popular Picks</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[{name:"Loaded Cheese", price:"₹249", img:"/loaded-cheese.jpg"}, {name:"Tikki Burger", price:"₹89", img:"/tikki-burger.jpg"}, {name:"Cold Coffee", price:"₹99", img:"/cold-coffee.jpg"}].map((item, i) => (
            <GlassCard key={i} className="p-10 text-center flex flex-col items-center group">
              <div className="w-40 h-40 mb-8 rounded-3xl overflow-hidden border-4 border-white shadow-md">
                <img src={item.img} alt={item.name} className="w-full h-full object-contain p-2 group-hover:scale-110 transition-all" />
              </div>
              <h3 className="text-2xl font-black uppercase mb-2">{item.name}</h3>
              <div className="text-orange-600 font-black text-xl mb-8">{item.price}</div>
              <button onClick={() => handleOrder(item.name)} className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-black uppercase text-xs">Add to Cart</button>
            </GlassCard>
          ))}
        </div>
      </section>

      <footer className="py-20 text-center border-t bg-white/30">
        <p className="text-6xl text-zinc-200 font-black italic uppercase tracking-[1.5rem]">Artdoesit</p>
      </footer>

      <MapModal isOpen={showMap} onClose={() => setShowMap(false)} address={address} gmapsUrl="#" />
      
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { background-color: #fafafa; }
      `}</style>
    </main>
  );
}