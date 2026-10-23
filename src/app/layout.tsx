import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/data/site";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const bricolage = localFont({
  src: "./fonts/bricolage-grotesque-latin.woff2",
  variable: "--font-bricolage",
  display: "swap",
});

const jakarta = localFont({
  src: "./fonts/plus-jakarta-sans-latin.woff2",
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "toko buah samarinda",
    "toko sembako samarinda",
    "frozen food samarinda",
    "sayur segar samarinda",
    "belanja buah samarinda",
    "toko kelontong samarinda",
    "kebutuhan dapur samarinda",
    "samarinda seberang",
    "samarinda ilir",
    "buah impor samarinda",
    "bumbu dapur samarinda",
    "daging frozen samarinda",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${bricolage.variable} ${jakarta.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Lewati ke konten utama
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
