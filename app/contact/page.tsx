"use client";

import { useState } from "react";
import Link from "next/link";

const CONTACT = {
  whatsapp: "https://wa.me/2347036566036",
  email: "pstflames@gmail.com",
  phone: "07036566036",
  address: "Oba Ile Housing Estate, Akure, Ondo State, Nigeria",
  mapsUrl:
    "https://maps.google.com/?q=Oba+Ile+Housing+Estate+Akure+Ondo+State+Nigeria",
};

const SOCIALS = [
  {
    name: "YouTube",
    handle: "@calvarywaymissions2793",
    href: "https://youtube.com/@calvarywaymissions2793",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    handle: "@calvaryway",
    href: "https://t.me/calvaryway",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    handle: "pstflames",
    href: "https://www.facebook.com/pstflames",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.027 4.388 11.025 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.098 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@calvarywaymissions",
    href: "https://www.tiktok.com/@calvarywaymissions",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
  },
];

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      setError("Please fill in your name and message.");
      return;
    }
    setError("");
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setState("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setState("error");
      setError("Something went wrong. Please try WhatsApp or email directly.");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

        .ct-root {
          font-family: 'DM Sans', sans-serif;
          background: #0C0C0C; color: #fff;
          min-height: 100svh; padding-top: 80px;
        }

        /* ── Header ── */
        .ct-header {
          position: relative; overflow: hidden;
          padding: 4rem 2rem 3.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .ct-header-glow {
          position: absolute; top: -150px; right: -150px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .ct-header-inner { max-width: 1100px; margin: 0 auto; }

        .ct-back {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.28); text-decoration: none;
          margin-bottom: 2rem; transition: color 0.2s ease;
        }
        .ct-back:hover { color: rgba(255,255,255,0.6); }
        .ct-back svg { transition: transform 0.2s ease; }
        .ct-back:hover svg { transform: translateX(-3px); }

        .ct-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.26em; text-transform: uppercase;
          color: #C9A96E; margin-bottom: 0.75rem;
        }
        .ct-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 700; line-height: 0.95;
          letter-spacing: -0.02em; color: #fff;
        }
        .ct-heading em { font-style: italic; color: #C9A96E; }
        .ct-subhead {
          margin-top: 1rem;
          font-size: 0.9rem; color: rgba(255,255,255,0.38);
          font-weight: 300; line-height: 1.7; max-width: 46ch;
        }

        /* ── Main layout ── */
        .ct-body { max-width: 1100px; margin: 0 auto; padding: 3.5rem 2rem 6rem; }
        .ct-grid {
          display: grid; grid-template-columns: 1fr 1.4fr;
          gap: 4rem; align-items: start;
        }
        @media (max-width: 800px) { .ct-grid { grid-template-columns: 1fr; gap: 3rem; } }

        /* ── Contact cards ── */
        .ct-cards { display: flex; flex-direction: column; gap: 1rem; }

        .ct-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0.85rem; padding: 1.5rem;
          display: flex; align-items: flex-start; gap: 1rem;
          transition: border-color 0.25s ease, background 0.25s ease;
          text-decoration: none; color: inherit;
        }
        .ct-card:hover {
          border-color: rgba(201,169,110,0.25);
          background: rgba(201,169,110,0.04);
        }
        .ct-card.wa:hover { border-color: rgba(37,211,102,0.3); background: rgba(37,211,102,0.04); }

        .ct-card-icon {
          width: 2.5rem; height: 2.5rem; border-radius: 0.55rem;
          background: rgba(201,169,110,0.08);
          border: 1px solid rgba(201,169,110,0.15);
          display: flex; align-items: center; justify-content: center;
          color: #C9A96E; flex-shrink: 0;
        }
        .ct-card.wa .ct-card-icon {
          background: rgba(37,211,102,0.08);
          border-color: rgba(37,211,102,0.2);
          color: #25D366;
        }

        .ct-card-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.56rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(255,255,255,0.3); margin-bottom: 0.2rem;
        }
        .ct-card-value {
          font-size: 0.95rem; color: #fff; font-weight: 400; line-height: 1.45;
        }
        .ct-card-hint {
          font-size: 0.72rem; color: rgba(255,255,255,0.3);
          font-weight: 300; margin-top: 0.15rem;
        }

        /* ── Social links ── */
        .ct-socials-title {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.3); margin-bottom: 0.85rem;
          margin-top: 0.5rem;
        }
        .ct-socials { display: flex; flex-direction: column; gap: 0.6rem; }
        .ct-social-row {
          display: flex; align-items: center; gap: 0.85rem;
          padding: 0.85rem 1rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.65rem; text-decoration: none;
          transition: all 0.2s ease;
        }
        .ct-social-row:hover {
          border-color: rgba(201,169,110,0.22);
          background: rgba(201,169,110,0.04);
        }
        .ct-social-icon {
          width: 2rem; height: 2rem; border-radius: 0.4rem;
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.55); flex-shrink: 0;
        }
        .ct-social-name {
          font-size: 0.88rem; color: #fff; font-weight: 400;
        }
        .ct-social-handle {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.08em;
          color: rgba(255,255,255,0.3);
        }
        .ct-social-arrow {
          margin-left: auto; color: rgba(255,255,255,0.2);
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .ct-social-row:hover .ct-social-arrow { transform: translateX(3px); color: #C9A96E; }

        /* ── Form ── */
        .ct-form-wrap {
          background: #111;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1.25rem;
          padding: 2.5rem;
        }

        .ct-form-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 700; color: #fff;
          margin-bottom: 0.4rem;
        }
        .ct-form-sub {
          font-size: 0.82rem; color: rgba(255,255,255,0.38);
          font-weight: 300; margin-bottom: 2rem;
        }

        .ct-form { display: flex; flex-direction: column; gap: 1rem; }

        .ct-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .ct-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 500px) { .ct-row { grid-template-columns: 1fr; } }

        .ct-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }
        .ct-label span { color: #C9A96E; }

        .ct-input, .ct-textarea, .ct-select {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.45rem;
          padding: 0.75rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; color: #fff;
          outline: none; width: 100%;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .ct-input::placeholder, .ct-textarea::placeholder { color: rgba(255,255,255,0.2); }
        .ct-input:focus, .ct-textarea:focus, .ct-select:focus {
          border-color: rgba(201,169,110,0.45);
          background: rgba(255,255,255,0.06);
        }
        .ct-textarea { resize: vertical; min-height: 130px; line-height: 1.6; }
        .ct-select option { background: #1a1a1a; color: #fff; }

        .ct-error {
          background: rgba(220,60,60,0.08);
          border: 1px solid rgba(220,60,60,0.2);
          border-radius: 0.45rem;
          padding: 0.75rem 1rem;
          font-size: 0.8rem; color: rgba(255,130,130,0.85);
          display: flex; align-items: center; gap: 0.5rem;
        }

        .ct-submit {
          display: flex; align-items: center; justify-content: center; gap: 0.55rem;
          background: #C9A96E; color: #0C0C0C;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.9rem 2rem; border-radius: 0.35rem;
          border: none; cursor: pointer; width: 100%;
          transition: background 0.25s ease, transform 0.2s ease;
          margin-top: 0.25rem;
        }
        .ct-submit:hover:not(:disabled) { background: #dfc08a; transform: translateY(-1px); }
        .ct-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Spinner */
        .ct-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(0,0,0,0.2);
          border-top-color: #0C0C0C;
          border-radius: 50%;
          animation: ct-spin 0.7s linear infinite;
        }
        @keyframes ct-spin { to { transform: rotate(360deg); } }

        /* Success state */
        .ct-success {
          display: flex; flex-direction: column; align-items: center;
          gap: 1rem; text-align: center; padding: 2rem 0;
        }
        .ct-success-icon {
          width: 3.5rem; height: 3.5rem; border-radius: 50%;
          background: rgba(201,169,110,0.1);
          border: 1px solid rgba(201,169,110,0.25);
          display: flex; align-items: center; justify-content: center;
          color: #C9A96E;
        }
        .ct-success-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem; font-weight: 700; color: #fff;
        }
        .ct-success-body {
          font-size: 0.85rem; color: rgba(255,255,255,0.45);
          font-weight: 300; line-height: 1.7; max-width: 32ch;
        }
        .ct-success-reset {
          font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.3); background: none; border: none;
          cursor: pointer; font-family: 'DM Mono', monospace;
          transition: color 0.2s ease;
        }
        .ct-success-reset:hover { color: rgba(255,255,255,0.6); }
      `}</style>

      <div className="ct-root">
        {/* Header */}
        <header className="ct-header">
          <div className="ct-header-glow" />
          <div className="ct-header-inner">
            <Link href="/" className="ct-back">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M12 7H2M6 3L2 7l4 4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back home
            </Link>
            <p className="ct-eyebrow">Calvaryway Mission</p>
            <h1 className="ct-heading">
              Get in <em>Touch</em>
            </h1>
            <p className="ct-subhead">
              We'd love to hear from you. Reach us through any of the channels
              below — or send a message directly and we'll get back to you.
            </p>
          </div>
        </header>

        {/* Body */}
        <div className="ct-body">
          <div className="ct-grid">
            {/* Left — contact info */}
            <div>
              <div className="ct-cards">
                {/* WhatsApp */}
                <a
                  href={`${CONTACT.whatsapp}?text=Hello%20Calvaryway%20Mission%2C%20I%27d%20like%20to%20get%20in%20touch.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ct-card wa"
                >
                  <div className="ct-card-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="ct-card-label">WhatsApp</p>
                    <p className="ct-card-value">+234 703 656 6036</p>
                    <p className="ct-card-hint">Tap to open a chat</p>
                  </div>
                </a>

                {/* Email */}
                <a href={`mailto:${CONTACT.email}`} className="ct-card">
                  <div className="ct-card-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p className="ct-card-label">Email</p>
                    <p className="ct-card-value">{CONTACT.email}</p>
                    <p className="ct-card-hint">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:+234${CONTACT.phone.replace(/^0/, "")}`}
                  className="ct-card"
                >
                  <div className="ct-card-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.23h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="ct-card-label">Phone</p>
                    <p className="ct-card-value">{CONTACT.phone}</p>
                    <p className="ct-card-hint">Mon–Sat, 9am–6pm WAT</p>
                  </div>
                </a>

                {/* Address */}
                <a
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ct-card"
                >
                  <div className="ct-card-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="ct-card-label">Location</p>
                    <p className="ct-card-value">
                      Oba Ile Housing Estate
                      <br />
                      Akure, Ondo State, Nigeria
                    </p>
                    <p className="ct-card-hint">Open in Google Maps →</p>
                  </div>
                </a>
              </div>

              {/* Socials */}
              <p className="ct-socials-title">Follow Us</p>
              <div className="ct-socials">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ct-social-row"
                  >
                    <div className="ct-social-icon">{s.icon}</div>
                    <div>
                      <p className="ct-social-name">{s.name}</p>
                      <p className="ct-social-handle">{s.handle}</p>
                    </div>
                    <span className="ct-social-arrow">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M2 7h10M8 3l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="ct-form-wrap">
              {state === "success" ? (
                <div className="ct-success">
                  <div className="ct-success-icon">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="ct-success-title">Message Sent</h3>
                  <p className="ct-success-body">
                    Thank you for reaching out. We'll get back to you as soon as
                    possible — usually within 24 hours.
                  </p>
                  <button
                    className="ct-success-reset"
                    onClick={() => setState("idle")}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="ct-form-title">Send a Message</h2>
                  <p className="ct-form-sub">
                    Fill in the form and we'll get back to you shortly.
                  </p>

                  <form className="ct-form" onSubmit={handleSubmit} noValidate>
                    <div className="ct-row">
                      <div className="ct-field">
                        <label className="ct-label">
                          Name <span>*</span>
                        </label>
                        <input
                          className="ct-input"
                          name="name"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="ct-field">
                        <label className="ct-label">Phone</label>
                        <input
                          className="ct-input"
                          name="phone"
                          placeholder="08012345678"
                          value={form.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="ct-field">
                      <label className="ct-label">Email</label>
                      <input
                        className="ct-input"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="ct-field">
                      <label className="ct-label">Subject</label>
                      <select
                        className="ct-select"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                      >
                        <option value="">Select a subject</option>
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Sowers Conference 2026">
                          Sowers Conference 2026
                        </option>
                        <option value="Bible Study">Bible Study</option>
                        <option value="CDT Programme">CDT Programme</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Prayer Request">Prayer Request</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="ct-field">
                      <label className="ct-label">
                        Message <span>*</span>
                      </label>
                      <textarea
                        className="ct-textarea"
                        name="message"
                        placeholder="Write your message here…"
                        value={form.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {(error || state === "error") && (
                      <div className="ct-error">
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ flexShrink: 0 }}
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {error ||
                          "Something went wrong. Please try again or message us on WhatsApp."}
                      </div>
                    )}

                    <button
                      className="ct-submit"
                      type="submit"
                      disabled={state === "sending"}
                    >
                      {state === "sending" ? (
                        <>
                          <div className="ct-spinner" /> Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M2 7h10M8 3l4 4-4 4"
                              stroke="currentColor"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
