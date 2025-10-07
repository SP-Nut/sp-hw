import { NextRequest, NextResponse } from 'next/server';
import { sendOrderToLine, notifyAdminNewOrder } from '../../../../lib/line';

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  originalPrice?: number;
}

interface SendCartRequest {
  items: CartItem[];
  subtotal: number;
  savings: number;
  shipping: number;
  total: number;
  customerInfo?: {
    name?: string;
    phone?: string;
    email?: string;
    lineUserId?: string;
  };
  sendToAdmin?: boolean;
  sendToCustomer?: boolean;
  sendToGroup?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: SendCartRequest = await request.json();
    
    // Validate required fields
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'รายการสินค้าไม่ถูกต้อง' 
        },
        { status: 400 }
      );
    }

    if (typeof body.total !== 'number' || body.total <= 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ยอดรวมไม่ถูกต้อง' 
        },
        { status: 400 }
      );
    }

    // สร้างข้อมูลออเดอร์
    const orderData = {
      items: body.items,
      subtotal: body.subtotal || 0,
      savings: body.savings || 0,
      shipping: body.shipping || 0,
      total: body.total,
      customerInfo: body.customerInfo
    };

    const results = {
      adminNotified: false,
      customerNotified: false,
      errors: [] as string[]
    };

    // ส่งไปยังแอดมิน (ค่าเริ่มต้นเป็น true)
    if (body.sendToAdmin !== false) {
      try {
        const adminSuccess = await notifyAdminNewOrder(orderData);
        results.adminNotified = adminSuccess;
        
        if (!adminSuccess) {
          results.errors.push('ไม่สามารถแจ้งเตือนแอดมินได้');
        }
      } catch (error) {
        console.error('Error notifying admin:', error);
        results.errors.push('เกิดข้อผิดพลาดในการแจ้งเตือนแอดมิน');
      }
    }

    // ส่งไปยังลูกค้า (ถ้ามี LINE User ID)
    if (body.sendToCustomer && body.customerInfo?.lineUserId) {
      try {
        const customerSuccess = await sendOrderToLine(orderData, body.customerInfo.lineUserId);
        results.customerNotified = customerSuccess;
        
        if (!customerSuccess) {
          results.errors.push('ไม่สามารถส่งข้อความถึงลูกค้าได้');
        }
      } catch (error) {
        console.error('Error sending to customer:', error);
        results.errors.push('เกิดข้อผิดพลาดในการส่งข้อความถึงลูกค้า');
      }
    }

    // ส่งไปยังกลุ่ม/OA (เมื่อไม่มี User ID หรือต้องการส่งไปกลุ่ม)
    if (body.sendToGroup || (body.sendToCustomer && !body.customerInfo?.lineUserId)) {
      try {
        const groupSuccess = await sendOrderToLine(orderData);
        if (groupSuccess) {
          results.customerNotified = true;
        } else {
          results.errors.push('ไม่สามารถส่งข้อความไปกลุ่ม/OA ได้');
        }
      } catch (error) {
        console.error('Error sending to group:', error);
        results.errors.push('เกิดข้อผิดพลาดในการส่งข้อความไปกลุ่ม/OA');
      }
    }

    // ตรวจสอบผลลัพธ์
    const hasSuccess = results.adminNotified || results.customerNotified;
    const statusCode = hasSuccess ? 200 : 500;

    return NextResponse.json(
      {
        success: hasSuccess,
        message: hasSuccess 
          ? 'ส่งข้อมูลออเดอร์เรียบร้อยแล้ว' 
          : 'ไม่สามารถส่งข้อมูลออเดอร์ได้',
        results,
        orderData: {
          orderId: `SP${Date.now()}`, // สร้าง Order ID แบบง่ายๆ
          items: orderData.items.length,
          total: orderData.total
        }
      },
      { status: statusCode }
    );

  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    );
  }
}

// เพิ่ม GET method สำหรับทดสอบ API
export async function GET() {
  return NextResponse.json({
    message: 'LINE Send Cart API is working',
    endpoints: {
      POST: '/api/line/send-cart - ส่งข้อมูลตะกร้าไป LINE',
    },
    requiredEnvVars: [
      'LINE_CHANNEL_ACCESS_TOKEN',
      'LINE_CHANNEL_SECRET',
      'LINE_ADMIN_USER_ID (optional)',
      'LINE_GROUP_ID (optional)',
      'LINE_ROOM_ID (optional)'
    ]
  });
}