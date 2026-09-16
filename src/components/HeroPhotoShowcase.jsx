// src/components/HeroPhotoShowcase.jsx
// Interactive 3D Portrait Showcase for YESURUN A
// Features perspective 3D tilt, specular glare, rotating orbital rune rings,
// active visual presets (Cyber HUD, Gold Luxe, Core Flare),
// and an unobstructed, crystal-clear view of the portrait with zero clutter.

import { useState, useRef } from "react";
import { audio } from "../utils/audio";
import { Sparkles, Scan, Zap } from "lucide-react";

export default function HeroPhotoShowcase({ scrollY = 0, light = false }) {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeMode, setActiveMode] = useState("hologram"); // 'hologram' | 'obsidian' | 'aura'

  // Parallax translation from scroll
  const scrollOffset = scrollY * 0.04;
  const shadowIntensity = light ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.9)";

  // Mouse tilt tracking with spring damping
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: y * -14, // rotateX
      y: x * 18,  // rotateY
      gx: (x + 0.5) * 100,
      gy: (y + 0.5) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, gx: 50, gy: 50 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    audio.playHover();
  };

  const modes = [
    { id: "hologram", label: "Cyber HUD", icon: Scan },
    { id: "obsidian", label: "Gold Luxe", icon: Sparkles },
    { id: "aura", label: "Core Flare", icon: Zap },
  ];

  return (
    <div className="relative flex flex-col items-center select-none py-4">
      {/* 3D Perspective Card Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative cursor-pointer"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
          transform: `translate3d(0, ${scrollOffset}px, 0)`,
        }}
      >
        {/* Floating 3D Nested Golden Orbital Rings */}
        <div
          className="absolute -inset-10 md:-inset-16 pointer-events-none flex items-center justify-center"
          style={{
            transform: `rotateX(${tilt.x * 0.4}deg) rotateY(${tilt.y * 0.4}deg)`,
            transition: "transform 0.25s ease-out",
          }}
        >
          {/* Outer Orbital Ring */}
          <div
            className={`absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full border transition-all duration-700 ${
              activeMode === "obsidian"
                ? "border-[#F5D996]/80 shadow-[0_0_40px_rgba(212,168,83,0.6)]"
                : activeMode === "aura"
                ? "border-[#FFA043]/80 shadow-[0_0_50px_rgba(255,140,0,0.5)]"
                : isHovered
                ? "border-[#D4A853]/60 shadow-[0_0_35px_rgba(212,168,83,0.3)]"
                : "border-[#D4A853]/25"
            }`}
            style={{
              animation: activeMode === "aura" ? "spinSlow 16s linear infinite" : "spinSlow 32s linear infinite",
            }}
          >
            {/* Orbital Satellite Beads */}
            <span
              className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full transition-all ${
                activeMode === "obsidian"
                  ? "bg-[#FFF1C5] shadow-[0_0_16px_#FFF1C5]"
                  : activeMode === "aura"
                  ? "bg-[#FFA043] shadow-[0_0_18px_#FF8C00]"
                  : "bg-[#D4A853] shadow-[0_0_10px_#D4A853]"
              }`}
            />
            <span
              className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full transition-all ${
                activeMode === "obsidian"
                  ? "bg-[#D4A853] shadow-[0_0_12px_#D4A853]"
                  : activeMode === "aura"
                  ? "bg-[#FF5500] shadow-[0_0_14px_#FF5500]"
                  : "bg-[#F5D996] shadow-[0_0_8px_#D4A853]"
              }`}
            />
          </div>

          {/* Inner Dashed Gear Ring */}
          <div
            className={`absolute w-[320px] h-[320px] sm:w-[390px] sm:h-[390px] rounded-full border border-dashed transition-all duration-700 ${
              activeMode === "obsidian"
                ? "border-[#F5D996]/60 scale-105"
                : activeMode === "aura"
                ? "border-[#FF8C00]/70 scale-110"
                : "border-[#D4A853]/35"
            }`}
            style={{
              animation: activeMode === "aura" ? "spinSlowReverse 14s linear infinite" : "spinSlowReverse 24s linear infinite",
            }}
          />

          {/* ── Mode 2: Gold Luxe Particle Sparkles (Ambient Halo) ── */}
          {activeMode === "obsidian" && (
            <>
              <div
                className="absolute w-80 h-80 rounded-full pointer-events-none animate-pulse"
                style={{
                  background:
                    "radial-gradient(circle, rgba(245,217,150,0.45) 0%, rgba(212,168,83,0.2) 45%, transparent 70%)",
                  filter: "blur(32px)",
                }}
              />
              <span className="absolute -top-6 left-12 w-2 h-2 rounded-full bg-[#FFF1C5] animate-ping shadow-[0_0_12px_#FFF1C5]" />
              <span className="absolute -bottom-8 right-16 w-2.5 h-2.5 rounded-full bg-[#D4A853] animate-pulse shadow-[0_0_15px_#D4A853]" />
              <span className="absolute top-1/3 -right-8 w-2 h-2 rounded-full bg-[#F5D996] animate-ping shadow-[0_0_12px_#F5D996]" />
            </>
          )}

          {/* ── Mode 3: Core Flare Solar Radiation Halo ── */}
          {activeMode === "aura" && (
            <>
              <div
                className="absolute w-96 h-96 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,140,0,0.5) 0%, rgba(212,168,83,0.3) 40%, transparent 75%)",
                  filter: "blur(40px)",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              <div
                className="absolute w-[420px] h-[420px] rounded-full border-2 border-[#FFA043]/30 pointer-events-none animate-ping"
                style={{ animationDuration: "3s" }}
              />
            </>
          )}

          {/* Default Subtle Ambient Gold Flare for Cyber HUD */}
          {activeMode === "hologram" && (
            <div
              className={`absolute w-72 h-72 rounded-full transition-opacity duration-700 pointer-events-none ${
                isHovered ? "opacity-40 scale-110" : "opacity-25"
              }`}
              style={{
                background: "radial-gradient(circle, rgba(212,168,83,0.35) 0%, transparent 70%)",
                filter: "blur(28px)",
              }}
            />
          )}
        </div>

        {/* ── Main 3D Portrait Frame ── */}
        <div
          className={`relative w-[280px] sm:w-[330px] md:w-[360px] aspect-[4/4.8] rounded-sm overflow-hidden bg-[#0A0D12] transition-all duration-500 ${
            activeMode === "obsidian"
              ? "border-2 border-[#F5D996] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_45px_rgba(245,217,150,0.5),inset_0_0_20px_rgba(212,168,83,0.25)]"
              : activeMode === "aura"
              ? "border-2 border-[#FFA043] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_50px_rgba(255,140,0,0.55),inset_0_0_25px_rgba(255,140,0,0.3)]"
              : isHovered
              ? "border border-[#D4A853] shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(212,168,83,0.35)]"
              : "border border-[var(--border-h)] shadow-[0_18px_50px_rgba(0,0,0,0.85),0_0_20px_rgba(212,168,83,0.12)]"
          }`}
          style={{
            transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
              isHovered ? 1.03 : 1
            })`,
            boxShadow: `0 20px 50px ${shadowIntensity}`,
            transition: "transform 0.15s ease-out, border-color 0.4s, box-shadow 0.4s",
          }}
        >
          {/* Real Portrait Photo of YESURUN A — UNCLUTTERED, 100% VISIBLE */}
          <div className="relative w-full h-full">
            <img
              src="/yesurun.png"
              onError={(e) => {
                e.currentTarget.src = "/sute.png";
              }}
              alt="YESURUN A — Full Stack Developer"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover object-center filter transition-all duration-700 ${
                activeMode === "obsidian"
                  ? "contrast-115 brightness-105 saturate-110"
                  : activeMode === "aura"
                  ? "contrast-115 brightness-110 saturate-120"
                  : "contrast-105 brightness-100"
              }`}
            />

            {/* Dynamic Gold Specular Glare (Reacts to Mouse Position) */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: isHovered ? (activeMode === "obsidian" ? 0.55 : 0.4) : 0.15,
                background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, ${
                  activeMode === "aura"
                    ? "rgba(255,180,80,0.4) 0%, rgba(255,100,0,0.15) 40%, transparent 68%"
                    : "rgba(255,245,210,0.45) 0%, rgba(212,168,83,0.18) 35%, transparent 68%"
                })`,
              }}
            />

            {/* ── Cyber Hologram Scan Line (Mode: Cyber HUD) ── */}
            {activeMode === "hologram" && (
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* Horizontal Laser Scanning Beam */}
                <div
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A853] to-transparent shadow-[0_0_12px_#D4A853]"
                  style={{
                    animation: "scanBeam 3.6s ease-in-out infinite",
                  }}
                />
                {/* Subtle corner crosshairs on frame edges */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#D4A853]/70" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#D4A853]/70" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#D4A853]/70" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#D4A853]/70" />
              </div>
            )}

            {/* ── Mode 2: Gold Luxe Golden Glaze Shimmer ── */}
            {activeMode === "obsidian" && (
              <div className="absolute inset-0 pointer-events-none z-20">
                <div
                  className="absolute inset-0 border border-[#FFF1C5]/40 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 25px rgba(245,217,150,0.35)",
                  }}
                />
              </div>
            )}

            {/* ── Mode 3: Core Flare Solar Energy Edge ── */}
            {activeMode === "aura" && (
              <div className="absolute inset-0 pointer-events-none z-20">
                <div
                  className="absolute inset-0 border border-[#FFA043]/50 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 30px rgba(255,140,0,0.4)",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Interactive Preset Mode Ribbon ── */}
      <div className="flex items-center gap-2 mt-6 p-1.5 rounded-full border border-[var(--border)] bg-[#0C0F15]/95 backdrop-blur-md z-20 shadow-lg">
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = activeMode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                audio.playClick();
                setActiveMode(m.id);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                isActive
                  ? m.id === "obsidian"
                    ? "bg-gradient-to-r from-[#D4A853] to-[#FFF1C5] text-[#080A0D] font-bold shadow-[0_0_16px_rgba(212,168,83,0.6)]"
                    : m.id === "aura"
                    ? "bg-gradient-to-r from-[#FF8C00] to-[#FFA043] text-[#080A0D] font-bold shadow-[0_0_18px_rgba(255,140,0,0.6)]"
                    : "bg-[#D4A853] text-[#080A0D] font-bold shadow-[0_0_14px_rgba(212,168,83,0.5)]"
                  : "text-[var(--text-3)] hover:text-[#D4A853]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
