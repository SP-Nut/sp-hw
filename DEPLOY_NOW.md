# 🚀 Quick Deploy Checklist

## ✅ ก่อน Deploy ต้องเช็ค:

- [x] Build สำเร็จ (`npm run build`)
- [x] ไม่มี TypeScript errors
- [x] ลบไฟล์ test ออกแล้ว
- [x] ลบ console.log ที่ไม่จำเป็น
- [x] โค้ด push ขึ้น GitHub แล้ว

## 📦 ที่ต้องเตรียม:

### 1. Supabase Credentials
```
✓ NEXT_PUBLIC_SUPABASE_URL
✓ NEXT_PUBLIC_SUPABASE_ANON_KEY
✓ SUPABASE_SERVICE_ROLE_KEY (optional)
```

### 2. LINE Bot Credentials (ถ้าใช้)
```
✓ LINE_CHANNEL_ACCESS_TOKEN
✓ LINE_CHANNEL_SECRET
✓ LINE_ADMIN_USER_ID
✓ LINE_LOGIN_CHANNEL_ID
✓ LINE_LOGIN_CHANNEL_SECRET
```

### 3. NextAuth Secret
```bash
# สร้างด้วยคำสั่ง:
openssl rand -base64 32
# หรือ
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 🎯 วิธี Deploy แบบง่าย (Vercel)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for production deployment"
git push origin master
```

### Step 2: Deploy บน Vercel
1. ไปที่ https://vercel.com
2. Login ด้วย GitHub
3. คลิก "Add New Project"
4. เลือก repository: `sp-hw`
5. คลิก "Import"
6. ตั้งค่า Environment Variables (ตามด้านล่าง)
7. คลิก "Deploy"
8. รอ 2-3 นาที
9. เสร็จแล้ว! 🎉

### Step 3: ตั้งค่า Environment Variables

**ใน Vercel Dashboard > Settings > Environment Variables:**

**Required:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://dprnuymsapgtejuncqge.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
NEXTAUTH_URL=https://<your-domain>.vercel.app
NEXTAUTH_SECRET=<random-secret>
```

**Optional (ถ้าใช้ LINE):**
```bash
LINE_CHANNEL_ACCESS_TOKEN=<your-token>
LINE_CHANNEL_SECRET=<your-secret>
LINE_ADMIN_USER_ID=<your-user-id>
LINE_LOGIN_CHANNEL_ID=<your-channel-id>
LINE_LOGIN_CHANNEL_SECRET=<your-channel-secret>
LINE_LOGIN_REDIRECT_URI=https://<your-domain>.vercel.app/api/line/auth?action=callback
```

### Step 4: ตั้งค่า LINE Webhook (ถ้าใช้)
1. ไปที่ LINE Developers Console
2. เลือก Messaging API channel
3. ตั้ง Webhook URL: `https://<your-domain>.vercel.app/api/line/send-cart`
4. เปิด "Use webhook"
5. คลิก "Verify"

---

## 🔄 Auto-Deploy Setup

หลัง deploy ครั้งแรกแล้ว:
- ทุกครั้งที่ push ไป `master` branch
- Vercel จะ auto-deploy ให้อัตโนมัติ
- ใช้เวลาประมาณ 2-3 นาที

---

## 🧪 หลัง Deploy ต้องทดสอบ:

- [ ] หน้า Home โหลดได้
- [ ] หน้า Categories แสดงสินค้าครบ
- [ ] รูปภาพโหลดได้หมด
- [ ] หน้า Product Detail
- [ ] ตะกร้าสินค้าทำงาน
- [ ] Admin Login
- [ ] Admin Panel เพิ่ม/แก้ไข/ลบสินค้า
- [ ] LINE Integration (ถ้าใช้)

---

## 📱 Custom Domain (Optional)

1. ไปที่ Vercel Dashboard > Settings > Domains
2. คลิก "Add Domain"
3. ใส่ domain ของคุณ (เช่น `sp-hardware.com`)
4. ตั้งค่า DNS ตามที่ Vercel แนะนำ:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
5. รอ DNS propagate (15 นาที - 24 ชั่วโมง)

---

## 🐛 Troubleshooting

### Build Failed?
```bash
# ลอง build locally ก่อน
npm run build

# ดู error message
# แก้ไขแล้ว push ใหม่
git add .
git commit -m "Fix build error"
git push
```

### Environment Variables ไม่ทำงาน?
1. ตรวจสอบชื่อตัวแปรถูกต้อง (case-sensitive)
2. ตรวจสอบไม่มี space หรือ quote เกิน
3. หลังแก้แล้วต้อง Redeploy
4. ไปที่ Deployments > คลิก ... > Redeploy

### Images ไม่โหลด?
1. ตรวจสอบ Supabase bucket เป็น public
2. ตรวจสอบ `next.config.ts` มี domain ของ Supabase
3. ลอง clear cache browser

### API ไม่ทำงาน?
1. ไปที่ Vercel Dashboard > Logs
2. ดู Runtime Logs
3. เช็ค Environment Variables
4. เช็ค Supabase connection

---

## 📊 Performance

Vercel มี:
- ✅ CDN Global อัตโนมัติ
- ✅ Image Optimization
- ✅ Auto SSL/HTTPS
- ✅ Analytics (ฟรี)
- ✅ 99.99% Uptime

---

## 💰 Pricing

**Vercel Free Tier:**
- 100GB Bandwidth/month
- 100 Deployments/day
- Serverless Functions
- Analytics
- **เพียงพอสำหรับ small-medium business**

---

## 🎉 Done!

Website ของคุณพร้อมใช้งาน Production แล้ว!

URL: `https://<your-project>.vercel.app`

---

**Need help? อ่าน DEPLOYMENT_GUIDE.md สำหรับ detailed instructions**
