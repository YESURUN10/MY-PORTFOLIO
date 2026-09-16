// src/components/ProjectModal.jsx
// Detailed Project Specifications & Architectural Case Study Modal

import { useEffect } from "react";
import { X, ExternalLink, GitBranch, CheckCircle2, Layers, Cpu, Sparkles, Terminal } from "lucide-react";
import { audio } from "../utils/audio";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#0C0F15] text-[#EAE6DE] border border-[var(--border-h)] shadow-2xl p-6 md:p-10 rounded-sm"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(212, 168, 83, 0.18)",
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            audio.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full border border-[var(--border)] text-[var(--text-2)] hover:text-[#D4A853] hover:border-[#D4A853] transition-colors cursor-pointer"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 border-b border-[var(--border)] pb-6 pr-10">
          <div className="flex items-center gap-3 text-xs font-mono text-[#D4A853] tracking-widest uppercase mb-2">
            <span>{project.category}</span>
            <span>·</span>
            <span>Year {project.year}</span>
            <span>·</span>
            <span className="text-[#E8C87A] font-semibold">Flagship Production</span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-light text-[var(--text)] mb-2"
            style={{ fontFamily: "var(--ff-d)" }}
          >
            {project.title}
          </h2>
          <p className="text-sm font-mono text-[var(--text-2)]">
            {project.subtitle}
          </p>
        </div>

        {/* Narrative Description & Highlights */}
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#D4A853] mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            <span>Architecture & Functional Implementation</span>
          </h3>
          <p className="text-sm md:text-base text-[var(--text-2)] leading-relaxed mb-5">
            {project.desc}
          </p>

          {/* Key Deliverables */}
          {project.highlights && (
            <div className="space-y-2.5 bg-[#080A0D] p-5 rounded border border-[var(--border)]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#D4A853] block mb-3">
                Key Technical Highlights
              </span>
              {project.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text)]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A853] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Metrics Bar */}
        {project.metrics && (
          <div className="grid grid-cols-3 gap-4 mb-8 p-4 rounded border border-[var(--border)] bg-[#10141C]">
            {Object.entries(project.metrics).map(([k, v]) => (
              <div key={k} className="text-center">
                <span className="block text-[0.62rem] font-mono uppercase tracking-wider text-[var(--text-3)] mb-1">
                  {k}
                </span>
                <span className="text-xs sm:text-sm font-mono text-[#D4A853] font-medium">
                  {v}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Technology Matrix */}
        <div className="mb-8 border-t border-[var(--border)] pt-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#D4A853] mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>Technology Stack</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs font-mono border border-[var(--border-h)] bg-[var(--surface-h)] text-[var(--text)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Link Bar */}
        <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[var(--border)]">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => audio.playClick()}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#D4A853] bg-[#D4A853] text-[#080A0D] text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#E8C87A] transition-colors"
          >
            <GitBranch className="w-4 h-4" />
            <span>Inspect GitHub Repository</span>
          </a>

          <a
            href={project.live || project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => audio.playClick()}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border)] text-[var(--text)] text-xs font-mono uppercase tracking-widest hover:border-[#D4A853] hover:text-[#D4A853] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Documentation & Source</span>
          </a>
        </div>
      </div>
    </div>
  );
}
