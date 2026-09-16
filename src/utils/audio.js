// src/utils/audio.js
// Subtle Web Audio API micro-feedback for luxury gold UI interactions

const STORAGE_KEY = "portfolio_audio_enabled";

class AudioManager {
  constructor() {
    this.ctx = null;
    this.enabled = this.getInitialState();
  }

  getInitialState() {
    if (typeof window === "undefined") return true;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "false") return false;
      if (stored === "true") return true;
      // No saved preference -> Default to ON
      return true;
    } catch {
      return true;
    }
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, String(this.enabled));
      }
    } catch {
      // LocalStorage access may be restricted in sandboxed environments
    }
    if (this.enabled) {
      this.init();
      this.playChime();
    }
    return this.enabled;
  }

  playHover() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch {
      // AudioContext policy fallback
    }
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // AudioContext policy fallback
    }
  }

  playChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [587.33, 739.99, 880]; // D5, F#5, A5 (warm luxury chord)
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.35);
      });
    } catch {
      // AudioContext policy fallback
    }
  }
}

const rawAudio = new AudioManager();

// Defensive Proxy to ensure calling any audio method is safe and never throws
export const audio = new Proxy(rawAudio, {
  get(target, prop) {
    if (prop in target) {
      const val = target[prop];
      if (typeof val === "function") {
        return val.bind(target);
      }
      return val;
    }
    // Return harmless no-op for any undefined audio action
    return () => {};
  },
});
