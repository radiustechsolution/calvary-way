// app/api/tryon/generate-vest/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// ONE-TIME USE: Generates a vest garment image for the try-on pipeline.
// Hit this endpoint once to generate the vest, copy the URL into VEST_IMAGE_URL,
// then you never need to call this again.
//
// Call it: GET /api/tryon/generate-vest
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

fal.config({ credentials: process.env.FAL_KEY });

export async function GET(req: NextRequest) {
  if (!process.env.FAL_KEY) {
    return NextResponse.json(
      { error: "FAL_KEY not configured" },
      { status: 500 },
    );
  }

  try {
    // Generate a vest with the conference design printed on it
    const result = (await fal.subscribe("fal-ai/flux-pro/v1.1", {
      input: {
        prompt: `Product photography of a sleeveless vest / waistcoat laid flat on a pure white background. The vest is white/cream coloured cotton fabric. On the front chest area, there is bold printed text that reads "SOWERS CONFERENCE 2026" at the top, and below it "FIRE BRANDS" in large decorative letters, and at the bottom "Judges 15:4" and "Akure, Nigeria · Aug 20-22". The text is printed in dark navy/black ink directly on the vest fabric. Clean studio lighting, flat-lay product photo style, no shadows, white background only.`,
        image_size: "portrait_4_3",
        num_images: 1,
        safety_tolerance: "5",
      },
      logs: false,
    })) as any;

    const imageUrl = result?.data?.images?.[0]?.url ?? result?.images?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image generated" },
        { status: 500 },
      );
    }

    // Also upload to Cloudinary so it's permanently available
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    let cloudinaryUrl = imageUrl;

    if (cloudName && uploadPreset) {
      const imgRes = await fetch(imageUrl);
      const blob = await imgRes.blob();
      const form = new FormData();
      form.append("file", blob, "sowers-vest.jpg");
      form.append("upload_preset", uploadPreset);
      form.append("folder", "calvaryway/assets");
      form.append("public_id", "sowers-vest-2026");

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: form },
      );

      if (cloudRes.ok) {
        const cloudData = await cloudRes.json();
        cloudinaryUrl = cloudData.secure_url;
      }
    }

    return NextResponse.json({
      message:
        "✅ Vest generated! Copy the cloudinaryUrl below into your VEST_IMAGE_URL environment variable.",
      falUrl: imageUrl,
      cloudinaryUrl,
      nextStep: `Set VEST_IMAGE_URL=${cloudinaryUrl} in your .env.local and Vercel environment variables`,
    });
  } catch (err: any) {
    console.error("[generate-vest] Error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Generation failed" },
      { status: 500 },
    );
  }
}
