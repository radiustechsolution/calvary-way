"use client";

import { useState } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// DATA — update these arrays to add new messages
// ─────────────────────────────────────────────────────────────────────────────

const AUDIO_MESSAGES = [
  {
    id: 1,
    title: "The New Life in Christ (3)",
    series: "Monday Bible Study",
    date: "Jun 8, 2025",
    telegramUrl: "https://t.me/calvaryway/3717",
  },
  {
    id: 2,
    title: "The New Life in Christ (2)",
    series: "Monday Bible Study",
    date: "Jun 2, 2025",
    telegramUrl: "https://t.me/calvaryway/3715",
  },
  {
    id: 3,
    title: "The Overcomers (2)",
    series: "Monday Bible Study",
    date: "May 24, 2025",
    telegramUrl: "https://t.me/calvaryway/3699",
  },
  {
    id: 4,
    title: "The Overcomers (1)",
    series: "Monday Bible Study",
    date: "May 24, 2025",
    telegramUrl: "https://t.me/calvaryway/3698",
  },
  {
    id: 5,
    title: "Strong, Rooted & Victorious (5)",
    series: "Monday Bible Study",
    date: "May 18, 2025",
    telegramUrl: "https://t.me/calvaryway/3689",
  },
  {
    id: 6,
    title: "Strong, Rooted & Victorious (4)",
    series: "Monday Bible Study",
    date: "May 11, 2025",
    telegramUrl: "https://t.me/calvaryway/3685",
  },
  {
    id: 7,
    title: "Strong, Rooted & Victorious (3)",
    series: "Monday Bible Study",
    date: "May 4, 2025",
    telegramUrl: "https://t.me/calvaryway/3679",
  },
  {
    id: 8,
    title: "Strong, Rooted & Victorious (2)",
    series: "Monday Bible Study",
    date: "Apr 27, 2025",
    telegramUrl: "https://t.me/calvaryway/3667",
  },
  {
    id: 9,
    title: "Evidences of A Maturing Believer",
    series: "Monday Bible Study",
    date: "Apr 20, 2025",
    telegramUrl: "https://t.me/calvaryway/3658",
  },
  {
    id: 10,
    title: "The Power of Prayer (5)",
    series: "Monday Bible Study",
    date: "Apr 13, 2025",
    telegramUrl: "https://t.me/calvaryway/3644",
  },
];

const VIDEO_MESSAGES = [
  {
    id: 1,
    youtubeId: "1gqZ5lL8GD8",
    title: "The New Life in Christ (3)",
    series: "Monday Bible Study",
    date: "Jun 8, 2025",
  },
  {
    id: 2,
    youtubeId: "GlZEVgMFWJ8",
    title: "The New Life in Christ (2)",
    series: "Monday Bible Study",
    date: "Jun 2, 2025",
  },
  {
    id: 3,
    youtubeId: "FtdNsoEuPG8",
    title: "The Overcomers (2)",
    series: "Monday Bible Study",
    date: "May 24, 2025",
  },
  {
    id: 4,
    youtubeId: "FtdNsoEuPG8",
    title: "The Overcomers (1)",
    series: "Monday Bible Study",
    date: "May 24, 2025",
  },
  {
    id: 5,
    youtubeId: "dI9eGsic_N8",
    title: "Strong, Rooted & Victorious (5)",
    series: "Monday Bible Study",
    date: "May 18, 2025",
  },
  {
    id: 6,
    youtubeId: "a_c5668jbCs",
    title: "Strong, Rooted & Victorious (4)",
    series: "Monday Bible Study",
    date: "May 11, 2025",
  },
  {
    id: 7,
    youtubeId: "_eWFDhMtRoM",
    title: "Strong, Rooted & Victorious (3)",
    series: "Monday Bible Study",
    date: "May 4, 2025",
  },
  {
    id: 8,
    youtubeId: "0Tj-PRzU4zg",
    title: "Strong, Rooted & Victorious (2)",
    series: "Monday Bible Study",
    date: "Apr 27, 2025",
  },
  {
    id: 9,
    youtubeId: "ZPXQGiEMinc",
    title: "Evidences of A Maturing Believer",
    series: "Monday Bible Study",
    date: "Apr 20, 2025",
  },
  {
    id: 10,
    youtubeId: "UYTk3SpBGt0",
    title: "The Power of Prayer (5)",
    series: "Monday Bible Study",
    date: "Apr 13, 2025",
  },
];

const TELEGRAM_URL = "https://t.me/calvaryway";
const YOUTUBE_URL = "https://youtube.com/@calvarywaymissions2793";

// ─────────────────────────────────────────────────────────────────────────────

