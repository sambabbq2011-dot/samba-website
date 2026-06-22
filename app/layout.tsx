import type { Metadata } from "next";
import { Noto_Sans_TC, Oswald } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
    default: "Samba 窯烤｜全台行動巴西窯烤外燴",
    template: "%s｜Samba 窯烤"
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["巴西窯烤", "外燴", "行動外燴", "企業活動", "婚禮外燴"],
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
      </body>
    </html>
  );
}
