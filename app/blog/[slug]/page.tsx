"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  POSTS,
  CATEGORY_COLORS,
  CATEGORY_BG,
  CATEGORY_BORDER,
} from "@/lib/blog";

// ── Simple content renderer ───────────────────────────────────────────────────
// ## Heading text     → <h3>
// > Pull quote text   → <blockquote>
// Regular paragraph   → <p>
function renderContent(content: string) {
  return content.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h3
          key={i}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.25,
            marginTop: "2.5rem",
            marginBottom: "0.75rem",
          }}
        >
          {block.replace("## ", "")}
        </h3>
      );
    }
    if (block.startsWith("> ")) {
      return (
        <blockquote
          key={i}
          style={{
            borderLeft: "2px solid rgba(201,169,110,0.4)",
            paddingLeft: "1.5rem",
            margin: "2rem 0",
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.7,
          }}
        >
          {block.replace("> ", "")}
        </blockquote>
      );
    }
    return (
      <p
        key={i}
        style={{
          fontSize: "clamp(0.92rem, 1.8vw, 1.02rem)",
          color: "rgba(255,255,255,0.55)",
          fontWeight: 300,
          lineHeight: 1.85,
          marginBottom: "1.25rem",
        }}
      >
        {block}
      </p>
    );
  });
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category,
  ).slice(0, 3);

  const color = CATEGORY_COLORS[post.category];
  const bg = CATEGORY_BG[post.category];
  const border = CATEGORY_BORDER[post.category];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

        .bp-root {
          font-family: 'DM Sans', sans-serif;
          background: #0C0C0C; color: #fff;
          min-height: 100svh; padding-top: 80px;
        }

        /* ── Article header ── */
        .bp-head {
          max-width: 760px; margin: 0 auto;
          padding: 4rem 2rem 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .bp-back {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.28); text-decoration: none;
          margin-bottom: 2rem; transition: color 0.2s ease;
        }
        .bp-back:hover { color: rgba(255,255,255,0.6); }
        .bp-back svg { transition: transform 0.2s ease; }
        .bp-back:hover svg { transform: translateX(-3px); }

        .bp-cat {
          display: inline-flex; align-items: center; gap: 0.35rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 0.25rem 0.75rem; border-radius: 2rem;
          border: 1px solid; margin-bottom: 1.25rem;
        }

        .bp-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3.25rem);
          font-weight: 700; color: #fff; line-height: 1.1;
          letter-spacing: -0.01em; margin-bottom: 1.5rem;
        }

        .bp-meta {
          display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.3);
        }
        .bp-meta-dot { width: 2px; height: 2px; border-radius: 50%; background: rgba(255,255,255,0.15); }

        /* ── Article body ── */
        .bp-body {
          max-width: 760px; margin: 0 auto;
          padding: 3rem 2rem 4rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        /* ── Share / actions ── */
        .bp-actions {
          max-width: 760px; margin: 0 auto;
          padding: 2rem 2rem 3rem;
          display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .bp-actions-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }
        .bp-share-btn {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.45); text-decoration: none;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 0.5rem 1rem; border-radius: 2rem;
          transition: all 0.2s ease; cursor: pointer;
        }
        .bp-share-btn:hover { border-color: rgba(255,255,255,0.2); color: #fff; background: rgba(255,255,255,0.07); }
        .bp-share-btn.wa { color: #25D366; border-color: rgba(37,211,102,0.2); background: rgba(37,211,102,0.05); }
        .bp-share-btn.wa:hover { background: rgba(37,211,102,0.1); border-color: rgba(37,211,102,0.35); }

        /* ── Related posts ── */
        .bp-related {
          max-width: 1100px; margin: 0 auto;
          padding: 3rem 2rem 6rem;
        }
        .bp-related-title {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.28); margin-bottom: 1.5rem;
        }
        .bp-related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }
        .bp-rel-card {
          background: #111; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0.85rem; padding: 1.5rem;
          display: flex; flex-direction: column; gap: 0.65rem;
          text-decoration: none; color: inherit;
          transition: border-color 0.25s ease, transform 0.2s ease;
        }
        .bp-rel-card:hover { border-color: rgba(201,169,110,0.2); transform: translateY(-2px); }
        .bp-rel-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 700; color: #fff; line-height: 1.25;
        }
        .bp-rel-meta {
          font-family: 'DM Mono', monospace;
          font-size: 0.55rem; letter-spacing: 0.1em; color: rgba(255,255,255,0.25);
        }
        .bp-rel-arrow { color: rgba(201,169,110,0.4); margin-top: auto; transition: transform 0.2s ease; }
        .bp-rel-card:hover .bp-rel-arrow { transform: translateX(3px); color: #C9A96E; }
      `}</style>

      <div className="bp-root">
        {/* Article header */}
        <header className="bp-head">
          <Link href="/blog" className="bp-back">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M12 7H2M6 3L2 7l4 4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            All posts
          </Link>

          <span
            className="bp-cat"
            style={{ color, background: bg, borderColor: border }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: color,
                display: "inline-block",
              }}
            />
            {post.category}
          </span>

          <h1 className="bp-title">{post.title}</h1>

          <div className="bp-meta">
            <span>{post.author}</span>
            <span className="bp-meta-dot" />
            <span>{post.date}</span>
            <span className="bp-meta-dot" />
            <span>{post.readTime}</span>
          </div>
        </header>

        {/* Body */}
        <article className="bp-body">{renderContent(post.content)}</article>

        {/* Share actions */}
        <div className="bp-actions">
          <span className="bp-actions-label">Share</span>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — Calvaryway Mission\n\nhttps://calvarywaymissions.org/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bp-share-btn wa"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
          <a
            href={`https://t.me/share/url?url=https://calvarywaymissions.org/blog/${post.slug}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bp-share-btn"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            Telegram
          </a>
          <Link
            href="/blog"
            className="bp-share-btn"
            style={{ marginLeft: "auto" }}
          >
            ← All posts
          </Link>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="bp-related">
            <p className="bp-related-title">More in {post.category}</p>
            <div className="bp-related-grid">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="bp-rel-card"
                >
                  <h3 className="bp-rel-title">{p.title}</h3>
                  <span className="bp-rel-meta">
                    {p.date} · {p.readTime}
                  </span>
                  <span className="bp-rel-arrow">
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
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
