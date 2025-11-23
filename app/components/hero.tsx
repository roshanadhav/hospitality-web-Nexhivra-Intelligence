"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const menuItems = [
    "Projects",
    "Expertise",
    "Practice",
    "Studios",
    "Specialists",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* ------------------ MINIMAL GOLD LINE LUXURY LOADER ------------------ */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="fixed inset-0 bg-black z-[999] flex flex-col items-center justify-center"
          >
            {/* Gold Thin Line Loader */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{
                duration: 1.6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="h-[2px] bg-[#d4af37] rounded-full shadow-[0_0_18px_#d4af37]"
            />

            {/* Subtle Fade Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.2,
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="mt-6 text-[#d4af37] tracking-[0.25em] text-sm sm:text-base"
            >
              LOADING LUXURY
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* -------------------------------------------------------------- */}

      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover object-center"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/luxury.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* NAVBAR */}
      <nav className="absolute top-0 left-0 w-full z-30">
        <div className="flex justify-between items-center px-6 md:px-14 py-6 md:py-8">
          <h1 className="text-white text-2xl md:text-3xl tracking-[0.35em] font-light">
            ROYAL 
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-12 lg:gap-16 text-white tracking-[0.25em] text-xs lg:text-sm font-light">
            {menuItems.map((item) => (
              <li
                key={item}
                className="relative group cursor-pointer transition"
              >
                {item}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-white/70 group-hover:w-full transition-all duration-300"></span>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-4xl leading-none"
            onClick={() => setMenuOpen(true)}
          >
            <div className="w-9 h-9 flex flex-col justify-center items-center gap-[5px]">
              <span className="w-7 h-[2px] bg-white"></span>
              <span className="w-7 h-[2px] bg-white"></span>
            </div>
          </button>
        </div>
      </nav>

      {/* MOBILE SLIDE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-[70%] sm:w-[55%] bg-black/30 backdrop-blur-xl 
                       z-40 p-10 flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white text-4xl self-end mb-10"
            >
              ×
            </button>

            {/* Mobile Items */}
            <ul className="flex flex-col gap-6 text-white tracking-[0.3em] text-base font-light">
              {menuItems.map((item) => (
                <li key={item} className="opacity-90 hover:opacity-100">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
        {!loading && (
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-white font-light tracking-[0.4em] text-4xl sm:text-5xl md:text-6xl"
          >
            EXPERIENCE LUXURY
          </motion.h1>
        )}
      </div>
    </div>
  );
}
