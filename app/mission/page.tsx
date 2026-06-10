"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ── Reveal hook ───────────────────────────────────────────────────────────────
function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("ms-in");
        }),
      { threshold: 0.08 },
    );
    ref.current.querySelectorAll(".ms-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── Data ──────────────────────────────────────────────────────────────────────
const MISSION_FIELDS = [
  {
    icon: "🏫",
    place: "Schools & Campuses",
    desc: "From the very beginning, Calvaryway Mission has taken the Word into schools — reaching young people before the world shapes them.",
  },
  {
    icon: "🏘️",
    place: "Local Communities",
    desc: "Regular evangelism and outreach meetings in and around Akure, carrying the gospel to homes, streets and neighbourhoods.",
  },
  {
    icon: "⛪",
    place: "The Local Church",
    desc: "Strengthening believers within the body of Christ through discipleship, training and the systematic teaching of Scripture.",
  },
  {
    icon: "🌍",
    place: "Emerging Ministers",
    desc: "Equipping young and emerging ministers through conferences, retreats and one-on-one mentoring for life and service.",
  },
];

const UPCOMING_EVENTS = [
  {
    date: "Aug 20–22, 2026",
    name: "Sowers Conference 2026",
    theme: "Fire Brands",
    ref: "Judges 15:4",
    location: "Akure, Ondo State",
    href: "/register",
  },
];

const STORIES = [
  {
    title: "From Discipline to Discipleship",
    body: "A young man who attended one of our CDT weekends walked in sceptical and walked out with a new conviction about his call to ministry. He has since been actively involved in the mission's outreach work.",
    tag: "CDT",
  },
  {
    title: "The Monday That Changed a Life",
    body: "A first-time visitor to the Monday Bible Study described the teaching as the first time Scripture had ever been explained in a way that connected to real life. She has attended every Monday since.",
    tag: "Bible Study",
  },
  {
    title: "December Retreat, New Direction",
    body: "Several young believers who attended the December Prayer Retreat came with questions about their purpose. Through prayer, fellowship and the Word, clarity came — and with it, commitment.",
    tag: "Prayer Retreat",
  },
];

const PRAYER_POINTS = [
  "For open doors into new schools and campuses across Ondo State",
  "For the fruit of the Word to be evident in every life touched through our programmes",
  "For the Sowers Conference 2026 — preparation, attendance and lasting impact",
  "For young ministers being formed and released through CDT and other trainings",
  "For provision and partnership to sustain and expand the work",
  "For labourers — men and women willing to give themselves to this mission",
];

const WHATSAPP = "https://wa.me/2347036566036";

// ── Page ──────────────────────────────────────────────────────────────────────
export default function MissionsPage() {
  const fieldsRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);
  const involvedRef = useRef<HTMLDivElement>(null);
  const prayerRef = useRef<HTMLDivElement>(null);

  useReveal(fieldsRef);
  useReveal(eventsRef);
  useReveal(storiesRef);
  useReveal(involvedRef);
  useReveal(prayerRef);

  const [copied, setCopied] = useState(false);

  const copyPrayer = async () => {
    const text = PRAYER_POINTS.map((p, i) => `${i + 1}. ${p}`).join("\n");
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

        .ms-root {
          font-family: 'DM Sans', sans-serif;
          background: #0C0C0C;
          color: #fff;
          overflow-x: hidden;
        }

        /* ── Shared ── */
        .ms-reveal {
          opacity: 0; transform: translateY(26px);
          transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1);
        }
        .ms-reveal.d1 { transition-delay: 0.05s; }
        .ms-reveal.d2 { transition-delay: 0.15s; }
        .ms-reveal.d3 { transition-delay: 0.25s; }
        .ms-reveal.d4 { transition-delay: 0.35s; }
        .ms-reveal.d5 { transition-delay: 0.45s; }
        .ms-reveal.ms-in { opacity: 1; transform: translateY(0); }

        .ms-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem; letter-spacing: 0.24em; text-transform: uppercase;
          color: #C9A96E;
        }
        .ms-section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700; color: #fff; line-height: 1.1;
        }
        .ms-section-title em { font-style: italic; color: rgba(255,255,255,0.38); }
        .ms-gold-line { width: 2.5rem; height: 1.5px; background: #C9A96E; display: block; flex-shrink: 0; }
        .ms-h-rule { height: 1px; background: rgba(255,255,255,0.06); }
        .ms-inner { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
        .ms-section { padding: 6rem 0; }
        .ms-section.alt { background: #0a0a0a; }

        /* ── Hero ── */
        .ms-hero {
          padding-top: 80px; position: relative; overflow: hidden;
          min-height: 72svh;
          display: flex; flex-direction: column; justify-content: flex-end;
        }

        .ms-hero-glow {
          position: absolute; top: -180px; right: -180px;
          width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .ms-hero-glow-2 {
          position: absolute; bottom: -80px; left: -80px;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        /* World map dots motif */
        .ms-hero-bg {
          position: absolute; inset: 0; pointer-events: none; overflow: hidden;
        }
        .ms-hero-bg svg { position: absolute; top: 50%; left: 50%; transform: translate(-40%, -50%); opacity: 0.025; width: min(900px, 120vw); }

        .ms-hero-content {
          position: relative; z-index: 2;
          padding: 4rem 2rem 5rem;
          max-width: 1100px; margin: 0 auto; width: 100%;
        }

        .ms-hero-tag { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; }

        .ms-hero-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 8vw, 6.5rem);
          font-weight: 700; line-height: 0.95;
          letter-spacing: -0.02em; color: #fff;
          max-width: 12ch;
        }
        .ms-hero-heading em { font-style: italic; color: #C9A96E; }

        .ms-hero-body {
          margin-top: 1.75rem;
          font-size: clamp(0.9rem, 2vw, 1.05rem);
          color: rgba(255,255,255,0.42); font-weight: 300;
          line-height: 1.75; max-width: 46ch;
        }

        .ms-hero-scripture {
          margin-top: 2.5rem; padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.07);
          display: flex; flex-direction: column; gap: 0.4rem;
        }
        .ms-hero-verse {
          font-family: 'Playfair Display', serif;
          font-style: italic; font-size: clamp(0.95rem, 2vw, 1.1rem);
          color: rgba(255,255,255,0.55); line-height: 1.65; max-width: 50ch;
        }
        .ms-hero-ref {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(201,169,110,0.65);
        }

        /* ── What missions means ── */
        .ms-meaning-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 3rem; margin-top: 3.5rem; align-items: start;
        }
        @media (max-width: 700px) { .ms-meaning-grid { grid-template-columns: 1fr; gap: 2rem; } }

        .ms-meaning-text {
          font-size: 0.95rem; color: rgba(255,255,255,0.5);
          font-weight: 300; line-height: 1.85;
        }
        .ms-meaning-text p + p { margin-top: 1.25rem; }

        .ms-meaning-pillars { display: flex; flex-direction: column; gap: 1rem; }
        .ms-pillar {
          display: flex; align-items: flex-start; gap: 1rem;
          padding: 1.25rem; border-radius: 0.75rem;
          background: rgba(201,169,110,0.04);
          border: 1px solid rgba(201,169,110,0.1);
        }
        .ms-pillar-icon {
          font-size: 1.25rem; line-height: 1; flex-shrink: 0; margin-top: 0.1rem;
        }
        .ms-pillar-label {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 600; color: #fff; margin-bottom: 0.2rem;
        }
        .ms-pillar-desc {
          font-size: 0.8rem; color: rgba(255,255,255,0.4);
          font-weight: 300; line-height: 1.6;
        }

        /* ── Fields ── */
        .ms-fields-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1rem; margin-top: 3.5rem;
        }
        .ms-field-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0.85rem; padding: 1.75rem;
          display: flex; flex-direction: column; gap: 0.75rem;
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .ms-field-card:hover {
          border-color: rgba(201,169,110,0.2);
          background: rgba(201,169,110,0.04);
        }
        .ms-field-icon { font-size: 1.75rem; line-height: 1; }
        .ms-field-place {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem; font-weight: 700; color: #fff;
        }
        .ms-field-desc {
          font-size: 0.82rem; color: rgba(255,255,255,0.45);
          font-weight: 300; line-height: 1.7;
        }

        /* ── Upcoming ── */
        .ms-events { display: flex; flex-direction: column; gap: 1rem; margin-top: 3.5rem; }

        .ms-event-card {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 1.5rem; align-items: center;
          background: rgba(201,169,110,0.04);
          border: 1px solid rgba(201,169,110,0.15);
          border-radius: 1rem; padding: 1.75rem 2rem;
          transition: border-color 0.25s ease;
        }
        .ms-event-card:hover { border-color: rgba(201,169,110,0.35); }

        @media (max-width: 640px) {
          .ms-event-card { grid-template-columns: 1fr; gap: 1rem; }
        }

        .ms-event-date-block {
          display: flex; flex-direction: column; align-items: center;
          background: rgba(201,169,110,0.1); border: 1px solid rgba(201,169,110,0.2);
          border-radius: 0.6rem; padding: 0.75rem 1.25rem;
          min-width: 7rem; text-align: center;
        }
        .ms-event-date-val {
          font-family: 'Playfair Display', serif;
          font-size: 0.95rem; font-weight: 700; color: #C9A96E;
          line-height: 1.3;
        }

        .ms-event-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 0.3rem;
        }
        .ms-event-theme {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #C9A96E; margin-bottom: 0.5rem;
        }
        .ms-event-meta {
          font-size: 0.8rem; color: rgba(255,255,255,0.35); font-weight: 300;
        }

        .ms-event-cta {
          display: inline-flex; align-items: center; gap: 0.45rem;
          background: #C9A96E; color: #0C0C0C;
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 0.75rem 1.4rem; border-radius: 0.3rem;
          text-decoration: none; white-space: nowrap;
          transition: background 0.2s ease;
        }
        .ms-event-cta:hover { background: #dfc08a; }

        /* ── Stories ── */
        .ms-stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.25rem; margin-top: 3.5rem;
        }
        .ms-story-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 1rem; padding: 2rem;
          display: flex; flex-direction: column; gap: 1rem;
          transition: border-color 0.25s ease;
        }
        .ms-story-card:hover { border-color: rgba(255,255,255,0.15); }

        .ms-story-tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #C9A96E;
          background: rgba(201,169,110,0.08);
          border: 1px solid rgba(201,169,110,0.15);
          border-radius: 2rem; padding: 0.22rem 0.7rem;
          width: fit-content;
        }
        .ms-story-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 700; color: #fff; line-height: 1.25;
        }
        .ms-story-body {
          font-size: 0.86rem; color: rgba(255,255,255,0.48);
          font-weight: 300; line-height: 1.75; flex: 1;
        }
        .ms-story-quote {
          font-family: 'Playfair Display', serif;
          font-size: 3rem; color: rgba(201,169,110,0.15);
          line-height: 1; margin-bottom: -0.5rem;
          user-select: none;
        }

        /* ── Get Involved ── */
        .ms-involved-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1.25rem; margin-top: 3.5rem;
        }
        @media (max-width: 640px) { .ms-involved-grid { grid-template-columns: 1fr; } }

        .ms-involved-card {
          border-radius: 1rem; padding: 2.25rem;
          display: flex; flex-direction: column; gap: 1.25rem;
        }
        .ms-involved-card.dark {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
        }
        .ms-involved-card.gold {
          background: rgba(201,169,110,0.07);
          border: 1px solid rgba(201,169,110,0.2);
        }
        .ms-involved-icon {
          width: 2.75rem; height: 2.75rem; border-radius: 0.65rem;
          background: rgba(201,169,110,0.1); border: 1px solid rgba(201,169,110,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #C9A96E;
        }
        .ms-involved-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem; font-weight: 700; color: #fff;
        }
        .ms-involved-desc {
          font-size: 0.86rem; color: rgba(255,255,255,0.48);
          font-weight: 300; line-height: 1.75; flex: 1;
        }
        .ms-involved-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none; padding: 0.75rem 1.4rem;
          border-radius: 0.3rem; border: 1px solid;
          transition: all 0.2s ease; width: fit-content;
        }
        .ms-involved-btn.primary { background: #C9A96E; border-color: #C9A96E; color: #0C0C0C; }
        .ms-involved-btn.primary:hover { background: #dfc08a; }
        .ms-involved-btn.outline { background: transparent; border-color: rgba(255,255,255,0.15); color: rgba(255,255,255,0.55); }
        .ms-involved-btn.outline:hover { border-color: rgba(255,255,255,0.35); color: #fff; }

        /* ── Prayer ── */
        .ms-prayer-wrap { margin-top: 3.5rem; }
        .ms-prayer-list {
          display: flex; flex-direction: column; gap: 0;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 1rem; overflow: hidden;
          margin-bottom: 1.5rem;
        }
        .ms-prayer-item {
          display: flex; align-items: flex-start; gap: 1rem;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.2s ease;
        }
        .ms-prayer-item:last-child { border-bottom: none; }
        .ms-prayer-item:hover { background: rgba(255,255,255,0.03); }

        .ms-prayer-num {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; color: rgba(201,169,110,0.5);
          letter-spacing: 0.1em; flex-shrink: 0; padding-top: 0.1rem;
        }
        .ms-prayer-text {
          font-size: 0.9rem; color: rgba(255,255,255,0.6);
          font-weight: 300; line-height: 1.65;
        }

        .ms-prayer-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .ms-copy-btn {
          display: inline-flex; align-items: center; gap: 0.45rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.45);
          padding: 0.65rem 1.1rem; border-radius: 0.3rem;
          cursor: pointer; transition: all 0.2s ease;
        }
        .ms-copy-btn:hover { border-color: rgba(255,255,255,0.25); color: #fff; background: rgba(255,255,255,0.07); }
        .ms-copy-btn.copied { border-color: rgba(201,169,110,0.4); color: #C9A96E; background: rgba(201,169,110,0.07); }

        .ms-pray-wa {
          display: inline-flex; align-items: center; gap: 0.45rem;
          background: #C9A96E; color: #0C0C0C;
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 0.65rem 1.25rem; border-radius: 0.3rem;
          text-decoration: none; transition: background 0.2s ease;
        }
        .ms-pray-wa:hover { background: #dfc08a; }

        /* ── Back link ── */
        .ms-back {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.28); text-decoration: none;
          margin-bottom: 2rem; transition: color 0.2s ease;
        }
        .ms-back:hover { color: rgba(255,255,255,0.6); }
        .ms-back svg { transition: transform 0.2s ease; }
        .ms-back:hover svg { transform: translateX(-3px); }
      `}</style>

      <div className="ms-root">
        {/* ── Hero ── */}
        <section
          style={{
            paddingTop: 80,
            position: "relative",
            overflow: "hidden",
            minHeight: "72svh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            background: "#0C0C0C",
          }}
        >
          <div className="ms-hero-glow" />
          <div className="ms-hero-glow-2" />

          {/* Globe / map motif */}
          <div className="ms-hero-bg">
            <svg
              viewBox="0 0 800 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="400"
                cy="250"
                rx="380"
                ry="230"
                stroke="white"
                strokeWidth="1"
              />
              <ellipse
                cx="400"
                cy="250"
                rx="250"
                ry="230"
                stroke="white"
                strokeWidth="0.5"
              />
              <ellipse
                cx="400"
                cy="250"
                rx="130"
                ry="230"
                stroke="white"
                strokeWidth="0.5"
              />
              <line
                x1="20"
                y1="250"
                x2="780"
                y2="250"
                stroke="white"
                strokeWidth="0.5"
              />
              <ellipse
                cx="400"
                cy="250"
                rx="380"
                ry="100"
                stroke="white"
                strokeWidth="0.5"
              />
              <ellipse
                cx="400"
                cy="250"
                rx="380"
                ry="180"
                stroke="white"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: "4rem 2rem 5rem",
              maxWidth: 1100,
              margin: "0 auto",
              width: "100%",
            }}
          >
            <Link href="/" className="ms-back">
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

            <div className="ms-hero-tag">
              <span className="ms-gold-line" />
              <span className="ms-eyebrow">Calvaryway Mission</span>
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "#fff",
                maxWidth: "10ch",
              }}
            >
              The{" "}
              <em style={{ fontStyle: "italic", color: "#C9A96E" }}>Mission</em>{" "}
              Field
            </h1>

            <p
              style={{
                marginTop: "1.75rem",
                fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                color: "rgba(255,255,255,0.42)",
                fontWeight: 300,
                lineHeight: 1.75,
                maxWidth: "46ch",
              }}
            >
              The mandate is clear — go and make disciples. From schools and
              communities in Akure, to emerging ministers across Nigeria,
              Calvaryway Mission is committed to taking the Word where it is
              needed most.
            </p>

            <div className="ms-hero-scripture">
              <p className="ms-hero-verse">
                "Then said Jesus unto his disciples, If any man will come after
                me, let him deny himself, and take up his cross, and follow me."
              </p>
              <span className="ms-hero-ref">Matthew 16:24</span>
            </div>
          </div>
        </section>

        <div className="ms-h-rule" />

        {/* ── What Missions Means ── */}
        {/* <section className="ms-section">
          <div className="ms-inner">
            <div
              className="ms-reveal d1"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <span className="ms-gold-line" />
              <span className="ms-eyebrow">Our Heart</span>
            </div>
            <h2 className="ms-section-title ms-reveal d2">
              What <em>Missions</em> Means to Us
            </h2>

            <div className="ms-meaning-grid">
              <div className="ms-meaning-text ms-reveal d2">
                <p>
                  Missions at Calvaryway is not a department or a programme — it
                  is the reason we exist. Before we had a name, before we had a
                  building, we were already in the field: in schools, in homes,
                  in communities, carrying the Word to people who needed it.
                </p>
                <p>
                  We believe the Great Commission is not a suggestion. It is the
                  mandate given to every believer and every expression of the
                  church. Our response to that mandate is a deliberate,
                  discipleship-centred approach — not just winning souls, but
                  forming them into mature followers of Christ who can, in turn,
                  go and do the same.
                </p>
                <p>
                  This is the work: preach, teach, form, release. And repeat.
                </p>
              </div>

              <div className="ms-meaning-pillars ms-reveal d3">
                {[
                  {
                    icon: "📣",
                    label: "Proclamation",
                    desc: "Taking the gospel to the lost — in schools, streets, communities and outreach meetings.",
                  },
                  {
                    icon: "📖",
                    label: "Formation",
                    desc: "Grounding believers in the Word through systematic, deliberate Bible teaching and discipleship.",
                  },
                  {
                    icon: "🚀",
                    label: "Release",
                    desc: "Equipping and sending young ministers to carry the work forward in their own spheres of influence.",
                  },
                ].map((p) => (
                  <div key={p.label} className="ms-pillar">
                    <span className="ms-pillar-icon">{p.icon}</span>
                    <div>
                      <p className="ms-pillar-label">{p.label}</p>
                      <p className="ms-pillar-desc">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="ms-h-rule" /> */}

        {/* ── Mission Fields ── */}
        <section className="ms-section alt" ref={fieldsRef}>
          <div className="ms-inner">
            <div
              className="ms-reveal d1"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <span className="ms-gold-line" />
              <span className="ms-eyebrow">Where We Work</span>
            </div>
            <h2 className="ms-section-title ms-reveal d2">
              Our Mission <em>Fields</em>
            </h2>
            <p
              className="ms-reveal d3"
              style={{
                marginTop: "0.75rem",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.38)",
                fontWeight: 300,
                lineHeight: 1.7,
                maxWidth: "48ch",
              }}
            >
              The work happens across different contexts — each one a valid and
              vital sphere of the Great Commission.
            </p>

            <div className="ms-fields-grid">
              {MISSION_FIELDS.map((f, i) => (
                <div
                  key={f.place}
                  className={`ms-field-card ms-reveal d${i + 2}`}
                >
                  <span className="ms-field-icon">{f.icon}</span>
                  <p className="ms-field-place">{f.place}</p>
                  <p className="ms-field-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="ms-h-rule" />

        {/* ── Upcoming Events ── */}
        <section className="ms-section" ref={eventsRef}>
          <div className="ms-inner">
            <div
              className="ms-reveal d1"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <span className="ms-gold-line" />
              <span className="ms-eyebrow">Coming Up</span>
            </div>
            <h2 className="ms-section-title ms-reveal d2">
              Upcoming <em>Events</em>
            </h2>

            <div className="ms-events">
              {UPCOMING_EVENTS.map((e, i) => (
                <div
                  key={e.name}
                  className={`ms-event-card ms-reveal d${i + 2}`}
                >
                  <div className="ms-event-date-block">
                    <span className="ms-event-date-val">{e.date}</span>
                  </div>
                  <div>
                    <p className="ms-event-theme">
                      {e.theme} — {e.ref}
                    </p>
                    <p className="ms-event-name">{e.name}</p>
                    <p className="ms-event-meta">{e.location}</p>
                  </div>
                  <Link href={e.href} className="ms-event-cta">
                    Register Free
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 7h10M8 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="ms-h-rule" />

        {/* ── Stories ── */}
        <section className="ms-section alt" ref={storiesRef}>
          <div className="ms-inner">
            <div
              className="ms-reveal d1"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <span className="ms-gold-line" />
              <span className="ms-eyebrow">From the Field</span>
            </div>
            <h2 className="ms-section-title ms-reveal d2">
              Stories <em>&</em> Testimonies
            </h2>
            <p
              className="ms-reveal d3"
              style={{
                marginTop: "0.75rem",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.38)",
                fontWeight: 300,
                lineHeight: 1.7,
                maxWidth: "48ch",
              }}
            >
              The real fruit of the work — lives changed by the Word.
            </p>

            <div className="ms-stories-grid">
              {STORIES.map((s, i) => (
                <div
                  key={s.title}
                  className={`ms-story-card ms-reveal d${i + 2}`}
                >
                  <span className="ms-story-quote" aria-hidden>
                    "
                  </span>
                  <span className="ms-story-tag">{s.tag}</span>
                  <h3 className="ms-story-title">{s.title}</h3>
                  <p className="ms-story-body">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="ms-h-rule" />

        {/* ── Get Involved ── */}
        <section className="ms-section" ref={involvedRef}>
          <div className="ms-inner">
            <div
              className="ms-reveal d1"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <span className="ms-gold-line" />
              <span className="ms-eyebrow">Join the Work</span>
            </div>
            <h2 className="ms-section-title ms-reveal d2">
              Get <em>Involved</em>
            </h2>
            <p
              className="ms-reveal d3"
              style={{
                marginTop: "0.75rem",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.38)",
                fontWeight: 300,
                lineHeight: 1.7,
                maxWidth: "48ch",
              }}
            >
              There is a place for you in this mission. Here's how to step in.
            </p>

            <div className="ms-involved-grid">
              <div className="ms-involved-card gold ms-reveal d2">
                <div className="ms-involved-icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="ms-involved-title">Attend Our Programmes</h3>
                <p className="ms-involved-desc">
                  The simplest way to be part of this mission is to come. Monday
                  Bible Study every week. CDT every second weekend. Join us and
                  be formed.
                </p>
                <a
                  href={`${WHATSAPP}?text=Hello%2C%20I%27d%20like%20to%20attend%20Calvaryway%20Mission%20programmes.%20Please%20share%20details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ms-involved-btn primary"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Connect on WhatsApp
                </a>
              </div>

              <div className="ms-involved-card dark ms-reveal d3">
                <div className="ms-involved-icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <h3 className="ms-involved-title">Volunteer & Serve</h3>
                <p className="ms-involved-desc">
                  There are hands-on ways to contribute — from helping
                  coordinate outreaches and retreats, to supporting the media
                  and communications work of the mission. Get in touch and let's
                  find where you fit.
                </p>
                <a
                  href={`${WHATSAPP}?text=Hello%2C%20I%27d%20like%20to%20volunteer%20with%20Calvaryway%20Mission.%20How%20can%20I%20help%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ms-involved-btn outline"
                >
                  Get in Touch
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>

              {/* <div className="ms-involved-card dark ms-reveal d4">
                <div className="ms-involved-icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <h3 className="ms-involved-title">Partner in Prayer</h3>
                <p className="ms-involved-desc">
                  Every mission runs on prayer. Join our prayer team and stand
                  with us for open doors, fruit in the field, and the lives
                  being formed through this work.
                </p>
                <a
                  href={`${WHATSAPP}?text=Hello%2C%20I%27d%20like%20to%20join%20the%20Calvaryway%20Mission%20prayer%20team.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ms-involved-btn outline"
                >
                  Join Prayer Team
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div> */}

              <div className="ms-involved-card dark ms-reveal d5">
                <div className="ms-involved-icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
                <h3 className="ms-involved-title">Register for Sowers 2026</h3>
                <p className="ms-involved-desc">
                  The Sowers Conference 2026 — Fire Brands — is coming August
                  20–22 in Akure. Register free and be part of what God is
                  doing.
                </p>
                <Link href="/register" className="ms-involved-btn outline">
                  Register Free
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="ms-h-rule" />

        {/* ── Prayer Requests ── */}
        <section className="ms-section alt" ref={prayerRef}>
          <div className="ms-inner">
            <div
              className="ms-reveal d1"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <span className="ms-gold-line" />
              <span className="ms-eyebrow">Stand With Us</span>
            </div>
            <h2 className="ms-section-title ms-reveal d2">
              Prayer <em>Requests</em>
            </h2>
            <p
              className="ms-reveal d3"
              style={{
                marginTop: "0.75rem",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.38)",
                fontWeight: 300,
                lineHeight: 1.7,
                maxWidth: "48ch",
                marginBottom: "0",
              }}
            >
              Specific things we are believing God for. Pray with us.
            </p>

            <div className="ms-prayer-wrap ms-reveal d3">
              <div className="ms-prayer-list">
                {PRAYER_POINTS.map((p, i) => (
                  <div key={i} className="ms-prayer-item">
                    <span className="ms-prayer-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="ms-prayer-text">{p}</p>
                  </div>
                ))}
              </div>

              <div className="ms-prayer-actions">
                <button
                  className={`ms-copy-btn${copied ? " copied" : ""}`}
                  onClick={copyPrayer}
                >
                  {copied ? (
                    <>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy Prayer Points
                    </>
                  )}
                </button>
                <a
                  href={`${WHATSAPP}?text=I%27m%20praying%20with%20Calvaryway%20Mission.%20Here%20are%20the%20prayer%20points%3A%0A${encodeURIComponent(PRAYER_POINTS.map((p, i) => `${i + 1}. ${p}`).join("\n"))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ms-pray-wa"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Share on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
