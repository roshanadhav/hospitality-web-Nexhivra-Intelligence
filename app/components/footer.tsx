"use client";
import { motion } from "framer-motion";
import { Instagram, Facebook, Linkedin, Mail } from "lucide-react";

export default function LuxuryFooter() {
  return (
    <section className="relative w-full bg-[#0d0b0a]">
      {/* Luxury Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent pointer-events-none" />

      <footer className="relative z-20 w-full text-[#f5efe6] pt-24 pb-14 px-8 md:px-20">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          
          {/* Brand */}
          <div>
            <h1 className="text-3xl tracking-[0.35em] font-light">
              ROYAL STUDIO
            </h1>
            <p className="mt-6 text-sm text-[#d6cfc7] max-w-sm leading-relaxed">
              Crafting hospitality spaces that blend timeless luxury with immersive
              experiential design. Each environment tells a story—elegant,
              intentional, unforgettable.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm uppercase tracking-[0.2em] text-[#b8b0a6]">
              Navigation
            </h2>
            <ul className="space-y-3 text-[#e8e2d9]">
              {["Projects", "Expertise", "Studios", "Practice", "Specialists"].map(
                (item) => (
                  <li
                    key={item}
                    className="text-sm hover:text-white transition-all duration-300 tracking-wide cursor-pointer"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm uppercase tracking-[0.2em] text-[#b8b0a6]">
              Contact
            </h2>

            <p className="text-[#e8e2d9] text-sm leading-relaxed">
              Pune, Maharashtra, India
            </p>

            <a
              href="mailto:hello@royalstudio.com"
              className="text-sm text-[#e8e2d9] hover:text-white transition duration-300 flex items-center gap-2"
            >
              <Mail size={16} /> hello@royalstudio.com
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-5 mt-4">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.2, y: -2 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 cursor-pointer backdrop-blur-sm"
                >
                  <Icon size={18} className="text-[#f5efe6]" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mt-16 mb-10"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-[#b8b0a6] tracking-wide">
          <p>© 2025 ROYAL STUDIO. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <p className="hover:text-white transition">Privacy Policy</p>
            <p className="hover:text-white transition">Terms</p>
            <p className="hover:text-white transition">Cookies</p>
          </div>
        </div>
      </footer>
    </section>
  );
}
