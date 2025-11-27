"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [headingVisible, setHeadingVisible] = useState(true);

  const router = useRouter();

  const menuItems = [
    "Projects",
    "Expertise",
    "Practice",
    "Studios",
    "Specialists",
  ];

  // Loader timeout
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Heading disappear timeout
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setHeadingVisible(false), 4000); // heading disappears after 4s
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* ------------------ LOADER ------------------ */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="fixed inset-0 bg-black z-[999] flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{
                duration: 1.6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="h-[2px] bg-[#d4af37] rounded-full"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="mt-6 text-[#d4af37] tracking-[0.25em] text-sm sm:text-base font-[var(--font-playfair)]"
            >
              LOADING LUXURY
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------ BACKGROUND VIDEO ------------------ */}
      <video
        className={`fixed top-0 left-0 w-full h-full object-cover object-center z-0 transition-opacity duration-1000 
          opacity-100
        `}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
      >
        <source src="/videos/luxury.mp4" type="video/mp4" />
      </video>

      {/* ------------------ LIGHT OVERLAY ------------------ */}
      <div className="absolute inset-0 bg-black/10 z-[1]" />

      {/* ------------------ NAVBAR ------------------ */}
      <nav className="absolute top-0 left-0 w-full z-30">
        <div className="flex justify-between items-center px-6 md:px-14 py-6 md:py-8">
          <h1
            onClick={() => router.push("/")}
            className="text-white text-2xl md:text-3xl tracking-[0.45em] font-light cursor-pointer"
            style={{ fontFamily: "var(--font-playfair)" }} // Luxury logo font
          >
            ROYAL
          </h1>

          {/* Desktop Menu */}
          <ul
            className="hidden md:flex gap-14 lg:gap-18 text-white tracking-[0.2em] text-xs lg:text-sm font-light"
            style={{ fontFamily: "Raleway, sans-serif" }} // Clean menu font
          >
            {menuItems.map((item) => (
              <li
                key={item}
                onClick={() => router.push(`${item.toLowerCase()}`)}
                className="relative group cursor-pointer transition"
              >
                {item}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-white/70 group-hover:w-full transition-all duration-300" />
              </li>
            ))}
          </ul>

          {/* Mobile Menu Icon */}
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

      {/* ------------------ MOBILE MENU ------------------ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-[70%] sm:w-[55%] bg-black/30 backdrop-blur-xl z-40 p-10 flex flex-col"
            style={{ fontFamily: "Raleway, sans-serif" }} // Mobile menu font
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white text-4xl self-end mb-10"
            >
              ×
            </button>

            <ul className="flex flex-col gap-6 text-white tracking-[0.3em] text-base font-light">
              {menuItems.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setMenuOpen(false);
                    router.push(`${item.toLowerCase()}`);
                  }}
                  className="opacity-90 hover:opacity-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------ HERO TEXT ------------------ */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
        <AnimatePresence>
          {!loading && headingVisible && (
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.2 }}
              className="text-white font-light tracking-[0.15em] text-xl sm:text-2xl md:text-3xl lg:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }} // Hero text font
            >
              EXPERIENCE LUXURY WITH LEGACY
            </motion.h1>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
