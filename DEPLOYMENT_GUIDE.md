# 🚀 SP Hardware - Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ ต้องเตรียมก่อน Deploy:
1. ✅ โค้ดทั้งหมด push ไป GitHub แล้ว
2. ✅ ไม่มี console.log ที่ไม่จำเป็น (ทำความสะอาดแล้ว)
3. ✅ ไม่มี error ใน build
4. ✅ ไฟล์ test ถูกลบออกแล้ว
5. ✅ Environment variables พร้อมแล้ว

---

## 🌐 Option 1: Deploy บน Vercel (แนะนำ - ง่ายที่สุด)

### ขั้นตอนการ Deploy:

#### 1. เข้า Vercel Dashboard
- ไปที่: https://vercel.com
- Login ด้วย GitHub account

#### 2. Import Project
```
1. คลิก "Add New Project"
2. เลือก Repository: SP-Nut/sp-hw
3. คลิก "Import"
```

#### 3. ตั้งค่า Environment Variables
ไปที่ **Settings > Environment Variables** แล้วเพิ่ม:

**Supabase:**
```
NEXT_PUBLIC_SUPABASE_URL=https://dprnuymsapgtejuncqge.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-key
```

**LINE Integration:**
```
LINE_CHANNEL_ACCESS_TOKEN=your-line-token
LINE_CHANNEL_SECRET=your-line-secret
LINE_ADMIN_USER_ID=your-admin-user-id
LINE_LOGIN_CHANNEL_ID=your-login-channel-id
LINE_LOGIN_CHANNEL_SECRET=your-login-channel-secret
```

**NextAuth:**
```
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-random-secret (สร้างด้วย: openssl rand -base64 32)
```

#### 4. Deploy Settings
```json
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node Version: 20.x
```

#### 5. Deploy!
- คลิก **Deploy** แล้วรอสักครู่
- เสร็จแล้วจะได้ URL: `https://sp-hw-xxx.vercel.app`

#### 6. ตั้งค่า Custom Domain (Optional)
```
1. ไปที่ Settings > Domains
2. เพิ่ม domain ของคุณ (เช่น sp-hardware.com)
3. ตั้งค่า DNS ตามที่ Vercel แนะนำ
```

---

## 🐳 Option 2: Deploy ด้วย Docker (สำหรับ VPS)

### 1. สร้าง Dockerfile
```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### 2. สร้าง docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env.production
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

### 3. Deploy Commands
```bash
# Build image
docker build -t sp-hardware .

# Run container
docker run -p 3000:3000 --env-file .env.production sp-hardware

# หรือใช้ docker-compose
docker-compose up -d
```

---

## 🚂 Option 3: Deploy บน Railway

### ขั้นตอน:
```
1. ไปที่: https://railway.app
2. Login ด้วย GitHub
3. คลิก "New Project" > "Deploy from GitHub repo"
4. เลือก repo: SP-Nut/sp-hw
5. เพิ่ม Environment Variables (เหมือน Vercel)
6. Deploy!
```

**Settings:**
```
Build Command: npm run build
Start Command: npm start
```

---

## 🎨 Option 4: Deploy บน Render

### ขั้นตอน:
```
1. ไปที่: https://render.com
2. Login ด้วย GitHub
3. คลิก "New +" > "Web Service"
4. เลือก repo: SP-Nut/sp-hw
5. ตั้งค่า:
   - Environment: Node
   - Build Command: npm install && npm run build
   - Start Command: npm start
6. เพิ่ม Environment Variables
7. Create Web Service
```

---

## 📝 หลัง Deploy แล้ว:

### 1. ทดสอบ Website
- ✅ หน้า Home โหลดได้
- ✅ หน้า Categories แสดงสินค้า
- ✅ หน้า Product Detail
- ✅ หน้า Cart
- ✅ Admin Panel
- ✅ รูปภาพโหลดได้หมด

### 2. ตั้งค่า LINE Webhook
```
1. ไปที่ LINE Developers Console
2. เลือก Messaging API channel
3. ตั้งค่า Webhook URL:
   https://your-domain.vercel.app/api/line/send-cart
4. เปิด "Use webhook": ON
5. คลิก "Verify" ทดสอบ
```

### 3. ทดสอบ LINE Integration
- ทดสอบส่งตะกร้าสินค้าผ่าน LINE
- ตรวจสอบว่าแอดมินได้รับข้อความ

### 4. Monitor & Logs
**Vercel:**
- ไปที่ Dashboard > Logs
- ดู Runtime Logs และ Build Logs

**Railway/Render:**
- ดู Logs ใน Dashboard

---

## 🔧 Troubleshooting

### Build Failed?
```bash
# ลองรันก่อน deploy
npm run build

# ดู error แล้วแก้ไข
```

### Environment Variables ไม่ทำงาน?
```
1. ตรวจสอบว่าใส่ครบทุกตัว
2. ตรวจสอบชื่อตัวแปรถูกต้อง (case-sensitive)
3. Redeploy หลังแก้ env vars
```

### Images ไม่โหลด?
```
1. ตรวจสอบ next.config.ts
2. ตรวจสอบ Supabase bucket permissions
3. ตรวจสอบ URL ใน Environment Variables
```

### API Routes ไม่ทำงาน?
```
1. ตรวจสอบ route.ts files
2. ดู Logs ใน Dashboard
3. ตรวจสอบ CORS settings
```

---

## 📊 Performance Optimization (After Deploy)

### 1. Enable Vercel Analytics
```
- ไปที่ Dashboard > Analytics
- เปิด Web Analytics
```

### 2. Setup CDN
- Vercel มี CDN built-in อยู่แล้ว
- Supabase Storage มี CDN ให้ด้วย

### 3. Database Optimization
- ตรวจสอบ Supabase indexes
- เพิ่ม caching ถ้าจำเป็น

---

## 🎯 Quick Deploy Commands

**Test Build Locally:**
```bash
npm run build
npm start
```

**Deploy to Vercel (CLI):**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Deploy with Git:**
```bash
git add .
git commit -m "Ready for production"
git push origin master

# Vercel จะ auto-deploy!
```

---

## 📞 Support

หากมีปัญหา:
1. ดู Logs ใน Dashboard
2. ตรวจสอบ Environment Variables
3. ทดสอบ build locally ก่อน
4. ตรวจสอบ Supabase connection

---

**🎉 Good Luck with Deployment!**
