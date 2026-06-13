import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Game's Bip",
  description: "Interactive multi-game completion tracker — GTA V, Hades II and more / Traqueur de complétion multi-jeux",
  other: {
    "google-adsense-account": "ca-pub-1926350785244687",
  },
  icons: {
    icon: "/image copy.png",
    shortcut: "/image copy.png",
    apple: "/image copy.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WZXFYLF0Z8"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-WZXFYLF0Z8');`,
          }}
        />
        <Script
          id="cloudflare-analytics"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "9320bc664a2f48a49d00ae4c7b55b9b2"}'
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
