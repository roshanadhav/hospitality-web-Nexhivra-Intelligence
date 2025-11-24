"use client";
import { useState, useEffect, useRef } from "react";
import { motion, cubicBezier } from "framer-motion";

export default function LuxuryShowcase() {
  const sections = [
    {
      title: "Crafting Timeless Luxury",
      text: "We blend architecture, interior artistry, and experiential storytelling to sculpt environments that radiate elegance and serenity. Our commitment to bespoke materials and unmatched craftsmanship ensures every detail is an intentional stroke of genius.",
      img: "/images/img1.jpg",
      reverse: false,
    },
    {
      title: "Design Beyond Boundaries",
      text: "Every space we curate reflects precision, modern refinement, and a deep cultural sensitivity that transforms vision into living art. We don't just design spaces; we curate legacies.",
      img: "/images/img2.jpg",
      reverse: true,
    },
  ];

  // Refined custom ease for a smoother, more 'luxurious' deceleration
  const smoothEase = cubicBezier(0.18, 0.95, 0.2, 1); 
  const GOLD = "#c8b27c";

  // For background + text color change
  const containerRef = useRef(null);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Detect when less than 10% is visible before leaving the viewport
        if (entry.intersectionRatio < 0.1) {
          setIsLeaving(true);
        } else {
          setIsLeaving(false);
        }
      },
      // Check intersection at 0, 10%, 20%, and 100% visibility
      { threshold: [0, 0.1, 0.2, 1] } 
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // Base transition object for consistency
  const baseTransition = {
    duration: 1.8, 
    ease: smoothEase,
  };

  return (
    <section
      ref={containerRef}
      className={`relative z-[20] w-full py-24 lg:py-40 overflow-hidden transition-colors duration-1000 ${
        isLeaving 
          ? "bg-[#1a1a1a]"  // Brighter shade
          : "bg-[#070708]"  // Original luxury black
      }`}
    >

      {/* --- BACKGROUND BLOBS --- */}
      <div
        className="absolute -top-40 left-0 w-[650px] h-[650px] blur-[260px] rounded-full opacity-50 transition-colors duration-1000"
        style={{
          backgroundColor: isLeaving ? "#d8c79c55" : "#c8b27c22",
        }}
      ></div>

      <div
        className="absolute bottom-0 right-0 w-[550px] h-[550px] blur-[240px] rounded-full opacity-40 transition-colors duration-1000"
        style={{
          backgroundColor: isLeaving ? "#bca77444" : "#b89f6a22",
        }}
      ></div>
      {/* --- END BACKGROUND BLOBS --- */}

      <div 
        // --- CHANGE: Reduced vertical spacing between sections ---
        className="max-w-7xl mx-auto space-y-28 lg:space-y-40 px-6 relative" 
      >
        {sections.map((sec, idx) => (
          
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 80 }} 
            whileInView={{ opacity: 1, y: 0 }}
            // Animation trigger set to 5% visibility
            viewport={{ once: true, amount: 0.05 }} 
            transition={baseTransition}
            className={`grid md:grid-cols-2 gap-10 lg:gap-20 items-center`}
          >

            {/* IMAGE CONTAINER */}
            <motion.div
              initial={{ opacity: 0, x: sec.reverse ? 50 : -50, scale: 1.02 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...baseTransition, duration: 2.0 }}
              className={`group relative w-full h-[320px] md:h-[400px] 
                ${sec.reverse ? "md:order-2" : "md:order-1"}
                order-1 
                // --- FINAL CHANGE: Reduced max image height on full screen ---
                lg:h-[400px] rounded-3xl overflow-hidden shadow-[0_0_40px_-10px_rgba(200,178,124,0.1)]
              `}
            >
              <motion.img
                src={sec.img}
                alt={sec.title}
                className="w-full h-full object-cover transition-transform duration-[4000ms] ease-[cubic-bezier(0.18,0.95,0.2,1)] group-hover:scale-[1.08]"
              />

              {/* Overlays for depth and effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at center, rgba(200,178,124,0.15), transparent 75%)",
                  mixBlendMode: "soft-light",
                }}
              ></div>
            </motion.div>


            {/* TEXT CONTAINER */}
            <motion.div
              initial={{ opacity: 0, x: sec.reverse ? -40 : 40 }} 
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...baseTransition, duration: 1.6 }}
              className={`${sec.reverse ? "md:order-1" : "md:order-2"} order-2`}
            >
              <div className="relative p-0 md:p-4">
                <h2
                  className={`text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-5 leading-snug transition-colors duration-1000 ${
                    isLeaving ? "text-[#f3e3c0]" : "text-[#c8b27c]"
                  }`}
                >
                  {sec.title}
                </h2>

                <p
                  className={`text-base md:text-lg leading-relaxed font-light transition-colors duration-1000 ${
                    isLeaving ? "text-neutral-200" : "text-neutral-300"
                  }`}
                >
                  {sec.text}
                </p>

                <div
                  className="mt-6 w-20 h-[2px] rounded-full" 
                  style={{
                    background: `linear-gradient(to right, ${GOLD}, transparent)`
                  }}
                ></div>
              </div>
            </motion.div>

          </motion.div>
        ))}
      </div>
    </section>
  );
}