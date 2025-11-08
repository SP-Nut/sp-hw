import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. ปิดการบอกตัวตน
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dprnuymsapgtejuncqge.supabase.co',
        port: '',
        pathname: '/storage/**',
      },
    ],
    unoptimized: false,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },

  // 1. บังคับโดเมนหลัก (non-www)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.sphardwares.com" }],
        destination: "https://sphardwares.com/:path*",
        permanent: true,
      },
    ];
  },

  // 2 & 3. Security Headers + CSP
  async headers() {
    const ONE_YEAR = "31536000";
    
    // Content Security Policy - ปรับให้เหมาะกับ SP Hardware
    const csp = [
      // Default: อนุญาต self + Supabase
      "default-src 'self' https://dprnuymsapgtejuncqge.supabase.co",
      
      // Script: Next.js + inline scripts (ต้องการ unsafe-inline สำหรับ Next.js)
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      
      // Style: Tailwind ต้องการ unsafe-inline
      "style-src 'self' 'unsafe-inline'",
      
      // Images: self + Supabase + external CDN + data URIs
      "img-src 'self' data: blob: https://dprnuymsapgtejuncqge.supabase.co https://picsum.photos https:",
      
      // Fonts: self + data URIs
      "font-src 'self' data:",
      
      // Connect: API calls + Supabase + LINE
      "connect-src 'self' https://dprnuymsapgtejuncqge.supabase.co https://api.line.me wss://dprnuymsapgtejuncqge.supabase.co",
      
      // Frame: ห้าม embed (ป้องกัน clickjacking)
      "frame-ancestors 'none'",
      
      // Base URI: เฉพาะ self
      "base-uri 'self'",
      
      // Form: submit ได้แค่ self (รวม LINE redirect)
      "form-action 'self' https://access.line.me",
      
      // Object/Embed: ไม่อนุญาต
      "object-src 'none'",
      
      // Media: self + Supabase
      "media-src 'self' https://dprnuymsapgtejuncqge.supabase.co",
      
      // Worker: self + blob
      "worker-src 'self' blob:",
      
      // Manifest: self
      "manifest-src 'self'",
      
      // Frame-src: อนุญาต Google Maps
      "frame-src 'self' https://www.google.com",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          // 2. HSTS - บังคับ HTTPS
          {
            key: "Strict-Transport-Security",
            value: `max-age=${ONE_YEAR}; includeSubDomains; preload`,
          },
          
          // 3. Content Security Policy
          {
            key: "Content-Security-Policy",
            value: csp,
          },
          
          // 2. กัน MIME sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          
          // 2. กัน Clickjacking
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN", // SAMEORIGIN เพราะมี Google Maps iframe
          },
          
          // 2. ควบคุม Referrer
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          
          // 2. Permissions Policy - ปิดอุปกรณ์ที่ไม่ต้องการ
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          
          // 2. CORS Policies - ผ่อนปรนเพื่อ Supabase
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
