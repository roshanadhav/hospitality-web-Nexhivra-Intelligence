"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { useRouter } from "next/navigation";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Project {
  id: number;
  title: string;
  description: string;
  bg: string;
  overlays: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Luxe Horizon",
    description: "A symphony of shadows, textures, and timeless materials.",
    bg: "/images/bg1.jpg",
    overlays: ["/images/over1.jpg", "/images/over2.jpg", "/images/over3.jpg", "/images/over4.jpg"],
  },
  {
    id: 2,
    title: "Celestial Manor",
    description: "Where minimalism meets warm immersive luxury.",
    bg: "/images/bg5.jpg",
    overlays: ["/images/over51.jpg", "/images/over52.jpg", "/images/over53.jpg", "/images/over54.jpg"],
  },
  {
    id: 3,
    title: "Opulent Wave Villa",
    description: "Crafted for connoisseurs of immersive spaces.",
    bg: "/images/bg2.jpg",
    overlays: ["/images/over21.jpg", "/images/over22.jpg", "/images/over23.jpg", "/images/over24.jpg"],
  },
];

export default function FullscreenProjectShowcase() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const swiperRefs = useRef<Array<SwiperClass | null>>(Array(projects.length).fill(null));
  const menuItems = ["Projects", "Expertise", "Practice", "Studios", "Specialists"];

  return (
    <section className="relative z-[20] w-full h-screen no-scrollbar overflow-y-scroll snap-y scroll-smooth snap-mandatory">
      {projects.map((project, pIndex) => (
        <section key={project.id} className="relative w-full min-h-screen snap-center">
          {/* -------------------- NAVBAR -------------------- */}
          {pIndex === 0 && (
            <nav className="absolute top-0 left-0 w-full z-30">
              <div className="flex justify-between items-center px-6 md:px-14 py-6 md:py-8">
                <h1
                  onClick={() => router.push("/")}
                  className="text-white text-2xl md:text-3xl tracking-[0.35em] font-light cursor-pointer"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  ROYAL
                </h1>

                {/* Desktop Menu */}
                <ul
                  className="hidden md:flex gap-14 lg:gap-18 text-white tracking-[0.15em] text-xs lg:text-sm font-light"
                  style={{ fontFamily: "Raleway, sans-serif" }}
                >
                  {menuItems.map((item) => (
                    <li
                      key={item}
                      onClick={() => router.push(`/${item.toLowerCase()}`)}
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
                  aria-label="Open menu"
                >
                  <div className="w-9 h-9 flex flex-col justify-center items-center gap-[5px]">
                    <span className="w-7 h-[2px] bg-white"></span>
                    <span className="w-7 h-[2px] bg-white"></span>
                  </div>
                </button>
              </div>

              {/* MOBILE MENU */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed top-0 right-0 h-full w-[70%] sm:w-[55%] bg-black/30 backdrop-blur-xl z-40 p-10 flex flex-col"
                    style={{ fontFamily: "Raleway, sans-serif" }}
                  >
                    <button
                      onClick={() => setMenuOpen(false)}
                      className="text-white text-4xl self-end mb-10"
                      aria-label="Close menu"
                    >
                      ×
                    </button>

                    <ul className="flex flex-col gap-6 text-white tracking-[0.15em] text-base font-light">
                      {menuItems.map((item) => (
                        <li
                          key={item}
                          onClick={() => {
                            setMenuOpen(false);
                            router.push(`/${item.toLowerCase()}`);
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
            </nav>
          )}

          {/* -------------------- BACKGROUND -------------------- */}
          <div className="absolute inset-0 -z-10">
            <div
              className="w-full h-full bg-cover bg-center bg-fixed relative"
              style={{ backgroundImage: `url(${project.bg})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
            </div>
          </div>

          {/* -------------------- TITLE & DESCRIPTION -------------------- */}
          <div className="h-screen flex flex-col items-center justify-center text-center px-6 z-10 relative">
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9 }}
              className="text-4xl md:text-6xl font-light tracking-[0.15em] text-white drop-shadow-xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl text-white/90 mt-4"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              {project.description}
            </motion.p>
          </div>

          {/* -------------------- SWIPER -------------------- */}
          <div className="relative w-full h-screen snap-center flex items-center justify-center px-6">
            <div className="absolute left-10 bottom-10 text-white z-20">
              <motion.h2
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="text-2xl md:text-3xl font-light tracking-[0.15em]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {project.title}
              </motion.h2>

              <a
                href={`/projects/${project.id}`}
                className="inline-block mt-4 px-6 py-2 border border-white/70 text-white uppercase text-xs tracking-[0.1em] hover:border-white transition-all duration-300"
                style={{ fontFamily: "Raleway, sans-serif" }}
              >
                View Project
              </a>
            </div>

            <div className="relative w-full max-w-[900px]">
              <Swiper
                modules={[Navigation, Keyboard, Pagination]}
                keyboard={{ enabled: true }}
                pagination={{ clickable: true }}
                spaceBetween={40}
                slidesPerView={1}
                onSwiper={(swiper) => (swiperRefs.current[pIndex] = swiper)}
                className="w-full relative z-10"
              >
                {project.overlays.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      className="w-full rounded-2xl object-contain max-h-[80vh] shadow-2xl"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <button
                onClick={() => swiperRefs.current[pIndex]?.slidePrev()}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm p-3 rounded-full transition-all duration-300 z-20"
                aria-label="Previous slide"
              >
                ←
              </button>

              <button
                onClick={() => swiperRefs.current[pIndex]?.slideNext()}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm p-3 rounded-full transition-all duration-300 z-20"
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </div>
        </section>
      ))}
    </section>
  );
}