type Tab = "audio" | "video";

// ── Video card with embedded player ──────────────────────────────────────────
function VideoCard({ msg }: { msg: (typeof VIDEO_MESSAGES)[number] }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="sr-card">
      {/* Thumbnail / player */}
      {!playing ? (
        <div
          className="sr-thumb"
          onClick={() => setPlaying(true)}
          role="button"
          aria-label={`Play ${msg.title}`}
        >
          <img
            src={`https://img.youtube.com/vi/${msg.youtubeId}/maxresdefault.jpg`}
            alt={msg.title}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://img.youtube.com/vi/${msg.youtubeId}/hqdefault.jpg`;
            }}
          />
          <div className="sr-thumb-overlay">
            <div className="sr-play-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0C0C0C">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
          <span className="sr-type-badge video">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Video
          </span>
        </div>
      ) : (
        <div className="sr-embed">
          <iframe
            src={`https://www.youtube.com/embed/${msg.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title={msg.title}
          />
        </div>
      )}

      {/* Body */}
      <div className="sr-card-body">
        <div className="sr-card-meta">
          <span className="sr-series">{msg.series}</span>
          <span className="sr-date">{msg.date}</span>
        </div>
        <h3 className="sr-card-title">{msg.title}</h3>
        <div className="sr-card-actions">
          {!playing && (
            <button className="sr-btn primary" onClick={() => setPlaying(true)}>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Watch
            </button>
          )}
          <a
            href={`https://www.youtube.com/watch?v=${msg.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="sr-btn ghost"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            YouTube
          </a>
        </div>
      </div>
    </article>
  );
}

