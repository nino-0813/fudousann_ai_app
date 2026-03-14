import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fukuyama-ai-estate.vercel.app"),
  title: {
    default: "福山AI査定 | 30秒でAI不動産査定",
    template: "%s | 福山AI査定",
  },
  description:
    "広島県福山市に特化したAI不動産査定サービス。推定価格、価格レンジ、周辺相場比較、売却相談までワンストップで提供。",
  openGraph: {
    title: "福山AI査定",
    description:
      "広島県福山市に特化したAI不動産査定サービス。30秒で査定、無料相談までスムーズに接続。",
    url: "https://fukuyama-ai-estate.vercel.app",
    siteName: "福山AI査定",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} bg-mist font-sans text-slate-950 antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
