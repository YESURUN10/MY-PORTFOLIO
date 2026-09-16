// src/components/Projects.jsx
// Interactive 3D Architectural Project Showcase for Nexz, Musify, and SynthChef
// Features Live Interactive Execution Previews, Terminal Simulators, Audio Frequency Visualizers,
// and scroll-direction-aware entrance transitions.

import { useState } from "react";
import {
  GitBranch,
  ExternalLink,
  Info,
  ArrowUpRight,
  Cpu,
  Layers,
  Play,
  Pause,
  Terminal,
  Activity,
  Sparkles,
  Zap,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { PROJECTS } from "../data/portfolioData";
import { useTilt, useScrollDirection, useInView } from "../utils/hooks";
import ProjectModal from "./ProjectModal";
import { audio } from "../utils/audio";

// ── Interactive Nexz Simulation: Live AI Automation Workflow Terminal ──
const NexzSimulation = () => {
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState([
    "INITIALIZED: Nexz Workflow Engine v2.4",
    "READY: Groq LLaMA 3 Core Online (420 tokens/s)",
    "DB: PostgreSQL Connection Pool Active (ACID)",
  ]);

  const runWorkflow = () => {
    if (running) return;
    audio.playClick();
    setRunning(true);
    setLogs((prev) => [...prev, ">> DISPATCH: Triggering multi-step autonomous pipeline..."]);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        ">> AGENT: Groq LLaMA 3 analyzing input context & decision branches",
      ]);
    }, 500);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        ">> DATABASE: Committing structured state payload to PostgreSQL",
      ]);
    }, 1100);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        ">> COMPLETED: Workflow finished successfully. Latency: 36ms. Zero dropped frames.",
      ]);
      setRunning(false);
    }, 1700);
  };

  return (
    <div className="mt-5 rounded border border-[var(--border-h)] bg-[#07090D] p-4 font-mono text-xs overflow-hidden">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2 text-[#D4A853]">
          <Terminal className="w-3.5 h-3.5" />
          <span className="text-[0.68rem] tracking-wider uppercase font-semibold">
            Nexz Autonomous Pipeline Sim
          </span>
        </div>
        <button
          type="button"
          onClick={runWorkflow}
          disabled={running}
          className="flex items-center gap-1.5 px-2.5 py-1 text-[0.64rem] uppercase tracking-wider rounded bg-[#D4A853] text-[#080A0D] font-bold hover:bg-[#F5D996] transition-all disabled:opacity-50 cursor-pointer"
        >
          <Zap className="w-3 h-3" />
          <span>{running ? "Executing..." : "Run Test Pipeline"}</span>
        </button>
      </div>

      <div className="space-y-1.5 max-h-32 overflow-y-auto text-[0.68rem] text-[var(--text-2)]">
        {logs.slice(-4).map((log, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-[#D4A853] select-none">›</span>
            <span className={log.startsWith(">> COMPLETED") ? "text-[#73DCA5] font-semibold" : ""}>
              {log}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Interactive Musify Simulation: Real-time Audio Visualizer ──
const MusifySimulation = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="mt-5 rounded border border-[var(--border-h)] bg-[#07090D] p-4 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2 text-[#D4A853]">
          <Activity className="w-3.5 h-3.5" />
          <span className="text-[0.68rem] tracking-wider uppercase font-semibold">
            WebAudio 64-Band Spectrum
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            audio.playClick();
            setIsPlaying(!isPlaying);
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 text-[0.64rem] uppercase tracking-wider rounded border border-[#D4A853] text-[#D4A853] hover:bg-[#D4A853] hover:text-[#080A0D] transition-all cursor-pointer"
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          <span>{isPlaying ? "Pause Stream" : "Resume Stream"}</span>
        </button>
      </div>

      {/* Animated Frequency Bars */}
      <div className="flex items-end gap-1.5 h-14 px-2 py-1 bg-[#0A0D14] rounded border border-[var(--border)]">
        {[40, 75, 95, 60, 85, 100, 70, 90, 50, 80, 65, 95, 45, 85, 60, 75].map((h, idx) => (
          <div
            key={idx}
            className="flex-1 rounded-t-sm transition-all duration-300"
            style={{
              height: isPlaying ? `${Math.max(15, (h * (idx % 2 === 0 ? 0.9 : 1.1)) % 100)}%` : "15%",
              background: isPlaying
                ? "linear-gradient(180deg, #F5D996 0%, #D4A853 100%)"
                : "rgba(212,168,83,0.25)",
              animation: isPlaying
                ? `pulseBar 0.${4 + (idx % 4)}s ease-in-out infinite alternate`
                : "none",
            }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-[0.62rem] text-[var(--text-3)] mt-2">
        <span>AUDIO STREAM: 320 kbps AAC</span>
        <span>BUFFER: 100% (LOW LATENCY)</span>
      </div>
    </div>
  );
};

// ── Interactive SynthChef Simulation: AI Recipe Prompt & Macros Breakdown ──
const SynthChefSimulation = () => {
  const [selectedTag, setSelectedTag] = useState("High Protein");

  const tags = [
    { name: "High Protein", macro: "42g Protein · 480 kcal" },
    { name: "Keto Macro", macro: "6g Carbs · 520 kcal" },
    { name: "Quick Prep", macro: "12 mins · 380 kcal" },
  ];

  return (
    <div className="mt-5 rounded border border-[var(--border-h)] bg-[#07090D] p-4 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2 text-[#D4A853]">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-[0.68rem] tracking-wider uppercase font-semibold">
            Generative Culinary Macros
          </span>
        </div>
        <span className="text-[0.62rem] px-2 py-0.5 rounded bg-[var(--gold-dim)] text-[#D4A853] border border-[var(--border-h)]">
          Groq AI Powered
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((t) => (
          <button
            key={t.name}
            type="button"
            onClick={() => {
              audio.playHover();
              setSelectedTag(t.name);
            }}
            className={`px-2.5 py-1 text-[0.64rem] uppercase tracking-wider rounded border transition-all cursor-pointer ${
              selectedTag === t.name
                ? "border-[#D4A853] bg-[#D4A853] text-[#080A0D] font-bold"
                : "border-[var(--border)] bg-[#0C0F15] text-[var(--text-2)] hover:border-[#D4A853]"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="p-2.5 rounded bg-[#0A0D14] border border-[var(--border)] flex items-center justify-between text-[0.68rem]">
        <span className="text-[var(--text-2)]">Estimated Profile:</span>
        <span className="text-[#D4A853] font-bold">
          {tags.find((t) => t.name === selectedTag)?.macro}
        </span>
      </div>
    </div>
  );
};

// ── Project Card with In-Card Tabs, 3D Tilt & Directional Scroll Reveal ──
const ProjCard = ({ project: p, idx, inView, onOpenModal }) => {
  const [tRef, tilt, onMove, onLeave] = useTilt(8);
  const [hovered, setHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'simulation' | 'metrics'
  const delayMs = idx * 130;

  return (
    <div
      ref={tRef}
      className={`group rounded-sm relative transition-all duration-700 ${
        idx === 0 ? "lg:col-span-12" : "lg:col-span-6"
      } ${
        hovered
          ? "border-[#D4A853] shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(212,168,83,0.3)]"
          : "border-[var(--border)] shadow-xl"
      } border bg-[#090C12] overflow-hidden`}
      style={{
        minHeight: idx === 0 ? "460px" : "420px",
        opacity: inView ? 1 : 0,
        transform: inView
          ? `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.015 : 1}) translate3d(0, 0, 0)`
          : `perspective(1200px) rotateX(0deg) rotateY(0deg) scale(0.96) translate3d(0, 32px, 0)`,
        transition: `opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, border-color 0.4s ease, box-shadow 0.4s ease`,
      }}
      onMouseMove={onMove}
      onMouseLeave={(e) => {
        onLeave(e);
        setHovered(false);
      }}
      onMouseEnter={() => {
        setHovered(true);
        audio.playHover();
      }}
    >
      {/* Dynamic Specular Gold Glare on Card */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: `radial-gradient(ellipse at ${tilt.gx}% ${tilt.gy}%, rgba(212,168,83,0.18) 0%, transparent 68%)`,
          transition: "background .15s",
        }}
      />

      {/* Top Laser Accent Beam on Hover */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A853] to-transparent transition-opacity duration-500 pointer-events-none ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Card Content */}
      <div className="relative z-10 p-7 sm:p-9 md:p-10 h-full flex flex-col justify-between">
        <div>
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse" />
              <span className="font-mono text-xs tracking-widest uppercase text-[#D4A853] font-bold">
                {p.category} · {p.year}
              </span>
            </div>

            {/* In-Card Interactive Feature Tabs */}
            <div className="flex items-center gap-1 p-0.5 rounded-full border border-[var(--border)] bg-[#06080C]">
              <button
                type="button"
                onClick={() => {
                  audio.playClick();
                  setActiveTab("overview");
                }}
                className={`px-2.5 py-0.5 text-[0.64rem] font-mono uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-[#D4A853] text-[#080A0D] font-bold"
                    : "text-[var(--text-3)] hover:text-[#D4A853]"
                }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => {
                  audio.playClick();
                  setActiveTab("simulation");
                }}
                className={`px-2.5 py-0.5 text-[0.64rem] font-mono uppercase tracking-wider rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === "simulation"
                    ? "bg-[#D4A853] text-[#080A0D] font-bold"
                    : "text-[var(--text-3)] hover:text-[#D4A853]"
                }`}
              >
                <Activity className="w-2.5 h-2.5" />
                <span>Live Sim</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  audio.playClick();
                  setActiveTab("metrics");
                }}
                className={`px-2.5 py-0.5 text-[0.64rem] font-mono uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                  activeTab === "metrics"
                    ? "bg-[#D4A853] text-[#080A0D] font-bold"
                    : "text-[var(--text-3)] hover:text-[#D4A853]"
                }`}
              >
                Metrics
              </button>
            </div>
          </div>

          {/* Title */}
          <h3
            className="font-light text-3xl sm:text-4xl lg:text-5xl text-[var(--text)] tracking-tight mb-2 group-hover:text-[#D4A853] transition-colors"
            style={{ fontFamily: "var(--ff-d)" }}
          >
            {p.title}
          </h3>

          <p className="text-xs sm:text-sm font-mono text-[#D4A853] mb-4 uppercase tracking-widest font-medium">
            {p.subtitle}
          </p>

          {/* Conditional Tab Body */}
          {activeTab === "overview" && (
            <p className="text-sm sm:text-base text-[var(--text-2)] leading-relaxed mb-6 max-w-3xl">
              {p.desc}
            </p>
          )}

          {activeTab === "simulation" && (
            <div className="mb-6">
              {p.id === "nexz" && <NexzSimulation />}
              {p.id === "musify" && <MusifySimulation />}
              {p.id === "synthchef" && <SynthChefSimulation />}
            </div>
          )}

          {activeTab === "metrics" && (
            <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded bg-[#07090D] border border-[var(--border-h)]">
              {p.highlights.map((h, hIdx) => (
                <div key={hIdx} className="font-mono">
                  <span className="text-[0.64rem] text-[var(--text-3)] block uppercase">
                    Spec 0{hIdx + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-[#EAE6DE] font-semibold flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-[#D4A853]" />
                    <span>{h}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {/* Tech Tag Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {p.tech.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-mono rounded-none border border-[var(--border)] bg-[#070A0F] text-[#EAE6DE] group-hover:border-[#D4A853]/60 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Link Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={() => onOpenModal(p)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-widest text-[#D4A853] hover:text-[#FFF1C5] cursor-pointer font-semibold group/btn"
            >
              <Info className="w-4 h-4 transition-transform group-hover/btn:rotate-12" />
              <span>Deep Architecture Specs</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-5">
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audio.playClick()}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono tracking-widest uppercase text-[var(--text-2)] hover:text-[#D4A853] transition-colors"
                title={`View ${p.title} GitHub Repository`}
              >
                <GitBranch className="w-4 h-4 text-[#D4A853]" />
                <span>GitHub</span>
              </a>

              <a
                href={p.live || p.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audio.playClick()}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono tracking-widest uppercase text-[var(--text-2)] hover:text-[#D4A853] transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-[#D4A853]" />
                <span>Source / Repo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [activeModalProject, setActiveModalProject] = useState(null);
  const scrollDir = useScrollDirection();
  const [ref, inView] = useInView(0.06);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-28 md:py-36 border-t border-[var(--border)] overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="wm" style={{ opacity: 0.35 }}>
        03
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header with dynamic entrance */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 transition-all duration-1000 ease-out ${
            inView
              ? "opacity-100 translate-y-0"
              : scrollDir === "down"
              ? "opacity-0 translate-y-12"
              : "opacity-0 -translate-y-8"
          }`}
        >
          <div>
            <p className="font-mono text-xs sm:text-sm tracking-[0.22em] text-[#D4A853] uppercase mb-4 flex items-center gap-3 font-semibold">
              <span className="w-8 h-[2px] bg-[#D4A853]" />
              Architectural Works & AI Systems
            </p>
            <h2
              className="text-4xl md:text-6xl font-light text-[var(--text)] leading-[1.08]"
              style={{ fontFamily: "var(--ff-d)" }}
            >
              Featured systems & <em className="text-[#D4A853] italic">applications</em>
            </h2>
          </div>

          <div className="max-w-sm">
            <p className="text-xs sm:text-sm font-mono text-[var(--text-3)] leading-relaxed">
              Engineered with React.js, Node.js, Express, PostgreSQL, Groq LLaMA 3, and Firebase.
              Includes interactive in-card execution simulators.
            </p>
          </div>
        </div>

        {/* 3-Project Grid: Nexz featured on top, Musify and SynthChef side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {PROJECTS.map((proj, idx) => (
            <ProjCard
              key={proj.id}
              project={proj}
              idx={idx}
              inView={inView}
              onOpenModal={(p) => {
                audio.playClick();
                setActiveModalProject(p);
              }}
            />
          ))}
        </div>
      </div>

      {/* Project Architectural Case Study Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}
