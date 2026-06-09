"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION — update these two arrays with your actual image filenames
// Images live in:
//   /public/gallery/sowers/   → December Prayer Retreat photos
//   /public/gallery/bible-study/ → bible study photos
// ─────────────────────────────────────────────────────────────────────────────

const PROGRAMMES = [
  {
    id: "sowers",
    name: "December Prayer Retreat",
    year: "DEC 2025",
    subtitle: "The Covenant Keeping God",
    location: "Akure, Ondo State",
    folder: "/gallery/sowers",
    // Replace with your actual filenames — first image is used as the card cover
    images: [
      "01.jpg",
      "02.jpg",
      "03.jpg",
      "04.jpg",
      "05.jpg",
      "06.jpg",
      "07.jpg",
      "08.jpg",
      "09.jpg",
      "10.jpg",
      "11.jpg",
      "12.jpg",
      "13.jpg",
      "14.jpg",
      "15.jpg",
      "16.jpg",
      "17.jpg",
      "18.jpg",
      "19.jpg",
      "20.jpg",
    ],
    accentColor: "#C9A96E",
  },
  {
    id: "bible-study",
    name: "Bible Study",
    year: "2026",
    subtitle: "Monday Evening Sessions",
    location: "Akure, Ondo State",
    folder: "/gallery/bible-study",
    images: [
      "01.jpg",
      "02.jpg",
      "03.jpg",
      "04.jpg",
      "05.jpg",
      "06.jpg",
      "07.jpg",
      "08.jpg",
      "09.jpg",
      "10.jpg",
      "11.jpg",
      "12.jpg",
      "13.jpg",
      "14.jpg",
      "15.jpg",
      "16.jpg",
    ],
    accentColor: "#A8C4A2",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

type Programme = (typeof PROGRAMMES)[number];

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  programme,
  startIndex,
  onClose,
}: {
  programme: Programme;
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const [loaded, setLoaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const total = programme.images.length;
  const src = `${programme.folder}/${programme.images[index]}`;

  const prev = useCallback(() => {
    setLoaded(false);
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);
  const next = useCallback(() => {
    setLoaded(false);
    setIndex((i) => (i + 1) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Download handler — fetches blob so browser prompts save dialog
  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await fetch(src);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${programme.id}-${String(index + 1).padStart(2, "0")}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab
      window.open(src, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <style>{`
        .lb-backdrop {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(0,0,0,0.97);
          display: flex; flex-direction: column;
          animation: lb-in 0.25s ease;
        }
        @keyframes lb-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Top bar */
        .lb-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }

        .lb-programme-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }

        .lb-counter {
          font-family: 'DM Mono', 'Courier New', monospace;
          font-size: 0.68rem; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.3);
        }

        .lb-topbar-actions {
          display: flex; align-items: center; gap: 0.5rem;
        }

        .lb-icon-btn {
          display: flex; align-items: center; justify-content: center;
          width: 2.25rem; height: 2.25rem;
          border-radius: 0.4rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.5);
          cursor: pointer; transition: all 0.2s ease;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem; letter-spacing: 0.1em;
          text-transform: uppercase; gap: 0.35rem;
        }
        .lb-icon-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
          color: #fff;
        }
        .lb-icon-btn.download-btn {
          background: rgba(201,169,110,0.1);
          border-color: rgba(201,169,110,0.25);
          color: #C9A96E;
          padding: 0 0.85rem;
          width: auto;
        }
        .lb-icon-btn.download-btn:hover {
          background: rgba(201,169,110,0.2);
          border-color: rgba(201,169,110,0.5);
          color: #C9A96E;
        }

        /* Main image area */
        .lb-stage {
          flex: 1; min-height: 0;
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
          padding: 1rem;
        }

        .lb-img-wrap {
          position: relative;
          max-width: 100%; max-height: 100%;
          display: flex; align-items: center; justify-content: center;
        }

        .lb-img {
          max-width: 100%; max-height: calc(100svh - 140px);
          object-fit: contain; display: block;
          border-radius: 0.5rem;
          opacity: 0; transition: opacity 0.3s ease;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6);
        }
        .lb-img.ready { opacity: 1; }

        .lb-spinner {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .lb-spinner-ring {
          width: 28px; height: 28px;
          border: 2px solid rgba(255,255,255,0.08);
          border-top-color: rgba(201,169,110,0.6);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Nav arrows */
        .lb-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 3rem; height: 3rem;
          border-radius: 50%;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s ease;
          z-index: 10;
        }
        .lb-arrow:hover {
          background: rgba(0,0,0,0.8);
          border-color: rgba(255,255,255,0.3);
          color: #fff;
        }
        .lb-arrow.prev { left: 0.75rem; }
        .lb-arrow.next { right: 0.75rem; }

        @media (max-width: 500px) {
          .lb-arrow { width: 2.5rem; height: 2.5rem; }
          .lb-arrow.prev { left: 0.4rem; }
          .lb-arrow.next { right: 0.4rem; }
        }

        /* Bottom filmstrip */
        .lb-strip {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 0.4rem;
          padding: 0.75rem 1.25rem;
          overflow-x: auto;
          border-top: 1px solid rgba(255,255,255,0.05);
          scrollbar-width: none;
        }
        .lb-strip::-webkit-scrollbar { display: none; }

        .lb-thumb {
          width: 52px; height: 36px; flex-shrink: 0;
          border-radius: 0.3rem;
          overflow: hidden; cursor: pointer;
          border: 2px solid transparent;
          transition: border-color 0.2s ease, opacity 0.2s ease;
          opacity: 0.45;
        }
        .lb-thumb.active {
          border-color: #C9A96E;
          opacity: 1;
        }
        .lb-thumb:hover { opacity: 0.85; }
        .lb-thumb img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
      `}</style>

      <div
        className="lb-backdrop"
        role="dialog"
        aria-modal="true"
        aria-label={`${programme.name} gallery`}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Top bar */}
        <div className="lb-topbar">
          <span className="lb-programme-name">
            {programme.name} · {programme.year}
          </span>
          <span className="lb-counter">
            {index + 1} / {total}
          </span>
          <div className="lb-topbar-actions">
            <button
              className="lb-icon-btn download-btn"
              onClick={handleDownload}
              disabled={downloading}
              aria-label="Download image"
            >
              {downloading ? (
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
                  <path d="M12 2v20M2 12l10 10 10-10" />
                </svg>
              ) : (
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
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              )}
              {downloading ? "Saving…" : "Download"}
            </button>
            <button
              className="lb-icon-btn"
              onClick={onClose}
              aria-label="Close gallery"
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
          </div>
        </div>

        {/* Image stage */}
        <div className="lb-stage">
          <div className="lb-img-wrap">
            {!loaded && (
              <div className="lb-spinner">
                <div className="lb-spinner-ring" />
              </div>
            )}
            <img
              ref={imgRef}
              key={src}
              src={src}
              alt={`${programme.name} — photo ${index + 1}`}
              className={`lb-img${loaded ? " ready" : ""}`}
              onLoad={() => setLoaded(true)}
            />
          </div>

          {/* Arrows */}
          {total > 1 && (
            <>
              <button
                className="lb-arrow prev"
                onClick={prev}
                aria-label="Previous photo"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                className="lb-arrow next"
                onClick={next}
                aria-label="Next photo"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Filmstrip */}
        {total > 1 && (
          <div className="lb-strip" role="list" aria-label="All photos">
            {programme.images.map((img, i) => (
              <div
                key={img}
                className={`lb-thumb${i === index ? " active" : ""}`}
                role="listitem"
                onClick={() => {
                  setLoaded(false);
                  setIndex(i);
                }}
                aria-label={`Photo ${i + 1}`}
              >
                <img src={`${programme.folder}/${img}`} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// ── Gallery card ──────────────────────────────────────────────────────────────
function GalleryCard({
  programme,
  onClick,
}: {
  programme: Programme;
  onClick: () => void;
}) {
  const cover = `${programme.folder}/${programme.images[0]}`;
  const preview = programme.images.slice(1, 4);

  return (
    <button
      className="gc-card"
      onClick={onClick}
      aria-label={`Open ${programme.name} gallery`}
    >
      {/* Cover image — fills most of card */}
      <div className="gc-cover-wrap">
        <img src={cover} alt={programme.name} className="gc-cover-img" />
        <div className="gc-cover-overlay" />

        {/* Photo count badge */}
        <span className="gc-count-badge">
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
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          {programme.images.length} photos
        </span>

        {/* Hover: view gallery label */}
        <div className="gc-hover-cta">
          <span className="gc-hover-label">
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
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            View Gallery
          </span>
        </div>
      </div>

      {/* Bottom strip: preview thumbnails + info */}
      <div className="gc-footer">
        {/* Small preview strip */}
        <div className="gc-preview-strip">
          {preview.map((img, i) => (
            <div key={i} className="gc-preview-thumb">
              <img src={`${programme.folder}/${img}`} alt="" />
            </div>
          ))}
          {programme.images.length > 4 && (
            <div className="gc-preview-more">
              +{programme.images.length - 4}
            </div>
          )}
        </div>

        {/* Text info */}
        <div className="gc-info">
          <div className="gc-info-top">
            <span className="gc-year">{programme.year}</span>
            <span className="gc-location">
              <svg
                width="8"
                height="10"
                viewBox="0 0 10 13"
                fill="currentColor"
                opacity="0.5"
              >
                <path d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 8 5 8s5-4.25 5-8c0-2.76-2.24-5-5-5Zm0 6.75A1.75 1.75 0 1 1 5 3.25a1.75 1.75 0 0 1 0 3.5Z" />
              </svg>
              {programme.location}
            </span>
          </div>
          <h2 className="gc-name">{programme.name}</h2>
          <p className="gc-subtitle">{programme.subtitle}</p>
        </div>
      </div>
    </button>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [open, setOpen] = useState<{
    programme: Programme;
    index: number;
  } | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

        .gp-root {
          font-family: 'DM Sans', sans-serif;
          background: #0D0D0D;
          min-height: 100svh;
          padding-top: 80px;
          color: #fff;
        }

        /* ── Page header ── */
        .gp-header {
          padding: 4rem 2rem 3.5rem;
          max-width: 1100px;
          margin: 0 auto;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .gp-back {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.28); text-decoration: none;
          margin-bottom: 2.5rem;
          transition: color 0.2s ease;
        }
        .gp-back:hover { color: rgba(255,255,255,0.6); }
        .gp-back svg { transition: transform 0.2s ease; }
        .gp-back:hover svg { transform: translateX(-3px); }

        .gp-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.26em; text-transform: uppercase;
          color: #C9A96E; margin-bottom: 0.85rem;
        }

        .gp-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 700; line-height: 1.0;
          letter-spacing: -0.02em; color: #fff;
        }

        .gp-title em {
          font-style: italic; color: rgba(255,255,255,0.35);
        }

        .gp-desc {
          margin-top: 1.25rem;
          font-size: 0.9rem; color: rgba(255,255,255,0.35);
          font-weight: 300; line-height: 1.7;
          max-width: 44ch;
        }

        /* ── Cards grid ── */
        .gp-grid {
          max-width: 1100px;
          margin: 0 auto;
          padding: 3rem 2rem 6rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 700px) {
          .gp-grid { grid-template-columns: 1fr; }
        }

        /* ── Gallery card ── */
        .gc-card {
          background: none; border: none; padding: 0;
          cursor: pointer; text-align: left;
          border-radius: 1rem; overflow: hidden;
          background: #161616;
          border: 1px solid rgba(255,255,255,0.07);
          display: flex; flex-direction: column;
          transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .gc-card:hover {
          border-color: rgba(255,255,255,0.18);
          transform: translateY(-4px);
        }
        .gc-card:focus-visible {
          outline: 2px solid #C9A96E; outline-offset: 3px;
        }

        /* Cover */
        .gc-cover-wrap {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: #111;
        }

        .gc-cover-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .gc-card:hover .gc-cover-img { transform: scale(1.04); }

        .gc-cover-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom,
            rgba(0,0,0,0.05) 0%,
            rgba(0,0,0,0.45) 100%
          );
          transition: opacity 0.3s ease;
        }
        .gc-card:hover .gc-cover-overlay { opacity: 0.7; }

        /* Count badge */
        .gc-count-badge {
          position: absolute; top: 0.85rem; left: 0.85rem;
          display: inline-flex; align-items: center; gap: 0.35rem;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2rem;
          padding: 0.28rem 0.7rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.65);
        }

        /* Hover overlay CTA */
        .gc-hover-cta {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.3s ease;
        }
        .gc-card:hover .gc-hover-cta { opacity: 1; }

        .gc-hover-label {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(201,169,110,0.9);
          color: #0D0D0D;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.7rem 1.5rem;
          border-radius: 2rem;
          backdrop-filter: blur(4px);
        }

        /* Footer strip */
        .gc-footer {
          padding: 1.1rem 1.25rem 1.4rem;
          display: flex; flex-direction: column; gap: 1rem;
        }

        /* Thumbnail preview row */
        .gc-preview-strip {
          display: flex; gap: 0.4rem; align-items: center;
        }

        .gc-preview-thumb {
          width: 44px; height: 32px;
          border-radius: 0.25rem; overflow: hidden;
          flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.07);
        }
        .gc-preview-thumb img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }

        .gc-preview-more {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.3);
          padding-left: 0.3rem;
        }

        /* Text info */
        .gc-info { display: flex; flex-direction: column; gap: 0.3rem; }

        .gc-info-top {
          display: flex; align-items: center; gap: 1rem;
          margin-bottom: 0.1rem;
        }

        .gc-year {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: #C9A96E;
        }

        .gc-location {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.25);
          display: inline-flex; align-items: center; gap: 0.3rem;
        }

        .gc-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.25rem, 3vw, 1.6rem);
          font-weight: 700; color: #fff; line-height: 1.15;
        }

        .gc-subtitle {
          font-size: 0.78rem; color: rgba(255,255,255,0.35);
          font-weight: 300; font-style: italic;
        }

        /* ── Download-all note ── */
        .gp-note {
          max-width: 1100px; margin: 0 auto;
          padding: 0 2rem 4rem;
          display: flex; align-items: center; gap: 0.6rem;
          font-size: 0.72rem; color: rgba(255,255,255,0.22);
          font-family: 'DM Mono', monospace; letter-spacing: 0.08em;
        }
        .gp-note svg { flex-shrink: 0; opacity: 0.4; }
      `}</style>

      <div className="gp-root">
        {/* Header */}
        <header className="gp-header">
          <Link href="/" className="gp-back">
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
          <p className="gp-eyebrow">Calvaryway Mission — Moments</p>
          <h1 className="gp-title">
            Photo
            <br />
            <em>Gallery</em>
          </h1>
          <p className="gp-desc">
            Moments from our programmes. Click a gallery to browse photos — each
            image can be downloaded individually.
          </p>
        </header>

        {/* Cards */}
        <div className="gp-grid">
          {PROGRAMMES.map((prog) => (
            <GalleryCard
              key={prog.id}
              programme={prog}
              onClick={() => setOpen({ programme: prog, index: 0 })}
            />
          ))}
        </div>

        {/* Hint */}
        <p className="gp-note">
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
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Use arrow keys to navigate photos · Click outside the image to close
        </p>
      </div>

      {/* Lightbox */}
      {open && (
        <Lightbox
          programme={open.programme}
          startIndex={open.index}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
