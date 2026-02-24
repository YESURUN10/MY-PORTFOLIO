// ─── SHARED HOOKS ─────────────────────────────────────────────────────────────
// Each hook is intentionally single-purpose for composability

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * useInView — fires once when element enters viewport
 * Used for triggering one-shot reveal animations
 */
export const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

/**
 * useTextScramble — classic hacker-text effect, resolves char-by-char
 */
export const useTextScramble = (text, active, speed = 28) => {
  const [display, setDisplay] = useState("");
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const total = text.length * 3;
    const id = setInterval(() => {
      setDisplay(
        text.split("").map((ch, i) => {
          if (ch === " ") return " ";
          if (i < frame / 3) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );
      frame++;
      if (frame > total) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active]);
  return display || text;
};

/**
 * useCountUp — animates number from 0 to target on trigger
 */
export const useCountUp = (target, active, duration = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4); // easeOutQuart
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, active]);
  return count;
};

/**
 * useMagnetic — attracts element toward cursor when nearby
 */
export const useMagnetic = (strength = 0.35, radius = 90) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        setOffset({ x: dx * strength, y: dy * strength });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength, radius]);
  return [ref, offset];
};

/**
 * useTilt — 3D tilt based on mouse position inside element
 */
export const useTilt = (maxAngle = 10) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50 });
  const onMove = useCallback((e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: y * maxAngle, y: -x * maxAngle, gx: (x + 0.5) * 100, gy: (y + 0.5) * 100 });
  }, [maxAngle]);
  const onLeave = useCallback(() => setTilt({ x: 0, y: 0, gx: 50, gy: 50 }), []);
  return [ref, tilt, onMove, onLeave];
};

/**
 * useNoiseTexture — generates a canvas noise texture once, returns data URL
 */
export const useNoiseTexture = () => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 180;
    const ctx = canvas.getContext("2d");
    const img = ctx.createImageData(180, 180);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    setUrl(canvas.toDataURL());
  }, []);
  return url;
};
