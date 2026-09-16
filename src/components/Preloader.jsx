// src/components/Preloader.jsx
// Luxury Black & Gold Startup Preloader

import { useEffect, useState } from "react";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isGone, setIsGone] = useState(false);

  useEffect(() => {
    const duration = 1600; // 1.6s smooth luxury load
    const startTime = performance.now();

    const updateCounter = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(updateCounter);
      } else {
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            setIsGone(true);
            onComplete?.();
          }, 650);
        }, 200);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [onComplete]);

  if (isGone) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#080A0D] text-[#EAE6DE] transition-opacity duration-700 ease-out select-none ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
    >
      {/* Background radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(212,168,83,0.1) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Monogram */}
        <div className="relative mb-6">
          <span
            className="font-serif text-6xl md:text-7xl text-[#D4A853] tracking-widest inline-block"
            style={{ fontFamily: "var(--ff-d)" }}
          >
            Y.
          </span>
          <div className="absolute -inset-4 rounded-full border border-[rgba(212,168,83,0.25)] animate-ping opacity-30" />
        </div>

        {/* Name and Tagline */}
        <p className="font-mono text-xs tracking-[0.28em] text-[var(--text-2)] uppercase mb-8">
          YESURUN A · Full Stack Developer
        </p>

        {/* Progress bar container */}
        <div className="w-56 h-[2px] bg-[rgba(255,255,255,0.08)] relative overflow-hidden rounded-full mb-4">
          <div
            className="h-full bg-gradient-to-r from-[#D4A853] via-[#E8C87A] to-[#FFF5D0] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="flex items-center justify-between w-56 font-mono text-[0.68rem] text-[var(--text-3)]">
          <span className="tracking-widest uppercase">Initializing 3D Core</span>
          <span className="text-[#D4A853] font-medium">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
