"use client";

import { useEffect, useRef } from "react";

export default function PastorSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.15 },
    );

    const targets = sectionRef.current?.querySelectorAll(".reveal");
    targets?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .pastor-section {
          font-family: 'DM Sans', sans-serif;
        }

        .display-font {
          font-family: 'Playfair Display', serif;
        }

        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal.delay-1 { transition-delay: 0.1s; }
        .reveal.delay-2 { transition-delay: 0.22s; }
        .reveal.delay-3 { transition-delay: 0.36s; }

        .reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .image-wrapper::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          background: linear-gradient(
            to bottom,
            transparent 55%,
            rgba(10, 10, 10, 0.55) 100%
          );
          pointer-events: none;
        }

        .accent-line {
          width: 2.5rem;
          height: 2px;
          background: #C9A96E;
          display: block;
        }

        .quote-mark {
          font-family: 'Playfair Display', serif;
          font-size: 7rem;
          line-height: 1;
          color: #C9A96E;
          opacity: 0.18;
          position: absolute;
          top: -1.5rem;
          left: -0.5rem;
          pointer-events: none;
          user-select: none;
        }

        .image-wrapper img {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .image-wrapper:hover img {
          transform: scale(1.03);
        }
      `}</style>

      <section
        ref={sectionRef}
        className="pastor-section bg-[#0C0C0C] w-full py-20 md:py-28 px-5"
      >
        <div className="max-w-6xl mx-auto">
          {/* Label */}
          <div className="reveal mb-10 md:mb-14">
            <span className="text-[#C9A96E] uppercase tracking-[0.2em] text-xs font-medium display-font">
              Leadership
            </span>
            <span className="accent-line mt-2" />
          </div>

          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
            {/* Image column */}
            <div className="reveal delay-1 w-full md:w-[42%] flex-shrink-0">
              <div className="image-wrapper relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
                <img
                  src="/goke.jpeg"
                  className="w-full aspect-[4/5] object-cover object-top"
                  alt="Bro Goke Adesida"
                />
                {/* Name badge pinned to bottom of image */}
                <div className="absolute bottom-0 left-0 right-0 z-10 px-5 py-5">
                  <p className="display-font text-white text-2xl font-semibold leading-tight">
                    Bro Goke Adesida
                  </p>
                  <p className="text-white/60 text-xs tracking-widest uppercase mt-1 font-medium">
                    Coordinator, Calvaryway Mission
                  </p>
                </div>
              </div>
            </div>

            {/* Text column */}
            <div className="md:w-[58%] flex flex-col gap-6 md:pt-4">
              {/* Section heading */}
              <div className="reveal delay-2">
                <h2 className="display-font text-white text-[2.4rem] sm:text-[3rem] leading-[1.15] font-semibold">
                  Our Pastor
                </h2>
              </div>

              {/* Bio block with decorative quote mark */}
              <div className="reveal delay-3 relative pl-1 pt-2">
                <span className="quote-mark" aria-hidden>
                  "
                </span>
                <p className="text-white/70 text-[1.05rem] sm:text-[1.125rem] leading-relaxed font-light relative z-10">
                  Bro Goke Adesida is a Christian itinerant minister,
                  disciple-maker, and the coordinator of{" "}
                  <span className="text-white/90 font-medium">
                    Calvaryway Mission
                  </span>{" "}
                  based in Akure, Ondo State, Nigeria. He focuses on Bible
                  teaching, discipleship, and missions.
                </p>
              </div>

              {/* Divider */}
              <div className="reveal delay-3">
                <div className="h-px bg-white/8 w-full mt-2" />
              </div>

              {/* Pillars */}
              <div className="reveal delay-3 grid grid-cols-3 gap-4 pt-1">
                {["Bible Teaching", "Discipleship", "Missions"].map((item) => (
                  <div key={item} className="flex flex-col gap-1.5">
                    <span className="accent-line" />
                    <p className="text-white/55 text-[0.78rem] uppercase tracking-widest font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
