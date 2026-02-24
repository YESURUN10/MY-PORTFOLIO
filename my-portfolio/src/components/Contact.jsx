// Contact.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Features:
//   • Big editorial statement headline
//   • Floating label form inputs
//   • Client-side validation with field-level error messages
//   • Animated send state (spinner)
//   • Success animation panel
//   • Social links with slide-right hover effect

import { useState } from "react";
import { useInView } from "../utils/hooks";
import Label from "./Label";
import MagBtn from "./MagBtn";

const SOCIALS = [
  ["GitHub",   "github.com/alexjordan"],
  ["LinkedIn", "linkedin.com/in/alexjordan"],
  ["Dribbble", "dribbble.com/alexjordan"],
  ["Twitter",  "twitter.com/alexjordan"],
];

const FloatInput = ({ field, label, placeholder, type = "text", textarea, value, onChange, error }) => (
  <div style={{ position: "relative", marginBottom: "36px" }}>
    {textarea ? (
      <textarea
        className="fi"
        placeholder={placeholder}
        rows={5}
        value={value}
        onChange={onChange}
        data-hover
      />
    ) : (
      <input
        type={type}
        className="fi"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        data-hover
      />
    )}
    <label className="label-float">{label}</label>
    {error && (
      <p style={{ fontSize: ".7rem", color: "#C87070", marginTop: "6px" }}>{error}</p>
    )}
  </div>
);

export default function Contact() {
  const [form,   setForm]   = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | busy | ok
  const [errs,   setErrs]   = useState({});
  const [ref, v] = useInView(.08);

  const set = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())                    e.name    = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email))  e.email   = "Valid email required";
    if (form.message.trim().length < 20)       e.message = "At least 20 characters";
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrs(e); return; }
    setErrs({}); setStatus("busy");
    // Simulate network call — replace with your API
    await new Promise(r => setTimeout(r, 1700));
    setStatus("ok");
  };

  return (
    <section id="contact" style={{
      padding: "130px 0 0", position: "relative", zIndex: 1,
      borderTop: "1px solid var(--border)",
    }}>
      <div className="wm">05</div>
      <div style={{ padding: "0 9vw" }} ref={ref}>

        {/* Big statement */}
        <div className={`r ${v ? "v" : ""}`} style={{ marginBottom: "88px" }}>
          <h2 className="dp" style={{
            fontSize: "clamp(3rem, 7vw, 7rem)", fontWeight: 300,
            lineHeight: 1.02, letterSpacing: "-.022em",
          }}>
            Let's build<br />
            <em className="shim">something</em><br />
            extraordinary.
          </h2>
        </div>

        <div className="two-col" style={{
          display: "grid", gridTemplateColumns: "1fr 1.5fr",
          gap: "88px", alignItems: "start",
        }}>

          {/* ── Contact info ── */}
          <div className={`r d2 ${v ? "v" : ""}`}>
            {[
              ["Email",    "alex@alexjordan.dev"],
              ["Phone",    "+1 (415) 555-0192"],
              ["Location", "San Francisco, CA"],
            ].map(([label, val]) => (
              <div key={label} style={{ marginBottom: "36px" }}>
                <p className="mo" style={{
                  fontSize: ".62rem", letterSpacing: ".2em", color: "var(--gold)",
                  textTransform: "uppercase", marginBottom: "8px",
                }}>
                  {label}
                </p>
                <p style={{ fontSize: ".97rem", color: "var(--text)" }}>{val}</p>
              </div>
            ))}

            {/* Socials */}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "32px" }}>
              <p className="mo" style={{
                fontSize: ".62rem", letterSpacing: ".2em", color: "var(--gold)",
                textTransform: "uppercase", marginBottom: "16px",
              }}>
                Elsewhere
              </p>
              {SOCIALS.map(([name, url]) => (
                <a key={name} href="#" data-hover style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 0", borderBottom: "1px solid var(--border)",
                  color: "var(--text-2)", fontSize: ".88rem",
                  transition: "color .25s, padding-left .25s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.paddingLeft = "8px"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--text-2)"; e.currentTarget.style.paddingLeft = "0"; }}
                >
                  <span>{name}</span>
                  <span style={{ fontSize: ".72rem", opacity: .55 }}>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* ── Form ── */}
          <div className={`r d3 ${v ? "v" : ""}`}>
            {status === "ok" ? (
              <div style={{
                padding: "60px 44px", border: "1px solid rgba(212,168,83,.3)",
                textAlign: "center", animation: "successPop .65s cubic-bezier(0.16,1,0.3,1) both",
              }}>
                <div className="dp" style={{ fontSize: "3.2rem", color: "var(--gold)", marginBottom: "16px" }}>✓</div>
                <p className="dp" style={{ fontSize: "1.65rem", fontWeight: 300, fontStyle: "italic", color: "var(--text)", marginBottom: "8px" }}>
                  Message received.
                </p>
                <p style={{ color: "var(--text-2)", fontSize: ".88rem" }}>I'll reply within 24 hours.</p>
              </div>
            ) : (
              <>
                <FloatInput field="name"    label="Full name"     placeholder="Jane Smith"         value={form.name}    onChange={set("name")}    error={errs.name}    />
                <FloatInput field="email"   label="Email address" placeholder="jane@company.com"   type="email" value={form.email}   onChange={set("email")}   error={errs.email}   />
                <FloatInput field="message" label="Message"       placeholder="Tell me about the project..." textarea value={form.message} onChange={set("message")} error={errs.message} />

                <MagBtn ghost onClick={submit}>
                  {status === "busy" ? (
                    <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{
                        width: "11px", height: "11px", borderRadius: "50%",
                        border: "1px solid currentColor", borderTopColor: "transparent",
                        display: "inline-block", animation: "spin .8s linear infinite",
                      }} />
                      Sending
                    </span>
                  ) : "Send Message →"}
                </MagBtn>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
