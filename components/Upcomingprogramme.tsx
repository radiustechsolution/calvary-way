"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const EVENT = {
  name: "Sowers Conference",
  tagline: "Fire Brands - A people prepared by the Lord.",
  reference: "Judges 15:4",
  dates: "August 20 – 22, 2026",
  location: "Akure, Ondo State",
  target: new Date("2026-08-20T07:00:00Z"),
  sessions: [
    { day: "Day 1", date: "Aug 20", title: "Fire Brands" },
    { day: "Day 2", date: "Aug 21", title: "Fire Brands" },
    { day: "Day 3", date: "Aug 22", title: "Fire Brands" },
  ],
  // ── Path to the conference flyer / vest image in your public folder ─────────
  // This image is used as the "garment" for the AI try-on
  // Place your flyer/vest image at: public/sowers-vest.png  (or .jpg)
  vestImagePath: "/sowers-vest.png",
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
type TryOnState = "idle" | "uploading" | "generating" | "done" | "error";

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

// ── Converts a File to a base64 data URL ─────────────────────────────────────
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result as string);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

// ── Converts any image to a compressed JPEG under 8MB ────────────────────────
// Resizes to max 1920px and uses JPEG compression — well within Cloudinary free limits
function convertToPng(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read image file"));
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => {
        // Resize to max 1920px on longest side — plenty for try-on quality
        const MAX = 1920;
        let { naturalWidth: w, naturalHeight: h } = img;
        if (w > MAX || h > MAX) {
          if (w > h) {
            h = Math.round((h * MAX) / w);
            w = MAX;
          } else {
            w = Math.round((w * MAX) / h);
            h = MAX;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported"));
        ctx.drawImage(img, 0, 0, w, h);

        // Use JPEG at 0.88 quality — typically 0.5–3MB for a portrait photo
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Canvas conversion failed"));
            resolve(new File([blob], "photo.jpg", { type: "image/jpeg" }));
          },
          "image/jpeg",
          0.88,
        );
      };
      img.onerror = () =>
        reject(
          new Error(
            "Could not decode image. If using an iPhone photo (HEIC), please convert to JPG first or use Safari.",
          ),
        );
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

// ── Uploads PNG directly from browser to Cloudinary ─────────────────────────
// Bypasses the server entirely — avoids DNS/network issues on localhost
// NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is safe to expose (read-only public config)
async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) throw new Error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME not set");

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!uploadPreset)
    throw new Error("NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET not set");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "calvaryway/tryon");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData },
  );
  const data = await res.json();
  if (!res.ok)
    throw new Error(data?.error?.message ?? "Cloudinary upload failed");
  return data.secure_url as string;
}

