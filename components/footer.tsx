"use client";

import Link from "next/link";

const SOCIALS = [
  {
    name: "YouTube",
    href: "https://youtube.com/@calvarywaymissions2793?si=1va1P3qagjK5ACTc",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/pstflames",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.027 4.388 11.025 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.098 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    href: "https://t.me/calvaryway",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@calvarywaymissions",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Sermons", href: "/sermons" },
  { label: "Mission", href: "/mission" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .footer-root {
          font-family: 'DM Sans', sans-serif;
          background: #080808;
          border-top: 1px solid rgba(201,169,110,0.12);
          position: relative;
          overflow: hidden;
        }

        /* Subtle glow bottom-left */
        .footer-glow {
          position: absolute;
          bottom: -160px;
          left: -160px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.055) 0%, transparent 70%);
          pointer-events: none;
        }

        .footer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          letter-spacing: 0.01em;
        }

        .footer-tagline {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.35);
          line-height: 1.65;
          max-width: 28ch;
          font-weight: 300;
        }

        /* Social icon button */
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: border-color 0.25s ease, color 0.25s ease, background 0.25s ease, transform 0.2s ease;
        }

        .social-btn:hover {
          border-color: #C9A96E;
          color: #C9A96E;
          background: rgba(201,169,110,0.07);
          transform: translateY(-2px);
        }

        /* Footer nav links */
        .footer-link {
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.2s ease;
          font-weight: 500;
        }

        .footer-link:hover {
          color: #fff;
        }

        .gold-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(201,169,110,0.5);
          display: inline-block;
        }

        .footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
        }

        .copyright {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.05em;
        }

        .built-with {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.18);
          letter-spacing: 0.04em;
        }

        .gold-line {
          width: 2rem;
          height: 1.5px;
          background: #C9A96E;
          display: block;
        }

        .section-label {
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(201,169,110,0.7);
          font-weight: 500;
        }
      `}</style>

      <footer className="footer-root w-full">
        <div className="footer-glow" />

        {/* ── Main content ── */}
        <div className="max-w-6xl mx-auto px-5 pt-16 pb-10 flex flex-col gap-14">
          {/* Top row */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-0 justify-between">
            {/* Brand column */}
            <div className="flex flex-col gap-5 md:w-[38%]">
              <div className="flex flex-col gap-3">
                <Link
                  href="/"
                  className="nav-logo gap-3 flex items-center text-white text-xl font-semibold no-underline"
                >
                  <img src="./logo.png" className="h-10 w-10" alt="" />
                  <div className="flex flex-col gap-2">
                    <span className="gold-line" />
                    <p>
                      Calvaryway
                      <span className="text-[#C9A96E]">.</span>
                    </p>
                  </div>
                </Link>
              </div>
              <p className="footer-tagline">
                A discipleship based non-denominational and interdenominational
                Christian Ministry.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3 mt-1">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label={s.name}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav + Contact columns */}
            <div className="flex gap-16 md:gap-20">
              {/* Quick links */}
              <div className="flex flex-col gap-5">
                <span className="section-label">Navigate</span>
                <nav className="flex flex-col gap-3">
                  {NAV_LINKS.map((l) => (
                    <Link key={l.href} href={l.href} className="footer-link">
                      {l.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Connect */}
              <div className="flex flex-col gap-5">
                <span className="section-label">Connect</span>
                <div className="flex flex-col gap-3">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scripture strip */}
          <div
            style={{
              borderLeft: "2px solid rgba(201,169,110,0.3)",
              paddingLeft: "1.25rem",
            }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                color: "rgba(255,255,255,0.3)",
                fontStyle: "italic",
                lineHeight: 1.7,
              }}
            >
              "Then said Jesus unto his disciples, If any man will come after
              me, let him deny himself, and take up his cross, and follow me."
            </p>
            <span
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(201,169,110,0.5)",
                marginTop: "0.5rem",
                display: "block",
              }}
            >
              Matthew 16:24
            </span>
          </div>

          {/* Divider */}
          <div className="footer-divider" />

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="copyright">
              © {year} Calvaryway Mission. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="gold-dot" />
              <p className="built-with">Akure, Ondo State, Nigeria</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
