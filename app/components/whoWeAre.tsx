"use client";

import { useState, useEffect, useRef } from "react";
import { motion, cubicBezier } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function LuxuryShowcase() {
  // ----------------------------------------
  // CONTENT DATA
  // ----------------------------------------
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

  const showcaseItems = [
    { id: 1, title: "Living Bar", description: "Sophisticated bar space with elegant seating", image: "./images/over1.jpg" },
    { id: 2, title: "Living and Garden", description: "Natural light lounge with curated artwork", image: "./images/over2.jpg" },
    { id: 3, title: "Living Space", description: "Curated comfort with local design elements", image: "./images/over3.jpg" },
    { id: 4, title: "Dining Area", description: "Elegant dining experience with refined ambiance", image: "./images/over4.jpg" },
    { id: 5, title: "Bedroom Suite", description: "Luxurious retreat with premium furnishings", image: "./images/over21.jpg" },
    { id: 6, title: "Wellness Area", description: "Spa and relaxation zone with contemporary design", image: "./images/over22.jpg" },
  ];

  // ----------------------------------------
  // BACKGROUND TRANSITION FOR SECTION 2
  // ----------------------------------------
  const smoothEase = cubicBezier(0.18, 0.95, 0.2, 1);
  const containerRef = useRef(null);
  const [isLeaving, setIsLeaving] = useState(false); // Changed initial state to false (dark background)

  const swiperSectionRef = useRef(null); // Keep this ref for both observers

 useEffect(() => {
  const obs = new IntersectionObserver(
    ([entry]) => {
      // FIX: Set isLeaving based on intersection status for two-way color change
      setIsLeaving(entry.isIntersecting); 
    },
    { threshold: 0.2 }
  );

  if (swiperSectionRef.current) obs.observe(swiperSectionRef.current);

  return () => {
    if (swiperSectionRef.current) obs.unobserve(swiperSectionRef.current);
  };
}, []);


  const baseTransition = { duration: 1.8, ease: smoothEase };
  const GOLD = "#c8b27c";

  // ----------------------------------------
  // SWIPER ANIMATION TRIGGER
  // ----------------------------------------
  const [swiperVisible, setSwiperVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSwiperVisible(true); },
      { threshold: 0.25 }
    );

    if (swiperSectionRef.current) obs.observe(swiperSectionRef.current);

    return () => {
      if (swiperSectionRef.current) obs.unobserve(swiperSectionRef.current);
    };
  }, []);

  const slideVariant = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: smoothEase }
    }
  };

  return (
    <section
      ref={containerRef}
      className={`relative z-[20] w-full py-24 lg:py-40 overflow-hidden transition-colors duration-1000 ${
        // isLeaving is now true when swiperSection is visible (light BG)
        isLeaving ? "bg-[#f8f5f0]" : "bg-[#070708]"
      }`}
    >
      {/* BACKGROUND BLOBS */}
      <div
        className="absolute -top-40 left-0 w-[650px] h-[650px] blur-[260px] rounded-full opacity-50 transition-colors duration-1000"
        style={{ backgroundColor: isLeaving ? "#d8c79c55" : "#c8b27c22" }}
      ></div>

      <div
        className="absolute bottom-0 right-0 w-[550px] h-[550px] blur-[240px] rounded-full opacity-40 transition-colors duration-1000"
        style={{ backgroundColor: isLeaving ? "#bca77444" : "#b89f6a22" }}
      ></div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 space-y-28 lg:space-y-40 relative">
        {sections.map((sec, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={baseTransition}
            className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center"
          >
            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: sec.reverse ? 50 : -50, scale: 1.02 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...baseTransition, duration: 2.0 }}
              className={`group relative w-full h-[320px] md:h-[400px] lg:h-[400px] rounded-3xl overflow-hidden shadow-[0_0_40px_-10px_rgba(200,178,124,0.1)] ${
                sec.reverse ? "md:order-2" : "md:order-1"
              }`}
            >
              <motion.img
                src={sec.img}
                alt={sec.title}
                className="w-full h-full object-cover transition-transform duration-[4000ms] ease-[cubic-bezier(0.18,0.95,0.2,1)] group-hover:scale-[1.08]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at center, rgba(200,178,124,0.15), transparent 75%)",
                  mixBlendMode: "soft-light",
                }}
              ></div>
            </motion.div>

            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, x: sec.reverse ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...baseTransition, duration: 1.6 }}
              className={`${sec.reverse ? "md:order-1" : "md:order-2"}`}
            >
              <div className="relative p-0 md:p-4">
                <h2
                  className={`text-3xl md:text-4xl lg:text-5xl font-light mb-5 transition-colors duration-1000 ${
                    // Using isLeaving for color change in text/title as well
                    isLeaving ? "text-[#c8b27c]" : "text-[#c8b27c]"
                  }`}
                >
                  {sec.title}
                </h2>

                <p
                  className={`text-base md:text-lg leading-relaxed font-light transition-colors duration-1000 ${
                    isLeaving ? "text-neutral-700" : "text-neutral-300"
                  }`}
                >
                  {sec.text}
                </p>

                <div
                  className="mt-6 w-20 h-[2px] rounded-full"
                  style={{ background: `linear-gradient(to right, ${GOLD}, transparent)` }}
                ></div>
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* --------------------------------------------------
            SWIPER SECTION — SLIDE DOWN + 3 ITEMS VISIBLE
        -------------------------------------------------- */}
        <section ref={swiperSectionRef} className="w-full py-20 relative">
          <div className="max-w-7xl mx-auto">

            <div className="mb-16 space-y-4">
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">
                Featured Spaces
              </h3>

              <h1 
                className={`text-4xl md:text-5xl font-light tracking-tight leading-tight transition-colors duration-1000 ${
                  isLeaving ? "text-neutral-800" : "text-white"
                }`}
              >
                Art, Design, Gastronomy, Culture and Encounters.
              </h1>

              <div className="w-full h-px bg-border" />
            </div>

            {/* BUTTONS LEFT/RIGHT */}
            <button className="swiper-btn-prev absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 shadow hover:bg-white">
              ←
            </button>

            <button className="swiper-btn-next absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 shadow hover:bg-white">
              →
            </button>

            <Swiper
              modules={[Navigation, Pagination, Keyboard]}
              spaceBetween={32}
              slidesPerView={1}
              keyboard={{ enabled: true }}
              navigation={{
                nextEl: ".swiper-btn-next",
                prevEl: ".swiper-btn-prev",
              }}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 32 },
              }}
              className="w-full"
            >
              {showcaseItems.map((item) => (
                <SwiperSlide key={item.id}>
                  <motion.div
                    // Apply motion to the whole card for the text content
                    initial="hidden"
                    animate={swiperVisible ? "visible" : "hidden"}
                    variants={slideVariant}
                    className="group cursor-pointer"
                  >
                    {/* NEW: motion.div for the image with a delay */}
                    <motion.div
                        variants={slideVariant}
                        initial="hidden"
                        animate={swiperVisible ? "visible" : "hidden"}
                        transition={{ ...slideVariant.visible.transition, delay: 0.15 }} // Stagger delay
                        className="relative overflow-hidden aspect-[3/4] mb-6 bg-muted rounded-xl shadow transition-transform duration-300 hover:scale-[1.02]"
                    >
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </motion.div>
                    
                    <h2 className={`text-lg font-medium transition-colors duration-1000 ${
                      isLeaving ? "text-neutral-800" : "text-white"
                    }`}>{item.title}</h2>
                    <p className={`text-sm text-muted-foreground transition-colors duration-1000 ${
                      isLeaving ? "text-neutral-600" : "text-neutral-400"
                    }`}>{item.description}</p>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="swiper-pagination mt-10"></div>

            <div className="w-full h-px bg-border mt-20" />
          </div>
        </section>
      </div>
    </section>
  );
}