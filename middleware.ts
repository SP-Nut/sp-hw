import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // เช็คเฉพาะ path ที่ขึ้นต้นด้วย /admin แต่ไม่ใช่ /admin/login
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    const sessionToken = request.cookies.get('admin-session')
    
    if (!sessionToken || !sessionToken.value) {
      // ถ้าไม่มี session redirect ไป login
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
      return NextResponse.next()
    } catch {
      // ถ้า decode session ไม่ได้ redirect ไป login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // สำหรับ path อื่นๆ ให้ผ่านได้
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}