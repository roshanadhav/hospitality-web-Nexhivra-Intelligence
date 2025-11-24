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
  return (
    <div className="relative w-full h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      {projects.map((project) => (
        <section
          key={project.id}
          className="relative w-full min-h-screen snap-start"
        >
          {/* Fixed Background Per Project */}
          <div className="absolute inset-0 -z-10">
            <div
              className="w-full h-full bg-cover bg-center bg-fixed"
              style={{ backgroundImage: `url(${project.bg})` }}
            ></div>
          </div>

          {/* Main Project Title */}
          <div className="h-screen flex flex-col items-center justify-center text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-5xl md:text-7xl font-light tracking-[0.3em] text-white drop-shadow-xl"
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-xl md:text-2xl max-w-2xl text-white/90 mt-6"
            >
              {project.description}
            </motion.p>
          </div>

          {/* Overlay Images */}
          {project.overlays.map((img, index) => (
            <div
              key={index}
              className="h-screen w-full flex items-center justify-center snap-start"
            >
              <motion.img
                src={img}
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-[70%] md:w-[45%] rounded-2xl shadow-2xl object-cover"
              />
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
