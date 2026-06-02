import crypto from "crypto";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;
const GRAPH_VERSION = "v21.0";

export const isCapiEnabled = Boolean(PIXEL_ID && ACCESS_TOKEN);

function sha256(value?: string | null): string | undefined {
  if (!value) return undefined;
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

type CapiParams = {
  eventName: string;
  eventId?: string;
  eventSourceUrl?: string;
  clientIp?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
  customData?: Record<string, unknown>;
};

export async function sendCapiEvent(params: CapiParams): Promise<{ ok: boolean; error?: string }> {
  if (!isCapiEnabled) return { ok: false, error: "CAPI no configurado" };

  const userData: Record<string, unknown> = {};
  if (params.clientIp) userData.client_ip_address = params.clientIp;
  if (params.userAgent) userData.client_user_agent = params.userAgent;
  if (params.fbp) userData.fbp = params.fbp;
  if (params.fbc) userData.fbc = params.fbc;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: params.eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_id: params.eventId,
        event_source_url: params.eventSourceUrl,
        user_data: userData,
        custom_data: params.customData ?? {},
      },
    ],
  };
  if (TEST_EVENT_CODE) body.test_event_code = TEST_EVENT_CODE;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) {
      const txt = await res.text();
      return { ok: false, error: txt };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export { sha256 };
