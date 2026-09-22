import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { registrationEmailText, validateRegistration } from "@/lib/registration";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requests = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = requests.get(key);
  if (!current || current.resetAt <= now) {
    requests.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function response(status: number, message: string) {
  return NextResponse.json({ message }, { status });
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) return response(413, "Užklausa per didelė.");
  if (isRateLimited(getClientKey(request))) return response(429, "Bandykite dar kartą vėliau.");

  let body: unknown;
  try {
    const text = await request.text();
    if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) return response(413, "Užklausa per didelė.");
    body = JSON.parse(text);
  } catch {
    return response(400, "Nepavyko perskaityti užklausos.");
  }

  const result = validateRegistration(body);
  if (!result.valid) return response(400, "Patikrinkite įvestus duomenis ir bandykite dar kartą.");

  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_APP_PASSWORD;
  if (!smtpUser || !smtpPassword) return response(503, "Laiškų siuntimas šiuo metu nepasiekiamas.");

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: smtpUser, pass: smtpPassword },
    });
    const info = await transporter.sendMail({
      from: smtpUser,
      to: smtpUser,
      replyTo: result.registration.parentEmail,
      subject: `Registracijos užklausa: ${result.registration.childName} ${result.registration.childSurname}`,
      text: registrationEmailText(result.registration),
    });
    const accepted = info.accepted.some((address) => address.toLowerCase() === smtpUser.toLowerCase());
    if (!accepted) {
      return response(502, "Nepavyko išsiųsti užklausos.");
    }
    return NextResponse.json({ message: "Užklausa priimta." }, { status: 201 });
  } catch {
    return response(502, "Nepavyko išsiųsti užklausos.");
  }
}
