import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('admin-session')

    if (!sessionToken || !sessionToken.value) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    // ตรวจสอบ session token (ในการใช้งานจริงควรตรวจสอบ JWT)
    try {
      const decoded = Buffer.from(sessionToken.value, 'base64').toString()
      const [username, timestamp] = decoded.split(':')
      
      // ตรวจสอบว่า session ยังไม่หมดอายุ (24 ชั่วโมง)
      const sessionAge = Date.now() - parseInt(timestamp)
      const maxAge = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
      
      if (sessionAge > maxAge) {
        return NextResponse.json(
          { authenticated: false, error: 'Session expired' },
          { status: 401 }
        )
      }

      return NextResponse.json(
        { authenticated: true, username },
        { status: 200 }
      )
    } catch {
      return NextResponse.json(
        { authenticated: false, error: 'Invalid session' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Auth check API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}