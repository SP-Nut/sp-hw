# 🛒 SP Hardware - LINE Integration Setup

ระบบส่งข้อมูลตะกร้าสินค้าจากเว็บไปยัง LINE แชทส่วนตัวกับลูกค้า พร้อมระบบ LINE Login

## 📋 คุณสมบัติ

- ✅ ส่งออเดอร์ไปยัง LINE Official Account อัตโนมัติ
- ✅ แจ้งเตือนแอดมินผ่าน LINE เมื่อมีออเดอร์ใหม่
- ✅ ระบบ LINE Login สำหรับลูกค้า
- ✅ ส่งข้อความโดยตรงไปยังลูกค้าที่ล็อกอินด้วย LINE
- ✅ Fallback system เมื่อ API ไม่ทำงาน

## 🚀 การติดตั้ง

### 1. ติดตั้ง Dependencies
```bash
npm install @line/bot-sdk
```

### 2. ตั้งค่า Environment Variables
คัดลอก `.env.local.example` เป็น `.env.local` และกรอกข้อมูล:

```env
# LINE Bot API (Messaging API)
LINE_CHANNEL_ACCESS_TOKEN=your-channel-access-token
LINE_CHANNEL_SECRET=your-channel-secret
LINE_ADMIN_USER_ID=your-admin-user-id

# LINE Login API  
LINE_LOGIN_CHANNEL_ID=your-login-channel-id
LINE_LOGIN_CHANNEL_SECRET=your-login-channel-secret
LINE_LOGIN_REDIRECT_URI=http://localhost:3000/api/line/auth?action=callback

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

## 🔧 การตั้งค่า LINE Developers Console

### 1. สร้าง LINE Official Account (Messaging API)

1. ไปที่ [LINE Developers Console](https://developers.line.biz/)
2. สร้าง Provider และ Channel (Messaging API)
3. ในหน้า Channel Settings:
   - คัดลอก **Channel Access Token** → `LINE_CHANNEL_ACCESS_TOKEN`
   - คัดลอก **Channel Secret** → `LINE_CHANNEL_SECRET`
4. ตั้งค่า Webhook URL: `https://yourdomain.com/api/webhook/line`

### 2. สร้าง LINE Login Channel

1. ในหน้า Provider เดียวกัน สร้าง Channel ใหม่ (LINE Login)
2. ในหน้า Channel Settings:
   - คัดลอก **Channel ID** → `LINE_LOGIN_CHANNEL_ID`
   - คัดลอก **Channel Secret** → `LINE_LOGIN_CHANNEL_SECRET`
3. เพิ่ม Callback URL: `http://localhost:3000/api/line/auth?action=callback`

### 3. หา Admin User ID

วิธี 1: ใช้ Bot
1. เพิ่ม Official Account เป็นเพื่อน
2. ส่งข้อความใดๆ ไปยัง Bot
3. ดู log หรือใช้ webhook เพื่อดู User ID

วิธี 2: ใช้ LINE Developers Console
1. ไปที่ Messaging API > Bot info
2. คัดลอก **User ID** → `LINE_ADMIN_USER_ID`

## 📁 ไฟล์ที่สร้างใหม่

```
app/
├── api/
│   └── line/
│       ├── send-cart/
│       │   └── route.ts          # API ส่งออเดอร์ไป LINE
│       └── auth/
│           └── route.ts          # API LINE Login
├── cart/
│   └── page.tsx                  # อัพเดทหน้า Cart
lib/
└── line.ts                       # LINE SDK และ helper functions
.env.local                        # Environment variables
.env.local.example                # ตัวอย่าง env file
```

## 🔄 วิธีการทำงาน

### 1. ลูกค้าไม่ได้ล็อกอิน LINE
1. ลูกค้ากดปุ่ม "สั่งซื้อผ่าน LINE OA"
2. ระบบส่งแจ้งเตือนไปยังแอดมิน
3. เปิด LINE OA เพื่อให้ลูกค้าทักไป

### 2. ลูกค้าล็อกอิน LINE แล้ว
1. ลูกค้ากดปุ่ม "เชื่อมต่อ LINE เพื่อรับแจ้งเตือน"
2. ระบบพาไป LINE Login
3. หลังล็อกอินสำเร็จ กดปุ่ม "ส่งออเดอร์ผ่าน LINE"
4. ระบบส่งข้อความไปทั้งแอดมินและลูกค้า

## 🎯 API Endpoints

### POST /api/line/send-cart
ส่งข้อมูลตะกร้าไป LINE

**Request Body:**
```json
{
  "items": [...],
  "subtotal": 1000,
  "total": 1150,
  "customerInfo": {
    "name": "ชื่อลูกค้า",
    "lineUserId": "U1234567890"
  },
  "sendToAdmin": true,
  "sendToCustomer": true
}
```

### GET /api/line/auth?action=login
เริ่มต้น LINE Login process

### GET /api/line/auth?action=callback
Callback จาก LINE Login

## 🐛 การแก้ไขปัญหา

### 1. ไม่สามารถส่งข้อความได้
- ตรวจสอบ `LINE_CHANNEL_ACCESS_TOKEN` และ `LINE_CHANNEL_SECRET`
- ตรวจสอบว่า Bot เป็นเพื่อนกับผู้ใช้แล้ว

### 2. LINE Login ไม่ทำงาน
- ตรวจสอบ `LINE_LOGIN_CHANNEL_ID` และ `LINE_LOGIN_CHANNEL_SECRET`
- ตรวจสอบ Callback URL ใน LINE Developers Console

### 3. ไม่ได้รับแจ้งเตือน
- ตรวจสอบ `LINE_ADMIN_USER_ID`
- ตรวจสอบว่าแอดมินเป็นเพื่อนกับ Bot แล้ว

## 🔒 ความปลอดภัย

- ใช้ HTTPS สำหรับ production
- เก็บ secret keys ใน environment variables
- ตรวจสอบ state parameter ในการ login (ป้องกัน CSRF)

## 📞 การติดต่อ

หากมีปัญหาหรือต้องการความช่วยเหลือ กรุณาติดต่อทีมพัฒนา

---
*สร้างโดย SP Hardware Development Team* 🛠️