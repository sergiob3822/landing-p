import { NextRequest, NextResponse } from "next/server";
import {
  getActiveNumbers,
  pickNumber,
  buildWhatsappUrl,
} from "@/lib/numbers";
import { sendCapiEvent } from "@/lib/meta";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getClientIp(req: NextRequest): string | undefined {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? undefined;
}

export async function POST(req: NextRequest) {
  let payload: {
    eventId?: string;
    fbp?: string;
    fbc?: string;
    sourceUrl?: string;
  } = {};
  try {
    payload = await req.json();
  } catch {
    payload = {};
  }

  const message = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || undefined;

  const numbers = await getActiveNumbers();
  const chosen = pickNumber(numbers);

  if (!chosen) {
    return NextResponse.json(
      { error: "No hay números de WhatsApp configurados." },
      { status: 503 }
    );
  }

  const url = buildWhatsappUrl(chosen.phone, message);
  const userAgent = req.headers.get("user-agent") ?? undefined;
  const clientIp = getClientIp(req);

  const admin = getSupabaseAdmin();
  if (admin) {
    try {
      await admin.from("clicks").insert({
        number_id: chosen.id ?? null,
        phone: chosen.phone,
        user_agent: userAgent,
        referrer: req.headers.get("referer"),
        ip: clientIp,
        source_url: payload.sourceUrl,
      });
    } catch {}
  }

  void sendCapiEvent({
    eventName: "Lead",
    eventId: payload.eventId,
    eventSourceUrl: payload.sourceUrl,
    clientIp,
    userAgent,
    fbp: payload.fbp,
    fbc: payload.fbc,
    customData: { content_name: "Empezar a Jugar", phone: chosen.phone },
  });

  return NextResponse.json({ url, phone: chosen.phone });
}
