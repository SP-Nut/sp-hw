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
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/logo.png',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
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
