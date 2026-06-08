"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const EVENT = {
  name: "Sowers Conference",
  tagline: "Fire Brands - A people prepared by the Lord.",
  reference: "Judges 15:4",
  dates: "August 20 – 22, 2026",
  location: "Akure, Ondo State",
  // Aug 20 2026, 8:00 AM WAT (UTC+1) = 07:00 UTC
  target: new Date("2026-08-20T07:00:00Z"),
  sessions: [
    { day: "Day 1", date: "Aug 20", title: "Fire Brands" },
    { day: "Day 2", date: "Aug 21", title: "Fire Brands" },
    { day: "Day 3", date: "Aug 22", title: "Fire Brands" },
  ],
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, EVENT.target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function UpcomingProgramme() {
  const [time, setTime] = useState<TimeLeft | null>(null);
  const [tick, setTick] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Hydration-safe: only calculate on the client
  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => {
      setTime(getTimeLeft());
      setTick((t) => !t);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("animate-in");
        }),
      { threshold: 0.12 },
    );
    sectionRef.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const units = [
    { label: "Days", value: time?.days ?? 0 },
    { label: "Hours", value: time?.hours ?? 0 },
    { label: "Minutes", value: time?.minutes ?? 0 },
    { label: "Seconds", value: time?.seconds ?? 0 },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        .prog-root {
          font-family: 'DM Sans', sans-serif;
          background: #0C0C0C;
          position: relative;
          overflow: hidden;
        }

        .prog-glow {
          position: absolute;
          top: -120px;
          right: -180px;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .v-rule {
          width: 1px;
          background: rgba(201,169,110,0.2);
        }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
                      transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal.d1 { transition-delay: 0.05s; }
        .reveal.d2 { transition-delay: 0.18s; }
        .reveal.d3 { transition-delay: 0.3s;  }
        .reveal.d4 { transition-delay: 0.42s; }
        .reveal.d5 { transition-delay: 0.54s; }
        .reveal.animate-in { opacity: 1; transform: translateY(0); }

        .digit-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
        }

        .digit-value {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.6rem, 5vw, 4rem);
          font-weight: 700;
          color: #fff;
          line-height: 1;
          letter-spacing: -0.02em;
          min-width: 2ch;
          text-align: center;
          transition: color 0.15s ease;
        }

        /* Seconds digit pulses gold each tick so you can see it's live */
        .digit-value.tick {
          color: #C9A96E;
        }

        .digit-label {
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          font-weight: 500;
        }

        .digit-sep {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          color: rgba(201,169,110,0.3);
          line-height: 1;
          padding-bottom: 1.4rem;
          align-self: flex-end;
        }

        .session-card {
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.75rem;
          background: rgba(255,255,255,0.025);
          transition: border-color 0.25s ease, background 0.25s ease;
        }

        .session-card:hover {
          border-color: rgba(201,169,110,0.25);
          background: rgba(201,169,110,0.04);
        }

        .session-day-badge {
          font-size: 0.62rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #C9A96E;
          font-weight: 500;
        }

        .reg-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0C0C0C;
          background: #C9A96E;
          padding: 0.85rem 2rem;
          border-radius: 0.25rem;
          text-decoration: none;
          display: inline-block;
          transition: background 0.25s ease, transform 0.2s ease;
        }
        .reg-btn:hover {
          background: #dfc08a;
          transform: translateY(-2px);
        }

        .cal-link {
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          transition: color 0.2s ease;
        }
        .cal-link:hover { color: rgba(255,255,255,0.8); }

        .gold-line { width: 2.5rem; height: 1.5px; background: #C9A96E; display: block; }
        .h-rule { height: 1px; background: rgba(255,255,255,0.06); }
      `}</style>

      <section
        ref={sectionRef}
        className="prog-root w-full py-20 md:py-28 px-5"
      >
        <div className="prog-glow" />

        <div className="max-w-6xl mx-auto flex flex-col gap-14 md:gap-16">
          {/* ── Header ── */}
          <div className="reveal d1 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="gold-line" />
              <span
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "0.7rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C9A96E",
                  fontWeight: 500,
                }}
              >
                Upcoming Programme
              </span>
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
              {EVENT.name}
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.82rem",
                letterSpacing: "0.1em",
              }}
            >
              {EVENT.dates} &nbsp;·&nbsp; {EVENT.location}
            </p>
          </div>

          {/* ── Main grid ── */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">
            {/* Left: Countdown + CTA */}
            <div className="lg:w-[55%] flex flex-col gap-10 lg:pr-14">
              {/* Scripture */}
              <div className="reveal d2 flex flex-col gap-2">
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                    color: "rgba(255,255,255,0.85)",
                    fontStyle: "italic",
                    lineHeight: 1.65,
                    maxWidth: "38ch",
                  }}
                >
                  "{EVENT.tagline}"
                </p>
                <span
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#C9A96E",
                  }}
                >
                  — {EVENT.reference}
                </span>
              </div>

              {/* Countdown */}
              <div className="reveal d3 flex flex-col gap-4">
                <p
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  Starts in
                </p>
                <div className="flex items-end gap-2 md:gap-3">
                  {units.map((u, i) => (
                    <div
                      key={u.label}
                      className="flex items-end gap-2 md:gap-3"
                    >
                      <div className="digit-block">
                        <span
                          className={`digit-value${u.label === "Seconds" && tick ? " tick" : ""}`}
                        >
                          {time === null
                            ? "--"
                            : u.label === "Days"
                              ? u.value
                              : pad(u.value)}
                        </span>
                        <span className="digit-label">{u.label}</span>
                      </div>
                      {i < units.length - 1 && (
                        <span className="digit-sep">:</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-rule reveal d3" />

              {/* CTA row */}
              <div className="reveal d4 flex flex-wrap items-center gap-5">
                <Link href="/register" className="reg-btn">
                  Register Free
                </Link>
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(EVENT.name)}&dates=20260820T070000Z/20260822T190000Z&details=${encodeURIComponent(EVENT.tagline)}&location=${encodeURIComponent(EVENT.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cal-link"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <rect
                      x="0.6"
                      y="1.6"
                      width="11.8"
                      height="10.8"
                      rx="1.4"
                      stroke="currentColor"
                      strokeWidth="1.1"
                    />
                    <path
                      d="M0.6 5h11.8"
                      stroke="currentColor"
                      strokeWidth="1.1"
                    />
                    <path
                      d="M4 0.5v2M9 0.5v2"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                  </svg>
                  Add to Calendar
                </a>
              </div>
            </div>

            {/* Vertical divider */}
            <div className="v-rule hidden lg:block" />

            {/* Right: Sessions */}
            <div className="lg:w-[45%] flex flex-col gap-4 lg:pl-14">
              <div className="reveal d2">
                <p
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: "1rem",
                  }}
                >
                  Programme Schedule
                </p>
                <div className="flex flex-col gap-3">
                  {EVENT.sessions.map((s, i) => (
                    <div
                      key={i}
                      className={`session-card reveal d${i + 3} px-5 py-4 flex items-center gap-5`}
                    >
                      <div style={{ minWidth: "3rem", textAlign: "center" }}>
                        <p
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.8rem",
                            color: "rgba(255,255,255,0.12)",
                            fontWeight: 700,
                            lineHeight: 1,
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </p>
                      </div>
                      <div className="v-rule" style={{ height: "2.5rem" }} />
                      <div className="flex flex-col gap-0.5">
                        <span className="session-day-badge">
                          {s.day} &nbsp;·&nbsp; {s.date}
                        </span>
                        <p
                          style={{
                            color: "rgba(255,255,255,0.75)",
                            fontSize: "0.92rem",
                            fontWeight: 400,
                          }}
                        >
                          {s.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="reveal d5 mt-2 flex items-center gap-2.5">
                <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
                  <path
                    d="M6.5 0C3.19 0 0.5 2.69 0.5 6c0 4.25 6 10 6 10s6-5.75 6-10c0-3.31-2.69-6-6-6Zm0 8.17A2.17 2.17 0 1 1 6.5 3.83a2.17 2.17 0 0 1 0 4.34Z"
                    fill="#C9A96E"
                    fillOpacity="0.5"
                  />
                </svg>
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {EVENT.location} &nbsp;—&nbsp; venue details to follow
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
