# ⚙️ Vercel Environment Variables Setup Guide

## 📝 ขั้นตอนการตั้งค่า Environment Variables บน Vercel

### 1. เข้าสู่ Vercel Dashboard
```
1. ไปที่ https://vercel.com/dashboard
2. เลือกโปรเจค: sp-hw
3. คลิก Settings (เมนูบนสุด)
4. เลือก Environment Variables (เมนูซ้าย)
```

### 2. เพิ่ม Environment Variables

คลิก **"Add New"** แล้วใส่ตัวแปรทีละตัวตามด้านล่าง:

---

## 🔐 ตัวแปรที่ต้องตั้งค่า (Required)

### A. Supabase Configuration

#### 1. NEXT_PUBLIC_SUPABASE_URL
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://dprnuymsapgtejuncqge.supabase.co
Environment: Production, Preview, Development (เลือกทั้ง 3)
```

#### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwcm51eW1zYXBndGVqdW5jcWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NDMyOTIsImV4cCI6MjA3NjAxOTI5Mn0.g8QlzPaeg3mI0q3KxNL4iAhxvp2J9zmrgjiDkfFMFT8
Environment: Production, Preview, Development (เลือกทั้ง 3)
```

#### 3. SUPABASE_SERVICE_ROLE_KEY
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwcm51eW1zYXBndGVqdW5jcWdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQ0MzI5MiwiZXhwIjoyMDc2MDE5MjkyfQ.9dWaVT9RP_4Lems3CpnKbe5U7MHXCaZnz1KSR5oOUtw
Environment: Production, Preview, Development (เลือกทั้ง 3)
```

---

### B. Admin Authentication

#### 4. ADMIN_USERNAME
```
Name: ADMIN_USERNAME
Value: admin
Environment: Production, Preview, Development (เลือกทั้ง 3)
```

⚠️ **แนะนำ:** เปลี่ยนเป็น username ที่ปลอดภัยกว่า

#### 5. ADMIN_PASSWORD
```
Name: ADMIN_PASSWORD
Value: admin123
Environment: Production, Preview, Development (เลือกทั้ง 3)
```

⚠️ **สำคัญมาก:** เปลี่ยนเป็น password ที่แข็งแรงกว่านี้!

**แนะนำ password:**
- อย่างน้อย 12 ตัวอักษร
- ผสม: ตัวพิมพ์ใหญ่, ตัวพิมพ์เล็ก, ตัวเลข, อักขระพิเศษ
- ตัวอย่าง: `SpHw@2024!Secure#Admin`

---

### C. NextAuth Configuration

#### 6. NEXTAUTH_URL
```
Name: NEXTAUTH_URL
Value: https://your-domain.vercel.app
Environment: Production (เลือกเฉพาะ Production)
```

📝 **สำคัญ:** แทนที่ `your-domain.vercel.app` ด้วย URL จริงของคุณ
- ตัวอย่าง: `https://sp-hw.vercel.app`
- หรือ custom domain: `https://sp-hardware.com`

#### 7. NEXTAUTH_SECRET
```
Name: NEXTAUTH_SECRET
Value: <สร้างใหม่ตามด้านล่าง>
Environment: Production, Preview, Development (เลือกทั้ง 3)
```

**วิธีสร้าง Secret:**

**Option 1: ใช้ OpenSSL** (บน Windows PowerShell)
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option 2: ใช้ Website**
```
ไปที่: https://generate-secret.vercel.app/32
คัดลอก secret ที่ได้
```

**Option 3: Manual**
```
ใช้ string สุ่มยาวๆ อย่างน้อย 32 ตัวอักษร
ตัวอย่าง: kJ8F2n9Lp3Qm6Rt5Yw8Zx1Cv4Bn7Mp0Hs2Df5Gk9Ja
```

---

### D. NODE_ENV

#### 8. NODE_ENV
```
Name: NODE_ENV
Value: production
Environment: Production (เลือกเฉพาะ Production)
```

---

## 📱 ตัวแปรสำหรับ LINE Integration (Optional)

### ถ้าต้องการใช้ LINE Bot:

#### 9. LINE_CHANNEL_ACCESS_TOKEN
```
Name: LINE_CHANNEL_ACCESS_TOKEN
Value: <ได้จาก LINE Developers Console - Messaging API>
Environment: Production
```

