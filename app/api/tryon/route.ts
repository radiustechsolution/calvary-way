// app/api/tryon/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

fal.config({ credentials: process.env.FAL_KEY });

// Uploads any image to Cloudinary and returns a public URL
async function uploadUrlToCloudinary(imageUrl: string): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !uploadPreset) throw new Error("Cloudinary not configured");

  // Fetch the image locally first (works for localhost), then upload as blob
  const imageRes = await fetch(imageUrl);
  if (!imageRes.ok)
    throw new Error(`Failed to fetch vest image: ${imageRes.status}`);
  const blob = await imageRes.blob();

  const form = new FormData();
  form.append("file", blob, "vest.png");
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { personImageUrl, vestImagePath } = body;

    if (!personImageUrl || !vestImagePath) {
      return NextResponse.json(
        { error: "personImageUrl and vestImagePath are required" },
        { status: 400 },
      );
    }

    if (!process.env.FAL_KEY) {
      return NextResponse.json(
        { error: "FAL_KEY not configured" },
        { status: 500 },
      );
    }

    // Use the vest image already uploaded to Cloudinary
    // To update: upload a new vest image to Cloudinary and paste the URL here
    const garmentUrl = process.env.VEST_IMAGE_URL;
    if (!garmentUrl) {
      return NextResponse.json(
        { error: "VEST_IMAGE_URL not configured in environment variables" },
        { status: 500 },
      );
    }

    console.log("[tryon] person URL:", personImageUrl);
    console.log("[tryon] garment URL:", garmentUrl);

    // Run the try-on model
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
        console.log("[tryon] status:", update.status);
        if ("logs" in update && update.logs) {
          update.logs.forEach((l: any) =>
            console.log("[tryon log]", l.message),
          );
        }
      },
    });

    const outputUrl =
      (result as any)?.images?.[0]?.url ?? (result as any)?.image?.url;

    if (!outputUrl) {
      return NextResponse.json(
        { error: "No image returned from model" },
        { status: 500 },
      );
    }

    return NextResponse.json({ imageUrl: outputUrl });
  } catch (err: any) {
    const detail = JSON.stringify(
      err?.body?.detail ?? err?.body ?? err?.message ?? err,
      null,
      2,
    );
    console.error("[tryon] Full error detail:", detail);
    return NextResponse.json({ error: detail }, { status: 500 });
  }
}

export const maxDuration = 60;
