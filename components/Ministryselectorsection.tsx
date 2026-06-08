"use client";

import { useState, useEffect } from "react";

const PHONE = "2347036566036";

const PROGRAMMES = [
  {
    id: "bible-study",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    label: "Bible Study",
    frequency: "Every Monday",
    tagline: "Go deep into the Word.",
    description:
      "Our weekly Bible Study is a gathering of believers committed to understanding Scripture in its full context. Each session digs into a passage or book of the Bible — unpacking its meaning, its historical setting, and how it speaks to everyday discipleship. Whether you're a new believer or have walked with God for years, you'll find honest questions welcomed and the Word treated with reverence.",
    highlights: [
      { icon: "📅", label: "Every Monday" },
      { icon: "📍", label: "Akure, Ondo State" },
      { icon: "🕐", label: "Details shared on registration" },
    ],
    whatsappMsg:
      "Hello, I'm interested in the Bible Study programme at Calvaryway Mission. Please share more details.",
  },
  {
    id: "discipleship",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: "Discipleship",
    frequency: "Every 2nd Weekend",
    tagline: "Be trained. Be sent.",
    description:
      "The Concerted Discipleship Training (CDT) is Calvaryway Mission's flagship training programme held every second weekend. It is designed to form believers into intentional disciples — people who know the Word, live by it, and can reproduce it in others. Sessions cover the foundations of Christian life, evangelism, and how to make disciples in your sphere of influence. This is not a seminar; it's a lifestyle-formation experience.",
    highlights: [
      { icon: "📅", label: "Every 2nd Weekend" },
      { icon: "📍", label: "Akure, Ondo State" },
      { icon: "🎯", label: "Open to all believers" },
    ],
    whatsappMsg:
      "Hello, I'm interested in the Concerted Discipleship Training (CDT) at Calvaryway Mission. Please share more details.",
  },
];

