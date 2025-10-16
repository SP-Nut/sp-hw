import { NextResponse } from 'next/server'

// Admin credentials (ในการใช้งานจริงควรเก็บใน environment variables และ hash password)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // ตรวจสอบ credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // สร้าง session token (ในการใช้งานจริงควรใช้ JWT)
      const sessionToken = Buffer.from(`${username}:${Date.now()}`).toString('base64')
      
      // Create response with cookie
      const response = NextResponse.json(
        { success: true, message: 'Login successful' },
        { status: 200 }
      )

      response.cookies.set('admin-session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 hours
      })

      return response
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    // Logout - clear cookie
    const response = NextResponse.json(
      { success: true, message: 'Logout successful' },
      { status: 200 }
    )

    response.cookies.set('admin-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0 // Expire immediately
    })

    return response
  } catch (error) {
    console.error('Logout API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}