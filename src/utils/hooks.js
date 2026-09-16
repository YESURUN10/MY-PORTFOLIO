// src/utils/hooks.js
// Bespoke UI interaction hooks for animations, scroll telemetry, 3D tilt, magnetic hover, and text scramble

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * useInView: Trigger animations when an element scrolls into the viewport
 * @param {number} threshold - 0 to 1 intersection threshold
 * @param {boolean} once - trigger only once (default true for smooth persistent reveals)
 * @param {string} rootMargin - custom root margin
 */
export function useInView(threshold = 0.12, once = true, rootMargin = "0px 0px -40px 0px") {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if already in viewport immediately on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
      if (once) return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return [ref, inView];
}

/**
 * useScrollProgress: Track vertical scroll progress across the document (0 to 1)
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const calculateProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setProgress(0);
      } else {
        const current = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
        setProgress(current);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(calculateProgress);
        ticking = true;
      }
    };

    calculateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", calculateProgress, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calculateProgress);
    };
  }, []);

  return progress;
}

/**
 * usePrefersReducedMotion: Respect accessibility preference for reduced motion
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mediaQuery.matches);

    const handler = (e) => setReduced(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return reduced;
}


/**
 * useScrollDirection: Returns whether user is scrolling 'down' or 'up'
 */
export function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState("down");
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) > 6) {
        setScrollDir(currentScrollY > lastScrollY.current ? "down" : "up");
        lastScrollY.current = currentScrollY > 0 ? currentScrollY : 0;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollDir;
}

/**
 * useTilt: 3D perspective tilt calculations with specular light coordinates
 * @param {number} maxDeg - Max tilt angle in degrees
 */
export function useTilt(maxDeg = 12) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50 });

  const onMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({
        x: y * -maxDeg,
        y: x * maxDeg,
        gx: (x + 0.5) * 100,
        gy: (y + 0.5) * 100,
      });
    },
    [maxDeg]
  );

  const onMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, gx: 50, gy: 50 });
  }, []);

  return [ref, tilt, onMouseMove, onMouseLeave];
}

/**
 * useMagnetic: Subtle pull towards cursor for luxury interactive buttons
 */
export function useMagnetic(strength = 0.25) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setOffset({
        x: (e.clientX - centerX) * strength,
        y: (e.clientY - centerY) * strength,
      });
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return [ref, offset, onMouseMove, onMouseLeave];
}

/**
 * useTextScramble: Cybernetic cipher scramble resolution effect
 */
export function useTextScramble(targetText, trigger = true, speed = 25) {
  const [text, setText] = useState(targetText);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    if (!trigger || !targetText) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setText(
        targetText
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return targetText[index];
            }
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, speed);

    return () => clearInterval(interval);
  }, [targetText, trigger, speed]);

  return text;
}

/**
 * useCountUp: Numerical count-up metric animator
 */
export function useCountUp(target, trigger = true, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const end = parseInt(target, 10);
    if (isNaN(end)) return;

    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * end);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(update);
  }, [target, trigger, duration]);

  return count;
}
