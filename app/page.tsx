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

// --- 1. TypeScript Interfaces (Isse Error Fix Hoga) ---
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

// --- 2. Components with Proper Typing ---
const GlassCard = ({ children, className }: GlassCardProps) => (
  <div className={`backdrop-blur-2xl bg-white/40 border border-white/60 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] ${className}`}>
    {children}
  </div>
);

const MapModal = ({ isOpen, onClose, address, gmapsUrl }: MapModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl h-[80vh] bg-white rounded-3xl p-1 relative overflow-hidden flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white rounded-full z-[10] text-zinc-900 shadow-lg hover:bg-orange-600 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <iframe
              className="flex-grow rounded-2xl w-full"
              frameBorder="0"
              scrolling="no"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=B&output=embed`}
            ></iframe>

            <div className="p-4 text-center">
              <a 
                 href={gmapsUrl}
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="bg-orange-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest inline-flex items-center gap-2"
              >
                  <MapPin size={16} />
                  Find on Google Maps
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
          <div className="text-xl md:text-2xl font-black italic tracking-tighter text-orange-600 uppercase">
            PIZZA BROS.
          </div>
          
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
            <a href="#menu" className="hover:text-orange-600 transition-colors">Menu</a>
            <a href="#about" className="hover:text-orange-600 transition-colors">About</a>
            <button onClick={onLocationClick} className="hover:text-orange-600 transition-colors text-left font-black uppercase tracking-[0.2em]">Location</button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onOrderClick()}
              className="bg-orange-600 text-white px-5 md:px-8 py-2 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-orange-500 transition-all shadow-md"
            >
              Order Now
            </button>
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
  const [showAuraMessage, setShowAuraMessage] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  const whatsappNumber = "919876543210"; 
  const pizzaBrothersAddress = "Pizza Brothers, Minal Residency, Sector E Phase 6, Bhopal, MP";
  const pizzaBrothersGmapsUrl = "https://goo.gl/maps/PizzaBrosBhopal"; 

  const handleWhatsAppOrder = (itemName = "") => {
    const message = itemName 
      ? `Hi Pizza Brothers, I would like to order: *${itemName}*.` 
      : `Hi Pizza Brothers, I would like to place an order.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-orange-200 overflow-x-hidden font-sans pt-32">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-200/40 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-yellow-100/50 blur-[100px] rounded-full" />
      </div>

      <Navbar onOrderClick={handleWhatsAppOrder} onLocationClick={() => setShowMapModal(true)} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pb-10 z-10">
        <div className="max-w-4xl w-full px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-7xl md:text-9xl font-black mb-4 tracking-tighter leading-none italic uppercase text-zinc-900">
              Pizza <span className="text-orange-600">Brothers</span>
            </h1>
            <p className="text-zinc-500 text-lg md:text-xl font-bold mb-12 uppercase tracking-[0.3em]">“Better than your cravings.”</p>

            <motion.div
              animate={{ y: [0, -20, 0], rotate: 360 }}
              transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 60, repeat: Infinity, ease: "linear" } }}
              className="relative w-72 h-72 md:w-[420px] md:h-[420px] mx-auto mb-12 drop-shadow-[0_35px_55px_rgba(234,88,12,0.3)]"
            >
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-[12px] border-white shadow-xl overflow-hidden relative">
                <img src="/hero-pizza.png" alt="Hero Pizza" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <button onClick={scrollToMenu} className="bg-orange-600 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-xl uppercase tracking-tighter hover:scale-105 transition-all">
              Explore Menu
            </button>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 text-5xl font-black italic uppercase tracking-tighter">
            <h2>Popular Picks</h2>
            <div className="w-24 h-2 bg-orange-600 mx-auto rounded-full mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: "Loaded Cheese", desc: "Extra cheese, extra love.", price: "₹249", img: "/loaded-cheese.jpg" },
              { name: "Tikki Burger", desc: "Crispy patty, fresh bun.", price: "₹89", img: "/tikki-burger.jpg" },
              { name: "Cold Coffee", desc: "Creamy & refreshing.", price: "₹99", img: "/cold-coffee.jpg" }
            ].map((item, i) => (
              <GlassCard key={i} className="p-10 text-center group hover:bg-white/60 transition-all flex flex-col items-center">
                <div className="w-44 h-44 rounded-[2rem] border-4 border-white shadow-lg mb-8 overflow-hidden relative flex items-center justify-center">
                  <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-2">{item.name}</h3>
                <p className="text-zinc-400 text-xs mb-4 font-medium uppercase tracking-widest">{item.desc}</p>
                <div className="text-orange-600 font-black text-xl mb-8">{item.price}</div>
                <button onClick={() => handleWhatsAppOrder(item.name)} className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-black hover:bg-orange-600 transition-all uppercase text-xs tracking-widest">Add to Cart</button>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 text-center border-t border-zinc-200 bg-white/30 relative z-10 font-black italic uppercase">
        <p className="text-6xl text-zinc-200 tracking-[1.5rem]">Artdoesit</p>
      </footer>

      {/* Aura AI */}
      <div className="fixed bottom-8 left-8 z-[100] flex items-end gap-4 cursor-pointer" onMouseEnter={() => setShowAuraMessage(true)} onMouseLeave={() => setShowAuraMessage(false)}>
        <motion.div animate={{ y: [0, -5, 0] }} className="w-14 h-14 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-700 shadow-2xl">
          <Sparkles className="text-orange-400" size={24} />
        </motion.div>
        {showAuraMessage && <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-white shadow-xl text-xs font-black uppercase">Hi, I'm Aura AI</div>}
      </div>

      <MapModal isOpen={showMapModal} onClose={() => setShowMapModal(false)} address={pizzaBrothersAddress} gmapsUrl={pizzaBrothersGmapsUrl} />

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { background-color: #fafafa; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
      `}</style>
    </main>
  );
}