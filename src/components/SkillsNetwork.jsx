// src/components/SkillsNetwork.jsx
// Upgraded 3D Interactive Skill Constellation
// Strictly aligned with Official Resume (2026) skills only.
// Features orbital rotation on module hover, electric lighting glow animations on all interactive options,
// stylish instruction banner, and clean telemetry without unwanted boilerplate copy.

import { useState, useRef, useEffect, useMemo } from "react";
import { audio } from "../utils/audio";
import {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  Sparkles,
  Compass,
  Zap,
} from "lucide-react";

export default function SkillsNetwork() {
  const [selectedDomain, setSelectedDomain] = useState("frontend");
  const [hoveredDomain, setHoveredDomain] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [orbitAngle, setOrbitAngle] = useState(0);
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);

  // Smooth continuous orbital rotation when hovered
  useEffect(() => {
    let last = performance.now();
    const loop = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      // Faster rotation when a domain is active or hovered
      const speed = hoveredDomain ? 0.95 : 0.32;
      setOrbitAngle((prev) => (prev + dt * speed) % (Math.PI * 2));
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [hoveredDomain]);

  // STRICT RESUME DOMAINS & SKILLS ONLY (No made-up technologies)
  const domains = useMemo(
    () => [
      {
        id: "programming",
        title: "Programming",
        icon: Code2,
        x: 18,
        y: 35,
        skills: [
          { name: "Java", level: "Core", prof: 94, note: "Object-Oriented Programming, Core Java, Data Structures" },
          { name: "JavaScript (ES6+)", level: "Advanced", prof: 95, note: "Modern ECMAScript, Async/Await, DOM, Event Architecture" },
          { name: "SQL", level: "Proficient", prof: 90, note: "Relational Queries, Normalization, Joins & Aggregations" },
        ],
      },
      {
        id: "frontend",
        title: "Frontend",
        icon: Layout,
        x: 50,
        y: 22,
        skills: [
          { name: "React.js", level: "Mastery", prof: 96, note: "Component Architecture, State Hooks, Custom Hooks, Context" },
          { name: "Tailwind CSS", level: "Advanced", prof: 95, note: "Responsive Layouts, Utility Design Systems, Animations" },
          { name: "Vite", level: "Proficient", prof: 92, note: "Modern Build Tooling, ESM bundling, Fast HMR" },
          { name: "HTML5 & CSS3", level: "Mastery", prof: 98, note: "Semantic Markup, Modern Flexbox & CSS Grid, Responsive Styling" },
        ],
      },
      {
        id: "backend",
        title: "Backend",
        icon: Server,
        x: 82,
        y: 35,
        skills: [
          { name: "Node.js", level: "Advanced", prof: 92, note: "Runtime Environment, Asynchronous I/O, REST APIs" },
          { name: "Express.js", level: "Advanced", prof: 90, note: "Routing, Middleware Architecture, Error Handling, API Design" },
          { name: "REST APIs", level: "Mastery", prof: 94, note: "JSON Payloads, HTTP Status Contracts, Endpoint Integration" },
        ],
      },
      {
        id: "databases",
        title: "Databases",
        icon: Database,
        x: 32,
        y: 74,
        skills: [
          { name: "PostgreSQL", level: "Advanced", prof: 91, note: "Relational Tables, ACID Compliance, Schema Design" },
          { name: "MongoDB", level: "Proficient", prof: 88, note: "Document Database, Collections, BSON CRUD Operations" },
          { name: "Firebase", level: "Advanced", prof: 92, note: "Authentication, Realtime Database, Cloud Firestore" },
        ],
      },
      {
        id: "tools",
        title: "Tools",
        icon: Wrench,
        x: 70,
        y: 74,
        skills: [
          { name: "Git & GitHub", level: "Advanced", prof: 94, note: "Version Control, Branching Workflows, Repositories" },
          { name: "Postman", level: "Advanced", prof: 92, note: "API Testing, Request Debugging, Environment Collections" },
        ],
      },
    ],
    []
  );

  // Network connection lines between technological clusters
  const connections = useMemo(
    () => [
      { from: "programming", to: "frontend" },
      { from: "frontend", to: "backend" },
      { from: "backend", to: "databases" },
      { from: "databases", to: "tools" },
      { from: "programming", to: "backend" },
      { from: "programming", to: "databases" },
      { from: "frontend", to: "tools" },
    ],
    []
  );

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 26, y: y * 26 });
  };

  const activeFocusDomain = hoveredDomain || selectedDomain;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full rounded-sm border border-[var(--border)] bg-[#090C12] p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl transition-all duration-500"
    >
      {/* Ambient gold glow in constellation canvas */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-all duration-700 ease-out"
        style={{
          left: `calc(50% + ${mousePos.x * 2.5}px - 250px)`,
          top: `calc(50% + ${mousePos.y * 2.5}px - 250px)`,
          background: "radial-gradient(circle, rgba(212,168,83,0.12) 0%, rgba(212,168,83,0.03) 45%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* ── STYLISH INSTRUCTION & MODE SELECTOR HEADER ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 relative z-20 pb-6 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-3 text-base sm:text-lg font-mono text-[#D4A853] uppercase tracking-widest mb-2 font-bold">
            <div className="relative flex items-center justify-center">
              <Compass className="w-5 h-5 animate-spin text-[#D4A853]" style={{ animationDuration: "20s" }} />
              <span className="absolute w-6 h-6 rounded-full border border-[#D4A853]/40 animate-ping" />
            </div>
            <span className="bg-gradient-to-r from-[#FFF1C5] via-[#D4A853] to-[#F5D996] bg-clip-text text-transparent">
              Interactive Skill Constellation
            </span>
          </div>

          {/* Stylish Futuristic Instruction Bar with Electric Glow */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#D4A853]/40 bg-[#121824]/90 shadow-[0_0_15px_rgba(212,168,83,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-ping" />
            <span className="text-xs sm:text-sm font-mono text-[#F5D996] tracking-wider font-medium">
              Hover nodes to trigger orbital rotation · Click any module to focus
            </span>
            <Zap className="w-3.5 h-3.5 text-[#D4A853] animate-pulse" />
          </div>
        </div>

        {/* Domain Filter Buttons with LIGHTING ANIMATION to show interactivity */}
        <div className="flex flex-wrap gap-2.5">
          {domains.map((d) => {
            const isSelected = selectedDomain === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  audio.playClick();
                  setSelectedDomain(d.id);
                }}
                onMouseEnter={() => {
                  audio.playHover();
                  setHoveredDomain(d.id);
                }}
                onMouseLeave={() => setHoveredDomain(null)}
                className={`relative px-4 py-2 text-xs sm:text-sm font-mono uppercase tracking-wider rounded-full border transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "border-[#FFF1C5] bg-[#D4A853] text-[#080A0D] font-bold shadow-[0_0_22px_rgba(212,168,83,0.7)] scale-105"
                    : "border-[#D4A853]/50 bg-[#0C1018] text-[#EAE6DE] hover:border-[#D4A853] hover:text-[#D4A853] hover:shadow-[0_0_14px_rgba(212,168,83,0.35)] animate-pulse"
                }`}
                style={{
                  animationDuration: isSelected ? "none" : "3s",
                }}
              >
                <d.icon className="w-4 h-4" />
                <span>{d.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 2.5D SVG CONSTELLATION GRAPH (Desktop / Tablet) ── */}
      <div className="relative hidden md:block w-full h-[530px] select-none">
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {/* Golden Vector Interconnect Lines */}
          {connections.map((conn, idx) => {
            const d1 = domains.find((d) => d.id === conn.from);
            const d2 = domains.find((d) => d.id === conn.to);
            if (!d1 || !d2) return null;

            const isHighlighted =
              activeFocusDomain === conn.from || activeFocusDomain === conn.to;

            return (
              <g key={idx}>
                <line
                  x1={`${d1.x}%`}
                  y1={`${d1.y}%`}
                  x2={`${d2.x}%`}
                  y2={`${d2.y}%`}
                  stroke={isHighlighted ? "#D4A853" : "rgba(255,255,255,0.08)"}
                  strokeWidth={isHighlighted ? "2.5" : "1"}
                  strokeDasharray={isHighlighted ? "6 4" : "2 6"}
                  strokeOpacity={isHighlighted ? 0.85 : 0.25}
                  className="transition-all duration-500"
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Domain Hub Nodes */}
        {domains.map((domain) => {
          const Icon = domain.icon;
          const isSelected = selectedDomain === domain.id;
          const isHovered = hoveredDomain === domain.id;
          const isActive = isSelected || isHovered;

          return (
            <div
              key={domain.id}
              style={{
                left: `${domain.x}%`,
                top: `${domain.y}%`,
                transform: `translate(-50%, -50%) translate3d(${mousePos.x * 0.4}px, ${
                  mousePos.y * 0.4
                }px, 0)`,
                transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease",
                opacity: activeFocusDomain ? (isActive ? 1 : 0.4) : 1,
              }}
              onMouseEnter={() => {
                audio.playHover();
                setHoveredDomain(domain.id);
              }}
              onMouseLeave={() => setHoveredDomain(null)}
              className="absolute z-20"
            >
              {/* Rotating Dashed Orbit Ring around the active module */}
              {isActive && (
                <div
                  className="absolute -inset-16 pointer-events-none rounded-full border border-dashed border-[#D4A853]/70 transition-all duration-700"
                  style={{
                    animation: "spinSlow 14s linear infinite",
                    boxShadow: "0 0 45px rgba(212,168,83,0.35)",
                  }}
                />
              )}

              {/* Radial Golden Glow Backdrop with lighting pulse */}
              <div
                className={`absolute -inset-10 rounded-full transition-all duration-500 pointer-events-none ${
                  isActive ? "opacity-100 scale-125" : "opacity-0 scale-90"
                }`}
                style={{
                  background:
                    "radial-gradient(circle, rgba(212,168,83,0.6) 0%, rgba(212,168,83,0.15) 55%, transparent 75%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Central Module Hub Button with Lighting Glow */}
              <div
                onClick={() => {
                  audio.playClick();
                  setSelectedDomain(domain.id);
                }}
                className={`group relative p-4 rounded-full border cursor-pointer transition-all duration-500 ${
                  isActive
                    ? "bg-[#D4A853] text-[#080A0D] border-[#FFF1C5] shadow-[0_0_45px_rgba(212,168,83,0.85)] scale-125"
                    : "bg-[#0E131C] border-[#D4A853]/60 text-[#D4A853] shadow-[0_0_16px_rgba(212,168,83,0.3)] hover:border-[#D4A853] hover:shadow-[0_0_25px_rgba(212,168,83,0.5)]"
                }`}
              >
                <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />

                {/* Floating Hub Name Badge with enlarged font size & clear visibility */}
                <div
                  className={`absolute left-1/2 -bottom-8 -translate-x-1/2 whitespace-nowrap text-xs sm:text-sm font-mono tracking-wider uppercase px-3 py-1 rounded border shadow-xl transition-all duration-300 ${
                    isActive
                      ? "bg-[#D4A853] text-[#080A0D] border-[#FFF1C5] font-bold"
                      : "bg-[#080A0D]/95 border-[#D4A853]/40 text-[#EAE6DE]"
                  }`}
                >
                  {domain.title}
                </div>
              </div>

              {/* ── Orbiting Data / Skill Chips with ROTATION ANIMATION ── */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                {domain.skills.map((skill, sIdx) => {
                  const baseAngle = (sIdx / domain.skills.length) * Math.PI * 2;
                  // If active/hovered, rotate smoothly around the hub!
                  const currentAngle = isActive ? baseAngle + orbitAngle : baseAngle;

                  // Expanded radius for high visibility
                  const radius = isActive ? 112 : 88;
                  const chipX = Math.cos(currentAngle) * radius;
                  const chipY = Math.sin(currentAngle) * radius;

                  const isSkillHover = hoveredSkill?.name === skill.name;

                  return (
                    <div
                      key={skill.name}
                      style={{
                        transform: `translate(${chipX}px, ${chipY}px) translate(-50%, -50%) scale(${
                          isActive ? 1.08 : 0.95
                        })`,
                        transition: isActive
                          ? "none" // Smooth continuous rotation frame
                          : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      onMouseEnter={() => {
                        audio.playHover();
                        setHoveredSkill({ ...skill, domain: domain.title });
                      }}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`pointer-events-auto absolute whitespace-nowrap px-3.5 py-1.5 text-xs sm:text-sm font-mono tracking-wider rounded border cursor-pointer transition-all ${
                        isSkillHover
                          ? "border-[#FFF1C5] bg-[#D4A853] text-[#080A0D] font-bold shadow-[0_0_24px_rgba(212,168,83,0.95)] z-40 scale-125"
                          : isActive
                          ? "border-[#D4A853] bg-[#0E131C] text-[#F5D996] shadow-[0_0_16px_rgba(212,168,83,0.45)] hover:bg-[#D4A853] hover:text-[#080A0D]"
                          : "border-[#D4A853]/40 bg-[#080A0D]/90 text-[#EAE6DE] hover:border-[#D4A853] shadow-[0_0_10px_rgba(212,168,83,0.2)]"
                      }`}
                    >
                      <span>{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Responsive Mobile / Tablet Grid Layout ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-5 relative z-20">
        {domains.map((domain) => {
          const Icon = domain.icon;
          const isSelected = selectedDomain === domain.id;

          return (
            <div
              key={domain.id}
              onClick={() => {
                audio.playClick();
                setSelectedDomain(domain.id);
              }}
              className={`p-6 rounded border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "border-[#D4A853] bg-[#121722] shadow-[0_0_25px_rgba(212,168,83,0.35)]"
                  : "border-[#D4A853]/40 bg-[#0C0F16]"
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-4 text-[#D4A853]">
                <div className="flex items-center gap-2.5">
                  <Icon className="w-5 h-5" />
                  <h4 className="text-base font-mono uppercase tracking-widest font-bold">
                    {domain.title}
                  </h4>
                </div>
                <Sparkles className="w-4 h-4 text-[#D4A853] animate-pulse" />
              </div>

              <div className="flex flex-wrap gap-2">
                {domain.skills.map((skill) => (
                  <button
                    key={skill.name}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      audio.playClick();
                      setHoveredSkill({ ...skill, domain: domain.title });
                    }}
                    className="px-3.5 py-1.5 text-xs sm:text-sm font-mono border border-[#D4A853]/50 rounded bg-[#080A0D] text-[#EAE6DE] hover:border-[#D4A853] hover:text-[#D4A853] transition-colors shadow-[0_0_8px_rgba(212,168,83,0.15)]"
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── CLEAN ACTIVE SKILL DETAILS FOOTER (Without Unwanted Boilerplate) ── */}
      <div className="mt-8 pt-6 border-t border-[var(--border)] relative z-20">
        <div className="p-5 sm:p-6 rounded bg-[#0B0F17]/95 border border-[var(--border-h)]">
          {hoveredSkill ? (
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4A853] animate-ping" />
                <h5 className="text-lg sm:text-xl font-mono font-bold text-[#D4A853] tracking-wide">
                  {hoveredSkill.name}
                </h5>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[var(--gold-dim)] text-[#D4A853] border border-[var(--border-h)] font-semibold uppercase">
                  {hoveredSkill.level} · {hoveredSkill.prof}% Mastery
                </span>
                <span className="text-xs font-mono text-[var(--text-3)]">
                  Domain: {hoveredSkill.domain}
                </span>
              </div>
              <p className="text-sm sm:text-base text-[var(--text)] font-mono leading-relaxed">
                {hoveredSkill.note}
              </p>

              {/* Animated Proficiency Bar */}
              <div className="w-full max-w-md bg-[#161B26] h-2 rounded-full mt-3 overflow-hidden border border-[var(--border)]">
                <div
                  className="h-full bg-gradient-to-r from-[#D4A853] to-[#FFF1C5] rounded-full transition-all duration-700 shadow-[0_0_12px_#D4A853]"
                  style={{ width: `${hoveredSkill.prof}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4 text-xs sm:text-sm font-mono text-[#D4A853]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse" />
                <span>Active Focus: {domains.find((d) => d.id === activeFocusDomain)?.title}</span>
              </div>
              <span className="text-[var(--text-3)]">
                {domains.find((d) => d.id === activeFocusDomain)?.skills.map((s) => s.name).join(" · ")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