// ── Audio card ────────────────────────────────────────────────────────────────
function AudioCard({
  msg,
  index,
}: {
  msg: (typeof AUDIO_MESSAGES)[number];
  index: number;
}) {
  return (
    <article className="sr-audio-row">
      <div className="sr-audio-num">{String(index + 1).padStart(2, "0")}</div>

      <div className="sr-audio-icon">
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
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
          <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      </div>

      <div className="sr-audio-info">
        <span className="sr-series">{msg.series}</span>
        <h3 className="sr-audio-title">{msg.title}</h3>
        <span className="sr-date">{msg.date}</span>
      </div>

      <a
        href={msg.telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="sr-audio-listen"
        aria-label={`Listen to ${msg.title} on Telegram`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
        <span>Listen</span>
      </a>
    </article>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SermonsPage() {
  const [tab, setTab] = useState<Tab>("video");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

        .sr-root {
          font-family: 'DM Sans', sans-serif;
          background: #0C0C0C;
          min-height: 100svh;
          padding-top: 80px;
          color: #fff;
        }

        /* ── Masthead ── */
        .sr-head {
          position: relative; overflow: hidden;
          padding: 4rem 2rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .sr-head-glow {
          position: absolute; top: -150px; right: -150px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .sr-head-inner { max-width: 1100px; margin: 0 auto; }

        .sr-back {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.28); text-decoration: none;
          margin-bottom: 2rem; transition: color 0.2s ease;
        }
        .sr-back:hover { color: rgba(255,255,255,0.6); }
        .sr-back svg { transition: transform 0.2s ease; }
        .sr-back:hover svg { transform: translateX(-3px); }

        .sr-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.26em; text-transform: uppercase;
          color: #C9A96E; margin-bottom: 0.75rem;
        }
        .sr-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 700; line-height: 0.95;
          letter-spacing: -0.02em; color: #fff;
        }
        .sr-heading em { font-style: italic; color: #C9A96E; }

        .sr-head-desc {
          margin-top: 1rem;
          font-size: 0.88rem; color: rgba(255,255,255,0.38);
          font-weight: 300; line-height: 1.7; max-width: 44ch;
        }

        /* ── Tabs ── */
        .sr-tabs {
          display: flex; align-items: stretch;
          margin-top: 2.5rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .sr-tab {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 1rem 1.5rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          background: none; border: none;
          cursor: pointer; transition: all 0.2s ease;
          border-right: 1px solid rgba(255,255,255,0.06);
          position: relative;
        }
        .sr-tab:first-child { border-left: 1px solid rgba(255,255,255,0.06); }
        .sr-tab:hover { color: rgba(255,255,255,0.65); background: rgba(255,255,255,0.03); }
        .sr-tab.active { color: #C9A96E; background: rgba(201,169,110,0.05); }
        .sr-tab.active::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; background: #C9A96E;
        }
        .sr-tab-count {
          font-size: 0.52rem; opacity: 0.55; vertical-align: super;
        }

        /* ── Content ── */
        .sr-content { max-width: 1100px; margin: 0 auto; padding: 3rem 2rem 6rem; }

        /* ── Platform bar ── */
        .sr-platform-bar {
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 2.5rem; flex-wrap: wrap;
        }
        .sr-platform-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }
        .sr-platform-link {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.45); text-decoration: none;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 0.4rem 0.85rem; border-radius: 2rem;
          transition: all 0.2s ease;
        }
        .sr-platform-link:hover { color: #fff; border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.07); }
        .sr-platform-link.gold { color: #C9A96E; border-color: rgba(201,169,110,0.25); background: rgba(201,169,110,0.07); }
        .sr-platform-link.gold:hover { background: rgba(201,169,110,0.14); border-color: rgba(201,169,110,0.45); }

        /* ── Video grid ── */
        .sr-video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        @media (max-width: 680px) { .sr-video-grid { grid-template-columns: 1fr; } }

        /* ── Video card ── */
        .sr-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 1rem; overflow: hidden;
          display: flex; flex-direction: column;
          transition: border-color 0.25s ease, transform 0.25s ease;
        }
        .sr-card:hover { border-color: rgba(201,169,110,0.2); transform: translateY(-2px); }

        .sr-thumb {
          position: relative; aspect-ratio: 16/9;
          background: #000; cursor: pointer; overflow: hidden;
        }
        .sr-thumb img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.4s ease;
        }
        .sr-thumb:hover img { transform: scale(1.03); }
        .sr-thumb-overlay {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.28); transition: background 0.25s ease;
        }
        .sr-thumb:hover .sr-thumb-overlay { background: rgba(0,0,0,0.15); }
        .sr-play-btn {
          width: 52px; height: 52px; border-radius: 50%;
          background: #C9A96E;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.25s ease;
        }
        .sr-thumb:hover .sr-play-btn { transform: scale(1.1); }

        .sr-embed { position: relative; aspect-ratio: 16/9; background: #000; }
        .sr-embed iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: none; }

        .sr-type-badge {
          position: absolute; top: 0.65rem; right: 0.65rem;
          display: inline-flex; align-items: center; gap: 0.3rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.56rem; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.22rem 0.6rem; border-radius: 0.2rem;
        }
        .sr-type-badge.video { background: rgba(0,0,0,0.6); color: rgba(255,255,255,0.85); }

        .sr-card-body { padding: 1.25rem 1.4rem 1.4rem; display: flex; flex-direction: column; gap: 0.55rem; }

        .sr-card-meta { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
        .sr-series {
          font-family: 'DM Mono', monospace;
          font-size: 0.56rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #C9A96E;
        }
        .sr-date {
          font-family: 'DM Mono', monospace;
          font-size: 0.54rem; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.25);
        }
        .sr-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem; font-weight: 700;
          color: #fff; line-height: 1.25;
        }

        .sr-card-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.25rem; }
        .sr-btn {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.5rem 1rem; border-radius: 0.3rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase;
          text-decoration: none; border: 1px solid;
          cursor: pointer; background: none; transition: all 0.2s ease;
        }
        .sr-btn.primary { background: #C9A96E; border-color: #C9A96E; color: #0C0C0C; }
        .sr-btn.primary:hover { background: #dfc08a; border-color: #dfc08a; }
        .sr-btn.ghost { background: transparent; border-color: rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); }
        .sr-btn.ghost:hover { border-color: rgba(255,255,255,0.25); color: #fff; }

        /* ── Audio list ── */
        .sr-audio-list { display: flex; flex-direction: column; gap: 0; }

        .sr-audio-row {
          display: grid;
          grid-template-columns: 2.5rem 2.5rem 1fr auto;
          align-items: center; gap: 1rem;
          padding: 1.25rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.2s ease;
          border-radius: 0.5rem;
        }
        .sr-audio-row:last-child { border-bottom: none; }
        .sr-audio-row:hover { background: rgba(255,255,255,0.03); }

        @media (max-width: 500px) {
          .sr-audio-row { grid-template-columns: 2rem 2rem 1fr auto; gap: 0.6rem; }
        }

        .sr-audio-num {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.08em;
          color: rgba(255,255,255,0.2); text-align: right;
        }
        .sr-audio-icon {
          width: 2.5rem; height: 2.5rem; border-radius: 0.5rem;
          background: rgba(201,169,110,0.08);
          border: 1px solid rgba(201,169,110,0.15);
          display: flex; align-items: center; justify-content: center;
          color: #C9A96E; flex-shrink: 0;
        }
        .sr-audio-info { display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }
        .sr-audio-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 600;
          color: #fff; line-height: 1.2;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .sr-audio-listen {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: #C9A96E; text-decoration: none;
          background: rgba(201,169,110,0.08);
          border: 1px solid rgba(201,169,110,0.2);
          padding: 0.5rem 0.9rem; border-radius: 2rem;
          white-space: nowrap; flex-shrink: 0;
          transition: all 0.2s ease;
        }
        .sr-audio-listen:hover { background: rgba(201,169,110,0.16); border-color: rgba(201,169,110,0.4); }

        @media (max-width: 500px) {
          .sr-audio-listen span { display: none; }
          .sr-audio-listen { padding: 0.5rem; border-radius: 50%; width: 2rem; height: 2rem; justify-content: center; }
        }

        /* ── Follow CTA ── */
        .sr-follow-strip {
          background: #111; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 1rem; padding: 2rem 2rem;
          display: flex; flex-wrap: wrap;
          align-items: center; justify-content: space-between;
          gap: 1.25rem; margin-top: 3rem;
        }
        .sr-follow-text {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1rem, 2.5vw, 1.3rem);
          font-weight: 600; color: #fff; max-width: 36ch; line-height: 1.35;
        }
        .sr-follow-btns { display: flex; gap: 0.6rem; flex-wrap: wrap; }
        .sr-follow-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.7rem 1.25rem; border-radius: 0.3rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none; border: 1px solid; transition: all 0.2s ease;
        }
        .sr-follow-btn.gold { background: #C9A96E; border-color: #C9A96E; color: #0C0C0C; }
        .sr-follow-btn.gold:hover { background: #dfc08a; }
        .sr-follow-btn.outline { background: transparent; border-color: rgba(255,255,255,0.15); color: rgba(255,255,255,0.55); }
        .sr-follow-btn.outline:hover { border-color: rgba(255,255,255,0.35); color: #fff; }
      `}</style>

      <div className="sr-root">
        {/* ── Masthead ── */}
        <header className="sr-head">
          <div className="sr-head-glow" />
          <div className="sr-head-inner">
            <Link href="/" className="sr-back">
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
            <p className="sr-eyebrow">Calvaryway Mission — The Word</p>
            <h1 className="sr-heading">
              Sermons <em>&</em>
              <br />
              Messages
            </h1>
            <p className="sr-head-desc">
              Recent teachings from our Monday Bible Study and other programmes.
              Audio on Telegram · Video on YouTube.
            </p>

            {/* Tabs */}
            <div className="sr-tabs">
              <button
                className={`sr-tab${tab === "video" ? " active" : ""}`}
                onClick={() => setTab("video")}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Video
                <span className="sr-tab-count">{VIDEO_MESSAGES.length}</span>
              </button>
              <button
                className={`sr-tab${tab === "audio" ? " active" : ""}`}
                onClick={() => setTab("audio")}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                </svg>
                Audio
                <span className="sr-tab-count">{AUDIO_MESSAGES.length}</span>
              </button>
            </div>
          </div>
        </header>

        {/* ── Content ── */}
        <div className="sr-content">
          {/* Platform bar */}
          <div className="sr-platform-bar">
            <span className="sr-platform-label">Stream on</span>
            {tab === "video" ? (
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="sr-platform-link"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                YouTube Channel
              </a>
            ) : (
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="sr-platform-link gold"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Telegram Channel
              </a>
            )}
          </div>

          {/* Video tab */}
          {tab === "video" && (
            <div className="sr-video-grid">
              {VIDEO_MESSAGES.map((msg) => (
                <VideoCard key={msg.id} msg={msg} />
              ))}
            </div>
          )}

          {/* Audio tab */}
          {tab === "audio" && (
            <div className="sr-audio-list">
              {AUDIO_MESSAGES.map((msg, i) => (
                <AudioCard key={msg.id} msg={msg} index={i} />
              ))}
            </div>
          )}

          {/* Follow CTA */}
          <div className="sr-follow-strip">
            <p className="sr-follow-text">
              Never miss a message — follow us on{" "}
              {tab === "video" ? "YouTube" : "Telegram"}.
            </p>
            <div className="sr-follow-btns">
              {tab === "video" ? (
                <>
                  <a
                    href={YOUTUBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sr-follow-btn gold"
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    Subscribe on YouTube
                  </a>
                  <button
                    className="sr-follow-btn outline"
                    onClick={() => setTab("audio")}
                  >
                    Switch to Audio
                  </button>
                </>
              ) : (
                <>
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sr-follow-btn gold"
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    Join Telegram
                  </a>
                  <button
                    className="sr-follow-btn outline"
                    onClick={() => setTab("video")}
                  >
                    Switch to Video
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
