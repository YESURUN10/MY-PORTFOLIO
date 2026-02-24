// Cursor.jsx
// Custom cursor: dot (snappy) + ring (lagging) + ambient glow (very slow)
// Detects hoverable elements via data-hover attribute or standard interactive tags

import { useEffect, useRef } from "react";

export default function Cursor({ light }) {
  const dot   = useRef(null);
  const ring  = useRef(null);
  const glow  = useRef(null);

  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;  // ring position (lagging)
    let gx = mx, gy = my;  // glow position (very slow)
    let raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    const onEnter = () => {
      ring.current?.classList.add("active");
      dot.current  && (dot.current.style.transform  = "translate(-50%,-50%) scale(0)");
    };
    const onLeave = () => {
      ring.current?.classList.remove("active");
      dot.current  && (dot.current.style.transform  = "translate(-50%,-50%) scale(1)");
    };
    const onDown  = () => ring.current?.classList.add("click");
    const onUp    = () => ring.current?.classList.remove("click");

    const bindHovers = () => {
      document.querySelectorAll("a, button, [data-hover], input, textarea").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    bindHovers();
    // Re-bind on DOM changes
    const mo = new MutationObserver(bindHovers);
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      // Dot snaps
      if (dot.current) {
        dot.current.style.left = mx + "px";
        dot.current.style.top  = my + "px";
      }
      // Ring lags
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      if (ring.current) {
        ring.current.style.left = rx + "px";
        ring.current.style.top  = ry + "px";
      }
      // Glow very slow
      gx += (mx - gx) * 0.035;
      gy += (my - gy) * 0.035;
      if (glow.current) {
        glow.current.style.left = gx + "px";
        glow.current.style.top  = gy + "px";
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      {/* Ambient glow — large, very slow-following radial */}
      <div ref={glow} className="cursor-glow" />
      {/* Precise dot */}
      <div ref={dot}  className="cursor-dot"  />
      {/* Lagging ring */}
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