**วิธีหา:**
1. ไปที่ https://developers.line.biz/console/
2. เลือก Provider > Channel (Messaging API)
3. ไปที่ Tab "Messaging API"
4. เลื่อนลงหา "Channel access token"
5. คลิก "Issue" แล้วคัดลอก token

#### 10. LINE_CHANNEL_SECRET
```
Name: LINE_CHANNEL_SECRET
Value: <ได้จาก LINE Developers Console>
Environment: Production
```

**วิธีหา:**
1. ใน Channel เดียวกัน
2. ไปที่ Tab "Basic settings"
3. เลื่อนลงหา "Channel secret"
4. คลิก "Show" แล้วคัดลอก

#### 11. LINE_ADMIN_USER_ID
```
Name: LINE_ADMIN_USER_ID
Value: <LINE User ID ของแอดมิน>
Environment: Production
```

**วิธีหา User ID:**
1. เพิ่ม Official Account เป็นเพื่อน
2. ส่งข้อความอะไรก็ได้ไปหาบอท
3. ดู Webhook logs หรือใช้ API ดึง User ID

#### 12. LINE_LOGIN_CHANNEL_ID
```
Name: LINE_LOGIN_CHANNEL_ID
Value: <ได้จาก LINE Developers Console - LINE Login>
Environment: Production
```

#### 13. LINE_LOGIN_CHANNEL_SECRET
```
Name: LINE_LOGIN_CHANNEL_SECRET
Value: <ได้จาก LINE Developers Console - LINE Login>
Environment: Production
```

#### 14. LINE_LOGIN_REDIRECT_URI
```
Name: LINE_LOGIN_REDIRECT_URI
Value: https://your-domain.vercel.app/api/line/auth?action=callback
Environment: Production
```

📝 แทนที่ `your-domain.vercel.app` ด้วย URL จริงของคุณ

---

## ✅ Checklist หลังตั้งค่าเสร็จ

### Environment Variables ที่ต้องมี:

**Required (ต้องมี):**
- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] SUPABASE_SERVICE_ROLE_KEY
- [ ] ADMIN_USERNAME
- [ ] ADMIN_PASSWORD
- [ ] NEXTAUTH_URL
- [ ] NEXTAUTH_SECRET
- [ ] NODE_ENV

**Optional (ถ้าใช้ LINE):**
- [ ] LINE_CHANNEL_ACCESS_TOKEN
- [ ] LINE_CHANNEL_SECRET
- [ ] LINE_ADMIN_USER_ID
- [ ] LINE_LOGIN_CHANNEL_ID
- [ ] LINE_LOGIN_CHANNEL_SECRET
- [ ] LINE_LOGIN_REDIRECT_URI

---

## 🔄 หลังตั้งค่าเสร็จ

### 1. Redeploy
```
1. ไปที่ Deployments tab
2. คลิก ... (menu) ของ deployment ล่าสุด
3. เลือก "Redeploy"
4. รอสักครู่
```

### 2. ทดสอบ
```
1. เปิด URL ของคุณ
2. ทดสอบหน้าหลัก
3. ทดสอบหน้า Categories
4. ทดสอบ Admin Login: https://your-domain.vercel.app/admin/login
```

### 3. ตรวจสอบ Logs
```
1. ไปที่ Vercel Dashboard
2. คลิก tab "Logs"
3. ดู Runtime Logs
4. ตรวจสอบว่าไม่มี error
```

---

## 🐛 Troubleshooting

### ปัญหา: Environment Variables ไม่ทำงาน

**แก้ไข:**
1. ตรวจสอบชื่อตัวแปรถูกต้อง (case-sensitive)
2. ตรวจสอบไม่มี space หรือ quote เกิน
3. ตรวจสอบเลือก Environment ถูก (Production/Preview/Development)
4. Redeploy หลังแก้ไข
5. Clear browser cache

### ปัญหา: Admin Login ไม่ได้

**แก้ไข:**
1. ตรวจสอบ ADMIN_USERNAME และ ADMIN_PASSWORD
2. ตรวจสอบ NEXTAUTH_URL ตรงกับ domain
3. ตรวจสอบ NEXTAUTH_SECRET ตั้งค่าแล้ว
4. ดู Logs ว่ามี error อะไร

### ปัญหา: Supabase ไม่ connect

