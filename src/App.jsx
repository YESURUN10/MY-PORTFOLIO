// src/App.jsx
// Main application container for Yesurun's Black & Gold 3D Developer Portfolio

import { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import ThreeBackground from "./components/ThreeBackground";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import { ME, MARQUEE_ITEMS } from "./data/portfolioData";
import { ArrowUp, Heart, Sparkles } from "lucide-react";
import { audio } from "./utils/audio";

export default function App() {
  const [light, setLight] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollY, setScrollY] = useState(0);

  // Sync theme class to <html> element
  useEffect(() => {
    if (light) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  }, [light]);

  // Track window scroll for 3D parallax and dolly effects
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for active section scroll-spy
  useEffect(() => {
    const sections = ["hero", "about", "projects", "resume", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    audio.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen text-[var(--text)] bg-[var(--bg)] transition-colors duration-700 select-auto">
      {/* Luxury Startup Preloader */}
      <Preloader />

      {/* Global Ambient 3D Particle WebGL Background */}
      <ThreeBackground scrollY={scrollY} light={light} />

      {/* Custom Magnetic Cursor (Auto-hidden on Touch) */}
      <Cursor />

      {/* Responsive Navigation */}
      <Nav active={activeSection} light={light} setLight={setLight} />

      {/* Main Content Layout */}
      <main className="relative z-10">
        {/* 1. Hero Section with 3D Personal Model */}
        <Hero scrollY={scrollY} light={light} />

        {/* Marquee Technology Ribbon */}
        <div className="py-5 border-y border-[var(--border)] bg-[var(--surface)] overflow-hidden relative select-none">
          <div className="mq-track flex items-center gap-12 whitespace-nowrap animate-marquee">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <span
                key={idx}
                className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--text-2)] flex items-center gap-8"
              >
                <span>{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] opacity-60" />
              </span>
            ))}
          </div>
        </div>

        {/* 2. About Section */}
        <About />

        {/* 3. Projects Section with 3D Tilt Cards & Real GitHub Links */}
        <Projects />

        {/* 4. Experience & Credentials Section */}
        <Resume />

        {/* 5. Functional Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--surface)] py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-[var(--text-3)]">
          {/* Brand & Rights */}
          <div className="flex items-center gap-3">
            <span
              className="text-lg text-[#D4A853]"
              style={{ fontFamily: "var(--ff-d)" }}
            >
              Y.
            </span>
            <span>
              © {new Date().getFullYear()} {ME.name}. All rights reserved.
            </span>
          </div>

          {/* Location & Status */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Hire</span>
            </span>
            <span>·</span>
            <span>{ME.location}</span>
          </div>

          {/* Scroll to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[var(--text-2)] hover:text-[#D4A853] transition-colors uppercase tracking-widest cursor-pointer"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#D4A853]" />
          </button>
        </div>
      </footer>
    </div>
  );
}
