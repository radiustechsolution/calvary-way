// app/api/tryon/upload/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// Uploads images to Cloudinary (free tier) and returns a public URL.
// fal.ai can fetch Cloudinary URLs reliably from anywhere.
//
// Setup (one-time, free):
//   1. Sign up at https://cloudinary.com  (free tier: 25 GB storage, 25 GB bandwidth/month)
//   2. Dashboard → Settings → Upload → Add upload preset
//      • Signing Mode: Unsigned
//      • Folder: calvaryway  (optional)
//      • Copy the preset name
//   3. Add to .env.local:
//        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
//        CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset_name
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      return NextResponse.json(
        {
          error:
            "Cloudinary not configured. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET to .env.local",
        },
        { status: 500 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, and WEBP accepted." },
        { status: 400 },
      );
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image must be under 10 MB." },
        { status: 400 },
      );
    }

    // Forward to Cloudinary — force PNG output so fal.ai can always identify the format
    const cloudinaryForm = new FormData();
    cloudinaryForm.append("file", file);
    cloudinaryForm.append("upload_preset", uploadPreset);
    cloudinaryForm.append("folder", "calvaryway/tryon");
    cloudinaryForm.append("format", "png"); // ← converts any JPEG/WEBP to PNG

    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: cloudinaryForm },
    );

    if (!cloudinaryRes.ok) {
      const err = await cloudinaryRes.json().catch(() => ({}));
      throw new Error(
        err?.error?.message ?? `Cloudinary error ${cloudinaryRes.status}`,
      );
    }

    const cloudinaryData = await cloudinaryRes.json();
    // secure_url is the public HTTPS URL fal.ai can fetch
    return NextResponse.json({ url: cloudinaryData.secure_url });
  } catch (err: any) {
    console.error("[upload] Error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Upload failed" },
      { status: 500 },
    );
  }
}

export const maxDuration = 30;
