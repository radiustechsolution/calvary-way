"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  POSTS,
  CATEGORY_COLORS,
  CATEGORY_BG,
  CATEGORY_BORDER,
} from "@/lib/blog";

// Show only the 3 most recent posts on the homepage
const PREVIEW_POSTS = POSTS.slice(0, 3);

export default function BlogPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("bp-in");
        }),
      { threshold: 0.08 },
    );
    sectionRef.current
      ?.querySelectorAll(".bp-reveal")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

        .bpv-root {
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0a;
          position: relative; overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .bpv-glow {
          position: absolute; bottom: -150px; left: -150px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .bp-reveal {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1);
        }
        .bp-reveal.d1 { transition-delay: 0.05s; }
        .bp-reveal.d2 { transition-delay: 0.18s; }
        .bp-reveal.d3 { transition-delay: 0.28s; }
        .bp-reveal.d4 { transition-delay: 0.38s; }
        .bp-reveal.bp-in { opacity: 1; transform: translateY(0); }

        .gold-line { width: 2.5rem; height: 1.5px; background: #C9A96E; display: block; }
        .bpv-eyebrow { font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; color: #C9A96E; font-weight: 500; }

        .bpv-all-link {
          display: inline-flex; align-items: center; gap: 0.45rem;
          font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
          font-weight: 500; color: rgba(255,255,255,0.35); text-decoration: none;
          border: 1px solid rgba(255,255,255,0.08); padding: 0.65rem 1.2rem;
          border-radius: 0.35rem; transition: all 0.25s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .bpv-all-link:hover { color: #fff; border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); }
        .bpv-all-link svg { transition: transform 0.25s ease; }
        .bpv-all-link:hover svg { transform: translateX(3px); }

        /* ── Cards ── */
        .bpv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.25rem;
        }

        .bpv-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 1rem; padding: 1.75rem;
          display: flex; flex-direction: column; gap: 0.85rem;
          text-decoration: none; color: inherit;
          transition: border-color 0.25s ease, transform 0.25s ease, background 0.25s ease;
        }
        .bpv-card:hover {
          border-color: rgba(201,169,110,0.2);
          transform: translateY(-3px);
          background: rgba(255,255,255,0.035);
        }

        .bpv-cat {
          display: inline-flex; align-items: center; gap: 0.3rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.56rem; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 0.22rem 0.65rem; border-radius: 2rem;
          border: 1px solid; width: fit-content;
        }

        .bpv-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 700;
          color: #fff; line-height: 1.25; flex: 1;
        }

        .bpv-excerpt {
          font-size: 0.82rem; color: rgba(255,255,255,0.4);
          font-weight: 300; line-height: 1.7;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }

        .bpv-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          margin-top: auto;
        }
        .bpv-meta {
          font-family: 'DM Mono', monospace;
          font-size: 0.55rem; letter-spacing: 0.1em; color: rgba(255,255,255,0.22);
        }
        .bpv-arrow { color: rgba(201,169,110,0.45); transition: transform 0.2s ease, color 0.2s ease; }
        .bpv-card:hover .bpv-arrow { transform: translateX(3px); color: #C9A96E; }
      `}</style>

      <section ref={sectionRef} className="bpv-root w-full py-20 md:py-28 px-5">
        <div className="bpv-glow" />

        <div className="max-w-6xl mx-auto flex flex-col gap-10 relative">
          {/* Header */}
          <div className="bp-reveal d1 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="gold-line" />
                <span className="bpv-eyebrow">From the Blog</span>
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
                Latest Posts
              </h2>
            </div>
            <Link href="/blog" className="bpv-all-link self-start sm:self-auto">
              All posts
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

          {/* Cards */}
          <div className="bpv-grid">
            {PREVIEW_POSTS.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`bpv-card bp-reveal d${i + 2}`}
              >
                <span
                  className="bpv-cat"
                  style={{
                    color: CATEGORY_COLORS[post.category],
                    background: CATEGORY_BG[post.category],
                    borderColor: CATEGORY_BORDER[post.category],
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: CATEGORY_COLORS[post.category],
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  {post.category}
                </span>
                <h3 className="bpv-title">{post.title}</h3>
                <p className="bpv-excerpt">{post.excerpt}</p>
                <div className="bpv-footer">
                  <span className="bpv-meta">
                    {post.date} · {post.readTime}
                  </span>
                  <span className="bpv-arrow">
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
