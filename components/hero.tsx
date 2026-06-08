"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll
  useEffect(() => {
    const el = heroRef.current?.querySelector(".hero-bg") as HTMLElement | null;
    if (!el) return;
    const onScroll = () => {
      el.style.transform = `translateY(${window.scrollY * 0.35}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        .hero-root {
          font-family: 'DM Sans', sans-serif;
          position: relative;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          overflow: hidden;
          background: #0C0C0C;
        }

        .hero-bg {
          position: absolute;
          inset: -10% 0 -10% 0;
          background-image: url('/hero.jpg');
          background-size: cover;
          background-position: center top;
          will-change: transform;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(12,12,12,0.3) 0%,
            rgba(12,12,12,0.15) 30%,
            rgba(12,12,12,0.55) 65%,
            rgba(12,12,12,0.97) 100%
          );
        }

        /* Subtle grain texture */
        .hero-grain {
          position: absolute;
          inset: 0;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 180px;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 10;
        }

        /* Animated entrance */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .fade-up-1 { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
        .fade-up-2 { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
        .fade-up-3 { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.58s both; }
        .fade-up-4 { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.72s both; }

        .hero-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C9A96E;
          font-weight: 500;
        }

        .hero-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          line-height: 1.08;
          font-weight: 700;
          color: #fff;
        }

        .hero-heading em {
          font-style: italic;
          color: #C9A96E;
        }

        .hero-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.95rem, 2vw, 1.1rem);
          color: rgba(255,255,255,0.55);
          font-weight: 300;
          max-width: 38ch;
          line-height: 1.7;
        }

        .hero-cta-primary {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0C0C0C;
          background: #C9A96E;
          padding: 0.85rem 2rem;
          border-radius: 0.25rem;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.2s ease;
          display: inline-block;
        }

        .hero-cta-primary:hover {
          background: #dfc08a;
          transform: translateY(-2px);
        }

        .hero-cta-secondary {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.25s ease;
        }

        .hero-cta-secondary:hover {
          color: #fff;
        }

        .hero-cta-secondary svg {
          transition: transform 0.25s ease;
        }

        .hero-cta-secondary:hover svg {
          transform: translateX(3px);
        }

        .gold-line {
          width: 2.5rem;
          height: 1.5px;
          background: #C9A96E;
          display: block;
        }

        /* Bottom stat bar */
        .stat-bar {
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: #fff;
        }

        .stat-label {
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          font-weight: 500;
        }

        .stat-divider {
          width: 1px;
          background: rgba(255,255,255,0.1);
          align-self: stretch;
        }

        /* Scroll indicator */
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(5px); opacity: 0.4; }
        }

        .scroll-indicator {
          animation: scrollBounce 2s ease-in-out infinite;
        }
      `}</style>

      <section ref={heroRef} className="hero-root">
        {/* Background image with parallax */}
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-grain" />

        {/* Main content — pinned to bottom */}
        <div className="hero-content max-w-6xl mx-auto w-full px-5 pb-16 md:pb-20">
          <div className="max-w-2xl flex flex-col gap-5">
            {/* Eyebrow */}
            <div className="fade-up-1 flex items-center gap-3">
              <span className="gold-line" />
              <span className="hero-eyebrow">
                Calvary way Mission · Akure, Nigeria
              </span>
            </div>

            {/* Heading */}
            <h1 className="hero-heading fade-up-2">
              Saving the lost,
              <br />
              <em>Equipping the saint</em>
            </h1>

            {/* Sub */}
            <p className="hero-sub fade-up-3">
              A discipleship based non-denominational and interdenominational
              Christian Ministry.
            </p>

            {/* CTAs */}
            <div className="fade-up-4 flex flex-wrap items-center gap-5 mt-2">
              <Link href="/join" className="hero-cta-primary">
                Sowers Conference
              </Link>
              <Link href="/about" className="hero-cta-secondary">
                Contact Us
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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

        {/* Stat bar */}
        <div className="hero-content stat-bar fade-up-4">
          <div className="max-w-6xl mx-auto w-full px-5 py-6 flex items-center gap-8 md:gap-14 overflow-x-auto">
            {[
              { value: "Bible Study", label: "Every Mondays" },
              { value: "Discipleship", label: "Every 2nd Weekend" },
            ].map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-8 md:gap-14 flex-shrink-0"
              >
                {i > 0 && (
                  <div
                    className="stat-divider hidden md:block"
                    style={{ minHeight: "2.5rem" }}
                  />
                )}
                <div className="flex flex-col gap-0.5">
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute right-6 bottom-24 hidden lg:flex flex-col items-center gap-2 z-10">
          <span
            style={{
              writingMode: "vertical-rl",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <rect
              x="1"
              y="1"
              width="10"
              height="18"
              rx="5"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.2"
            />
            <rect
              x="5"
              y="4"
              width="2"
              height="4"
              rx="1"
              fill="rgba(201,169,110,0.7)"
            />
          </svg>
        </div>
      </section>
    </>
  );
}
