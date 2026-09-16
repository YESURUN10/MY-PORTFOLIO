// src/components/Hero.jsx
// Hero section integrating the 3D Chess Centerpiece with cinematic black-and-gold typography

import { useState, useEffect } from "react";
import { ME } from "../data/portfolioData";
import { useTextScramble, useMagnetic } from "../utils/hooks";
import HeroPhotoShowcase from "./HeroPhotoShowcase";
import { audio } from "../utils/audio";
import { ArrowDown, Download, GitBranch, Globe, Mail, Sparkles } from "lucide-react";

const MagBtn = ({ href, children, ghost, onClick }) => {
  const [ref, off] = useMagnetic(0.3, 85);
  return (
    <a
      href={href || "#"}
      ref={ref}
      data-h
      onClick={(e) => {
        audio.playClick();
        if (onClick) onClick(e);
      }}
      className="inline-block"
      style={{
        transform: `translate(${off.x}px, ${off.y}px)`,
        transition: "transform .45s var(--ease-expo)",
      }}
    >
      <span className={`btn ${ghost ? "ghost" : ""}`}>
        <span>{children}</span>
      </span>
    </a>
  );
};

export default function Hero({ scrollY = 0, light = false }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 150); // Status badge
    const t2 = setTimeout(() => setPhase(2), 300); // Heading & Name
    const t3 = setTimeout(() => setPhase(3), 460); // Role & Tagline
    const t4 = setTimeout(() => setPhase(4), 620); // CTA Buttons & Socials
    const t5 = setTimeout(() => setPhase(5), 750); // 3D Visual element
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const scrambledName = useTextScramble(ME.name, phase >= 2);

  const showStyle = (requiredPhase, delaySec = 0) => ({
    opacity: phase >= requiredPhase ? 1 : 0,
    transform: phase >= requiredPhase ? "none" : "translateY(24px)",
    transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delaySec}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delaySec}s`,
  });

  // Subtle scroll parallax
  const textParallax = scrollY * 0.06;
  const visualParallax = scrollY * 0.12;
  const bgParallax = scrollY * 0.18;

  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center px-6 md:px-12 pt-28 pb-16 overflow-hidden z-10"
    >
      {/* Background ambient gold aura blobs with parallax */}
      {[
        { w: 480, top: "12%", right: "6vw", dur: 12, c: "rgba(212,168,83,.08)" },
        { w: 320, top: "25%", right: "22vw", dur: 16, c: "rgba(212,168,83,.04)", d: "-4s" },
      ].map((o, i) => (
        <div
          key={i}
          className="absolute pointer-events-none rounded-full will-change-transform"
          style={{
            right: o.right,
            top: o.top,
            width: o.w,
            height: o.w,
            background: `radial-gradient(circle at 40% 40%, ${o.c} 0%, transparent 70%)`,
            animation: `blob ${o.dur}s ease-in-out infinite ${o.d || ""}`,
            filter: "blur(24px)",
            transform: `translate3d(0, ${bgParallax * (i + 1) * 0.5}px, 0)`,
          }}
        />
      ))}

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-14">
          {/* Left: Text & Typography */}
          <div
            className="flex-1 min-w-0 w-full will-change-transform"
            style={{
              transform: `translate3d(0, ${textParallax}px, 0)`,
            }}
          >
            {/* Status Badge */}
            <div style={showStyle(1, 0)} className="mb-4">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[var(--border-h)] bg-[var(--gold-dim)] text-[0.68rem] font-mono tracking-widest text-[#D4A853] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse" />
                <span>{ME.status}</span>
              </div>
            </div>

            {/* Name */}
            <h1
              className="text-5xl sm:text-7xl lg:text-8xl font-light text-[var(--text)] tracking-tight leading-[1.02] mb-3"
              style={{
                fontFamily: "var(--ff-d)",
                ...showStyle(2, 0.05),
              }}
            >
              {scrambledName}
            </h1>

            {/* Role / Subhead */}
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-light italic text-[#D4A853] tracking-tight leading-tight mb-6"
              style={{
                fontFamily: "var(--ff-d)",
                ...showStyle(3, 0.1),
              }}
            >
              {ME.role}
            </h2>

            {/* Tagline */}
            <p
              className="text-base sm:text-lg text-[var(--text-2)] font-light leading-relaxed max-w-xl mb-10"
              style={showStyle(3, 0.2)}
            >
              {ME.tagline}
            </p>

            {/* Magnetic CTA Buttons */}
            <div
              className="flex flex-wrap items-center gap-4 mb-12"
              style={showStyle(4, 0.1)}
            >
              <MagBtn href="#projects">Explore Work</MagBtn>
              <a
                href="/YESURUN_A_Resume.pdf"
                download="YESURUN_A_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audio.playClick()}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-[#D4A853] bg-[#D4A853] text-[#080A0D] text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#FFF1C5] hover:shadow-[0_0_20px_rgba(212,168,83,0.4)] transition-all cursor-pointer"
                data-h
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
              </a>
              <MagBtn href="#contact" ghost>
                Initiate Dialogue
              </MagBtn>
            </div>

            {/* Social Network Links */}
            <div
              className="flex items-center gap-6 border-t border-[var(--border)] pt-8"
              style={showStyle(4, 0.25)}
            >
              {[
                { name: "GitHub", url: ME.github, icon: GitBranch },
                { name: "LinkedIn", url: ME.linkedin, icon: Globe },
                { name: "Email", url: `mailto:${ME.email}`, icon: Mail },
              ].map((item) => {
                const ItemIcon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target={item.name === "Email" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    data-h
                    onClick={() => audio.playClick()}
                    className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[var(--text-3)] hover:text-[#D4A853] transition-colors"
                  >
                    <ItemIcon className="w-3.5 h-3.5" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: 3D Holographic Portrait Showcase */}
          <div
            className="flex-shrink-0 w-full lg:w-auto flex justify-center will-change-transform"
            style={{
              ...showStyle(5, 0.1),
              transform: `translate3d(0, ${visualParallax}px, 0)`,
            }}
          >
            <HeroPhotoShowcase scrollY={scrollY} light={light} />
          </div>
        </div>

        {/* Scroll down indicator */}
        <div
          className="hidden md:flex justify-center mt-12"
          style={showStyle(4, 0.4)}
        >
          <a
            href="#about"
            data-h
            className="flex flex-col items-center gap-2 text-[0.62rem] font-mono uppercase tracking-[0.25em] text-[var(--text-3)] hover:text-[#D4A853] transition-colors"
          >
            <span>Scroll To Discover</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#D4A853]" />
          </a>
        </div>
      </div>
    </section>
  );
}

