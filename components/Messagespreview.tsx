"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── Latest message — update this when a new message is published ─────────────
const LATEST = {
  type: "video" as const,
  youtubeId: "ijhrPlnrNjY",
  title: "The New Life In Christ (Part 5)",
  series: "Monday Bible Study",
  speaker: "Bro Goke Adesida",
  date: "22nd June 2026",
  reference: "The Functionality of Gods Life in our heart.",
  telegramUrl: "https://t.me/calvaryway",
};

// ─────────────────────────────────────────────────────────────────────────────

https: export default function MessagesPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("mp-in");
        }),
      { threshold: 0.08 },
    );
    sectionRef.current
      ?.querySelectorAll(".mp-reveal")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        .mp-root {
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0a;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .mp-glow {
          position: absolute;
          top: -100px; right: -200px;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.055) 0%, transparent 70%);
          pointer-events: none;
        }

        .mp-reveal {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1);
        }
        .mp-reveal.d1 { transition-delay: 0.05s; }
        .mp-reveal.d2 { transition-delay: 0.2s; }
        .mp-reveal.d3 { transition-delay: 0.35s; }
        .mp-reveal.mp-in { opacity: 1; transform: translateY(0); }

        .mp-video-card {
          background: #111;
          border: 1px solid rgba(201,169,110,0.14);
          border-radius: 1.25rem;
          overflow: hidden;
        }

        .mp-thumb-wrap {
          position: relative;
          aspect-ratio: 16/9;
          background: #000;
          cursor: pointer;
          overflow: hidden;
        }

        .mp-thumb-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .mp-thumb-wrap:hover img { transform: scale(1.03); }

        .mp-play-overlay {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.3);
          transition: background 0.25s ease;
        }
        .mp-thumb-wrap:hover .mp-play-overlay { background: rgba(0,0,0,0.18); }

        .mp-play-btn {
          width: 68px; height: 68px;
          border-radius: 50%;
          background: rgba(201,169,110,0.92);
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .mp-thumb-wrap:hover .mp-play-btn { transform: scale(1.1); background: #C9A96E; }

        .mp-iframe-wrap {
          position: relative;
          aspect-ratio: 16/9;
          background: #000;
        }
        .mp-iframe-wrap iframe {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          border: none;
        }

        .mp-card-body {
          padding: 1.5rem 1.75rem 1.75rem;
          display: flex; flex-direction: column; gap: 1rem;
        }

        .mp-badge {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: rgba(201,169,110,0.1);
          border: 1px solid rgba(201,169,110,0.2);
          border-radius: 2rem;
          padding: 0.25rem 0.75rem;
          font-size: 0.64rem; letter-spacing: 0.14em;
          text-transform: uppercase; color: #C9A96E; font-weight: 500;
        }

        .mp-card-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.25rem, 3vw, 1.65rem);
          font-weight: 700; color: #fff; line-height: 1.2;
        }

        .mp-action-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.6rem 1.1rem;
          border-radius: 0.3rem;
          font-size: 0.7rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          text-decoration: none; transition: all 0.22s ease;
          border: 1px solid; cursor: pointer; background: none;
          font-family: 'DM Sans', sans-serif;
        }

        .mp-action-btn.primary {
          background: rgba(201,169,110,0.12);
          border-color: rgba(201,169,110,0.3);
          color: #C9A96E;
        }
        .mp-action-btn.primary:hover {
          background: rgba(201,169,110,0.2);
          border-color: rgba(201,169,110,0.55);
        }

        .mp-action-btn.ghost {
          background: rgba(255,255,255,0.03);
          border-color: rgba(255,255,255,0.09);
          color: rgba(255,255,255,0.45);
        }
        .mp-action-btn.ghost:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.18);
          color: #fff;
        }

        .gold-line { width: 2.5rem; height: 1.5px; background: #C9A96E; display: block; }
        .mp-eyebrow { font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; color: #C9A96E; font-weight: 500; }

        .mp-all-link {
          display: inline-flex; align-items: center; gap: 0.45rem;
          font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
          font-weight: 500; color: rgba(255,255,255,0.35); text-decoration: none;
          border: 1px solid rgba(255,255,255,0.08); padding: 0.65rem 1.2rem;
          border-radius: 0.35rem; transition: all 0.25s ease;
        }
        .mp-all-link:hover { color: #fff; border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); }
        .mp-all-link svg { transition: transform 0.25s ease; }
        .mp-all-link:hover svg { transform: translateX(3px); }
      `}</style>

      <section ref={sectionRef} className="mp-root w-full py-20 md:py-28 px-5">
        <div className="mp-glow" />

        <div className="max-w-6xl mx-auto flex flex-col gap-10 relative">
          {/* Header */}
          <div className="mp-reveal d1 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="gold-line" />
                <span className="mp-eyebrow">Messages</span>
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
                Latest Message
              </h2>
            </div>
            <Link
              href="/messages"
              className="mp-all-link self-start sm:self-auto"
            >
              All messages
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
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

          {/* Card */}
          <div className="mp-video-card mp-reveal d2">
            {/* Player / thumbnail */}
            {!playing ? (
              <div
                className="mp-thumb-wrap"
                onClick={() => setPlaying(true)}
                role="button"
                aria-label={`Play ${LATEST.title}`}
              >
                <img
                  src={`https://img.youtube.com/vi/${LATEST.youtubeId}/maxresdefault.jpg`}
                  alt={LATEST.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://img.youtube.com/vi/${LATEST.youtubeId}/hqdefault.jpg`;
                  }}
                />
                <div className="mp-play-overlay">
                  <div className="mp-play-btn">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#0C0C0C"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mp-iframe-wrap">
                <iframe
                  src={`https://www.youtube.com/embed/${LATEST.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title={LATEST.title}
                />
              </div>
            )}

            {/* Info */}
            <div className="mp-card-body">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span className="mp-badge">
                  <svg
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="currentColor"
                  >
                    <circle cx="3" cy="3" r="3" />
                  </svg>
                  Latest · Video
                </span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.28)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {LATEST.date}
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <p
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(201,169,110,0.65)",
                    fontWeight: 500,
                  }}
                >
                  {LATEST.series}
                </p>
                <h3 className="mp-card-title">{LATEST.title}</h3>
              </div>

              <p
                style={{
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.4)",
                  fontWeight: 300,
                  lineHeight: 1.5,
                }}
              >
                {LATEST.reference}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.06em",
                }}
              >
                <span>{LATEST.speaker}</span>
                <span
                  style={{
                    width: 2,
                    height: 2,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    display: "inline-block",
                  }}
                />
                <span>Calvaryway Mission</span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.6rem",
                  marginTop: "0.25rem",
                }}
              >
                {!playing && (
                  <button
                    className="mp-action-btn primary"
                    onClick={() => setPlaying(true)}
                  >
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
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Watch now
                  </button>
                )}
                <a
                  href={LATEST.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mp-action-btn ghost"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  Audio on Telegram
                </a>
                <Link href="/messages" className="mp-action-btn ghost">
                  All messages →
                </Link>
              </div>
            </div>
          </div>

          {/* Footnote */}
          <div
            className="mp-reveal d3"
            style={{
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.22)",
              fontWeight: 300,
              lineHeight: 1.65,
            }}
          >
            Video messages on{" "}
            <a
              href="https://youtube.com/@calvarywaymissions2793"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(201,169,110,0.55)",
                textDecoration: "none",
              }}
            >
              YouTube
            </a>{" "}
            · Audio messages on{" "}
            <a
              href="https://t.me/calvaryway"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(201,169,110,0.55)",
                textDecoration: "none",
              }}
            >
              Telegram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
