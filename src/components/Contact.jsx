// src/components/Contact.jsx
// Fully functional Contact section with real submission, validation, mailto fallback & clipboard copy
// Enhanced with scroll-direction-aware reveals and unique hover interactions.
// Source of truth: Official Resume (2026)

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  Copy,
  AlertCircle,
  ArrowUpRight,
  Loader2,
  Sparkles,
  Terminal,
} from "lucide-react";
import { ME } from "../data/portfolioData";
import { useInView, useScrollDirection } from "../utils/hooks";
import { audio } from "../utils/audio";

export default function Contact() {
  const [ref, inView] = useInView(0.08);
  const scrollDir = useScrollDirection();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Full-Stack Opportunity",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // 'idle' | 'busy' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Full name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) err.email = "Please enter a valid email address";
    if (form.message.trim().length < 10) err.message = "Message must be at least 10 characters";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    audio.playClick();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus("busy");
    setErrorMessage("");

    try {
      const accessKey =
        import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "d81d2f4f-a11c-4cd9-ada4-959a4fd0a708";

      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("name", form.name.trim());
      formData.append("email", form.email.trim());
      formData.append(
        "subject",
        `[Portfolio Inquiry] ${form.subject.trim() || "Collaboration"} from ${form.name.trim()}`
      );
      formData.append("message", form.message.trim());
      formData.append("to_email", "yesurun893@gmail.com");
      formData.append("from_name", form.name.trim());

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setStatus("success");
        audio.playChime();
        setForm({ name: "", email: "", subject: "Full-Stack Opportunity", message: "" });
      } else {
        throw new Error(data.message || "Failed to submit message to Web3Forms.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err.message || "Failed to dispatch transmission. Please check your network connection and retry."
      );
    }
  };

  const handleCopyEmail = () => {
    audio.playClick();
    navigator.clipboard.writeText(ME.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 md:py-36 border-t border-[var(--border)] overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="wm" style={{ opacity: 0.35 }}>
        05
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Headline */}
        <div
          className={`transition-all duration-1000 ease-out mb-20 ${
            inView
              ? "opacity-100 translate-y-0"
              : scrollDir === "down"
              ? "opacity-0 translate-y-12"
              : "opacity-0 -translate-y-8"
          }`}
        >
          <p className="font-mono text-xs sm:text-sm tracking-[0.22em] text-[#D4A853] uppercase mb-4 flex items-center gap-3 font-semibold">
            <span className="w-8 h-[2px] bg-[#D4A853]" />
            Initiate Contact
          </p>
          <h2
            className="text-4xl md:text-7xl font-light text-[var(--text)] leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--ff-d)" }}
          >
            Let's build <br />
            <em className="shim italic text-[#D4A853]">something</em> <br />
            <span>extraordinary.</span>
          </h2>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          {/* Left Column: Direct Info & Socials with Bespoke Hover Styles */}
          <div
            className={`lg:col-span-5 space-y-10 transition-all duration-1000 delay-150 ease-out ${
              inView
                ? "opacity-100 translate-y-0"
                : scrollDir === "down"
                ? "opacity-0 translate-y-10"
                : "opacity-0 -translate-y-8"
            }`}
          >
            <div>
              <p className="text-sm sm:text-base text-[var(--text-2)] leading-relaxed mb-8">
                I am actively seeking full-stack engineering opportunities, high-growth internships, and creative WebGL / AI engineering roles.
                Whether you have an inquiry about my systems (Nexz, Musify, SynthChef) or want to discuss strategic software architecture, let's connect.
              </p>

              {/* Direct Info Items */}
              <div className="space-y-4">
                {/* Email Item with One-Click Copy */}
                <div
                  onMouseEnter={() => audio.playHover()}
                  className="flex items-start gap-4 p-5 border border-[var(--border)] bg-[#090C12] rounded-sm group hover:border-[#D4A853] hover:shadow-[0_12px_30px_rgba(212,168,83,0.18)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="p-3 rounded-full bg-[var(--gold-dim)] text-[#D4A853] group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-xs tracking-widest text-[var(--text-3)] uppercase block mb-1">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${ME.email}`}
                      className="text-sm sm:text-base text-[var(--text)] font-mono hover:text-[#D4A853] transition-colors block truncate font-medium"
                    >
                      {ME.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 text-[var(--text-3)] hover:text-[#D4A853] transition-colors cursor-pointer"
                    title="Copy email to clipboard"
                    aria-label="Copy email"
                  >
                    {copied ? (
                      <span className="flex items-center gap-1 text-xs font-mono text-[#D4A853]">
                        <Check className="w-4 h-4 text-[#D4A853]" />
                        <span>Copied</span>
                      </span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Phone Item */}
                <div
                  onMouseEnter={() => audio.playHover()}
                  className="flex items-start gap-4 p-5 border border-[var(--border)] bg-[#090C12] rounded-sm group hover:border-[#D4A853] hover:shadow-[0_12px_30px_rgba(212,168,83,0.18)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="p-3 rounded-full bg-[var(--gold-dim)] text-[#D4A853] group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-xs tracking-widest text-[var(--text-3)] uppercase block mb-1">
                      Telephone / Mobile
                    </span>
                    <a
                      href={`tel:${ME.phoneRaw}`}
                      className="text-sm sm:text-base text-[var(--text)] font-mono hover:text-[#D4A853] transition-colors block font-medium"
                    >
                      {ME.phone}
                    </a>
                  </div>
                </div>

                {/* Location Item */}
                <div
                  onMouseEnter={() => audio.playHover()}
                  className="flex items-start gap-4 p-5 border border-[var(--border)] bg-[#090C12] rounded-sm group hover:border-[#D4A853] transition-all duration-300"
                >
                  <div className="p-3 rounded-full bg-[var(--gold-dim)] text-[#D4A853] group-hover:scale-110 transition-transform">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-xs tracking-widest text-[var(--text-3)] uppercase block mb-1">
                      Base Location
                    </span>
                    <p className="text-sm sm:text-base text-[var(--text)] font-mono font-medium">
                      {ME.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Network Channels */}
            <div className="border-t border-[var(--border)] pt-8">
              <span className="font-mono text-xs tracking-widest text-[#D4A853] uppercase block mb-4 font-semibold">
                Verified Digital Profiles
              </span>
              <div className="space-y-3">
                {[
                  ["GitHub", ME.github],
                  ["LinkedIn", ME.linkedin],
                ].map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => audio.playHover()}
                    className="flex items-center justify-between py-2.5 border-b border-[var(--border)] text-sm font-mono text-[var(--text-2)] hover:text-[#D4A853] hover:pl-3 transition-all duration-300"
                  >
                    <span>{name}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-70" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Functional Transmission Form */}
          <div
            className={`lg:col-span-7 bg-[#090C12] border border-[var(--border)] p-8 md:p-12 shadow-2xl rounded-sm transition-all duration-1000 delay-300 ease-out hover:border-[#D4A853]/60 ${
              inView
                ? "opacity-100 translate-y-0"
                : scrollDir === "down"
                ? "opacity-0 translate-y-10"
                : "opacity-0 -translate-y-8"
            }`}
          >
            {status === "success" ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 mx-auto rounded-full border-2 border-[#D4A853] bg-[var(--gold-dim)] flex items-center justify-center text-[#D4A853] text-2xl shadow-[0_0_30px_rgba(212,168,83,0.5)]">
                  ✓
                </div>
                <h3
                  className="text-2xl md:text-3xl font-light text-[var(--text)]"
                  style={{ fontFamily: "var(--ff-d)" }}
                >
                  Message Dispatched Successfully
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-2)] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, {form.name || "colleague"}. Your transmission has been forwarded directly to my inbox ({ME.email}). I will review and reply within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 border border-[#D4A853] text-[#D4A853] text-xs font-mono tracking-widest uppercase hover:bg-[var(--gold-dim)] transition-colors cursor-pointer"
                  >
                    Send Another Transmission
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="c-name"
                      className="block font-mono text-xs uppercase tracking-widest text-[var(--text-3)] mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      id="c-name"
                      type="text"
                      required
                      placeholder="e.g., Sundar Pichai"
                      value={form.name}
                      onChange={handleChange("name")}
                      className="w-full bg-[#07090D] border border-[var(--border)] px-4 py-3.5 text-sm font-mono text-[var(--text)] focus:border-[#D4A853] focus:outline-none transition-colors rounded-none"
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-400 font-mono mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="c-email"
                      className="block font-mono text-xs uppercase tracking-widest text-[var(--text-3)] mb-2"
                    >
                      Your Email *
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      required
                      placeholder="e.g., name@company.com"
                      value={form.email}
                      onChange={handleChange("email")}
                      className="w-full bg-[#07090D] border border-[var(--border)] px-4 py-3.5 text-sm font-mono text-[var(--text)] focus:border-[#D4A853] focus:outline-none transition-colors rounded-none"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-400 font-mono mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="c-subject"
                    className="block font-mono text-xs uppercase tracking-widest text-[var(--text-3)] mb-2"
                  >
                    Subject
                  </label>
                  <input
                    id="c-subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange("subject")}
                    className="w-full bg-[#07090D] border border-[var(--border)] px-4 py-3.5 text-sm font-mono text-[var(--text)] focus:border-[#D4A853] focus:outline-none transition-colors rounded-none"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="c-message"
                    className="block font-mono text-xs uppercase tracking-widest text-[var(--text-3)] mb-2"
                  >
                    Message Payload *
                  </label>
                  <textarea
                    id="c-message"
                    rows={5}
                    required
                    placeholder="Describe your project, role, or technical requirements..."
                    value={form.message}
                    onChange={handleChange("message")}
                    className="w-full bg-[#07090D] border border-[var(--border)] px-4 py-3.5 text-sm font-mono text-[var(--text)] focus:border-[#D4A853] focus:outline-none transition-colors rounded-none resize-none"
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-400 font-mono mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div className="p-4 border border-rose-500/40 bg-rose-500/10 rounded-sm text-xs font-mono text-rose-300 space-y-1.5 animate-fadeIn">
                    <p className="flex items-center gap-2 font-medium">
                      <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                      <span>{errorMessage || "Dispatch failed. Please check your network connection and retry."}</span>
                    </p>
                  </div>
                )}

                {/* Submit Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === "busy"}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#D4A853] bg-[#D4A853] text-[#080A0D] text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#FFF1C5] hover:shadow-[0_0_25px_rgba(212,168,83,0.5)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {status === "busy" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmit Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
