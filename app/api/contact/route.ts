// app/api/contact/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// Handles contact form submissions
// Sends email notification to pstflames@gmail.com via Resend
//
// Setup:
//   1. Sign up free at https://resend.com
//   2. Get your API key from Dashboard → API Keys
//   3. Add to .env.local:
//        RESEND_API_KEY=re_xxxxxxxxxxxx
//   4. npm install resend
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_EMAIL = "pstflames@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 },
      );
    }

    await resend.emails.send({
      from: "Calvaryway Website <onboarding@resend.dev>",
      to: NOTIFY_EMAIL,
      replyTo: email || NOTIFY_EMAIL,
      subject: `New message from ${name}${subject ? ` — ${subject}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #f9f9f9;">
          <div style="background: #0C0C0C; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <h2 style="color: #C9A96E; font-size: 20px; margin: 0 0 4px;">New Contact Message</h2>
            <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0;">Calvaryway Mission Website</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden;">
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 12px 16px; font-size: 12px; color: #888; width: 100px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Name</td>
              <td style="padding: 12px 16px; font-size: 14px; color: #111;">${name}</td>
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
              phone
                ? `
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 12px 16px; font-size: 12px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Phone</td>
              <td style="padding: 12px 16px; font-size: 14px; color: #111;"><a href="tel:${phone}" style="color: #C9A96E;">${phone}</a></td>
            </tr>`
                : ""
            }
            ${
              subject
                ? `
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 12px 16px; font-size: 12px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Subject</td>
              <td style="padding: 12px 16px; font-size: 14px; color: #111;">${subject}</td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding: 12px 16px; font-size: 12px; color: #888; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Message</td>
              <td style="padding: 12px 16px; font-size: 14px; color: #111; line-height: 1.6;">${message.replace(/\n/g, "<br/>")}</td>
            </tr>
          </table>

          ${
            email
              ? `
          <div style="margin-top: 20px; text-align: center;">
            <a href="mailto:${email}" style="display: inline-block; background: #C9A96E; color: #0C0C0C; padding: 10px 24px; border-radius: 4px; text-decoration: none; font-size: 13px; font-weight: 600; letter-spacing: 0.05em;">Reply to ${name}</a>
          </div>`
              : ""
          }

          <p style="text-align: center; font-size: 11px; color: #bbb; margin-top: 24px;">
            Sent from calvarywaymissions.org contact form
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[contact] Error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Failed to send message" },
      { status: 500 },
    );
  }
}