**แก้ไข:**
1. ตรวจสอบ NEXT_PUBLIC_SUPABASE_URL ถูกต้อง
2. ตรวจสอบ NEXT_PUBLIC_SUPABASE_ANON_KEY ถูกต้อง
3. ตรวจสอบ Supabase RLS policies
4. ตรวจสอบ CORS settings ใน Supabase

### ปัญหา: LINE Integration ไม่ทำงาน

**แก้ไข:**
1. ตรวจสอบ LINE credentials ถูกต้อง
2. ตั้งค่า Webhook URL ใน LINE Console:
   ```
   https://your-domain.vercel.app/api/line/send-cart
   ```
3. เปิด "Use webhook" ใน LINE Console
4. Verify webhook

---

## 📸 ภาพประกอบ

### ตำแหน่งที่ตั้งค่า Environment Variables:

```
Vercel Dashboard
├── Projects
│   └── sp-hw
│       └── Settings
│           └── Environment Variables  👈 ตั้งค่าที่นี่
│               ├── Add New Variable
│               ├── Select Environment
│               └── Save
```

### รูปแบบการเพิ่มตัวแปร:

```
┌─────────────────────────────────────────┐
│ Add Environment Variable                │
├─────────────────────────────────────────┤
│ Name:  NEXT_PUBLIC_SUPABASE_URL        │
│ Value: https://xxx.supabase.co         │
│                                         │
│ Environment:                            │
│ ☑ Production                           │
│ ☑ Preview                              │
│ ☑ Development                          │
│                                         │
│         [Cancel]  [Add Variable]       │
└─────────────────────────────────────────┘
```

---

## 🔒 Security Best Practices

### ⚠️ อย่าทำ:
- ❌ อย่าใช้ password ง่ายๆ เช่น `admin123`
- ❌ อย่า commit `.env.local` ลง Git
- ❌ อย่าแชร์ SECRET keys ให้คนอื่น
- ❌ อย่าใช้ NEXTAUTH_SECRET แบบเดียวกันทุก environment

### ✅ ควรทำ:
- ✅ ใช้ password ที่แข็งแรง
- ✅ สร้าง NEXTAUTH_SECRET ใหม่สำหรับ production
- ✅ เปลี่ยน admin credentials ทันที
- ✅ ใช้ environment แยกกันระหว่าง dev/staging/production
- ✅ Rotate secrets เป็นประจำ

---

## 📝 Template สำหรับ Copy-Paste

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://dprnuymsapgtejuncqge.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwcm51eW1zYXBndGVqdW5jcWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NDMyOTIsImV4cCI6MjA3NjAxOTI5Mn0.g8QlzPaeg3mI0q3KxNL4iAhxvp2J9zmrgjiDkfFMFT8
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwcm51eW1zYXBndGVqdW5jcWdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQ0MzI5MiwiZXhwIjoyMDc2MDE5MjkyfQ.9dWaVT9RP_4Lems3CpnKbe5U7MHXCaZnz1KSR5oOUtw

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<เปลี่ยนเป็น password ที่แข็งแรง>

# NextAuth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<สร้างใหม่>

# Environment
NODE_ENV=production

# LINE (Optional)
LINE_CHANNEL_ACCESS_TOKEN=<ใส่ถ้ามี>
LINE_CHANNEL_SECRET=<ใส่ถ้ามี>
LINE_ADMIN_USER_ID=<ใส่ถ้ามี>
LINE_LOGIN_CHANNEL_ID=<ใส่ถ้ามี>
LINE_LOGIN_CHANNEL_SECRET=<ใส่ถ้ามี>
LINE_LOGIN_REDIRECT_URI=https://your-domain.vercel.app/api/line/auth?action=callback
```

---

## 🎯 Quick Setup (30 วินาที)

### สำหรับคนที่รีบ:

1. **Vercel Dashboard** → **Settings** → **Environment Variables**
2. คัดลอก template ด้านบน
3. เพิ่มทีละตัวแปร (name และ value)
4. เลือก Environment: Production + Preview + Development
5. เปลี่ยน:
   - `NEXTAUTH_URL` เป็น domain จริง
   - `NEXTAUTH_SECRET` สร้างใหม่
   - `ADMIN_PASSWORD` เป็น password แข็งแรง
6. คลิก **Redeploy**
7. รอ 2-3 นาที
8. ✅ เสร็จ!

---

**🎉 ขอให้ Deployment สำเร็จ!**

หากมีปัญหาให้ดู Logs ใน Vercel Dashboard หรือดู DEPLOYMENT_GUIDE.md
