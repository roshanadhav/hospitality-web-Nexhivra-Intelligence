"use client";
import { motion } from "framer-motion";

export default function LuxuryShowcase() {
  const sections = [
    {
      title: "Crafting Timeless Luxury",
      text: "We blend architecture, interior artistry, and experiential storytelling to sculpt environments that radiate elegance and serenity. Our commitment to bespoke materials and unmatched craftsmanship ensures every detail is an intentional stroke of genius.",
      img: "/images/img1.jpg",
      reverse: false, // Image on Left (Order 1), Text on Right (Order 2)
    },
    {
      title: "Design Beyond Boundaries",
      text: "Every space we curate reflects precision, modern refinement, and a deep cultural sensitivity that transforms vision into living art. We don't just design spaces; we curate legacies.",
      img: "/images/img2.jpg",
      reverse: true, // Image on Right (Order 2), Text on Left (Order 1)
    },
  ];

  const GOLD_PRIMARY = "#c8b27c"; 
//   const GOLD_SECONDARY = "#d4b880";

  return (
    <section className="relative z-[20] w-full bg-gradient-to-b from-[#0b0b0c] via-[#0e0e10] to-[#0b0b0d] py-28 md:py-36 overflow-hidden">
      {/* Soft luxury glow background (using richer gold tones) */}
      <div className="absolute -top-32 left-0 w-[600px] h-[600px] bg-[${GOLD_PRIMARY}]/10 blur-[280px] rounded-full opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-[${GOLD_SECONDARY}]/10 blur-[260px] rounded-full opacity-50"></div>

      <div className="max-w-7xl mx-auto space-y-40 px-6 relative">
        {sections.map((sec, idx) => (
          // --- 1. Animation for the entire row (Opacity/Y-Axis Slide Up) ---
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={`grid md:grid-cols-2 gap-16 items-center`}
          >
            
            {/* Text Content */}
            <motion.div
              // --- 2. Animation for the text (Opacity/X-Axis Slide) ---
              initial={{ opacity: 0, x: sec.reverse ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`${
                sec.reverse ? "md:order-1" : "md:order-2"
              }`}
            >
              <div className="relative p-0 md:p-4">
                <h2 
                  className="text-4xl md:text-5xl font-extralight tracking-wider mb-6 leading-tight"
                  style={{ color: GOLD_PRIMARY }} 
                >
                  {sec.title}
                </h2>
                <p className="text-xl leading-relaxed text-neutral-300 font-light">
                  {sec.text}
                </p>

                {/* Rich gold underline/divider */}
                <div 
                  className="mt-8 w-24 h-[2px] bg-gradient-to-r from-[${GOLD_PRIMARY}] to-transparent"
                  style={{ backgroundColor: GOLD_PRIMARY }}
                ></div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              // --- 3. Animation for the image container (Opacity/X-Axis Slide) ---
              initial={{ opacity: 0, x: sec.reverse ? 80 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`group relative w-full h-[520px] rounded-3xl overflow-hidden shadow-2xl ${
                sec.reverse ? "md:order-2" : "md:order-1"
              }`}
            >
              <motion.img
                src={sec.img}
                alt={sec.title}
                // --- 4. Animation for the image scale (Initial scale-up, shrinks to normal on view) ---
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="w-full h-full object-cover transform duration-[2.5s] ease-in-out group-hover:scale-110"
              />

              {/* Enhanced dark/gold gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}