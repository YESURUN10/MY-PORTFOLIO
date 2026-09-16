// src/components/Resume.jsx
// Experience, Achievements, Certifications & Full Curriculum Vitae modal
// Upgraded with directional scroll-aware reveals and unique, bespoke hover styles for every component.
// Source of truth: Official Resume (2026)

import { useState } from "react";
import { EXPERIENCE, ME, ACHIEVEMENTS, CERTIFICATIONS } from "../data/portfolioData";
import { useInView, useScrollDirection, useTilt } from "../utils/hooks";
import {
  Briefcase,
  GraduationCap,
  Download,
  FileText,
  CheckCircle2,
  X,
  Award,
  Brain,
  ShieldCheck,
  Check,
  ExternalLink,
  Sparkles,
  Zap,
  TrendingUp,
  Terminal,
} from "lucide-react";
import { audio } from "../utils/audio";

// ── Unique Hover Component 1: Internship Experience Card with Timeline Node ──
const ExperienceCard = ({ exp, idx, inView }) => {
  const [hovered, setHovered] = useState(false);
  const delayMs = idx * 140;

  return (
    <div
      className="relative pl-7 sm:pl-10"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
      }}
    >
      {/* Animated Timeline Node on the Left Spine */}
      <div
        className={`absolute left-0 top-6 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-500 z-10 flex items-center justify-center ${
          hovered || inView
            ? "border-[#D4A853] bg-[#0A0D14] shadow-[0_0_12px_#D4A853]"
            : "border-[var(--border-h)] bg-[#07090D]"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
            hovered ? "bg-[#D4A853] scale-125" : "bg-[#D4A853]/70"
          }`}
        />
      </div>

      <div
        onMouseEnter={() => {
          setHovered(true);
          audio.playHover();
        }}
        onMouseLeave={() => setHovered(false)}
        className={`relative p-6 sm:p-8 rounded-sm border transition-all duration-500 cursor-pointer ${
          hovered
            ? "border-[#D4A853] bg-[#0E131C] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,168,83,0.22)] border-l-4 border-l-[#D4A853] translate-x-1.5"
            : "border-[var(--border)] bg-[#0A0D14] border-l-2 border-l-[var(--border-h)]"
        }`}
      >
        {/* Laser Light Accent on Hover */}
        <div
          className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4A853] to-transparent transition-opacity duration-300 pointer-events-none ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Role & Period Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`w-2 h-2 rounded-full transition-colors ${
                  hovered ? "bg-[#D4A853] shadow-[0_0_8px_#D4A853]" : "bg-[var(--text-3)]"
                }`}
              />
              <h3 className="text-xl sm:text-2xl font-normal text-[var(--text)] tracking-tight">
                {exp.role}
              </h3>
            </div>
            <p className="text-sm font-semibold text-[#D4A853] font-mono tracking-wide">
              {exp.company}
            </p>
          </div>
          <div className="font-mono text-xs text-[var(--text-3)] sm:text-right">
            <span className="text-[#EAE6DE]">{exp.date}</span>
            <span className="mx-2">·</span>
            <span>{exp.location}</span>
          </div>
        </div>

        {/* Responsibilities */}
        <ul className="space-y-2.5 mb-5 text-sm sm:text-[0.92rem] text-[var(--text-2)] leading-relaxed">
          {exp.bullets.map((bullet, bIdx) => (
            <li key={bIdx} className="flex items-start gap-3">
              <span className="text-[#D4A853] mt-1 text-xs">›</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack Pills with dynamic hover */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--border)]">
          {exp.tech.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 text-xs font-mono tracking-wider border rounded-none transition-all ${
                hovered
                  ? "border-[#D4A853]/60 bg-[#121824] text-[#F5D996]"
                  : "border-[var(--border)] bg-[#07090D] text-[var(--text-2)]"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Unique Hover Component 2: Academic Record Card ──
const AcademicCard = ({ edu, school, scrollDir }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
        audio.playHover();
      }}
      onMouseLeave={() => setHovered(false)}
      className={`relative p-7 sm:p-8 rounded-sm border transition-all duration-500 bg-[#090C12] ${
        hovered
          ? "border-[#D4A853] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,168,83,0.25)] scale-[1.01]"
          : "border-[var(--border)]"
      } ${scrollDir === "down" ? "translate-y-0" : "-translate-y-0.5"}`}
    >
      <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-[#D4A853] uppercase tracking-widest font-semibold">
          <GraduationCap
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 ${
              hovered ? "rotate-12 scale-110 text-[#F5D996]" : ""
            }`}
          />
          <span>Academic Pedigree</span>
        </div>
        <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--gold-dim)] text-[#D4A853] border border-[var(--border-h)]">
          Verified Degree
        </span>
      </div>

      <div className="space-y-6">
        {/* College / Degree */}
        <div className="border-b border-[var(--border)] pb-5">
          <h4 className="text-lg sm:text-xl font-normal text-[var(--text)] mb-1">
            {edu.degree}
          </h4>
          <p className="text-xs sm:text-sm text-[#D4A853] font-mono mb-2 font-medium">
            {edu.institution}
          </p>
          <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[var(--text-3)] mb-2">
            <span>{edu.period}</span>
            <span className="text-[#D4A853] font-bold px-2 py-0.5 rounded bg-[#131822] border border-[#D4A853]/40">
              {edu.cgpa}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-2)] leading-relaxed">
            {edu.details}
          </p>
        </div>

        {/* School / Higher Secondary */}
        <div>
          <h4 className="text-base font-normal text-[var(--text)] mb-1">
            {school.degree}
          </h4>
          <p className="text-xs sm:text-sm text-[#D4A853] font-mono mb-2 font-medium">
            {school.institution}
          </p>
          <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[var(--text-3)] mb-2">
            <span>Year: {school.period}</span>
            <span className="text-[#D4A853] font-bold px-2 py-0.5 rounded bg-[#131822] border border-[#D4A853]/40">
              {school.score}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-2)] leading-relaxed">
            {school.details}
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Unique Hover Component 3: Honors & Problem Solving Trophy Card ──
const AchievementCard = ({ ach, idx, inView }) => {
  const [tRef, tilt, onMove, onLeave] = useTilt(9);
  const [hovered, setHovered] = useState(false);
  const delayMs = idx * 150;

  return (
    <div
      ref={tRef}
      onMouseMove={onMove}
      onMouseEnter={() => {
        setHovered(true);
        audio.playHover();
      }}
      onMouseLeave={(e) => {
        onLeave(e);
        setHovered(false);
      }}
      className={`relative p-8 sm:p-9 rounded-sm border bg-[#090C12] transition-all duration-500 overflow-hidden cursor-pointer ${
        hovered
          ? "border-[#D4A853] shadow-[0_24px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(212,168,83,0.3)]"
          : "border-[var(--border)]"
      }`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1) translateY(0)`
          : `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(0.96) translateY(24px)`,
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, border-color 0.4s ease, box-shadow 0.4s ease`,
      }}
    >
      {/* Specular Glare */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 0.35 : 0,
          background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(245,217,150,0.4) 0%, transparent 65%)`,
        }}
      />

      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <Award className={`w-5 h-5 transition-transform duration-300 ${hovered ? "scale-125 text-[#FFF1C5]" : "text-[#D4A853]"}`} />
          <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--gold-dim)] text-[#D4A853] border border-[var(--border-h)] font-semibold">
            {ach.badge}
          </span>
        </div>
        <span className="text-xs font-mono text-[var(--text-3)]">{ach.organization}</span>
      </div>

      <h3
        className="text-2xl sm:text-3xl font-light text-[var(--text)] mb-2 group-hover:text-[#D4A853] transition-colors"
        style={{ fontFamily: "var(--ff-d)" }}
      >
        {ach.title}
      </h3>
      <p className="text-xs sm:text-sm font-mono text-[#D4A853] mb-4 font-bold tracking-wide">
        {ach.award}
      </p>
      <p className="text-sm text-[var(--text-2)] leading-relaxed">
        {ach.details}
      </p>
    </div>
  );
};

