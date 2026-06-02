import type { Metadata, Viewport } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";

const display = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "GANAMOS/BET";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Jugá y ganá ahora`,
  description:
    "Bonos de bienvenida, ruleta, tragamonedas y premios al instante. Empezá a jugar por WhatsApp en segundos.",
  openGraph: {
    title: `${SITE_NAME} — Jugá y ganá ahora`,
    description: "Bonos de bienvenida y premios al instante. Empezá a jugar por WhatsApp.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0612",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
