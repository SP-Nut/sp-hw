import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./contexts/CartContext";
import { Analytics } from "@vercel/analytics/react";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "SP Hardware - ศูนย์รวมฮาร์ดแวร์และวัสดุก่อสร้างครบวงจร",
  description: "SP Hardware ร้านขายฮาร์ดแวร์และวัสดุก่อสร้างออนไลน์ คุณภาพสูง ราคาดี กันสาด หลังคา เมทัลชีท อุปกรณ์ไฟฟ้า ส่งฟรีทั่วประเทศ",
  keywords: "SP Hardware, ฮาร์ดแวร์, วัสดุก่อสร้าง, กันสาด, หลังคา, เมทัลชีท, ท่อ PVC, สีทาอาคาร, อุปกรณ์ไฟฟ้า",
  metadataBase: new URL('http://localhost:3000'),
  icons: [
    { rel: 'icon', url: '/favicon.ico', sizes: 'any' },
    { rel: 'icon', url: '/icon.png', type: 'image/png', sizes: '32x32' },
    { rel: 'apple-touch-icon', url: '/apple-icon.png', sizes: '180x180' },
  ],
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#1e2e4f',
    'theme-color': '#1e2e4f',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${prompt.variable} font-prompt antialiased`}>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
