// src/components/About.jsx
// About section with authoritative biographical data, academic metrics, and interactive constellation
// Features distinct scroll entrance styles for scrolling down vs up and unique hover styles for each card

import { useState } from "react";
import { ME } from "../data/portfolioData";
import { useInView, useCountUp, useScrollDirection, useTilt } from "../utils/hooks";
import SkillsNetwork from "./SkillsNetwork";
import { GraduationCap, ShieldCheck, Sparkles, CheckCircle2, Award } from "lucide-react";
import { audio } from "../utils/audio";

const StatNum = ({ target, label, suffix = "", decimals = 0 }) => {
  const [ref, inView] = useInView(0.4);
  const [hovered, setHovered] = useState(false);
  const count = useCountUp(target, inView, 1800);

  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        setHovered(true);
        audio.playHover();
      }}
      onMouseLeave={() => setHovered(false)}
      className={`border-t transition-all duration-500 pt-5 p-3 rounded-b-sm cursor-pointer ${
        hovered
          ? "border-[#D4A853] bg-[#0E131C] shadow-[0_10px_25px_rgba(212,168,83,0.18)] -translate-y-1.5"
          : "border-[var(--border)] bg-transparent"
      }`}
    >
      <div
        className={`text-4xl md:text-5xl font-light leading-none mb-2 transition-colors ${
          hovered ? "text-[#FFF1C5]" : "text-[#D4A853]"
        }`}
        style={{ fontFamily: "var(--ff-d)" }}
      >
        {decimals > 0 ? (count / Math.pow(10, decimals)).toFixed(decimals) : count}
        {suffix}
      </div>
      <div className="text-xs font-mono text-[var(--text-2)] tracking-wider uppercase">
        {label}
      </div>
    </div>
  );
};

