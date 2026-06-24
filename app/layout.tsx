import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Sans_TC, Oswald } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { assetPath } from "@/lib/paths";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const notoSans = Noto_Sans_TC({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Samba 窯烤外燴｜行動巴西窯烤外燴",
    template: "Samba 窯烤外燴｜%s"
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["巴西窯烤", "外燴", "行動外燴", "企業活動", "婚禮外燴"],
  icons: {
    icon: [
      {
        url: assetPath("/samba-fire-favicon.png"),
        type: "image/png",
        sizes: "512x512"
      },
      {
        url: assetPath("/samba-fire-favicon-32.png"),
        type: "image/png",
        sizes: "32x32"
      }
    ],
    apple: [
      {
        url: assetPath("/samba-fire-apple-icon.png"),
        sizes: "180x180",
        type: "image/png"
      }
    ]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant" className={`${notoSans.variable} ${oswald.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Link href="/booking#form" className="mobile-fixed-cta">
          馬上
          <span>詢問</span>
        </Link>
      </body>
    </html>
  );
}
