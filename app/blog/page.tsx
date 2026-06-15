"use client";

import { useState } from "react";
import Link from "next/link";
import { POSTS, CATEGORIES, type Category } from "@/lib/blog";

const CATEGORY_COLORS: Record<Category, string> = {
  "Teaching & Doctrine": "rgba(201,169,110,0.8)",
  "Conference Updates": "rgba(168,196,162,0.8)",
  "Ministry News": "rgba(150,180,220,0.8)",
};

const CATEGORY_BG: Record<Category, string> = {
  "Teaching & Doctrine": "rgba(201,169,110,0.1)",
  "Conference Updates": "rgba(168,196,162,0.1)",
  "Ministry News": "rgba(150,180,220,0.1)",
};

const CATEGORY_BORDER: Record<Category, string> = {
  "Teaching & Doctrine": "rgba(201,169,110,0.2)",
  "Conference Updates": "rgba(168,196,162,0.2)",
  "Ministry News": "rgba(150,180,220,0.2)",
};

export default function BlogPage() {
  const [active, setActive] = useState<Category | "All">("All");

  const filtered =
    active === "All" ? POSTS : POSTS.filter((p) => p.category === active);
  const [featured, ...rest] = filtered;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

        .bl-root {
          font-family: 'DM Sans', sans-serif;
          background: #0C0C0C; color: #fff;
          min-height: 100svh; padding-top: 80px;
        }

        /* ── Header ── */
        .bl-head {
          position: relative; overflow: hidden;
          padding: 4rem 2rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .bl-head-glow {
          position: absolute; top: -150px; right: -150px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .bl-head-inner { max-width: 1100px; margin: 0 auto; }

        .bl-back {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.28); text-decoration: none;
          margin-bottom: 2rem; transition: color 0.2s ease;
        }
        .bl-back:hover { color: rgba(255,255,255,0.6); }
        .bl-back svg { transition: transform 0.2s ease; }
        .bl-back:hover svg { transform: translateX(-3px); }

        .bl-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.26em; text-transform: uppercase;
          color: #C9A96E; margin-bottom: 0.75rem;
        }
        .bl-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 700; line-height: 0.95;
          letter-spacing: -0.02em; color: #fff;
        }
        .bl-heading em { font-style: italic; color: #C9A96E; }
        .bl-subhead {
          margin-top: 1rem; font-size: 0.88rem;
          color: rgba(255,255,255,0.38); font-weight: 300;
          line-height: 1.7; max-width: 46ch;
        }

        /* ── Category tabs ── */
        .bl-tabs {
          display: flex; align-items: stretch; flex-wrap: wrap;
          margin-top: 2.5rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .bl-tab {
          display: inline-flex; align-items: center; gap: 0.45rem;
          padding: 0.9rem 1.25rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(255,255,255,0.32);
          background: none; border: none;
          cursor: pointer; transition: all 0.2s ease;
          border-right: 1px solid rgba(255,255,255,0.06);
          position: relative;
        }
        .bl-tab:first-child { border-left: 1px solid rgba(255,255,255,0.06); }
        .bl-tab:hover { color: rgba(255,255,255,0.65); background: rgba(255,255,255,0.03); }
        .bl-tab.active { color: #C9A96E; background: rgba(201,169,110,0.05); }
        .bl-tab.active::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; background: #C9A96E;
        }
        .bl-tab-dot {
          width: 6px; height: 6px; border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── Content area ── */
        .bl-content { max-width: 1100px; margin: 0 auto; padding: 3.5rem 2rem 6rem; }

        /* ── Featured post ── */
        .bl-featured {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 3rem; margin-bottom: 3rem; padding-bottom: 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          align-items: center;
        }
        @media (max-width: 760px) { .bl-featured { grid-template-columns: 1fr; gap: 1.75rem; } }

        .bl-featured-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.25); margin-bottom: 1.25rem;
        }
        .bl-featured-cat {
          display: inline-flex; align-items: center; gap: 0.35rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 0.25rem 0.7rem; border-radius: 2rem; margin-bottom: 1rem;
          border: 1px solid;
        }
        .bl-featured-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          font-weight: 700; color: #fff; line-height: 1.15;
          margin-bottom: 1rem;
        }
        .bl-featured-excerpt {
          font-size: 0.9rem; color: rgba(255,255,255,0.48);
          font-weight: 300; line-height: 1.75; margin-bottom: 1.5rem;
        }
        .bl-featured-meta {
          display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.28);
        }
        .bl-featured-meta-dot { width: 2px; height: 2px; border-radius: 50%; background: rgba(255,255,255,0.15); }

        .bl-read-link {
          display: inline-flex; align-items: center; gap: 0.45rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #C9A96E; text-decoration: none;
          transition: gap 0.2s ease;
        }
        .bl-read-link:hover { gap: 0.7rem; }
        .bl-read-link svg { transition: transform 0.2s ease; }
        .bl-read-link:hover svg { transform: translateX(3px); }

        /* Featured decorative block */
        .bl-featured-visual {
          background: rgba(201,169,110,0.04);
          border: 1px solid rgba(201,169,110,0.12);
          border-radius: 1.25rem;
          padding: 2.5rem;
          display: flex; flex-direction: column; gap: 1.25rem;
          position: relative; overflow: hidden;
        }
        .bl-featured-visual::before {
          content: '"';
          position: absolute; top: -0.5rem; left: 1rem;
          font-family: 'Playfair Display', serif;
          font-size: 8rem; color: rgba(201,169,110,0.08);
          line-height: 1; pointer-events: none; user-select: none;
        }
        .bl-featured-pull {
          font-family: 'Playfair Display', serif;
          font-style: italic; font-size: clamp(1rem, 2vw, 1.2rem);
          color: rgba(255,255,255,0.6); line-height: 1.65;
          position: relative; z-index: 1;
        }
        .bl-featured-pull-ref {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.14em;
          color: rgba(201,169,110,0.6); text-transform: uppercase;
        }

        /* ── Post grid ── */
        .bl-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.25rem;
        }

        .bl-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 1rem; padding: 1.75rem;
          display: flex; flex-direction: column; gap: 0.85rem;
          text-decoration: none; color: inherit;
          transition: border-color 0.25s ease, transform 0.25s ease, background 0.25s ease;
        }
        .bl-card:hover {
          border-color: rgba(201,169,110,0.2);
          transform: translateY(-2px);
          background: rgba(255,255,255,0.025);
        }

        .bl-card-cat {
          display: inline-flex; align-items: center; gap: 0.3rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.56rem; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 0.22rem 0.65rem; border-radius: 2rem;
          border: 1px solid; width: fit-content;
        }
        .bl-card-cat-dot { width: 5px; height: 5px; border-radius: 50%; }

        .bl-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 700;
          color: #fff; line-height: 1.25;
          flex: 1;
        }
        .bl-card-excerpt {
          font-size: 0.82rem; color: rgba(255,255,255,0.42);
          font-weight: 300; line-height: 1.7;
          display: -webkit-box; -webkit-line-clamp: 3;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .bl-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          gap: 0.5rem; padding-top: 0.75rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          margin-top: auto;
        }
        .bl-card-meta {
          font-family: 'DM Mono', monospace;
          font-size: 0.55rem; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.25);
        }
        .bl-card-arrow { color: rgba(201,169,110,0.5); transition: transform 0.2s ease; }
        .bl-card:hover .bl-card-arrow { transform: translateX(3px); color: #C9A96E; }

        /* Empty state */
        .bl-empty {
          text-align: center; padding: 4rem 2rem;
          color: rgba(255,255,255,0.3);
          font-size: 0.9rem; font-weight: 300;
        }
      `}</style>

      <div className="bl-root">
        {/* Header */}
        <header className="bl-head">
          <div className="bl-head-glow" />
          <div className="bl-head-inner">
            <Link href="/" className="bl-back">
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
            <p className="bl-eyebrow">Calvaryway Mission</p>
            <h1 className="bl-heading">
              The <em>Blog</em>
            </h1>
            <p className="bl-subhead">
              Teaching, updates and news from Calvaryway Mission — written to
              build up, inform and stir the believer.
            </p>

            {/* Tabs */}
            <div className="bl-tabs">
              <button
                className={`bl-tab${active === "All" ? " active" : ""}`}
                onClick={() => setActive("All")}
              >
                All
                <span
                  style={{
                    fontFamily: "'DM Mono'",
                    fontSize: "0.5rem",
                    opacity: 0.55,
                    verticalAlign: "super",
                  }}
                >
                  {POSTS.length}
                </span>
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`bl-tab${active === cat ? " active" : ""}`}
                  onClick={() => setActive(cat)}
                >
                  <span
                    className="bl-tab-dot"
                    style={{ background: CATEGORY_COLORS[cat] }}
                  />
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="bl-content">
          {filtered.length === 0 ? (
            <div className="bl-empty">No posts in this category yet.</div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <div className="bl-featured">
                  <div>
                    <p className="bl-featured-label">Featured Post</p>
                    <span
                      className="bl-featured-cat"
                      style={{
                        color: CATEGORY_COLORS[featured.category],
                        background: CATEGORY_BG[featured.category],
                        borderColor: CATEGORY_BORDER[featured.category],
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: CATEGORY_COLORS[featured.category],
                          display: "inline-block",
                          flexShrink: 0,
                        }}
                      />
                      {featured.category}
                    </span>
                    <h2 className="bl-featured-title">{featured.title}</h2>
                    <p className="bl-featured-excerpt">{featured.excerpt}</p>
                    <div className="bl-featured-meta">
                      <span>{featured.author}</span>
                      <span className="bl-featured-meta-dot" />
                      <span>{featured.date}</span>
                      <span className="bl-featured-meta-dot" />
                      <span>{featured.readTime}</span>
                    </div>
                    <div style={{ marginTop: "1.5rem" }}>
                      <Link
                        href={`/blog/${featured.slug}`}
                        className="bl-read-link"
                      >
                        Read full post
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
                      </Link>
                    </div>
                  </div>

                  {/* Decorative excerpt block */}
                  <div className="bl-featured-visual">
                    <p className="bl-featured-pull">{featured.excerpt}</p>
                    <span className="bl-featured-pull-ref">
                      {featured.category} · {featured.date}
                    </span>
                  </div>
                </div>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <div className="bl-grid">
                  {rest.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="bl-card"
                    >
                      <span
                        className="bl-card-cat"
                        style={{
                          color: CATEGORY_COLORS[post.category],
                          background: CATEGORY_BG[post.category],
                          borderColor: CATEGORY_BORDER[post.category],
                        }}
                      >
                        <span
                          className="bl-card-cat-dot"
                          style={{ background: CATEGORY_COLORS[post.category] }}
                        />
                        {post.category}
                      </span>
                      <h3 className="bl-card-title">{post.title}</h3>
                      <p className="bl-card-excerpt">{post.excerpt}</p>
                      <div className="bl-card-footer">
                        <span className="bl-card-meta">
                          {post.date} · {post.readTime}
                        </span>
                        <span className="bl-card-arrow">
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
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
