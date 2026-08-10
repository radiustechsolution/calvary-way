"use client";

import { useState } from "react";
import Link from "next/link";

const EVENT = {
  name: "Sowers Conference 2026",
  theme: "Fire Brands",
  ref: "Judges 15:4",
  dates: "August 19 – 22, 2026",
  location:
    "Christ The Redeemer's International Secondary School, Akure (CRISSA)",
  tagline: "A people prepared by the Lord.",
};

type FormState = "idle" | "sending" | "success" | "error";

const STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT – Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "Outside Nigeria",
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    state: "",
    age_group: "",
    how_heard: "",
    expectations: "",
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
    if (!form.full_name || !form.phone) {
      setError("Please fill in your name and phone number.");
      return;
    }
    setError("");
    setState("sending");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Registration failed");
      setState("success");
    } catch (err: any) {
      setState("error");
      setError(err.message ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

        .rg-root {
          font-family: 'DM Sans', sans-serif;
          background: #FFFFFF; color: #0C0C0C;
          min-height: 100svh; padding-top: 80px;
        }

        /* ── Layout ── */
        .rg-inner {
          max-width: 1100px; margin: 0 auto;
          padding: 4rem 2rem 6rem;
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 5rem; align-items: start;
        }
        @media (max-width: 860px) {
          .rg-inner { grid-template-columns: 1fr; gap: 3rem; }
        }

        /* ── Left: event info ── */
        .rg-back {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(0,0,0,0.32); text-decoration: none;
          margin-bottom: 2.5rem; transition: color 0.2s ease;
          display: block;
        }
        .rg-back:hover { color: rgba(0,0,0,0.7); }
        .rg-back svg { transition: transform 0.2s ease; }
        .rg-back:hover svg { transform: translateX(-3px); }

        .rg-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.26em; text-transform: uppercase;
          color: #A9813F; margin-bottom: 0.75rem;
        }
        .rg-event-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700; color: #0C0C0C; line-height: 1.1;
          margin-bottom: 0.35rem;
        }
        .rg-event-theme {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: clamp(1.5rem, 3vw, 2rem);
          color: #A9813F; line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .rg-event-details {
          display: flex; flex-direction: column; gap: 0.75rem;
          margin-bottom: 2rem;
        }
        .rg-detail {
          display: flex; align-items: center; gap: 0.75rem;
          font-size: 0.88rem; color: rgba(0,0,0,0.55); font-weight: 300;
        }
        .rg-detail-icon {
          width: 1.75rem; height: 1.75rem; border-radius: 0.4rem;
          background: rgba(201,169,110,0.1);
          border: 1px solid rgba(201,169,110,0.25);
          display: flex; align-items: center; justify-content: center;
          color: #A9813F; flex-shrink: 0;
        }

        .rg-scripture {
          border-left: 2px solid rgba(201,169,110,0.35);
          padding-left: 1.25rem; margin-top: 2rem;
        }
        .rg-verse {
          font-family: 'Playfair Display', serif;
          font-style: italic; font-size: 1rem;
          color: rgba(0,0,0,0.5); line-height: 1.7;
        }
        .rg-verse-ref {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(169,129,63,0.75); margin-top: 0.5rem; display: block;
        }

        .rg-free-badge {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: rgba(201,169,110,0.12);
          border: 1px solid rgba(201,169,110,0.3);
          border-radius: 2rem; padding: 0.4rem 1rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: #A9813F; margin-top: 2rem;
        }

        /* ── Form card ── */
        .rg-form-card {
          background: #FAF9F6;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 1.25rem; padding: 2.5rem;
          position: sticky; top: 100px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .rg-form-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 700; color: #0C0C0C; margin-bottom: 0.35rem;
        }
        .rg-form-sub {
          font-size: 0.82rem; color: rgba(0,0,0,0.45);
          font-weight: 300; margin-bottom: 2rem; line-height: 1.6;
        }

        .rg-form { display: flex; flex-direction: column; gap: 1rem; }
        .rg-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .rg-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 500px) { .rg-row { grid-template-columns: 1fr; } }

        .rg-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(0,0,0,0.45);
        }
        .rg-label span { color: #A9813F; }

        .rg-input, .rg-select, .rg-textarea {
          background: rgba(0,0,0,0.02);
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 0.45rem; padding: 0.75rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; color: #0C0C0C; outline: none; width: 100%;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .rg-input::placeholder, .rg-textarea::placeholder { color: rgba(0,0,0,0.28); }
        .rg-input:focus, .rg-select:focus, .rg-textarea:focus {
          border-color: rgba(169,129,63,0.55);
          background: rgba(0,0,0,0.01);
        }
        .rg-select option { background: #FFFFFF; color: #0C0C0C; }
        .rg-textarea { resize: vertical; min-height: 100px; line-height: 1.6; }

        .rg-divider {
          height: 1px; background: rgba(0,0,0,0.08); margin: 0.5rem 0;
        }
        .rg-section-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(0,0,0,0.32);
        }

        .rg-error {
          background: rgba(200,40,40,0.06);
          border: 1px solid rgba(200,40,40,0.2);
          border-radius: 0.45rem; padding: 0.75rem 1rem;
          font-size: 0.8rem; color: rgba(170,30,30,0.9);
          display: flex; align-items: center; gap: 0.5rem;
        }

        .rg-submit {
          display: flex; align-items: center; justify-content: center; gap: 0.55rem;
          background: #C9A96E; color: #0C0C0C;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 1rem 2rem; border-radius: 0.35rem;
          border: none; cursor: pointer; width: 100%;
          transition: background 0.25s ease, transform 0.2s ease;
          margin-top: 0.5rem;
        }
        .rg-submit:hover:not(:disabled) { background: #b8925a; }
        .rg-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .rg-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(0,0,0,0.2); border-top-color: #0C0C0C;
          border-radius: 50%; animation: rg-spin 0.7s linear infinite;
        }
        @keyframes rg-spin { to { transform: rotate(360deg); } }

        .rg-note {
          font-size: 0.72rem; color: rgba(0,0,0,0.3);
          text-align: center; margin-top: 0.5rem; line-height: 1.6;
        }

        /* ── Success ── */
        .rg-success {
          display: flex; flex-direction: column; align-items: center;
          gap: 1.25rem; text-align: center; padding: 1rem 0;
        }
        .rg-success-ring {
          width: 4rem; height: 4rem; border-radius: 50%;
          background: rgba(201,169,110,0.14);
          border: 1px solid rgba(201,169,110,0.35);
          display: flex; align-items: center; justify-content: center;
          color: #A9813F;
        }
        .rg-success-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem; font-weight: 700; color: #0C0C0C;
        }
        .rg-success-body {
          font-size: 0.88rem; color: rgba(0,0,0,0.5);
          font-weight: 300; line-height: 1.75; max-width: 32ch;
        }
        .rg-success-wa {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: #C9A96E; color: #0C0C0C;
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 0.8rem 1.5rem; border-radius: 0.35rem;
          text-decoration: none; transition: background 0.2s ease;
        }
        .rg-success-wa:hover { background: #b8925a; }
        .rg-success-back {
          font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(0,0,0,0.32); background: none; border: none;
          cursor: pointer; font-family: 'DM Mono', monospace;
          transition: color 0.2s ease; text-decoration: none;
        }
        .rg-success-back:hover { color: rgba(0,0,0,0.7); }
      `}</style>

      <div className="rg-root">
        <div className="rg-inner">
          {/* ── Left: Event info ── */}
          <div>
            <Link
              href="/"
              className="rg-back"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
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
            <p className="rg-eyebrow">Free Registration</p>
            <h1 className="rg-event-title">{EVENT.name}</h1>
            <p className="rg-event-theme">{EVENT.theme}</p>
            <div className="rg-event-details">
              <div className="rg-detail">
                <div className="rg-detail-icon">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                {EVENT.dates}
              </div>
              <div className="rg-detail">
                <div className="rg-detail-icon">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                {EVENT.location}
              </div>
              <div className="rg-detail">
                <div className="rg-detail-icon">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                4 days
              </div>
            </div>
            <div className="rg-scripture">
              <p className="rg-verse">
                "Then Samson went and caught three hundred foxes and took
                torches. And he turned them tail to tail and put a torch between
                each pair of tails."
              </p>
              <span className="rg-verse-ref">
                {EVENT.ref} — {EVENT.tagline}
              </span>
            </div>
            {/* p */}
            <span className="rg-free-badge">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Registration is completely free
            </span>
          </div>

          {/* ── Right: Form ── */}
          <div className="rg-form-card">
            {state === "success" ? (
              <div className="rg-success">
                <div className="rg-success-ring">
                  <svg
                    width="24"
                    height="24"
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
                <h2 className="rg-success-title">You're Registered!</h2>
                <p className="rg-success-body">
                  Welcome to Sowers Conference 2026. We'll be in touch with
                  venue details and updates as the date approaches. See you in
                  August!
                </p>
                <a
                  href="https://wa.me/2347036566036?text=Hello%2C%20I%20just%20registered%20for%20Sowers%20Conference%202026.%20Looking%20forward%20to%20it!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rg-success-wa"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Say hello on WhatsApp
                </a>
                <Link href="/" className="rg-success-back">
                  Back to home
                </Link>
              </div>
            ) : (
              <>
                <h2 className="rg-form-title">Reserve Your Spot</h2>
                <p className="rg-form-sub">
                  Registration is free. Fill in your details and we'll keep you
                  updated with venue and programme information.
                </p>

                <form className="rg-form" onSubmit={handleSubmit} noValidate>
                  {/* Personal info */}
                  <p className="rg-section-label">Personal Information</p>

                  <div className="rg-field">
                    <label className="rg-label">
                      Full Name <span>*</span>
                    </label>
                    <input
                      className="rg-input"
                      name="full_name"
                      placeholder="Your full name"
                      value={form.full_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="rg-row">
                    <div className="rg-field">
                      <label className="rg-label">
                        Phone <span>*</span>
                      </label>
                      <input
                        className="rg-input"
                        name="phone"
                        placeholder="08012345678"
                        value={form.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="rg-field">
                      <label className="rg-label">Email</label>
                      <input
                        className="rg-input"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="rg-row">
                    <div className="rg-field">
                      <label className="rg-label">State of Origin</label>
                      <select
                        className="rg-select"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                      >
                        <option value="">Select state</option>
                        {STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="rg-field">
                      <label className="rg-label">Age Group</label>
                      <select
                        className="rg-select"
                        name="age_group"
                        value={form.age_group}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Under 18">Under 18</option>
                        <option value="18–25">18–25</option>
                        <option value="26–35">26–35</option>
                        <option value="36–45">36–45</option>
                        <option value="46+">46+</option>
                      </select>
                    </div>
                  </div>

                  <div className="rg-divider" />
                  <p className="rg-section-label">A Few More Questions</p>

                  <div className="rg-field">
                    <label className="rg-label">
                      How did you hear about this conference?
                    </label>
                    <select
                      className="rg-select"
                      name="how_heard"
                      value={form.how_heard}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Telegram">Telegram</option>
                      <option value="TikTok">TikTok</option>
                      <option value="Friend / Word of Mouth">
                        Friend / Word of Mouth
                      </option>
                      <option value="Church">Church</option>
                      <option value="Website">Website</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="rg-field">
                    <label className="rg-label">
                      What are you expecting from this conference?
                    </label>
                    <textarea
                      className="rg-textarea"
                      name="expectations"
                      placeholder="Share your expectations (optional)…"
                      value={form.expectations}
                      onChange={handleChange}
                    />
                  </div>

                  {(error || state === "error") && (
                    <div className="rg-error">
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
                      {error}
                    </div>
                  )}

                  <button
                    className="rg-submit"
                    type="submit"
                    disabled={state === "sending"}
                  >
                    {state === "sending" ? (
                      <>
                        <div className="rg-spinner" /> Registering…
                      </>
                    ) : (
                      <>
                        Register Free
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

                  <p className="rg-note">
                    No payment required · Venue details sent closer to the date
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