export default function MinistrySelectorSection() {
  const [active, setActive] = useState<string | null>(null);
  const selected = PROGRAMMES.find((p) => p.id === active) ?? null;

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const waHref = selected
    ? `https://wa.me/${PHONE}?text=${encodeURIComponent(selected.whatsappMsg)}`
    : "#";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .ms-root {
          font-family: 'DM Sans', sans-serif;
          background: #0C0C0C;
          position: relative;
          overflow: hidden;
        }

        .ms-glow {
          position: absolute;
          bottom: -200px;
          left: -200px;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Cards */
        .ms-card {
          flex: 1;
          min-width: 0;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 1rem;
          background: rgba(255,255,255,0.025);
          padding: 2rem 1.75rem;
          cursor: pointer;
          transition: border-color 0.3s ease, background 0.3s ease, transform 0.25s ease;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          outline: none;
          text-align: left;
          position: relative;
          overflow: hidden;
        }

        .ms-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          background: linear-gradient(135deg, rgba(201,169,110,0.06) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .ms-card:hover,
        .ms-card:focus-visible {
          border-color: rgba(201,169,110,0.4);
          background: rgba(201,169,110,0.045);
          transform: translateY(-3px);
        }

        .ms-card:hover::before,
        .ms-card:focus-visible::before {
          opacity: 1;
        }

        .ms-card-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          background: rgba(201,169,110,0.1);
          border: 1px solid rgba(201,169,110,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C9A96E;
          flex-shrink: 0;
        }

        .ms-card-label {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.4rem, 3vw, 1.75rem);
          font-weight: 600;
          color: #fff;
          line-height: 1.15;
        }

        .ms-card-freq {
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C9A96E;
          font-weight: 500;
        }

        .ms-card-tagline {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.45);
          font-weight: 300;
          line-height: 1.6;
        }

        .ms-card-cta {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(201,169,110,0.7);
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .ms-card:hover .ms-card-cta {
          color: #C9A96E;
        }

        .ms-card-cta svg {
          transition: transform 0.25s ease;
        }

        .ms-card:hover .ms-card-cta svg {
          transform: translateX(3px);
        }

        /* Modal backdrop */
        .ms-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        @media (min-width: 640px) {
          .ms-backdrop {
            align-items: center;
          }
        }

        .ms-backdrop.open {
          opacity: 1;
          pointer-events: all;
        }

        /* Modal panel */
        .ms-modal {
          background: #111;
          border: 1px solid rgba(201,169,110,0.15);
          border-radius: 1.25rem 1.25rem 0 0;
          width: 100%;
          max-width: 600px;
          padding: 2.25rem 1.75rem 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          transform: translateY(32px);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
          position: relative;
          max-height: 90svh;
          overflow-y: auto;
        }

        @media (min-width: 640px) {
          .ms-modal {
            border-radius: 1.25rem;
            max-height: 80svh;
          }
        }

        .ms-backdrop.open .ms-modal {
          transform: translateY(0);
        }

        .ms-modal-close {
          position: absolute;
          top: 1.1rem;
          right: 1.1rem;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
          flex-shrink: 0;
        }

        .ms-modal-close:hover {
          background: rgba(255,255,255,0.12);
          color: #fff;
        }

        .ms-modal-label {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.15;
        }

        .ms-modal-body {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.75;
          font-weight: 300;
        }

        .ms-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .ms-highlight-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 2rem;
          padding: 0.35rem 0.85rem;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.55);
          font-weight: 400;
        }

        .ms-wa-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: #C9A96E;
          color: #0C0C0C;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.9rem 1.75rem;
          border-radius: 0.35rem;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.2s ease;
          width: 100%;
          margin-top: 0.25rem;
        }

        .ms-wa-btn:hover {
          background: #dfc08a;
          transform: translateY(-2px);
        }

        .ms-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

        .gold-line { width: 2.5rem; height: 1.5px; background: #C9A96E; display: block; }
        .ms-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C9A96E;
          font-weight: 500;
        }
      `}</style>

      <section className="ms-root w-full py-20 md:py-28 px-5">
        <div className="ms-glow" />

        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="gold-line" />
              <span className="ms-eyebrow">Get Involved</span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.1,
              }}
            >
              Regular Programmes
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.9rem",
                maxWidth: "44ch",
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Two recurring gatherings open to anyone who wants to grow — tap a
              programme to learn more.
            </p>
          </div>

          {/* Cards */}
          <div className="flex flex-col md:flex-row gap-5">
            {PROGRAMMES.map((p) => (
              <button
                key={p.id}
                className="ms-card"
                onClick={() => setActive(p.id)}
                aria-haspopup="dialog"
              >
                <div className="ms-card-icon">{p.icon}</div>
                <div className="flex flex-col gap-1.5">
                  <span className="ms-card-freq">{p.frequency}</span>
                  <span className="ms-card-label">{p.label}</span>
                </div>
                <p className="ms-card-tagline">{p.tagline}</p>
                <span className="ms-card-cta">
                  Learn more
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <div
        className={`ms-backdrop${active ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={selected?.label ?? "Programme details"}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
      >
        <div className="ms-modal">
          {/* Close */}
          <button
            className="ms-modal-close"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {selected && (
            <>
              {/* Icon + label */}
              <div className="flex items-center gap-4 pr-8">
                <div className="ms-card-icon" style={{ flexShrink: 0 }}>
                  {selected.icon}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="ms-eyebrow">{selected.frequency}</span>
                  <h2 className="ms-modal-label">{selected.label}</h2>
                </div>
              </div>

              <div className="ms-divider" />

              {/* Body */}
              <p className="ms-modal-body">{selected.description}</p>

              {/* Highlights */}
              <div className="ms-highlights">
                {selected.highlights.map((h) => (
                  <span key={h.label} className="ms-highlight-pill">
                    <span aria-hidden>{h.icon}</span>
                    {h.label}
                  </span>
                ))}
              </div>

              <div className="ms-divider" />

              {/* WhatsApp CTA */}
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="ms-wa-btn"
              >
                {/* WhatsApp icon */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Connect on WhatsApp
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
}