export default function About() {
  const [ref, inView] = useInView(0.08);
  const scrollDir = useScrollDirection();
  const [acadRef, acadTilt, onAcadMove, onAcadLeave] = useTilt(6);
  const [acadHovered, setAcadHovered] = useState(false);
  const [tenetsHovered, setTenetsHovered] = useState(false);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden border-t border-[var(--border)]"
    >
      {/* Background Watermark */}
      <div className="wm" style={{ opacity: 0.35 }}>
        02
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Label */}
        <p className="font-mono text-xs tracking-[0.22em] text-[#D4A853] uppercase mb-4 flex items-center gap-3">
          <span className="w-7 h-[1px] bg-[#D4A853]" />
          About The Developer
        </p>

        {/* Two-Column Grid: Narrative on Left, Academic Badges on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-20">
          {/* Left Column: Narrative & Philosophy with Lateral Slide Reveal */}
          <div
            className={`lg:col-span-7 space-y-7 transition-all duration-1000 ease-out ${
              inView
                ? "opacity-100 translate-x-0 translate-y-0"
                : scrollDir === "down"
                ? "opacity-0 -translate-x-12 translate-y-8"
                : "opacity-0 -translate-x-8 -translate-y-8"
            }`}
          >
            <h2
              className="text-4xl md:text-6xl font-light text-[var(--text)] leading-[1.08]"
              style={{ fontFamily: "var(--ff-d)" }}
            >
              Architectural logic engineered with <em className="text-[#D4A853]">strategic intent</em>
            </h2>

            <p className="text-base text-[var(--text-2)] leading-relaxed">
              I am <strong className="text-[var(--text)] font-medium">YESURUN A</strong>, a Full Stack Developer
              pursuing my B.Tech in Information Technology at{" "}
              <span className="text-[var(--text)]">Panimalar Engineering College (Anna University)</span>,
              maintaining an academic record of <strong className="text-[#D4A853] font-mono">8.40/10 CGPA</strong>.
            </p>

            <p className="text-base text-[var(--text-2)] leading-relaxed">
              My hands-on industry internship experience spans{" "}
              <span className="text-[var(--text)]">AK Infopark Private Limited</span> and{" "}
              <span className="text-[var(--text)]">Infomatrics Project Services</span>, where I built responsive
              React.js interfaces, optimized state management, developed RESTful API endpoints with Node.js and Express,
              and integrated persistent databases including Firebase and PostgreSQL.
            </p>

            <p className="text-base text-[var(--text-2)] leading-relaxed">
              Like a grandmaster approaching a chessboard, I treat every software engineering challenge as a study in
              calculation, foresight, and clean structural execution.
            </p>

            {/* Stat Counters with Individual Interactive Hover Elevation */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <StatNum target={2} label="Internships" />
              <StatNum target={3} label="Flagship Projects" />
              <StatNum target={135} suffix="+" label="LeetCode DSA" />
              <div
                className="border-t border-[var(--border)] pt-5 p-3 transition-all duration-300 hover:border-[#D4A853] hover:bg-[#0E131C] hover:-translate-y-1.5 rounded-b-sm cursor-pointer"
                onMouseEnter={() => audio.playHover()}
              >
                <div
                  className="text-4xl md:text-5xl font-light text-[#D4A853] leading-none mb-2"
                  style={{ fontFamily: "var(--ff-d)" }}
                >
                  8.40
                </div>
                <div className="text-xs font-mono text-[var(--text-2)] tracking-wider uppercase">
                  B.Tech CGPA
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Academic & Technical Verification with 3D Perspective Fold */}
          <div
            className={`lg:col-span-5 space-y-6 transition-all duration-1000 delay-200 ease-out ${
              inView
                ? "opacity-100 translate-x-0 translate-y-0"
                : scrollDir === "down"
                ? "opacity-0 translate-x-12 translate-y-8"
                : "opacity-0 translate-x-8 -translate-y-8"
            }`}
          >
            {/* Academic Card with 3D Tilt & Specular Light on Hover */}
            <div
              ref={acadRef}
              onMouseMove={onAcadMove}
              onMouseEnter={() => {
                setAcadHovered(true);
                audio.playHover();
              }}
              onMouseLeave={(e) => {
                onAcadLeave(e);
                setAcadHovered(false);
              }}
              className={`p-6 md:p-8 rounded-sm border transition-all duration-500 bg-[#0C0F15] relative overflow-hidden cursor-pointer ${
                acadHovered
                  ? "border-[#D4A853] shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(212,168,83,0.3)]"
                  : "border-[var(--border-h)] shadow-xl"
              }`}
              style={{
                transform: `perspective(1000px) rotateX(${acadTilt.x}deg) rotateY(${acadTilt.y}deg)`,
              }}
            >
              {/* Specular Glare on Hover */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: acadHovered ? 0.35 : 0,
                  background: `radial-gradient(circle at ${acadTilt.gx}% ${acadTilt.gy}%, rgba(245,217,150,0.4) 0%, transparent 65%)`,
                }}
              />

              <div className="flex items-center justify-between mb-5 pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#D4A853] uppercase tracking-widest font-semibold">
                  <GraduationCap className={`w-4 h-4 transition-transform duration-300 ${acadHovered ? "scale-125 rotate-6 text-[#FFF1C5]" : ""}`} />
                  <span>Academic Rigor</span>
                </div>
                <span className="text-[0.65rem] font-mono px-2 py-0.5 rounded bg-[var(--gold-dim)] text-[#D4A853] border border-[var(--border-h)]">
                  Anna University
                </span>
              </div>

              <div className="space-y-4">
                <div className="border-b border-[var(--border)] pb-4">
                  <h4 className="text-base font-normal text-[var(--text)] mb-1">
                    {ME.education.degree}
                  </h4>
                  <p className="text-xs text-[#D4A853] font-mono mb-1">
                    {ME.education.institution}
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-3)]">
                    <span>{ME.education.period}</span>
                    <span className="text-[#D4A853] font-semibold">{ME.education.cgpa}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-normal text-[var(--text)] mb-1">
                    {ME.school.degree}
                  </h4>
                  <p className="text-xs text-[#D4A853] font-mono mb-1">
                    {ME.school.institution}
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-3)]">
                    <span>Year: {ME.school.period}</span>
                    <span className="text-[#D4A853] font-semibold">{ME.school.score}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Pillars with Laser Edge Scanner Animation */}
            <div
              onMouseEnter={() => {
                setTenetsHovered(true);
                audio.playHover();
              }}
              onMouseLeave={() => setTenetsHovered(false)}
              className={`p-6 rounded-sm border transition-all duration-500 bg-[#080A0D]/90 space-y-3 relative overflow-hidden cursor-pointer ${
                tenetsHovered
                  ? "border-[#D4A853] shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(212,168,83,0.22)] -translate-y-1"
                  : "border-[var(--border)]"
              }`}
            >
              {/* Scan Beam on Hover */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A853] to-transparent pointer-events-none transition-opacity duration-300 ${
                  tenetsHovered ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  animation: tenetsHovered ? "scanBeam 2.5s ease-in-out infinite" : "none",
                }}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-[#D4A853] uppercase tracking-wider font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Engineering Tenets</span>
                </div>
                <Sparkles className={`w-3.5 h-3.5 text-[#D4A853] transition-transform ${tenetsHovered ? "rotate-45 scale-125" : ""}`} />
              </div>
              <ul className="text-xs font-mono text-[var(--text-2)] space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A853]" />
                  <span>End-to-End System Reliability (Front to Back)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A853]" />
                  <span>Performant State Architecture & RESTful Integrity</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A853]" />
                  <span>Algorithmic Optimization (Arrays, HashMaps, Graphs)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Skills Visualization (Interactive Constellation) ── */}
        <div className="mt-8">
          <SkillsNetwork inView={inView} />
        </div>
      </div>
    </section>
  );
}
