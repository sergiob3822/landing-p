import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CHATWOOT_URL = process.env.CHATWOOT_TWILIO_CALLBACK_URL;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

function parseTokenMap(): Record<string, string> {
  const raw = process.env.TWILIO_AUTH_TOKENS || "";
  const map: Record<string, string> = {};
  for (const pair of raw.split(",")) {
    const idx = pair.indexOf(":");
    if (idx > 0) {
      const sid = pair.slice(0, idx).trim();
      const token = pair.slice(idx + 1).trim();
      if (sid && token) map[sid] = token;
    }
  }
  return map;
}

const TOKEN_MAP = parseTokenMap();

function resolveAuthToken(accountSid?: string): string | undefined {
  if (accountSid && TOKEN_MAP[accountSid]) return TOKEN_MAP[accountSid];
  return AUTH_TOKEN;
}

function twilioSignature(authToken: string, url: string, params: Record<string, string>) {
  const data = Object.keys(params)
    .sort()
    .reduce((acc, key) => acc + key + params[key], url);
  return crypto.createHmac("sha1", authToken).update(data, "utf8").digest("base64");
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const incomingSig = req.headers.get("x-twilio-signature") ?? "";

  const params: Record<string, string> = {};
  for (const [k, v] of new URLSearchParams(rawBody).entries()) {
    params[k] = v;
  }

  const ctwaClid = params["ReferralCtwaClid"];
  if (ctwaClid) {
    const phone = (params["From"] || params["WaId"] || "").replace(/[^\d]/g, "");
    const admin = getSupabaseAdmin();
    if (admin && phone) {
      void admin
        .from("ctwa_clicks")
        .insert({
          phone,
          ctwa_clid: ctwaClid,
          source_id: params["ReferralSourceId"] ?? null,
          source_url: params["ReferralSourceUrl"] ?? null,
        })
        .then(
          () => {},
          () => {}
        );
    }
  }

  if (!CHATWOOT_URL) {
    return NextResponse.json(
      { error: "Falta CHATWOOT_TWILIO_CALLBACK_URL." },
      { status: 500 }
    );
  }

  const authToken = resolveAuthToken(params["AccountSid"]);
  const signature = authToken
    ? twilioSignature(authToken, CHATWOOT_URL, params)
    : incomingSig;

  try {
    const res = await fetch(CHATWOOT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Twilio-Signature": signature,
      },
      body: rawBody,
    });
    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: { "Content-Type": res.headers.get("content-type") ?? "text/plain" },
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo reenviar el mensaje a Chatwoot." },
      { status: 502 }
    );
  }
}
