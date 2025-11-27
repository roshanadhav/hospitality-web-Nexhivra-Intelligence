"use client";
import React from "react";
import { motion } from "framer-motion";

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
    title: "Luxe Horizon ",
    description: "A symphony of shadows, textures, and timeless materials.",
    bg: "/images/bg1.jpg",
    overlays: ["/images/over1.jpg", "/images/over4.jpg"],
    //, "/images/over2.jpg", "/images/over3.jpg"
  },
  {
    id: 2,
    title: "Celestial Manor",
    description: "Where minimalism meets warm immersive luxury.",
    bg: "/images/bg5.jpg",
    overlays: ["/images/over51.jpg" , "/images/over54.jpg"],
    //, "/images/over52.jpg", "/images/over53.jpg",
  },
  {
    id: 3,
    title: "Opulent Wave Villa",
    description: "Crafted for connoisseurs of immersive spaces.",
    bg: "/images/bg2.jpg",
    overlays: ["/images/over21.jpg" , "/images/over24.jpg"],
    //, "/images/over22.jpg", "/images/over23.jpg",
  },
];

export default function FullscreenProjectShowcase() {
  return (
    <section className="relative z-[20] w-full h-screen overflow-y-scroll no-scrollbar snap-y snap-mandatory scroll-smooth [scroll-behavior:smooth]">

      {projects.map((project) => (
        <section key={project.id} className="relative w-full min-h-screen snap-start">

          {/* FIXED BACKGROUND */}
          <div className="absolute inset-0 -z-10">
            <div
              className="w-full h-full bg-cover bg-center bg-fixed relative"
              style={{ backgroundImage: `url(${project.bg})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20"></div>
            </div>
          </div>

          {/* MAIN TITLE */}
          <div className="h-screen flex flex-col items-center justify-center text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9 }}
              className="text-5xl md:text-7xl font-light tracking-[0.3em] text-white drop-shadow-xl"
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="text-xl md:text-2xl max-w-2xl text-white/90 mt-6"
            >
              {project.description}
            </motion.p>
          </div>

          {/* OVERLAY IMAGES */}
          {project.overlays.map((img, index) => (
            <div
              key={index}
              className="relative min-h-screen w-full flex items-center justify-center snap-start no-scrollbar"
            >
              {/* LABEL + BTN */}
              <div className="absolute left-10 bottom-10 text-white z-20">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7 }}
                  className="text-2xl md:text-3xl font-light tracking-[0.15em]"
                >
                  {project.title}
                </motion.h2>

                <motion.a
                  href={`/projects/${project.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, delay: 0.08 }}
                  className="inline-block mt-4 px-6 py-2 border border-white/70 text-white uppercase text-xs tracking-widest hover:border-white transition-all duration-300 bg-transparent"
                >
                  View Project
                </motion.a>
              </div>

              {/* OVERLAY IMAGE — NO ANIMATION, CENTERED */}
              <div className="flex items-center justify-center w-full px-6 min-h-screen">
                <img
                  src={img}
                  alt={`${project.title} overlay ${index + 1}`}
                  className="w-full max-w-[86%] md:max-w-[62%] lg:max-w-[55%] max-h-[80vh] rounded-2xl shadow-2xl object-contain mx-auto"
                />
              </div>
            </div>
          ))}
        </section>
      ))}

    </section>
  );
}
