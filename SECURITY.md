# 🔐 SP Hardware Security Guide

## ระบบความปลอดภัย 7 ชั้น

### ✅ Tier 1-4: Infrastructure Security (ใช้งานอยู่แล้ว)

#### 1️⃣ HTTPS Only + HSTS
- ✅ บังคับใช้ HTTPS ทุกหน้า
- ✅ HSTS Preload พร้อม includeSubDomains
- ✅ Redirect www → non-www

#### 2️⃣ Security Headers
- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: SAMEORIGIN (รองรับ Google Maps iframe)
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Permissions-Policy: ปิด camera/microphone/geolocation

#### 3️⃣ Content Security Policy (CSP)
ปรับให้เหมาะกับเทคโนโลยีที่ใช้จริง:
- ✅ Supabase Storage: `https://dprnuymsapgtejuncqge.supabase.co`
- ✅ LINE API: `https://api.line.me`, `https://access.line.me`
- ✅ Google Maps: `https://www.google.com`
- ✅ WebSocket: Supabase Realtime
- ❌ ไม่มี Google Analytics (ถูกลบออก)

#### 4️⃣ Rate Limiting (แบบแบ่งตาม Route)
| Route Type | Limit | วัตถุประสงค์ |
|-----------|-------|--------------|
| Browse Pages | 60/min | ดูหน้าเว็บทั่วไป |
| API ทั่วไป | 20/min | products, categories, brands |
| Admin API | 10/min | admin/products, admin/auth |
| LINE API | 5/min | send-cart, line/auth |

**คุณสมบัติ:**
- ✅ IP-based tracking
- ✅ Auto cleanup every 5 min
- ✅ X-RateLimit headers
- 🚀 Production: ควรใช้ Redis/Upstash แทน in-memory

---

### 🔄 Tier 5-6: Form Security (ไม่ใช้งาน - ยังไม่มีฟอร์ม Contact)

#### 5️⃣ Form Validation (Zod)
- ⏸️ **Status:** Package installed แต่ยังไม่มีฟอร์ม Contact ในเว็บ
- 📦 Dependencies: `zod` (installed)
- 💡 **เมื่อต้องการเพิ่ม Contact Form:**
  1. สร้าง `/app/components/ContactForm.tsx`
  2. ใช้ Zod schema validation
  3. ป้องกัน XSS ด้วย input sanitization

#### 6️⃣ reCAPTCHA v3
- ⏸️ **Status:** ยังไม่ติดตั้ง (รอเมื่อมีฟอร์ม Contact)
- 🔑 จะต้องทำเมื่อเพิ่มฟอร์ม:
  ```bash
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
  RECAPTCHA_SECRET_KEY=your_secret_key
  ```

---

### 🔐 Tier 7: Admin & Data Protection (ใช้งานอยู่แล้ว)

#### 7️⃣ Admin Authentication
- ✅ Cookie-based session (`admin-session`)
- ✅ Base64 encoded `username:timestamp`
- ✅ Session timeout: 24 hours
- ✅ Auto redirect to `/admin/login`

#### 7️⃣ PII Masking (ใน LINE API)
เมื่อส่ง order ผ่าน LINE:
```typescript
// app/api/line/send-cart/route.ts
{
  customerName: "สม***", // mask ตัวกลาง
  phoneNumber: "081-XXX-5678", // mask ตัวกลาง
  email: "u***@gmail.com", // mask ตัวกลาง
  lineUserId: "U***" // mask ทั้งหมดยกเว้นตัวแรก
}
```

---

## 📋 Security Checklist

### ✅ ใช้งานอยู่แล้ว
- [x] HTTPS + HSTS
- [x] Security Headers (X-Frame-Options, CSP, etc.)
- [x] Rate Limiting (แบบแบ่งตาม route type)
- [x] Admin Authentication
- [x] CSP tailored สำหรับ Supabase + LINE + Google Maps
- [x] PII Masking ใน LINE notifications

### ⏸️ รอเมื่อเพิ่มฟีเจอร์
- [ ] Contact Form + Zod Validation
- [ ] reCAPTCHA v3
- [ ] Email notification (ถ้าต้องการ)

### 🚀 Production Recommendations
- [ ] ย้าย Rate Limiting จาก in-memory → Redis/Upstash
- [ ] เปิด HSTS Preload (submit ที่ hstspreload.org)
- [ ] ติดตั้ง SSL/TLS Certificate (Let's Encrypt หรือ Cloudflare)
- [ ] เปิด Supabase RLS (Row Level Security)

---

## 🧪 Testing

### ทดสอบ Security Headers
```bash
# Windows PowerShell
curl -I https://sphardwares.com
```

ตรวจสอบว่ามี:
- `strict-transport-security`
- `content-security-policy`
- `x-content-type-options`
- `x-frame-options`
- `x-ratelimit-limit`

### ทดสอบ Rate Limiting
```bash
# ยิง request 61 ครั้งภายใน 1 นาที
for ($i=1; $i -le 61; $i++) { curl https://sphardwares.com; Start-Sleep -Milliseconds 100 }
```

ครั้งที่ 61 ต้องได้ **429 Too Many Requests**

---

## 📝 Environment Variables

### ตอนนี้ (ใช้งานอยู่)
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://dprnuymsapgtejuncqge.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# LINE
LINE_CHANNEL_ACCESS_TOKEN=your_token
LINE_CHANNEL_SECRET=your_secret
LINE_NOTIFY_TOKEN=your_notify_token
LINE_GROUP_ID=your_group_id

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

### เมื่อเพิ่ม Contact Form
```env
# reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...
RECAPTCHA_SECRET_KEY=6Lc...

# Email (ถ้าต้องการ)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

---

## 🏆 สิ่งที่ปรับปรุงแล้ว

1. **ลบ Google Analytics** - ยังไม่ได้ใช้งาน
2. **ลบ Contact Form API** - ยังไม่มีหน้า Contact
3. **เพิ่ม LINE API domains** ใน CSP
4. **ผ่อนปรน X-Frame-Options** → SAMEORIGIN (รองรับ Google Maps)
5. **แบ่ง Rate Limiting** ตามประเภท route:
   - Browse: 60/min
   - API: 20/min
   - Admin: 10/min
   - LINE: 5/min

---

**อัปเดตล่าสุด:** วันนี้
**Next Steps:** เมื่อต้องการเพิ่มฟอร์ม Contact ให้แจ้งเพื่อ implement Tier 5-6
