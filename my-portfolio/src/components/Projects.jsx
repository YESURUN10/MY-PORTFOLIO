// Projects.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Features:
//   • 3D tilt cards (mouse-tracking perspective transform)
//   • Dynamic radial gradient that follows mouse within card
//   • Hover-reveal project description + tags
//   • Wide/narrow card layout (2-column spans)
//   • Animated bottom accent bar on hover

import { useState } from "react";
import { useInView, useTilt } from "../utils/hooks";
import Label from "./Label";

const PROJECTS = [
  {
    id: 1, title: "Aether Design System", cat: "Design System · React",
    year: "2024", wide: true,
    desc: "Token-driven, fully accessible design system powering 14 product teams. 280+ components, automated Figma-to-code pipeline, and sub-30ms render budgets enforced by CI.",
    tags: ["React", "TypeScript", "Storybook", "Design Tokens"],
    accent: "rgba(212,168,83,",
  },
  {
    id: 2, title: "Luminary Analytics", cat: "SaaS · Data Viz",
    year: "2024", wide: false,
    desc: "Real-time analytics processing 40M events/day. Custom WebGL chart engine, spatial UI paradigm.",
    tags: ["WebGL", "D3", "ClickHouse", "Next.js"],
    accent: "rgba(122,156,173,",
  },
  {
    id: 3, title: "Chorus Creative Studio", cat: "Agency · 3D Web",
    year: "2023", wide: false,
    desc: "Award-winning agency site with custom GLSL shaders. 98 Lighthouse despite heavy 3D animation.",
    tags: ["Three.js", "GLSL", "GSAP"],
    accent: "rgba(160,128,96,",
  },
  {
    id: 4, title: "Meridian OS", cat: "App · Systems Design",
    year: "2023", wide: true,
    desc: "Next-gen project management OS for distributed teams. Offline-first CRDT architecture, AI-assisted workflows, and a spatial canvas interface that rethinks how teams see their work.",
    tags: ["Electron", "CRDTs", "SQLite", "AI", "Design"],
    accent: "rgba(109,138,122,",
  },
];

const ProjCard = ({ project: p }) => {
  const [tRef, tilt, onMove, onLeave] = useTilt(8);
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={tRef}
      className="pc"
      style={{
        gridColumn: p.wide ? "span 2" : "span 1",
        minHeight: p.wide ? "400px" : "340px",
        transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${hov ? 1.012 : 1})`,
        transition: "box-shadow .4s, border-color .4s, transform .65s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseMove={onMove}
      onMouseLeave={(e) => { onLeave(e); setHov(false); }}
      onMouseEnter={() => setHov(true)}
    >
      {/* Mouse-following radial gradient */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `radial-gradient(ellipse at ${tilt.gx}% ${tilt.gy}%, ${p.accent}.14) 0%, transparent 62%)`,
        transition: "background .12s",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 1, padding: "36px",
        height: "100%", display: "flex", flexDirection: "column",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", marginBottom: "20px",
        }}>
          <span className="mo" style={{
            fontSize: ".65rem", letterSpacing: ".18em",
            color: p.accent + "0.9)", textTransform: "uppercase",
          }}>
            {p.cat}
          </span>
          <span className="mo" style={{ fontSize: ".65rem", color: "var(--text-3)" }}>
            {p.year}
          </span>
        </div>

        <h3 className="dp" style={{
          fontSize: p.wide ? "2.5rem" : "1.9rem",
          fontWeight: 300, lineHeight: 1.08, color: "var(--text)",
          marginBottom: "auto",
          transform: `translateY(${hov ? -6 : 0}px)`,
          transition: "transform .5s cubic-bezier(0.16,1,0.3,1)",
        }}>
          {p.title}
        </h3>

        {/* Hover reveal */}
        <div style={{
          marginTop: "24px",
          opacity: hov ? 1 : 0,
          transform: hov ? "none" : "translateY(14px)",
          transition: "opacity .4s, transform .4s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <p style={{
            fontSize: ".88rem", color: "var(--text-2)",
            lineHeight: 1.74, marginBottom: "18px",
          }}>
            {p.desc}
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {p.tags.map(t => (
              <span key={t} className="pc-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom glow bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${p.accent}.85), transparent)`,
        opacity: hov ? 1 : 0, transition: "opacity .4s",
      }} />
    </div>
  );
};

export default function Projects() {
  const [ref, visible] = useInView(.08);

  return (
    <section id="projects" style={{
      minHeight: "100vh", padding: "130px 0",
      position: "relative", zIndex: 1, overflow: "hidden",
    }}>
      <div className="wm">03</div>
      <div style={{ padding: "0 9vw" }} ref={ref}>

        <div className={`r ${visible ? "v" : ""}`}>
          <Label>Selected work</Label>
          <h2 className="dp" style={{
            fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 300,
            marginBottom: "64px", maxWidth: "440px",
          }}>
            Work that <em style={{ color: "var(--gold)" }}>mattered</em>
          </h2>
        </div>

        <div className="proj-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "18px",
        }}>
          {PROJECTS.map(p => <ProjCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  );
}
