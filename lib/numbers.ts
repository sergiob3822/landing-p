import { getSupabaseAdmin, getSupabasePublic } from "./supabase";

export type WhatsappNumber = {
  id?: string | number;
  phone: string;
  label?: string | null;
  weight?: number | null;
};

export function sanitizePhone(raw: string): string {
  return (raw || "").replace(/[^\d]/g, "");
}

export function getNumbersFromEnv(): WhatsappNumber[] {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBERS || "";
  return raw
    .split(",")
    .map((n) => sanitizePhone(n))
    .filter((n) => n.length >= 8)
    .map((phone) => ({ phone }));
}

export async function getActiveNumbers(): Promise<WhatsappNumber[]> {
  const supabase = getSupabaseAdmin() ?? getSupabasePublic();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("whatsapp_numbers")
        .select("id, phone, label, weight")
        .eq("active", true)
        .order("created_at", { ascending: true });
      if (!error && data && data.length > 0) {
        return data
          .map((d) => ({
            id: d.id,
            phone: sanitizePhone(d.phone),
            label: d.label,
            weight: d.weight,
          }))
          .filter((d) => d.phone.length >= 8);
      }
    } catch {
      return getNumbersFromEnv();
    }
  }
  return getNumbersFromEnv();
}

export function pickNumber(numbers: WhatsappNumber[]): WhatsappNumber | null {
  if (!numbers || numbers.length === 0) return null;
  const weighted = numbers.map((n) => ({
    n,
    w: typeof n.weight === "number" && n.weight! > 0 ? n.weight! : 1,
  }));
  const total = weighted.reduce((acc, x) => acc + x.w, 0);
  let r = Math.random() * total;
  for (const x of weighted) {
    r -= x.w;
    if (r <= 0) return x.n;
  }
  return weighted[weighted.length - 1].n;
}

export function buildWhatsappUrl(phone: string, message?: string): string {
  const clean = sanitizePhone(phone);
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${clean}${text}`;
}
