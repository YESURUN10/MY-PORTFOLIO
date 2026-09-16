// src/components/Nav.jsx
// Responsive luxury navigation with active section indicator, audio toggle & mobile drawer

import { useState, useEffect } from "react";
import { Volume2, VolumeX, Menu, X, Sun, Moon } from "lucide-react";
import { audio } from "../utils/audio";
import { useScrollProgress } from "../utils/hooks";

const NAV_ITEMS = [
  { id: "hero", label: "Overview" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ active, light, setLight }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const next = audio.toggle();
    setAudioEnabled(next);
  };

  const handleNavClick = (id) => {
    audio.playClick();
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[500] px-6 md:px-12 py-3.5 flex items-center justify-between transition-all duration-500 select-none ${
          isScrolled
            ? light
              ? "bg-[rgba(242,237,227,0.92)] backdrop-blur-xl border-b border-[var(--border)] shadow-sm"
              : "bg-[rgba(8,10,13,0.92)] backdrop-blur-xl border-b border-[var(--border)] shadow-lg"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(-16px)",
          transition: "opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* Brand Monogram */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("hero");
          }}
          className="text-2xl font-normal text-[#D4A853] tracking-wider hover:opacity-80 transition-opacity flex items-center gap-2 group"
          style={{ fontFamily: "var(--ff-d)" }}
          data-h
          aria-label="Yesurun Portfolio Home"
        >
          <span>Y.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {NAV_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`nav-link text-xs uppercase tracking-[0.2em] font-mono cursor-pointer relative py-1 transition-colors duration-300 ${
                active === item.id ? "active text-[#D4A853] font-bold" : "text-[var(--text-2)] hover:text-[#D4A853]"
              }`}
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(-8px)",
                transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${idx * 60 + 200}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${idx * 60 + 200}ms, color 0.25s`,
              }}
              data-h
            >
              <span>{item.label}</span>
              {/* Active Indicator Underline */}
              <span
                className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A853] to-transparent transition-all duration-300 ${
                  active === item.id ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Right Actions: Audio, Theme Toggle, Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {/* Audio Micro-interaction Toggle */}
          <button
            type="button"
            onClick={handleAudioToggle}
            className="p-2 rounded-full border border-[var(--border)] text-[var(--text-2)] hover:border-[#D4A853] hover:text-[#D4A853] transition-colors"
            title={audioEnabled ? "Disable UI Audio" : "Enable Luxury Gold Audio"}
            aria-label="Toggle UI Audio"
            data-h
          >
            {audioEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#D4A853]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Dark / Light Toggle */}
          <button
            type="button"
            onClick={() => {
              audio.playClick();
              setLight((prev) => !prev);
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border)] text-[0.65rem] font-mono uppercase tracking-wider text-[var(--text-2)] hover:border-[#D4A853] hover:text-[#D4A853] transition-colors"
            data-h
          >
            {light ? (
              <>
                <Moon className="w-3 h-3 text-[#D4A853]" />
                <span>Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-3 h-3 text-[#D4A853]" />
                <span>Light</span>
              </>
            )}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => {
              audio.playClick();
              setMobileMenuOpen((p) => !p);
            }}
            className="md:hidden p-2 rounded-md border border-[var(--border)] text-[var(--text)] hover:text-[#D4A853] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Minimalist Gold Scroll-Progress Indicator */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#9B7732] via-[#D4A853] to-[#FFF1C5] shadow-[0_0_10px_rgba(212,168,83,0.7)] transition-all duration-150 ease-out pointer-events-none"
          style={{ width: `${(scrollProgress * 100).toFixed(2)}%` }}
        />
      </header>


      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[490] bg-black/95 backdrop-blur-2xl flex flex-col justify-center px-8 py-12 md:hidden animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex flex-col gap-6" onClick={(e) => e.stopPropagation()}>
            <span className="font-mono text-[0.65rem] tracking-[0.28em] text-[#D4A853] uppercase mb-2">
              Navigation Menu
            </span>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-3xl font-light tracking-wide transition-colors ${
                  active === item.id ? "text-[#D4A853]" : "text-white/80 hover:text-[#D4A853]"
                }`}
                style={{ fontFamily: "var(--ff-d)" }}
              >
                {item.label}
              </button>
            ))}

            <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  audio.playClick();
                  setLight((prev) => !prev);
                }}
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/80"
              >
                {light ? <Moon className="w-4 h-4 text-[#D4A853]" /> : <Sun className="w-4 h-4 text-[#D4A853]" />}
                <span>{light ? "Dark Mode" : "Light Mode"}</span>
              </button>

              <button
                type="button"
                onClick={handleAudioToggle}
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/80"
              >
                {audioEnabled ? <Volume2 className="w-4 h-4 text-[#D4A853]" /> : <VolumeX className="w-4 h-4" />}
                <span>{audioEnabled ? "Audio On" : "Audio Muted"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
