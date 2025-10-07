import { Client } from '@line/bot-sdk';

interface LineConfig {
  channelAccessToken: string;
  channelSecret: string;
}

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  originalPrice?: number;
}

interface OrderData {
  items: CartItem[];
  subtotal: number;
  savings: number;
  shipping: number;
  total: number;
  customerInfo?: {
    name?: string;
    phone?: string;
    email?: string;
  };
}

// สร้าง LINE Bot Client
export const createLineClient = (): Client => {
  const config: LineConfig = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
    channelSecret: process.env.LINE_CHANNEL_SECRET || '',
  };

  if (!config.channelAccessToken || !config.channelSecret) {
    throw new Error('LINE_CHANNEL_ACCESS_TOKEN และ LINE_CHANNEL_SECRET จำเป็นต้องตั้งค่าใน environment variables');
  }

  return new Client(config);
};

// สร้างข้อความสรุปออเดอร์สำหรับส่งใน LINE
export const generateOrderMessage = (orderData: OrderData): string => {
  const currentDate = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  let message = `🛒 ออเดอร์ใหม่ - SP Hardware\n`;
  message += `📅 ${currentDate}\n\n`;
  
  message += `📋 รายการสินค้า:\n`;
  message += `${'='.repeat(30)}\n`;
  
  orderData.items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
    message += `   🏭 ${item.brand}\n`;
    message += `   💰 ${item.price.toLocaleString()} บาท x ${item.quantity} ชิ้น\n`;
    message += `   💵 รวม: ${(item.price * item.quantity).toLocaleString()} บาท\n\n`;
  });
  
  message += `${'='.repeat(30)}\n`;
  message += `💰 ราคาสินค้า: ${orderData.subtotal.toLocaleString()} บาท\n`;
  
  if (orderData.savings > 0) {
    message += `🎉 ส่วนลดจากสินค้า: -${orderData.savings.toLocaleString()} บาท\n`;
  }
  
  message += `🚚 ค่าจัดส่ง: ${orderData.shipping === 0 ? 'ฟรี' : `${orderData.shipping.toLocaleString()} บาท`}\n`;
  message += `${'='.repeat(30)}\n`;
  message += `💎 รวมทั้งสิ้น: ${orderData.total.toLocaleString()} บาท\n\n`;
  
  if (orderData.customerInfo) {
    message += `👤 ข้อมูลลูกค้า:\n`;
    if (orderData.customerInfo.name) message += `📝 ชื่อ: ${orderData.customerInfo.name}\n`;
    if (orderData.customerInfo.phone) message += `📞 โทร: ${orderData.customerInfo.phone}\n`;
    if (orderData.customerInfo.email) message += `📧 อีเมล: ${orderData.customerInfo.email}\n`;
    message += `\n`;
  }
  
  message += `📞 กรุณาติดต่อกลับเพื่อยืนยันออเดอร์\n`;
  message += `🙏 ขอบคุณที่เลือกใช้บริการ SP Hardware`;
  
  return message;
};

// ส่งข้อความไปยัง LINE Official Account (แชทกลุ่มหรือส่วนตัว)
export const sendOrderToLine = async (orderData: OrderData, targetUserId?: string): Promise<boolean> => {
  try {
    const client = createLineClient();
    const message = generateOrderMessage(orderData);

    // ถ้ามี targetUserId ให้ส่งไปหาลูกค้าโดยตรง (Push Message)
    if (targetUserId) {
      await client.pushMessage(targetUserId, {
        type: 'text',
        text: message
      });
      console.log(`✅ ส่งออเดอร์ไปยัง LINE User ID: ${targetUserId} สำเร็จ`);
      return true;
    }

    // ถ้าไม่มี targetUserId ให้ส่งไปที่ Official Account
    // วิธีนี้จะส่งให้ทุกคนที่เพิ่มเป็นเพื่อนแล้ว (Broadcast Message)
    const result = await sendBroadcastMessage(orderData);
    return result;

  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาดในการส่งข้อความไป LINE:', error);
    return false;
  }
};

