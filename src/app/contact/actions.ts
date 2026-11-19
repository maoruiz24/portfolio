"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/site";

/**
 * Contact form → email via Resend.
 *
 * Env vars (runtime, never committed):
 *   RESEND_API_KEY      required — API key from resend.com
 *   CONTACT_FROM_EMAIL  optional — verified sender, default "Portfolio <contact@iruiz.dev>"
 *   CONTACT_TO_EMAIL    optional — inbox that receives messages, default siteConfig.email
 *
 * Spam protection: hidden honeypot field, minimum fill time and a per-IP rate limit.
 * The rate limit is in memory, which is enough for a single replica.
 */

export type ContactState = {
    status: "idle" | "success" | "error";
    message?: string;
    fieldErrors?: Partial<Record<"name" | "email" | "subject" | "message", string>>;
};

const schema = z.object({
    name: z.string().trim().min(2, "Please enter your name.").max(100),
    email: z.email("Please enter a valid email address.").max(200),
    company: z.string().trim().max(120).optional().default(""),
    subject: z.string().trim().min(3, "Please add a subject.").max(150),
    message: z.string().trim().min(10, "Please write a few more words.").max(5000),
});

const MIN_FILL_MS = 3_000;
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 3;
const attempts = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    if (recent.length >= MAX_PER_WINDOW) {
        attempts.set(ip, recent);
        return true;
    }
    recent.push(now);
    attempts.set(ip, recent);
    return false;
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

const fallback = "Something went wrong. Please email me directly at " + siteConfig.email + ".";

export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
    // Bots fill hidden fields and submit instantly. Pretend success so they don't retry.
    const honeypot = String(formData.get("website") ?? "");
    const startedAt = Number(formData.get("startedAt") ?? 0);
    if (honeypot || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
        return { status: "success", message: "Thanks! Your message has been sent." };
    }

    const parsed = schema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        company: formData.get("company") ?? "",
        subject: formData.get("subject"),
        message: formData.get("message"),
    });

    if (!parsed.success) {
        const fieldErrors: ContactState["fieldErrors"] = {};
        for (const issue of parsed.error.issues) {
            const key = issue.path[0];
            if (key === "name" || key === "email" || key === "subject" || key === "message") {
                fieldErrors[key] ??= issue.message;
            }
        }
        return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
    }

    const requestHeaders = await headers();
    const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
    if (rateLimited(ip)) {
        return { status: "error", message: "Too many messages in a short time. Please try again later or email me directly." };
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error("[contact] RESEND_API_KEY is not set");
        return { status: "error", message: fallback };
    }

    const { name, email, company, subject, message } = parsed.data;
    const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <contact@iruiz.dev>";
    const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;

    const text = [
        "Name: " + name,
        "Email: " + email,
        company ? "Company: " + company : null,
        "",
        message,
        "",
        "— Sent from the contact form at " + siteConfig.url,
    ]
        .filter((line) => line !== null)
        .join("\n");

    const html =
        '<div style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;color:#111">' +
        "<p><strong>Name:</strong> " + escapeHtml(name) + "<br>" +
        "<strong>Email:</strong> " + escapeHtml(email) +
        (company ? "<br><strong>Company:</strong> " + escapeHtml(company) : "") +
        "</p>" +
        '<p style="white-space:pre-wrap">' + escapeHtml(message) + "</p>" +
        '<p style="color:#666;font-size:12px">Sent from the contact form at ' + escapeHtml(siteConfig.url) + "</p>" +
        "</div>";

    try {
        const resend = new Resend(apiKey);
        const { error } = await resend.emails.send({
            from,
            to,
            replyTo: email,
            subject: "[iruiz.dev] " + subject,
            text,
            html,
        });
        if (error) {
            console.error("[contact] Resend error:", error.name, error.message);
            return { status: "error", message: fallback };
        }
    } catch (err) {
        console.error("[contact] Unexpected error:", err);
        return { status: "error", message: fallback };
    }

    return { status: "success", message: "Thanks, " + name + "! Your message has been sent — I'll get back to you soon." };
}
