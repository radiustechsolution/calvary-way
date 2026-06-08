"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Sermons", href: "/sermons" },
  { label: "Mission", href: "/mission" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .nav-root {
          font-family: 'DM Sans', sans-serif;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          transition: background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease;
        }

        .nav-root.scrolled {
          background: rgba(12, 12, 12, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(201, 169, 110, 0.12);
        }

        .nav-logo {
          font-family: 'Playfair Display', serif;
          letter-spacing: 0.01em;
        }

        .nav-link {
          position: relative;
          color: rgba(255,255,255,0.6);
          font-size: 0.82rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.25s ease;
          padding-bottom: 2px;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #C9A96E;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-link:hover {
          color: #fff;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-cta {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0C0C0C;
          background: #C9A96E;
          padding: 0.55rem 1.25rem;
          border-radius: 0.25rem;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.2s ease;
        }

        .nav-cta:hover {
          background: #dfc08a;
          transform: translateY(-1px);
        }

        /* Hamburger */
        .burger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 28px;
          height: 28px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
        }

        .burger span {
          display: block;
          height: 1.5px;
          background: #fff;
          border-radius: 2px;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.25s ease,
                      width 0.3s ease;
        }

        .burger span:nth-child(1) { width: 24px; }
        .burger span:nth-child(2) { width: 16px; }
        .burger span:nth-child(3) { width: 20px; }

        .burger.open span:nth-child(1) {
          width: 22px;
          transform: translateY(6.5px) rotate(45deg);
        }
        .burger.open span:nth-child(2) {
          opacity: 0;
          width: 0;
        }
        .burger.open span:nth-child(3) {
          width: 22px;
          transform: translateY(-6.5px) rotate(-45deg);
        }

        /* Mobile drawer */
        .mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 40;
          background: #0C0C0C;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-16px);
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-drawer.open {
          opacity: 1;
          pointer-events: all;
          transform: translateY(0);
        }

        .mobile-nav-link {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 7vw, 3.5rem);
          color: rgba(255,255,255,0.2);
          text-decoration: none;
          font-weight: 600;
          line-height: 1.2;
          transition: color 0.25s ease;
          display: block;
          padding: 0.35rem 0;
        }

        .mobile-nav-link:hover {
          color: #fff;
        }

        .mobile-gold-line {
          width: 2rem;
          height: 1.5px;
          background: #C9A96E;
          margin-bottom: 2.5rem;
        }
      `}</style>

      {/* Navbar bar */}
      <nav
        className={`nav-root px-5 py-4 md:py-5${scrolled ? " scrolled" : ""}`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="nav-logo gap-3 flex items-center text-white text-xl font-semibold no-underline"
          >
            <img src="./logo.png" className="h-10 w-10" alt="" />
            <p>
              Calvaryway
              <span className="text-[#C9A96E]">.</span>
            </p>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link href="/join" className="nav-cta hidden md:inline-block">
            Join Us
          </Link>

          {/* Mobile burger */}
          <button
            className={`burger md:hidden${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen drawer */}
      <div className={`mobile-drawer${menuOpen ? " open" : ""}`}>
        <div className="mobile-gold-line" />
        <nav className="flex flex-col">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/join"
          className="nav-cta mt-10 self-start"
          onClick={() => setMenuOpen(false)}
        >
          Join Us
        </Link>
      </div>
    </>
  );
}