// ส่งข้อความ Broadcast ไปยังผู้ที่เพิ่ม Official Account เป็นเพื่อนแล้ว
export const sendBroadcastMessage = async (orderData: OrderData): Promise<boolean> => {
  try {
    const client = createLineClient();
    const message = generateOrderMessage(orderData);

    // ลองใช้ Group ID หรือ Room ID ก่อน (ถ้ามี)
    const groupId = process.env.LINE_GROUP_ID;
    const roomId = process.env.LINE_ROOM_ID;

    if (groupId) {
      await client.pushMessage(groupId, {
        type: 'text',
        text: message
      });
      console.log(`✅ ส่งออเดอร์ไปยัง LINE Group: ${groupId} สำเร็จ`);
      return true;
    }

    if (roomId) {
      await client.pushMessage(roomId, {
        type: 'text',
        text: message
      });
      console.log(`✅ ส่งออเดอร์ไปยัง LINE Room: ${roomId} สำเร็จ`);
      return true;
    }

    // ถ้าไม่มี Group/Room ID ให้ส่ง Broadcast (ส่งให้ทุกคนที่เป็นเพื่อน)
    // หมายเหตุ: Broadcast Message มีข้อจำกัดในการใช้งาน
    console.log('⚠️ ไม่พบ Group ID หรือ Room ID - จะใช้วิธี Broadcast');
    
    await client.broadcast({
      type: 'text',
      text: `📢 ออเดอร์ใหม่จาก SP Hardware!\n\n${message}\n\n💬 ตอบกลับข้อความนี้เพื่อสอบถามรายละเอียดเพิ่มเติม`
    });

    console.log('✅ ส่ง Broadcast Message สำเร็จ');
    return true;

  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาดในการส่ง Broadcast:', error);
    
    // ถ้า Broadcast ไม่ได้ให้แสดงข้อผิดพลาดที่ช่วยได้
    if ((error as Error).message?.includes('Invalid reply token')) {
      console.log('💡 แนะนำ: ตั้งค่า LINE_GROUP_ID หรือ LINE_ROOM_ID ในไฟล์ .env.local');
    }
    
    return false;
  }
};

// ส่งข้อความแจ้งเตือนไปยังแอดมิน (เพื่อให้รู้ว่ามีออเดอร์ใหม่)
export const notifyAdminNewOrder = async (orderData: OrderData): Promise<boolean> => {
  try {
    const adminUserId = process.env.LINE_ADMIN_USER_ID;
    if (!adminUserId) {
      console.warn('⚠️ ไม่พบ LINE_ADMIN_USER_ID จึงไม่สามารถแจ้งเตือนแอดมินได้');
      return false;
    }

    const client = createLineClient();
    const message = `🔔 มีออเดอร์ใหม่!\n\n${generateOrderMessage(orderData)}\n\n👆 กรุณาติดต่อลูกค้ากลับเพื่อยืนยันออเดอร์`;

    await client.pushMessage(adminUserId, {
      type: 'text',
      text: message
    });

    console.log(`✅ แจ้งเตือนแอดมิน LINE User ID: ${adminUserId} สำเร็จ`);
    return true;

  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาดในการแจ้งเตือนแอดมิน:', error);
    return false;
  }
};

// สร้าง Rich Menu หรือ Quick Reply สำหรับลูกค้า
export const createOrderQuickReply = () => {
  return {
    items: [
      {
        type: 'action' as const,
        action: {
          type: 'message' as const,
          label: '✅ ยืนยันออเดอร์',
          text: 'ยืนยันออเดอร์'
        }
      },
      {
        type: 'action' as const,
        action: {
          type: 'message' as const,
          label: '❓ สอบถามเพิ่มเติม',
          text: 'ต้องการสอบถามเพิ่มเติม'
        }
      },
      {
        type: 'action' as const,
        action: {
          type: 'message' as const,
          label: '❌ ยกเลิกออเดอร์',
          text: 'ขอยกเลิกออเดอร์'
        }
      }
    ]
  };
};

// ตรวจสอบสถานะ LINE Bot
export const checkLineConnection = async (): Promise<boolean> => {
  try {
    const client = createLineClient();
    // ลองดึงข้อมูล Bot Profile เพื่อตรวจสอบการเชื่อมต่อ
    await client.getBotInfo();
    console.log('✅ การเชื่อมต่อ LINE Bot สำเร็จ');
    return true;
  } catch (error) {
    console.error('❌ ไม่สามารถเชื่อมต่อ LINE Bot ได้:', error);
    return false;
  }
};