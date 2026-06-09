// app/api/tryon/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// Two-step pipeline:
//   Step 1 — fashn/tryon v1.5: puts the vest on the person (works for most photos)
//   Step 2 — If step 1 fails with a pose error, fall back to FLUX.1 Kontext [pro]
//            which can dress anyone in a vest using image editing
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

fal.config({ credentials: process.env.FAL_KEY });

// ── Helper: upload a URL to Cloudinary and get a public CDN URL ───────────────
async function uploadUrlToCloudinary(imageUrl: string): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !uploadPreset) throw new Error("Cloudinary not configured");

  const imageRes = await fetch(imageUrl);
  if (!imageRes.ok)
    throw new Error(`Failed to fetch image: ${imageRes.status}`);
  const blob = await imageRes.blob();

  const form = new FormData();
  form.append("file", blob, "image.jpg");
  form.append("upload_preset", uploadPreset);
  form.append("folder", "calvaryway/tryon");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: form },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message ?? `Cloudinary error ${res.status}`);
  }
  const data = await res.json();
  return data.secure_url as string;
}

// ── Step 1: fashn/tryon — best quality, needs clear body pose ─────────────────
async function tryOnWithFashn(
  personImageUrl: string,
  garmentUrl: string,
): Promise<string> {
  const result = await fal.subscribe("fal-ai/fashn/tryon/v1.5", {
    input: {
      model_image: personImageUrl,
      garment_image: garmentUrl,
      category: "tops",
      mode: "balanced",
      garment_photo_type: "auto",
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status) console.log("[tryon] fashn status:", update.status);
    },
  });

  const url =
    (result as any)?.data?.images?.[0]?.url ??
    (result as any)?.images?.[0]?.url;
  if (!url) throw new Error("No image returned from fashn model");
  return url;
}

// ── Step 2: FLUX.1 Kontext — image editing, works for any photo ───────────────
// Used as fallback when fashn can't detect body pose
async function tryOnWithFluxKontext(
  personImageUrl: string,
  vestImageUrl: string,
): Promise<string> {
  const result = (await fal.subscribe("fal-ai/flux-pro/kontext", {
    input: {
      image_url: personImageUrl,
      prompt: `Replace the person's top/shirt/clothing with a sleeveless vest/waistcoat. The vest is white/light-coloured and has the Sowers Conference 2026 event flyer printed boldly on the front chest area. Keep the person's face, skin, hair, background, and pose completely unchanged. Only change the upper body clothing to the vest. The vest should look natural and well-fitted.`,
      guidance_scale: 3.5,
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status) console.log("[tryon] kontext status:", update.status);
    },
  })) as any;

  const url =
    result?.data?.images?.[0]?.url ??
    result?.images?.[0]?.url ??
    result?.image?.url;
  if (!url) throw new Error("No image returned from Flux Kontext model");
  return url;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { personImageUrl, vestImagePath } = body;

    if (!personImageUrl) {
      return NextResponse.json(
        { error: "personImageUrl is required" },
        { status: 400 },
      );
    }

    if (!process.env.FAL_KEY) {
      return NextResponse.json(
        { error: "FAL_KEY not configured" },
        { status: 500 },
      );
    }

    // Get garment URL — use VEST_IMAGE_URL env var (set to a Cloudinary/public URL of vest)
    const garmentUrl = process.env.VEST_IMAGE_URL;
    if (!garmentUrl) {
      return NextResponse.json(
        { error: "VEST_IMAGE_URL not configured" },
        { status: 500 },
      );
    }

    console.log("[tryon] person URL:", personImageUrl);
    console.log("[tryon] garment URL:", garmentUrl);

    // ── Step 1: Try fashn/tryon first ────────────────────────────────────────
    try {
      const outputUrl = await tryOnWithFashn(personImageUrl, garmentUrl);
      console.log("[tryon] fashn succeeded:", outputUrl);
      return NextResponse.json({ imageUrl: outputUrl });
    } catch (fashnErr: any) {
      const msg = fashnErr?.body?.detail?.[0]?.msg ?? fashnErr?.message ?? "";
      console.log("[tryon] fashn failed:", msg);

      // If pose detection failed, fall back to Flux Kontext image editing
      if (
        msg.toLowerCase().includes("pose") ||
        msg.toLowerCase().includes("body") ||
        msg.toLowerCase().includes("detect") ||
        msg.toLowerCase().includes("unprocessable")
      ) {
        console.log("[tryon] falling back to Flux Kontext...");
        const outputUrl = await tryOnWithFluxKontext(
          personImageUrl,
          garmentUrl,
        );
        console.log("[tryon] kontext succeeded:", outputUrl);
        return NextResponse.json({ imageUrl: outputUrl, method: "kontext" });
      }

      // Any other fashn error — re-throw
      throw fashnErr;
    }
  } catch (err: any) {
    const detail = JSON.stringify(
      err?.body?.detail ?? err?.body ?? err?.message ?? err,
      null,
      2,
    );
    console.error("[tryon] Final error:", detail);
    return NextResponse.json({ error: detail }, { status: 500 });
  }
}

export const maxDuration = 120;
