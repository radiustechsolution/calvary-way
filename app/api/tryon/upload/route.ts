// app/api/tryon/upload/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// Proxies image uploads to fal.ai storage so client never sees the API key
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

fal.config({ credentials: process.env.FAL_KEY });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!process.env.FAL_KEY) {
      return NextResponse.json(
        { error: "FAL_KEY not configured" },
        { status: 500 },
      );
    }

    // Upload to fal storage — returns a public CDN URL
    const url = await fal.storage.upload(file);

    return NextResponse.json({ url });
  } catch (err: any) {
    console.error("[upload] Error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Upload failed" },
      { status: 500 },
    );
  }
}

// Allow up to 30s for large image uploads
export const maxDuration = 30;
