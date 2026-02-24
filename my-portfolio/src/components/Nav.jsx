// Nav.jsx
// Transparent → frosted glass on scroll
// Active section highlighting, theme toggle

import { useState, useEffect } from "react";

const LINKS = ["hero", "about", "projects", "resume", "contact"];

export default function Nav({ active, light, setLight }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
      padding: "22px 6vw",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? (light ? "rgba(244,239,230,0.85)" : "rgba(8,10,13,0.88)") : "transparent",
      backdropFilter: scrolled ? "blur(24px) saturate(1.5)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "none",
      transition: "background 0.55s, backdrop-filter 0.55s, border-color 0.55s",
    }}>
      {/* Wordmark */}
      <a href="#hero" style={{ fontFamily: "var(--ff-display)", fontSize: "1.6rem", color: "var(--gold)", letterSpacing: "0.04em", lineHeight: 1 }}>
        AJ.
      </a>

      {/* Links */}
      <div style={{ display: "flex", gap: "38px" }}>
        {LINKS.map(l => (
          <a key={l} href={`#${l}`} className={`nav-link ${active === l ? "active" : ""}`}>
            {l}
          </a>
        ))}
      </div>

      {/* Theme toggle */}
      <button
        onClick={() => setLight(p => !p)}
        data-hover
        style={{
          padding: "8px 18px",
          border: "1px solid var(--border)",
          color: "var(--text-2)", fontSize: "0.68rem",
          letterSpacing: "0.14em", textTransform: "uppercase",
          fontFamily: "var(--ff-mono)", cursor: "none",
          transition: "border-color 0.3s, color 0.3s",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-2)"; }}
      >
        {light ? "● Dark" : "○ Light"}
      </button>
    </nav>
  );
}
