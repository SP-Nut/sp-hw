import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 4. Rate Limiting - ปรับให้เหมาะกับแต่ละ route
const RATE_LIMITS = {
  general: { maxRequests: 60, windowMs: 60000 },      // 60 req/min (browse หน้าเว็บ)
  api: { maxRequests: 20, windowMs: 60000 },          // 20 req/min (API ทั่วไป)
  apiAdmin: { maxRequests: 10, windowMs: 60000 },     // 10 req/min (Admin API - เข้มงวด)
} as const;

// In-memory rate limit store (โปรดักชันควรใช้ Redis/Upstash)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

// ฟังก์ชัน Rate Limiting
function checkRateLimit(ip: string, pathname: string): { allowed: boolean; remaining: number; limit: number } {
  // เลือก limit ตาม route type
  let limit;
  if (pathname.startsWith('/api/admin/')) {
    limit = RATE_LIMITS.apiAdmin;
  } else if (pathname.startsWith('/api/')) {
    limit = RATE_LIMITS.api;
  } else {
    limit = RATE_LIMITS.general;
  }

  const key = `${ip}:${pathname}`;
  const now = Date.now();
  const record = rateLimitMap.get(key);

  // ถ้าไม่มีประวัติหรือหมดเวลา window ให้รีเซ็ต
  if (!record || now - record.timestamp > limit.windowMs) {
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return { allowed: true, remaining: limit.maxRequests - 1, limit: limit.maxRequests };
  }

  // เช็คว่าเกินลิมิตหรือไม่
  if (record.count >= limit.maxRequests) {
    return { allowed: false, remaining: 0, limit: limit.maxRequests };
  }

  // เพิ่มจำนวน request
  record.count++;
  return { allowed: true, remaining: limit.maxRequests - record.count, limit: limit.maxRequests };
}

// ทำความสะอาด expired entries ทุก 5 นาที
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now - record.timestamp > 5 * 60 * 1000) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // ดึง IP address
  const ip = (request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1').split(',')[0].trim();

  // 4. Rate Limiting
  const { allowed, remaining, limit } = checkRateLimit(ip, pathname);
  
  if (!allowed) {
    return new NextResponse(
      JSON.stringify({ 
        error: 'Too Many Requests', 
        message: 'กรุณารอสักครู่แล้วลองใหม่อีกครั้ง' 
      }),
      { 
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  // Admin Authentication Middleware
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const sessionToken = request.cookies.get('admin-session')
    
    if (!sessionToken || !sessionToken.value) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      // ตรวจสอบ session token
      const decoded = Buffer.from(sessionToken.value, 'base64').toString()
      const [username, timestamp] = decoded.split(':')
      
      if (!username || !timestamp) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }

      // ตรวจสอบว่า session ยังไม่หมดอายุ (24 ชั่วโมง)
      const sessionTime = parseInt(timestamp)
      const currentTime = Date.now()
      const twentyFourHours = 24 * 60 * 60 * 1000

      if (currentTime - sessionTime > twentyFourHours) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }

      // Session ถูกต้อง ให้ผ่าน
      const adminResponse = NextResponse.next();
      adminResponse.headers.set('X-RateLimit-Limit', limit.toString());
      adminResponse.headers.set('X-RateLimit-Remaining', remaining.toString());
      return adminResponse;
    } catch {
      // ถ้า decode session ไม่ได้ redirect ไป login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  
  // ส่ง response พร้อม rate limit headers
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', limit.toString());
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}