// ── Try-On Panel ─────────────────────────────────────────────────────────────
function TryOnPanel() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<TryOnState>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const reset = () => {
    setState("idle");
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFile = async (file: File) => {
    // Validate
    // Accept all image types including HEIF/HEIC from iPhone
    const isImage =
      file.type.startsWith("image/") ||
      file.name.toLowerCase().endsWith(".heic") ||
      file.name.toLowerCase().endsWith(".heif");
    if (!isImage) {
      setError("Please upload an image file (JPG, PNG, WEBP, HEIF).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10 MB.");
      return;
    }

    setError(null);

    try {
      // Convert to PNG first (handles JPEG, HEIF, WEBP uniformly)
      const pngFile = await convertToPng(file);

      // Set preview and uploading state together before any async work
      const dataUrl = await fileToDataUrl(pngFile);
      setPreview(dataUrl);
      setState("uploading");

      // Small delay so React renders the preview before we start the upload
      await new Promise((r) => setTimeout(r, 50));

      setState("generating");

      // Upload the PNG — vest is handled server-side via its path
      const personUrl = await uploadToCloudinary(pngFile);

      // Call our API route — pass vest path, server uploads it to Cloudinary directly
      const res = await fetch("/api/tryon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personImageUrl: personUrl,
          vestImagePath: EVENT.vestImagePath,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error ?? `Server error ${res.status}`);
      }

      setResult(data.imageUrl);
      setState("done");
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Something went wrong. Please try again.");
      setState("error");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  // Download result
  const handleDownload = async () => {
    if (!result) return;
    try {
      const res = await fetch(result);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sowers-conference-2026.jpg";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.open(result, "_blank");
    }
  };

  return (
    <>
      <style>{`
        /* ── Try-on panel ── */
        .tryon-panel {
          background: rgba(201,169,110,0.04);
          border: 1px solid rgba(201,169,110,0.15);
          border-radius: 1.25rem;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .tryon-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .tryon-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(201,169,110,0.1);
          border: 1px solid rgba(201,169,110,0.2);
          border-radius: 2rem;
          padding: 0.28rem 0.8rem;
          font-size: 0.6rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #C9A96E;
          font-weight: 500;
          width: fit-content;
        }

        .tryon-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.2rem, 3vw, 1.55rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
        }

        .tryon-subtitle {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.4);
          font-weight: 300;
          line-height: 1.6;
          max-width: 44ch;
        }

        /* ── Drop zone ── */
        .tryon-dropzone {
          border: 1.5px dashed rgba(201,169,110,0.25);
          border-radius: 1rem;
          padding: 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: border-color 0.25s ease, background 0.25s ease;
          background: rgba(255,255,255,0.015);
          text-align: center;
        }

        .tryon-dropzone:hover,
        .tryon-dropzone.drag-over {
          border-color: rgba(201,169,110,0.55);
          background: rgba(201,169,110,0.06);
        }

        .tryon-dropzone-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background: rgba(201,169,110,0.1);
          border: 1px solid rgba(201,169,110,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C9A96E;
        }

        .tryon-dropzone-main {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.65);
          font-weight: 400;
        }

        .tryon-dropzone-sub {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.25);
          font-weight: 300;
        }

        .tryon-browse-btn {
          background: rgba(201,169,110,0.12);
          border: 1px solid rgba(201,169,110,0.28);
          color: #C9A96E;
          padding: 0.55rem 1.25rem;
          border-radius: 0.3rem;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.22s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .tryon-browse-btn:hover {
          background: rgba(201,169,110,0.2);
          border-color: rgba(201,169,110,0.5);
        }

        /* ── Working states ── */
        .tryon-working {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          padding: 2rem 0;
        }

        .tryon-working-imgs {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .tryon-working-img {
          width: 72px;
          height: 72px;
          border-radius: 0.6rem;
          object-fit: cover;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .tryon-arrow {
          color: rgba(201,169,110,0.5);
          animation: tryon-pulse 1.4s ease-in-out infinite;
        }
        @keyframes tryon-pulse {
          0%, 100% { opacity: 0.3; transform: translateX(0); }
          50% { opacity: 1; transform: translateX(4px); }
        }

        .tryon-spinner-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .tryon-spinner {
          width: 36px;
          height: 36px;
          border: 2px solid rgba(201,169,110,0.12);
          border-top-color: #C9A96E;
          border-radius: 50%;
          animation: tryon-spin 0.9s linear infinite;
        }
        @keyframes tryon-spin { to { transform: rotate(360deg); } }

        .tryon-status {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.4);
          font-weight: 300;
          letter-spacing: 0.06em;
        }

        .tryon-status strong {
          color: rgba(201,169,110,0.8);
          font-weight: 500;
        }

        /* ── Result ── */
        .tryon-result {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .tryon-result-img-wrap {
          position: relative;
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid rgba(201,169,110,0.2);
          background: #111;
        }

        .tryon-result-img {
          width: 100%;
          display: block;
          max-height: 480px;
          object-fit: contain;
        }

        .tryon-result-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(201,169,110,0.3);
          border-radius: 2rem;
          padding: 0.28rem 0.75rem;
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C9A96E;
        }

        .tryon-result-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .tryon-dl-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #C9A96E;
          color: #0C0C0C;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.75rem 1.5rem;
          border-radius: 0.3rem;
          border: none;
          cursor: pointer;
          transition: background 0.22s ease, transform 0.2s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .tryon-dl-btn:hover { background: #dfc08a; transform: translateY(-1px); }

        .tryon-retry-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: transparent;
          color: rgba(255,255,255,0.4);
          font-size: 0.72rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.75rem 1.25rem;
          border-radius: 0.3rem;
          border: 1px solid rgba(255,255,255,0.09);
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .tryon-retry-btn:hover {
          border-color: rgba(255,255,255,0.22);
          color: rgba(255,255,255,0.7);
        }

        /* ── Error ── */
        .tryon-error {
          background: rgba(220,60,60,0.07);
          border: 1px solid rgba(220,60,60,0.2);
          border-radius: 0.6rem;
          padding: 0.9rem 1.1rem;
          font-size: 0.8rem;
          color: rgba(255,130,130,0.85);
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
        }

        /* ── Tips ── */
        .tryon-tips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tryon-tip {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.06em;
        }

        .tryon-tip-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(201,169,110,0.3);
          flex-shrink: 0;
        }
      `}</style>

      <div className="tryon-panel">
        {/* Header */}
        <div className="tryon-header">
          <span className="tryon-badge">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
              <path d="M4 0a4 4 0 1 1 0 8A4 4 0 0 1 4 0zm0 1.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zM3.25 4v2.5h1.5V4h-1.5z" />
            </svg>
            AI Feature · Powered by fal.ai
          </span>
          <h3 className="tryon-title">Wear the Sowers Conference Vest</h3>
          <p className="tryon-subtitle">
            Upload a clear photo of yourself and our AI will dress you in the
            official conference vest — ready to share and download.
          </p>
        </div>

        {/* States */}
        {(state === "idle" || state === "error") && (
          <>
            <div
              className={`tryon-dropzone${dragOver ? " drag-over" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              role="button"
              tabIndex={0}
              aria-label="Upload your photo"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  fileInputRef.current?.click();
              }}
            >
              <div className="tryon-dropzone-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div>
                <p className="tryon-dropzone-main">Drag your photo here, or</p>
                <p className="tryon-dropzone-sub">
                  JPG · PNG · WEBP · Max 10 MB
                </p>
              </div>
              <button className="tryon-browse-btn" type="button">
                Browse photo
              </button>
            </div>

            {error && (
              <div className="tryon-error">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0, marginTop: "1px" }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <div className="tryon-tips">
              {[
                "Face clearly visible",
                "Good lighting",
                "Front-facing pose",
                "iPhone users: use Safari or convert to JPG",
              ].map((tip) => (
                <span key={tip} className="tryon-tip">
                  <span className="tryon-tip-dot" />
                  {tip}
                </span>
              ))}
            </div>
          </>
        )}

        {(state === "uploading" || state === "generating") && (
          <div className="tryon-working">
            {preview && (
              <div className="tryon-working-imgs">
                <img
                  src={preview}
                  alt="Your photo"
                  className="tryon-working-img"
                />
                <span className="tryon-arrow">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                <img
                  src={EVENT.vestImagePath}
                  alt="Conference vest"
                  className="tryon-working-img"
                />
              </div>
            )}
            <div className="tryon-spinner-wrap">
              <div className="tryon-spinner" />
              <p className="tryon-status">
                {state === "uploading" ? (
                  "Uploading your photo…"
                ) : (
                  <>
                    <strong>AI is generating</strong> your look — this takes
                    about 20–30 seconds
                  </>
                )}
              </p>
            </div>
          </div>
        )}

        {state === "done" && result && (
          <div className="tryon-result">
            <div className="tryon-result-img-wrap">
              <img
                src={result}
                alt="Your Sowers Conference look"
                className="tryon-result-img"
              />
              <span className="tryon-result-badge">✦ AI Generated</span>
            </div>
            <div className="tryon-result-actions">
              <button className="tryon-dl-btn" onClick={handleDownload}>
                <svg
                  width="14"
                  height="14"
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
                Download Image
              </button>
              <button className="tryon-retry-btn" onClick={reset}>
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
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
                </svg>
                Try another photo
              </button>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif,.jpg,.jpeg,.png,.webp"
          style={{ display: "none" }}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}

// ── Main component (unchanged core, try-on added below) ──────────────────────
export default function UpcomingProgramme() {
  const [time, setTime] = useState<TimeLeft | null>(null);
  const [tick, setTick] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
          top: -120px; right: -180px;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .v-rule { width: 1px; background: rgba(201,169,110,0.2); }

        .reveal {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal.d1 { transition-delay: 0.05s; }
        .reveal.d2 { transition-delay: 0.18s; }
        .reveal.d3 { transition-delay: 0.3s;  }
        .reveal.d4 { transition-delay: 0.42s; }
        .reveal.d5 { transition-delay: 0.54s; }
        .reveal.animate-in { opacity: 1; transform: translateY(0); }

        .digit-block { display: flex; flex-direction: column; align-items: center; gap: 0.35rem; }

        .digit-value {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.6rem, 5vw, 4rem);
          font-weight: 700; color: #fff; line-height: 1;
          letter-spacing: -0.02em; min-width: 2ch; text-align: center;
          transition: color 0.15s ease;
        }
        .digit-value.tick { color: #C9A96E; }

        .digit-label {
          font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.35); font-weight: 500;
        }

        .digit-sep {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem; color: rgba(201,169,110,0.3); line-height: 1;
          padding-bottom: 1.4rem; align-self: flex-end;
        }

        .session-card {
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.75rem; background: rgba(255,255,255,0.025);
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .session-card:hover {
          border-color: rgba(201,169,110,0.25); background: rgba(201,169,110,0.04);
        }

        .session-day-badge {
          font-size: 0.62rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: #C9A96E; font-weight: 500;
        }

        .reg-btn {
          font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase; color: #0C0C0C;
          background: #C9A96E; padding: 0.85rem 2rem; border-radius: 0.25rem;
          text-decoration: none; display: inline-block;
          transition: background 0.25s ease, transform 0.2s ease;
        }
        .reg-btn:hover { background: #dfc08a; transform: translateY(-2px); }

        .cal-link {
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.4); text-decoration: none;
          display: inline-flex; align-items: center; gap: 0.4rem;
          transition: color 0.2s ease;
        }
        .cal-link:hover { color: rgba(255,255,255,0.8); }

        .gold-line { width: 2.5rem; height: 1.5px; background: #C9A96E; display: block; }
        .h-rule { height: 1px; background: rgba(255,255,255,0.06); }

        .prog-section-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent);
        }
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

          {/* ── Divider ── */}
          <div className="prog-section-divider reveal d4" />

          {/* ── Try-On panel ── */}
          <div className="reveal d5">
            <TryOnPanel />
          </div>
        </div>
      </section>
    </>
  );
}
