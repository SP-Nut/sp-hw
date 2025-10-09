import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

interface LineLoginConfig {
  channelId: string;
  channelSecret: string;
  redirectUri: string;
}

// GET - เริ่มต้น LINE Login Process
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    // กรณีที่ต้องการ redirect ไป LINE Login
    if (action === 'login') {
      const config: LineLoginConfig = {
        channelId: process.env.LINE_LOGIN_CHANNEL_ID || '',
        channelSecret: process.env.LINE_LOGIN_CHANNEL_SECRET || '',
        redirectUri: process.env.LINE_LOGIN_REDIRECT_URI || `${process.env.NEXTAUTH_URL}/api/line/auth?action=callback`
      };

      if (!config.channelId) {
        return NextResponse.json(
          { error: 'LINE_LOGIN_CHANNEL_ID ไม่ได้ตั้งค่า' },
          { status: 500 }
        );
      }

      // สร้าง state สำหรับป้องกัน CSRF
      const state = crypto.randomBytes(16).toString('hex');
      const nonce = crypto.randomBytes(16).toString('hex');

      // เก็บ state ใน session หรือ database (สำหรับ demo ใช้ memory)
      // ในการใช้งานจริงควรใช้ Redis หรือ Database
      
      const lineAuthUrl = new URL('https://access.line.me/oauth2/v2.1/authorize');
      lineAuthUrl.searchParams.set('response_type', 'code');
      lineAuthUrl.searchParams.set('client_id', config.channelId);
      lineAuthUrl.searchParams.set('redirect_uri', config.redirectUri);
      lineAuthUrl.searchParams.set('state', state);
      lineAuthUrl.searchParams.set('scope', 'profile openid');
      lineAuthUrl.searchParams.set('nonce', nonce);

      return NextResponse.redirect(lineAuthUrl.toString());
    }

    // กรณีที่เป็น callback จาก LINE
    if (action === 'callback') {
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      
      // ตรวจสอบ state เพื่อป้องกัน CSRF (ในการใช้งานจริง)

      if (error) {
        return NextResponse.json(
          { error: `LINE Login Error: ${error}` },
          { status: 400 }
        );
      }

      if (!code) {
        return NextResponse.json(
          { error: 'ไม่พบ authorization code' },
          { status: 400 }
        );
      }

      // Exchange code สำหรับ access token
      const tokenResponse = await exchangeCodeForToken(code);
      
      if (!tokenResponse.success) {
        return NextResponse.json(
          { error: tokenResponse.error },
          { status: 400 }
        );
      }

      // ดึงข้อมูล Profile ของผู้ใช้
      const profileResponse = await getUserProfile(tokenResponse.accessToken);
      
      if (!profileResponse.success) {
        return NextResponse.json(
          { error: profileResponse.error },
          { status: 400 }
        );
      }

      // ส่งผลลัพธ์กลับ (อาจจะ redirect ไปหน้าสำเร็จ หรือส่ง JSON)
      const successUrl = new URL('/cart', process.env.NEXTAUTH_URL || 'http://localhost:3000');
      successUrl.searchParams.set('lineLogin', 'success');
      if (profileResponse.profile) {
        successUrl.searchParams.set('userId', profileResponse.profile.userId);
        successUrl.searchParams.set('displayName', profileResponse.profile.displayName);
      }

      return NextResponse.redirect(successUrl.toString());
    }

    // Default response
    return NextResponse.json({
      message: 'LINE Authentication API',
      endpoints: {
        'GET /api/line/auth?action=login': 'เริ่มต้น LINE Login',
        'GET /api/line/auth?action=callback': 'Callback จาก LINE Login',
        'POST /api/line/auth': 'ตรวจสอบสถานะการล็อกอิน'
      }
    });

  } catch (error) {
    console.error('LINE Auth Error:', error);
    return NextResponse.json(
      {
        error: 'เกิดข้อผิดพลาดในระบบยืนยันตัวตน',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    );
  }
}

// POST - ตรวจสอบสถานะหรือรับข้อมูลจาก Frontend
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, lineUserId, accessToken } = body;

    if (action === 'verify-user') {
      if (!lineUserId) {
        return NextResponse.json(
          { error: 'ไม่พบ LINE User ID' },
          { status: 400 }
        );
      }

      // ตรวจสอบว่า User ID นี้มีอยู่ในระบบหรือไม่
      // (ในการใช้งานจริงจะเช็คจาก Database)
      return NextResponse.json({
        success: true,
        message: 'ยืนยันตัวตนสำเร็จ',
        user: {
          lineUserId,
          isVerified: true
        }
      });
    }

    if (action === 'get-profile' && accessToken) {
      const profileResponse = await getUserProfile(accessToken);
      
      if (!profileResponse.success) {
        return NextResponse.json(
          { error: profileResponse.error },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        profile: profileResponse.profile
      });
    }

    return NextResponse.json(
      { error: 'Action ไม่ถูกต้อง' },
      { status: 400 }
    );

  } catch (error) {
    console.error('LINE Auth POST Error:', error);
    return NextResponse.json(
      {
        error: 'เกิดข้อผิดพลาดในการประมวลผล',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    );
  }
}

// Helper Functions

async function exchangeCodeForToken(code: string) {
  try {
    const config: LineLoginConfig = {
      channelId: process.env.LINE_LOGIN_CHANNEL_ID || '',
      channelSecret: process.env.LINE_LOGIN_CHANNEL_SECRET || '',
      redirectUri: process.env.LINE_LOGIN_REDIRECT_URI || `${process.env.NEXTAUTH_URL}/api/line/auth?action=callback`
    };

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', config.redirectUri);
    params.append('client_id', config.channelId);
    params.append('client_secret', config.channelSecret);

    const response = await fetch('https://api.line.me/oauth2/v2.1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error_description || 'ไม่สามารถแลกเปลี่ยน token ได้'
      };
    }

    return {
      success: true,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
      idToken: data.id_token
    };

  } catch (error) {
    console.error('Token exchange error:', error);
    return {
      success: false,
      error: 'เกิดข้อผิดพลาดในการแลกเปลี่ยน token'
    };
  }
}

async function getUserProfile(accessToken: string) {
  try {
    const response = await fetch('https://api.line.me/v2/profile', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: 'ไม่สามารถดึงข้อมูลผู้ใช้ได้'
      };
    }

    return {
      success: true,
      profile: {
        userId: data.userId,
        displayName: data.displayName,
        pictureUrl: data.pictureUrl,
        statusMessage: data.statusMessage
      }
    };

  } catch (error) {
    console.error('Get profile error:', error);
    return {
      success: false,
      error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้'
    };
  }
}