"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// ── Reveal hook ───────────────────────────────────────────────────────────────
function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("ab-in");
        }),
      { threshold: 0.1 },
    );
    ref.current.querySelectorAll(".ab-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── Data ──────────────────────────────────────────────────────────────────────
const TIMELINE = [
  {
    year: "Pre-2018",
    label: "The Beginning",
    body: "Before bearing any name, a group of believers began holding discipleship-based meetings in schools and other spaces across Akure — a quiet, faithful work of equipping the body of Christ.",
  },
  {
    year: "2020",
    label: "A Name is Given",
    body: "The name Calvaryway Mission was adopted when it became necessary for the work to be known as a formal entity. The name reflected the mission's heart — the way of the cross, the way of Christ.",
  },
  {
    year: "2021",
    label: "Bible Study Established",
    body: "The weekly Bible Study began fully at Oba Ile Housing Estate, Akure — a deliberate, systematic unpacking of Scripture that has continued every Monday since.",
  },
  {
    year: "Ongoing",
    label: "Growing the Work",
    body: "Since then, the mission has expanded into life transforming programmes — including Use Me Lord, December Prayer Retreats, the Sowers Conference, Edification Conference, evangelism outreaches, and other recurring programmes — all anchored in discipleship.",
  },
];

const PROGRAMMES = [
  {
    icon: "📖",
    name: "Weekly Bible Study",
    freq: "Every Monday",
    desc: "A deliberate, systematic teaching of God's Word. Held every Monday at Oba Ile Housing Estate, Akure.",
  },
  {
    icon: "🎯",
    name: "CDT",
    freq: "Every 2nd Weekend",
    desc: "Concerted Discipleship Training — one of the mission's earliest programmes, designed to strengthen believers and prepare them for life and ministry.",
  },
  {
    icon: "🔥",
    name: "Sowers Conference",
    freq: "Annual",
    desc: "An annual gathering for young and emerging ministers. A time of intensive teaching, fellowship and consecration.",
  },
  {
    icon: "🙏",
    name: "December Prayer Retreat",
    freq: "Annual",
    desc: "A year-end retreat for prayer, reflection and alignment with God's purposes going into the new year.",
  },
  {
    icon: "📢",
    name: "Evangelism & Outreach",
    freq: "Recurring",
    desc: "Regular outreach efforts taking the gospel beyond the church walls into communities and schools.",
  },
  {
    icon: "✋",
    name: "Use Me Lord",
    freq: "Recurring",
    desc: "A platform for believers to be stirred and positioned for service — responding to the call of God on their lives.",
  },
];

const BELIEFS = [
  {
    ref: "2 Cor. 5:17",
    title: "New Creature Life",
    body: "We believe that salvation produces a genuinely new creation — not a reformed life but a transformed one. The believer is called to live out this new nature in every area of life.",
  },
  {
    ref: "Matt. 28:19–20",
    title: "Biblical Discipleship",
    body: "Discipleship is not optional — it is the mandate of the Great Commission. We are committed to deliberate, intentional disciple-making rooted entirely in the pattern of Scripture.",
  },
  {
    ref: "2 Tim. 3:16–17",
    title: "Bible Study",
    body: "The Word of God is the foundation of all we do. We give ourselves to systematic, serious study of Scripture as the supreme authority for faith, life and ministry.",
  },
  {
    ref: "Luke 9:23",
    title: "Self Denial",
    body: "Following Christ demands the daily denial of self. We embrace this as a non-negotiable mark of genuine discipleship — dying to self that Christ may increase.",
  },
  {
    ref: "Gal. 6:14",
    title: "The Cross of Christ",
    body: "The cross is not merely the entry point of the Christian life — it is its ongoing centre. We glory in the cross as the power of God for salvation and the pattern for all of life.",
  },
  {
    ref: "Luke 18:1",
    title: "Prayer",
    body: "Prayer is the lifeblood of the believer and the mission. We are committed to a life of prayer — individual, corporate and persistent — as the source of all fruitfulness.",
  },
  {
    ref: "Heb. 10:24–25",
    title: "Fellowship",
    body: "We were not saved to walk alone. Genuine fellowship with other believers — spurring one another on in love and good works — is essential to growth and the health of the body.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const progsRef = useRef<HTMLDivElement>(null);
  const beliefsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useReveal(storyRef);
  useReveal(missionRef);
  useReveal(progsRef);
  useReveal(beliefsRef);
  useReveal(contactRef);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

        .ab-root {
          font-family: 'DM Sans', sans-serif;
          background: #0C0C0C;
          color: #fff;
          overflow-x: hidden;
        }

        /* ── Shared reveal ── */
        .ab-reveal {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-reveal.d1 { transition-delay: 0.05s; }
        .ab-reveal.d2 { transition-delay: 0.15s; }
        .ab-reveal.d3 { transition-delay: 0.25s; }
        .ab-reveal.d4 { transition-delay: 0.35s; }
        .ab-reveal.d5 { transition-delay: 0.45s; }
        .ab-reveal.d6 { transition-delay: 0.55s; }
        .ab-reveal.ab-in { opacity: 1; transform: translateY(0); }

        /* ── Shared tokens ── */
        .ab-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem; letter-spacing: 0.24em; text-transform: uppercase;
          color: #C9A96E;
        }
        .ab-section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700; color: #fff; line-height: 1.1;
        }
        .ab-section-title em { font-style: italic; color: rgba(255,255,255,0.4); }
        .ab-gold-line { width: 2.5rem; height: 1.5px; background: #C9A96E; display: block; flex-shrink: 0; }
        .ab-h-rule { height: 1px; background: rgba(255,255,255,0.06); }
        .ab-inner { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }

        /* ── Hero ── */
        .ab-hero {
          padding-top: 80px;
          position: relative; overflow: hidden;
          min-height: 70svh;
          display: flex; flex-direction: column; justify-content: flex-end;
          background: #0C0C0C;
        }

        /* Noise texture overlay */
        .ab-hero-noise {
          position: absolute; inset: 0; pointer-events: none;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
        }

        /* Geometric cross motif */
        .ab-hero-cross {
          position: absolute;
          top: 50%; left: 60%;
          transform: translate(-50%, -50%);
          width: min(600px, 80vw);
          height: min(600px, 80vw);
          opacity: 0.03;
          pointer-events: none;
        }

        /* Glow */
        .ab-hero-glow {
          position: absolute; top: -200px; right: -200px;
          width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .ab-hero-glow-2 {
          position: absolute; bottom: -100px; left: -100px;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .ab-hero-content {
          position: relative; z-index: 2;
          padding: 4rem 2rem 5rem;
          max-width: 1100px; margin: 0 auto; width: 100%;
        }

        .ab-hero-tag {
          display: inline-flex; align-items: center; gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .ab-hero-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 8vw, 6.5rem);
          font-weight: 700; line-height: 0.95;
          letter-spacing: -0.02em; color: #fff;
          max-width: 10ch;
        }
        .ab-hero-heading em { font-style: italic; color: #C9A96E; }

        .ab-hero-body {
          margin-top: 2rem;
          font-size: clamp(0.9rem, 2vw, 1.05rem);
          color: rgba(255,255,255,0.45);
          font-weight: 300; line-height: 1.75;
          max-width: 46ch;
        }

        .ab-hero-meta {
          margin-top: 2.5rem;
          display: flex; flex-wrap: wrap; gap: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .ab-hero-meta-item { display: flex; flex-direction: column; gap: 0.25rem; }
        .ab-hero-meta-value {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem; font-weight: 600; color: #fff;
        }
        .ab-hero-meta-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }

        /* ── Section shell ── */
        .ab-section { padding: 6rem 0; position: relative; }
        .ab-section.alt { background: #0a0a0a; }
        .ab-section.light { background: #111; }

        /* ── Story / Timeline ── */
        .ab-timeline { display: flex; flex-direction: column; gap: 0; margin-top: 3.5rem; }

        .ab-timeline-item {
          display: grid;
          grid-template-columns: 7rem 1px 1fr;
          gap: 0 2rem;
          padding-bottom: 3rem;
        }
        .ab-timeline-item:last-child { padding-bottom: 0; }
        .ab-timeline-item:last-child .ab-timeline-line { background: transparent; }

        @media (max-width: 600px) {
          .ab-timeline-item { grid-template-columns: 4.5rem 1px 1fr; gap: 0 1.25rem; }
        }

        .ab-timeline-year {
          font-family: 'Playfair Display', serif;
          font-size: 0.9rem; font-weight: 600;
          color: #C9A96E; padding-top: 0.15rem;
          text-align: right;
        }

        .ab-timeline-line-wrap {
          display: flex; flex-direction: column; align-items: center; gap: 0;
        }
        .ab-timeline-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: #C9A96E; flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(201,169,110,0.15);
          margin-top: 0.2rem;
        }
        .ab-timeline-line {
          flex: 1; width: 1px;
          background: rgba(201,169,110,0.15);
          margin-top: 0.4rem;
        }

        .ab-timeline-body { padding-bottom: 0.5rem; }
        .ab-timeline-label {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem; font-weight: 600;
          color: #fff; margin-bottom: 0.5rem;
        }
        .ab-timeline-text {
          font-size: 0.88rem; color: rgba(255,255,255,0.5);
          font-weight: 300; line-height: 1.75;
        }

        /* ── Mission / Vision ── */
        .ab-mv-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1.5rem; margin-top: 3.5rem;
        }
        @media (max-width: 700px) { .ab-mv-grid { grid-template-columns: 1fr; } }

        .ab-mv-card {
          border-radius: 1rem; padding: 2.25rem;
          display: flex; flex-direction: column; gap: 1.25rem;
        }
        .ab-mv-card.mission {
          background: rgba(201,169,110,0.05);
          border: 1px solid rgba(201,169,110,0.15);
        }
        .ab-mv-card.vision {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
        }

        .ab-mv-card-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: #C9A96E;
        }
        .ab-mv-card-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700; color: #fff; line-height: 1.15;
        }
        .ab-mv-card-body {
          font-size: 0.9rem; color: rgba(255,255,255,0.55);
          font-weight: 300; line-height: 1.8;
          flex: 1;
        }
        .ab-mv-card-ref {
          font-family: 'Playfair Display', serif;
          font-style: italic; font-size: 0.85rem;
          color: rgba(201,169,110,0.6);
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        /* ── Programmes ── */
        .ab-progs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem; margin-top: 3.5rem;
        }

        .ab-prog-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.85rem; padding: 1.75rem;
          display: flex; flex-direction: column; gap: 0.85rem;
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .ab-prog-card:hover {
          border-color: rgba(201,169,110,0.22);
          background: rgba(201,169,110,0.04);
        }

        .ab-prog-icon {
          font-size: 1.5rem; line-height: 1;
          margin-bottom: 0.25rem;
        }
        .ab-prog-freq {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #C9A96E;
        }
        .ab-prog-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 700; color: #fff; line-height: 1.2;
        }
        .ab-prog-desc {
          font-size: 0.82rem; color: rgba(255,255,255,0.45);
          font-weight: 300; line-height: 1.7;
        }

        /* ── Beliefs ── */
        .ab-beliefs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1px; margin-top: 3.5rem;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 1rem; overflow: hidden;
        }

        .ab-belief-item {
          padding: 1.75rem 2rem;
          background: rgba(255,255,255,0.02);
          border-right: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; flex-direction: column; gap: 0.6rem;
          transition: background 0.2s ease;
        }
        .ab-belief-item:hover { background: rgba(255,255,255,0.04); }

        .ab-belief-ref {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem; letter-spacing: 0.14em;
          color: rgba(201,169,110,0.6); text-transform: uppercase;
        }
        .ab-belief-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 700; color: #fff;
        }
        .ab-belief-body {
          font-size: 0.82rem; color: rgba(255,255,255,0.45);
          font-weight: 300; line-height: 1.7;
        }

        /* ── Contact ── */
        .ab-contact-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1.5rem; margin-top: 3.5rem;
        }
        @media (max-width: 700px) { .ab-contact-grid { grid-template-columns: 1fr; } }

        .ab-contact-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 1rem; padding: 2rem;
          display: flex; flex-direction: column; gap: 1rem;
        }

        .ab-contact-icon {
          width: 2.5rem; height: 2.5rem; border-radius: 0.6rem;
          background: rgba(201,169,110,0.1);
          border: 1px solid rgba(201,169,110,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #C9A96E;
        }
        .ab-contact-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .ab-contact-value {
          font-size: 0.95rem; color: #fff; font-weight: 400; line-height: 1.55;
        }
        .ab-contact-link {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: #C9A96E; text-decoration: none; font-weight: 500;
          margin-top: auto;
          transition: opacity 0.2s ease;
        }
        .ab-contact-link:hover { opacity: 0.7; }

        /* Social row */
        .ab-socials {
          display: flex; gap: 0.6rem; flex-wrap: wrap; margin-top: 0.5rem;
        }
        .ab-social-btn {
          display: flex; align-items: center; gap: 0.4rem;
          padding: 0.5rem 0.9rem;
          border-radius: 2rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.5); text-decoration: none;
          font-size: 0.7rem; letter-spacing: 0.08em;
          transition: all 0.2s ease;
        }
        .ab-social-btn:hover {
          border-color: rgba(201,169,110,0.35);
          color: #C9A96E; background: rgba(201,169,110,0.06);
        }

        /* CTA strip */
        .ab-cta-strip {
          background: #C9A96E; border-radius: 1rem;
          padding: 2.5rem; margin-top: 1.5rem;
          display: flex; flex-wrap: wrap;
          align-items: center; justify-content: space-between;
          gap: 1.5rem;
        }
        .ab-cta-text {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.2rem, 2.5vw, 1.6rem);
          font-weight: 700; color: #0C0C0C;
          max-width: 36ch; line-height: 1.3;
        }
        .ab-cta-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: #0C0C0C; color: #C9A96E;
          font-size: 0.75rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 0.85rem 1.75rem; border-radius: 0.3rem;
          text-decoration: none; white-space: nowrap;
          transition: opacity 0.2s ease; flex-shrink: 0;
        }
        .ab-cta-btn:hover { opacity: 0.82; }

        /* Nav back */
        .ab-back {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.28); text-decoration: none;
          transition: color 0.2s ease;
        }
        .ab-back:hover { color: rgba(255,255,255,0.6); }
        .ab-back svg { transition: transform 0.2s ease; }
        .ab-back:hover svg { transform: translateX(-3px); }
      `}</style>

      <div className="ab-root">
        {/* ── Hero ── */}
        <section className="ab-hero" ref={heroRef}>
          <div className="ab-hero-noise" />
          <div className="ab-hero-glow" />
          <div className="ab-hero-glow-2" />

          {/* Cross motif */}
          <svg
            className="ab-hero-cross"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="175" y="20" width="50" height="360" rx="4" fill="white" />
            <rect x="20" y="130" width="360" height="50" rx="4" fill="white" />
          </svg>

          <div className="ab-hero-content">
            <div className="ab-hero-tag">
              <span className="ab-gold-line" />
              <span className="ab-eyebrow">Calvaryway Mission</span>
            </div>
            <h1 className="ab-hero-heading">
              About <em>Our</em> Mission
            </h1>
            <p className="ab-hero-body">
              A discipleship-based, non-denominational and interdenominational
              Christian mission committed to making disciples and preparing men
              for life and ministry — rooted in the Word, centred on Christ.
            </p>
            <div className="ab-hero-meta">
              {[
                // { value: "2018", label: "Active since" },
                // { value: "2020", label: "Name registered" },
                { value: "Akure", label: "Base" },
                { value: "Non-denom.", label: "Identity" },
              ].map((m) => (
                <div key={m.label} className="ab-hero-meta-item">
                  <span className="ab-hero-meta-value">{m.value}</span>
                  <span className="ab-hero-meta-label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="ab-h-rule" />

        {/* ── Our Story ── */}
        <section className="ab-section" ref={storyRef}>
          <div className="ab-inner">
            <div
              className="ab-reveal d1 flex items-center gap-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <span className="ab-gold-line" />
              <span className="ab-eyebrow">Our Story</span>
            </div>
            <h2 className="ab-section-title ab-reveal d2">
              A Work That <em>Began</em> Before a Name
            </h2>

            <div className="ab-timeline">
              {TIMELINE.map((t, i) => (
                <div
                  key={t.year}
                  className={`ab-timeline-item ab-reveal d${i + 2}`}
                >
                  <span className="ab-timeline-year">{t.year}</span>
                  <div className="ab-timeline-line-wrap">
                    <div className="ab-timeline-dot" />
                    <div className="ab-timeline-line" />
                  </div>
                  <div className="ab-timeline-body">
                    <p className="ab-timeline-label">{t.label}</p>
                    <p className="ab-timeline-text">{t.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="ab-h-rule" />

        {/* ── Vision & Mission ── */}
        <section className="ab-section alt" ref={missionRef}>
          <div className="ab-inner">
            <div
              className="ab-reveal d1 flex items-center gap-3"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <span className="ab-gold-line" />
              <span className="ab-eyebrow">Purpose</span>
            </div>
            <h2 className="ab-section-title ab-reveal d2">
              Vision <em>&</em> Mission
            </h2>

            <div className="ab-mv-grid">
              {/* Vision */}
              <div className="ab-mv-card vision ab-reveal d2">
                <span className="ab-mv-card-label">Our Vision</span>
                <h3 className="ab-mv-card-title">
                  To Make Disciples for the Lord and Prepare Men for Life and
                  Ministry.
                </h3>
                <p className="ab-mv-card-body">
                  Every programme, meeting and outreach flows from this single
                  aim — that those who encounter this ministry would be formed
                  into genuine disciples of Jesus Christ, equipped and ready for
                  whatever He calls them to.
                </p>
                <span className="ab-mv-card-ref">Matthew 28:19–20</span>
              </div>

              {/* Mission */}
              <div className="ab-mv-card mission ab-reveal d3">
                <span className="ab-mv-card-label">Our Mission</span>
                <h3 className="ab-mv-card-title">
                  To Nourish, Mature and Equip Believers through Systematic
                  Teaching of God's Word.
                </h3>
                <p className="ab-mv-card-body">
                  We pursue this through our discipleship-based weekly Bible
                  Study, monthly CDT classes, special trainings, retreats,
                  conferences for young and emerging ministers, and outreach
                  meetings — presenting the Lord Jesus Christ as the Pattern Son
                  and Servant of God.
                </p>
                <span className="ab-mv-card-ref">Ephesians 4:11–13</span>
              </div>
            </div>
          </div>
        </section>

        <div className="ab-h-rule" />

        {/* ── Programmes ── */}
        <section className="ab-section" ref={progsRef}>
          <div className="ab-inner">
            <div
              className="ab-reveal d1"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <span className="ab-gold-line" />
              <span className="ab-eyebrow">What We Do</span>
            </div>
            <h2 className="ab-section-title ab-reveal d2">
              Our <em>Programmes</em>
            </h2>
            <p
              className="ab-reveal d3"
              style={{
                marginTop: "0.75rem",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.4)",
                fontWeight: 300,
                lineHeight: 1.7,
                maxWidth: "50ch",
              }}
            >
              Each programme is rooted in the same purpose — forming believers
              and releasing them for the work of the gospel.
            </p>

            <div className="ab-progs-grid">
              {PROGRAMMES.map((p, i) => (
                <div
                  key={p.name}
                  className={`ab-prog-card ab-reveal d${(i % 4) + 2}`}
                >
                  <span className="ab-prog-icon">{p.icon}</span>
                  <span className="ab-prog-freq">{p.freq}</span>
                  <p className="ab-prog-name">{p.name}</p>
                  <p className="ab-prog-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="ab-h-rule" />

        {/* ── What We Believe ── */}
        <section className="ab-section alt" ref={beliefsRef}>
          <div className="ab-inner">
            <div
              className="ab-reveal d1"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <span className="ab-gold-line" />
              <span className="ab-eyebrow">What We Believe</span>
            </div>
            <h2 className="ab-section-title ab-reveal d2">
              Our Core <em>Values</em>
            </h2>
            <p
              className="ab-reveal d3"
              style={{
                marginTop: "0.75rem",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.4)",
                fontWeight: 300,
                lineHeight: 1.7,
                maxWidth: "50ch",
              }}
            >
              Seven convictions that shape everything we do — the
              non-negotiables of life and discipleship at Calvaryway Mission.
            </p>

            <div className="ab-beliefs-grid">
              {BELIEFS.map((b, i) => (
                <div
                  key={b.title}
                  className={`ab-belief-item ab-reveal d${(i % 4) + 2}`}
                >
                  <span className="ab-belief-ref">{b.ref}</span>
                  <p className="ab-belief-title">{b.title}</p>
                  <p className="ab-belief-body">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="ab-h-rule" />

        {/* ── Contact & Location ── */}
        <section className="ab-section" ref={contactRef}>
          <div className="ab-inner">
            <div
              className="ab-reveal d1"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <span className="ab-gold-line" />
              <span className="ab-eyebrow">Find Us</span>
            </div>
            <h2 className="ab-section-title ab-reveal d2">
              Contact <em>&</em> Location
            </h2>

            <div className="ab-contact-grid">
              {/* Location */}
              <div className="ab-contact-card ab-reveal d2">
                <div className="ab-contact-icon">
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
                <span className="ab-contact-label">Office Location</span>
                <p className="ab-contact-value">
                  Discipleship labour centre, <br /> House 6, © Bashorun Sehinde
                  Arogbofa Street, First Gate, <br /> Oba-Ile Estate, Akure.
                </p>
                <a
                  href="https://maps.google.com/?q=Oba+Ile+Housing+Estate+Akure+Ondo+State+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ab-contact-link"
                >
                  Open in Maps
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
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

              {/* Connect */}
              <div className="ab-contact-card ab-reveal d3">
                <div className="ab-contact-icon">
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
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <span className="ab-contact-label">Connect With Us</span>
                <p className="ab-contact-value">
                  Follow us across our platforms for messages, updates, and
                  programme announcements.
                </p>
                <div className="ab-socials">
                  {[
                    {
                      name: "YouTube",
                      href: "https://youtube.com/@calvarywaymissions2793",
                      icon: (
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      ),
                    },
                    {
                      name: "Telegram",
                      href: "https://t.me/calvaryway",
                      icon: (
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                      ),
                    },
                    {
                      name: "Facebook",
                      href: "https://www.facebook.com/pstflames",
                      icon: (
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.027 4.388 11.025 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.098 24 18.1 24 12.073z" />
                        </svg>
                      ),
                    },
                    {
                      name: "TikTok",
                      href: "https://www.tiktok.com/@calvarywaymissions",
                      icon: (
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                        </svg>
                      ),
                    },
                  ].map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ab-social-btn"
                    >
                      {s.icon}
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="ab-cta-strip ab-reveal d4">
              <p className="ab-cta-text">
                Ready to join us? We'd love to have you.
              </p>
              <a
                href="https://wa.me/2347036566036?text=Hello%2C%20I%27d%20like%20to%20know%20more%20about%20Calvaryway%20Mission%20and%20how%20to%20join."
                target="_blank"
                rel="noopener noreferrer"
                className="ab-cta-btn"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Join Us on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
