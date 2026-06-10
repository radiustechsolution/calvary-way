// app/api/register/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// Saves Sowers Conference registrations to Supabase
// and sends an email notification via Resend
//
// ── Setup (one-time) ─────────────────────────────────────────────────────────
//
// 1. SUPABASE — https://supabase.com (free)
//    a. Create a new project
//    b. Go to SQL Editor and run this to create the table:
//
//       create table registrations (
//         id uuid default gen_random_uuid() primary key,
//         full_name text not null,
//         phone text not null,
//         email text,
//         state text,
//         age_group text,
//         how_heard text,
//         expectations text,
//         event text default 'Sowers Conference 2026',
//         created_at timestamptz default now()
//       );
//
//    c. Settings → API → copy Project URL and anon/public key
//
// 2. RESEND — https://resend.com (free)
//    a. Get API key from Dashboard → API Keys
//    b. npm install resend
//
// 3. Add to .env.local AND Vercel environment variables:
//       NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
//       SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   (Settings → API → service_role)
//       RESEND_API_KEY=re_xxxxxxxxxxxx
//
// 4. npm install @supabase/supabase-js resend
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const NOTIFY_EMAIL = "pstflames@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      full_name,
      phone,
      email,
      state,
      age_group,
      how_heard,
      expectations,
    } = body;

    if (!full_name || !phone) {
      return NextResponse.json(
        { error: "Full name and phone number are required." },
        { status: 400 },
      );
    }

    // ── Validate env vars ─────────────────────────────────────────────────────
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("[register] Supabase env vars missing");
      return NextResponse.json(
        {
          error:
            "Database not configured. Please contact us directly on WhatsApp.",
        },
        { status: 500 },
      );
    }

    // ── Save to Supabase ──────────────────────────────────────────────────────
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase.from("registrations").insert({
      full_name,
      phone,
      email: email || null,
      state: state || null,
      age_group: age_group || null,
      how_heard: how_heard || null,
      expectations: expectations || null,
      event: "Sowers Conference 2026",
    });

    if (dbError) {
      console.error("[register] Supabase error:", dbError);
      return NextResponse.json(
        { error: "Could not save registration. Please try again." },
        { status: 500 },
      );
    }

    // ── Send email notification ───────────────────────────────────────────────
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails
        .send({
          from: "Calvaryway Website <onboarding@resend.dev>",
          to: NOTIFY_EMAIL,
          replyTo: email || NOTIFY_EMAIL,
          subject: `New Registration — ${full_name} for Sowers Conference 2026`,
          html: `
          <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #f9f9f9;">
            <div style="background: #0C0C0C; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
              <h2 style="color: #C9A96E; font-size: 20px; margin: 0 0 4px;">New Registration 🔥</h2>
              <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0;">Sowers Conference 2026 — Fire Brands</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden;">
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 16px; font-size: 12px; color: #888; width: 130px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Name</td>
                <td style="padding: 12px 16px; font-size: 14px; color: #111; font-weight: 600;">${full_name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 16px; font-size: 12px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Phone</td>
                <td style="padding: 12px 16px; font-size: 14px; color: #111;"><a href="tel:${phone}" style="color: #C9A96E;">${phone}</a></td>
              </tr>
              ${
                email
                  ? `
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 16px; font-size: 12px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
                <td style="padding: 12px 16px; font-size: 14px; color: #111;"><a href="mailto:${email}" style="color: #C9A96E;">${email}</a></td>
              </tr>`
                  : ""
              }
              ${
                state
                  ? `
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 16px; font-size: 12px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">State</td>
                <td style="padding: 12px 16px; font-size: 14px; color: #111;">${state}</td>
              </tr>`
                  : ""
              }
              ${
                age_group
                  ? `
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 16px; font-size: 12px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Age Group</td>
                <td style="padding: 12px 16px; font-size: 14px; color: #111;">${age_group}</td>
              </tr>`
                  : ""
              }
              ${
                how_heard
                  ? `
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 12px 16px; font-size: 12px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">How Heard</td>
                <td style="padding: 12px 16px; font-size: 14px; color: #111;">${how_heard}</td>
              </tr>`
                  : ""
              }
              ${
                expectations
                  ? `
              <tr>
                <td style="padding: 12px 16px; font-size: 12px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Expectations</td>
                <td style="padding: 12px 16px; font-size: 14px; color: #111; line-height: 1.6;">${expectations}</td>
              </tr>`
                  : ""
              }
            </table>

            <p style="text-align: center; font-size: 11px; color: #bbb; margin-top: 24px;">
              View all registrations in your <a href="https://supabase.com" style="color: #C9A96E;">Supabase dashboard</a>
            </p>
          </div>
        `,
        })
        .catch((err) => {
          // Email failure should not block a successful registration
          console.error("[register] Email notification failed:", err);
        });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[register] Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}
