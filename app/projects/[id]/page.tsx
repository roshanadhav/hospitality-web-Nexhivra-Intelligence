"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { useRouter, useParams } from "next/navigation"; // Use useParams for App Router

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// --- Project Interface and Data (Moved for re-use) ---

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

// ---------------------------------------------------

// Define the component using Next.js App Router structure
// The page component receives `params` containing the dynamic segment `id`
export default function SingleProjectPage() {
  const router = useRouter();
  // Using Next.js App Router's hook to get params
  const params = useParams(); 
  
  // The 'id' from the URL is a string, which we need to convert to a number
  const projectId = params.id ? parseInt(params.id as string) : null;

  const [project, setProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Ref for the single Swiper instance
  const swiperRef = useRef<SwiperClass | null>(null);

  const menuItems = ["Projects", "Expertise", "Practice", "Studios", "Specialists"];

  // Effect to find the project when the component mounts or projectId changes
  useEffect(() => {
    if (projectId) {
      const foundProject = projects.find((p) => p.id === projectId);
      setProject(foundProject || null);
    }
  }, [projectId]);

  // If the project hasn't been found or the ID is invalid, you can show a loading/error state
  if (!project) {
    // Optional: Add a check for valid ID format or a simple 'Project not found' message
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white/70">
        {projectId ? "Project Not Found" : "Loading..."}
      </div>
    );
  }

  // --- Render the Project Details ---

  return (
    <section className="relative z-[20] w-full min-h-screen bg-black">
      {/* -------------------- NAVBAR (Reused from previous component) -------------------- */}
      <nav className="absolute top-0 left-0 w-full z-30 font-luxury">
        <div className="flex justify-between items-center px-6 md:px-14 py-6 md:py-8">
          {/* Logo */}
          <h1
            onClick={() => router.push("/")}
            className="text-white text-2xl md:text-3xl tracking-[0.45em] font-light cursor-pointer z-40"
          >
            ROYAL
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-14 lg:gap-18 text-white tracking-[0.2em] text-xs lg:text-sm font-light">
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
            className="md:hidden text-white text-4xl leading-none z-40"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <div className="w-9 h-9 flex flex-col justify-center items-center gap-[5px]">
              <span className="w-7 h-[2px] bg-white"></span>
              <span className="w-7 h-[2px] bg-white"></span>
            </div>
          </button>
        </div>

        {/* MOBILE MENU (slide-in) */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="fixed top-0 right-0 h-full w-[70%] sm:w-[55%] bg-black/30 backdrop-blur-xl z-40 p-10 flex flex-col"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white text-4xl self-end mb-10"
                aria-label="Close menu"
              >
                ×
              </button>

              <ul className="flex flex-col gap-6 text-white tracking-[0.3em] text-base font-light">
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
      {/* -------------------- END NAVBAR -------------------- */}

      {/* --- PROJECT MAIN CONTENT --- */}
      <div className="relative w-full min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div
            className="w-full h-full bg-cover bg-center bg-fixed relative"
            style={{ backgroundImage: `url(${project.bg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
          </div>
        </div>

        {/* Title & Description (center) */}
        <div className="h-screen flex flex-col items-center justify-center text-center px-6 z-10 relative">
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }} // Changed to 'animate' since we render once
            transition={{ duration: 0.9 }}
            className="text-5xl md:text-7xl font-light tracking-[0.3em] text-white drop-shadow-xl pt-20" // Added padding to clear the fixed navbar
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }} // Changed to 'animate'
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl text-white/90 mt-6"
          >
            {project.description}
          </motion.p>
        </div>

        {/* SWIPER SECTION */}
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-6 pb-20">
          {/* Section Title (Optional, added for clarity) */}
          <h2 className="text-4xl text-white font-light tracking-wider mb-10 mt-10">
            Gallery
          </h2>

          {/* Swiper Container */}
          <div className="relative w-full max-w-[1100px] mx-auto">
            <Swiper
              modules={[Navigation, Keyboard, Pagination]}
              keyboard={{ enabled: true }}
              pagination={{ clickable: true }}
              spaceBetween={40}
              slidesPerView={1}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              // Added 'h-auto' to Swiper for better height handling in this view
              className="w-full relative z-10 h-auto pb-10" 
            >
              {project.overlays.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={`${project.title} - Image ${idx + 1}`}
                    className="w-full rounded-2xl object-contain max-h-[80vh] shadow-2xl mx-auto"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Prev Button */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-0 lg:left-[-60px] top-1/2 -translate-y-1/2 text-white 
              bg-black/30 hover:bg-black/50 backdrop-blur-sm 
              p-3 rounded-full transition-all duration-300 z-20 hidden md:block" // Hidden on smaller screens for better touch experience
              aria-label="Previous image"
            >
              ←
            </button>

            {/* Next Button */}
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-0 lg:right-[-60px] top-1/2 -translate-y-1/2 text-white 
              bg-black/30 hover:bg-black/50 backdrop-blur-sm 
              p-3 rounded-full transition-all duration-300 z-20 hidden md:block" // Hidden on smaller screens
              aria-label="Next image"
            >
              →
            </button>
          </div>
          {/* Placeholder for project details or another section below the carousel if needed */}
        </div>
      </div>
    </section>
  );
}

// Optional: You might need to move the `Project` interface and `projects` array 
// into a separate file (e.g., `data/projects.ts`) for better code organization, 
// and import it into both the showcase and the single project page.