import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "./components/ConditionalLayout";
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
    icon: [
      { url: '/icon/iconweb.png', type: 'image/png' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/icon/iconweb.png',
    apple: '/icon/iconweb.png',
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
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