// ── Unique Hover Component 4: Verified Certification Card ──
const CertificationCard = ({ cert, idx, inView }) => {
  const [hovered, setHovered] = useState(false);
  const delayMs = idx * 110;

  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
        audio.playHover();
      }}
      onMouseLeave={() => setHovered(false)}
      className={`relative p-6 sm:p-7 rounded-sm border bg-[#080A0E] transition-all duration-500 cursor-pointer ${
        hovered
          ? "border-[#D4A853] shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(212,168,83,0.3)] -translate-y-1.5"
          : "border-[var(--border)]"
      }`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, border-color 0.3s ease, box-shadow 0.3s ease`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs text-[#D4A853] uppercase tracking-widest font-semibold flex items-center gap-1.5">
          <Brain className="w-3.5 h-3.5" />
          <span>{cert.badge}</span>
        </span>
        <span
          className={`w-2.5 h-2.5 rounded-full transition-all ${
            hovered ? "bg-[#D4A853] scale-125 shadow-[0_0_10px_#D4A853]" : "bg-[var(--border-h)]"
          }`}
        />
      </div>

      <h4 className="text-base sm:text-lg font-normal text-[var(--text)] mb-2">
        {cert.name}
      </h4>
      <p className="text-xs sm:text-sm text-[#D4A853] font-mono mb-3">
        {cert.issuer}
      </p>
      <p className="text-xs sm:text-sm text-[var(--text-2)] leading-relaxed">
        {cert.desc}
      </p>
    </div>
  );
};

export default function Resume() {
  const [ref, inView] = useInView(0.08);
  const [achRef, achInView] = useInView(0.08);
  const [certRef, certInView] = useInView(0.08);
  const [showCvModal, setShowCvModal] = useState(false);
  const scrollDir = useScrollDirection();

  const handlePrintCv = () => {
    audio.playClick();
    window.print();
  };

  return (
    <section
      id="resume"
      ref={ref}
      className="relative py-28 md:py-36 border-t border-[var(--border)] overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="wm" style={{ opacity: 0.35 }}>
        04
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 transition-all duration-1000 ease-out ${
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
              Industry Record & Credentials
            </p>
            <h2
              className="text-4xl md:text-6xl font-light text-[var(--text)] leading-[1.08]"
              style={{ fontFamily: "var(--ff-d)" }}
            >
              Experience & <em className="text-[#D4A853] italic">accolades</em>
            </h2>
          </div>

          <div>
            <button
              type="button"
              onClick={() => {
                audio.playClick();
                setShowCvModal(true);
              }}
              className="inline-flex items-center gap-3 px-7 py-4 border border-[#D4A853] bg-[#D4A853] text-[#080A0D] text-xs sm:text-sm font-mono font-bold tracking-widest uppercase hover:bg-[#FFF1C5] hover:shadow-[0_0_25px_rgba(212,168,83,0.5)] transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Inspect Full Official CV</span>
            </button>
          </div>
        </div>

        {/* ── Main Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start mb-20">
          {/* Left Column (7 cols): Experience Timeline */}
          <div
            className={`lg:col-span-7 space-y-8 transition-all duration-1000 delay-100 ease-out ${
              inView
                ? "opacity-100 translate-y-0"
                : scrollDir === "down"
                ? "opacity-0 translate-y-10"
                : "opacity-0 -translate-y-8"
            }`}
          >
            <div className="flex items-center gap-2.5 text-sm font-mono text-[#D4A853] uppercase tracking-widest mb-6 font-semibold">
              <Briefcase className="w-4 h-4" />
              <span>Professional Internships</span>
            </div>

            {/* Continuous Vertical Timeline Spine */}
            <div className="relative">
              <div
                className="absolute left-0 top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#D4A853] via-[#D4A853]/40 to-transparent transition-all duration-1000 origin-top"
                style={{
                  transform: inView ? "scaleY(1)" : "scaleY(0)",
                  opacity: inView ? 0.7 : 0,
                }}
              />
              <div className="space-y-8">
                {EXPERIENCE.map((exp, idx) => (
                  <ExperienceCard
                    key={idx}
                    exp={exp}
                    idx={idx}
                    inView={inView}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Education & Verification */}
          <div
            className={`lg:col-span-5 space-y-8 transition-all duration-1000 delay-200 ease-out ${
              inView
                ? "opacity-100 translate-y-0"
                : scrollDir === "down"
                ? "opacity-0 translate-y-10"
                : "opacity-0 -translate-y-8"
            }`}
          >
            <AcademicCard
              edu={ME.education}
              school={ME.school}
              scrollDir={scrollDir}
            />

            {/* Quick Verification Shield Box */}
            <div className="p-7 border border-[var(--border-h)] bg-[#0C1018] rounded-sm relative overflow-hidden group hover:border-[#D4A853] transition-all">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-[#D4A853] uppercase tracking-wider mb-2.5 font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#D4A853]" />
                <span>Candidate Verification</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-2)] leading-relaxed">
                Direct internship references available. Open to full-stack engineering roles and high-impact technical opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* ── Section: Achievements & Problem Solving ── */}
        <div ref={achRef} className="mb-20">
          <div
            className="flex items-center gap-2.5 text-sm font-mono text-[#D4A853] uppercase tracking-widest mb-8 font-semibold transition-all duration-700"
            style={{
              opacity: achInView ? 1 : 0,
              transform: achInView ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <Award className="w-4 h-4" />
            <span>Honors & Algorithmic Problem Solving</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ACHIEVEMENTS.map((ach, idx) => (
              <AchievementCard key={ach.id} ach={ach} idx={idx} inView={achInView} />
            ))}
          </div>
        </div>

        {/* ── Section: Official Certifications ── */}
        <div ref={certRef}>
          <div
            className="flex items-center gap-2.5 text-sm font-mono text-[#D4A853] uppercase tracking-widest mb-8 font-semibold transition-all duration-700"
            style={{
              opacity: certInView ? 1 : 0,
              transform: certInView ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <Brain className="w-4 h-4" />
            <span>Verified Technical Certifications</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, idx) => (
              <CertificationCard key={idx} cert={cert} idx={idx} inView={certInView} />
            ))}
          </div>
        </div>
      </div>

      {/* Full CV Modal */}
      {showCvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0A0D14] border border-[#D4A853] rounded-sm p-6 sm:p-10 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[var(--border)]">
              <div>
                <h3
                  className="text-2xl sm:text-3xl font-light text-[var(--text)]"
                  style={{ fontFamily: "var(--ff-d)" }}
                >
                  Curriculum Vitae — {ME.name}
                </h3>
                <p className="text-xs font-mono text-[#D4A853] mt-1">
                  Source of Truth: Official 2026 Resume Specification
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrintCv}
                  className="px-4 py-2 text-xs font-mono border border-[#D4A853] text-[#D4A853] hover:bg-[#D4A853] hover:text-[#080A0D] transition-colors rounded-none flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    audio.playClick();
                    setShowCvModal(false);
                  }}
                  className="p-2 text-[var(--text-3)] hover:text-[#D4A853] cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Structured Resume Content */}
            <div className="space-y-8 text-sm font-mono text-[var(--text-2)]">
              <div>
                <h4 className="text-base text-[#D4A853] font-bold uppercase mb-2">
                  Contact Coordinates
                </h4>
                <p>Email: {ME.email} | Phone: {ME.phone}</p>
                <p>GitHub: {ME.github} | LinkedIn: {ME.linkedin}</p>
                <p>Location: {ME.location}</p>
              </div>

              <div>
                <h4 className="text-base text-[#D4A853] font-bold uppercase mb-2">
                  Education
                </h4>
                <p className="text-[#EAE6DE] font-semibold">{ME.education.degree}</p>
                <p>{ME.education.institution} ({ME.education.period}) — CGPA: {ME.education.cgpa}</p>
              </div>

              <div>
                <h4 className="text-base text-[#D4A853] font-bold uppercase mb-3">
                  Industry Experience
                </h4>
                {EXPERIENCE.map((exp, idx) => (
                  <div key={idx} className="mb-4">
                    <p className="text-[#EAE6DE] font-semibold">{exp.role} — {exp.company}</p>
                    <p className="text-xs text-[var(--text-3)] mb-2">{exp.date} · {exp.location}</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
