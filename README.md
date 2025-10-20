# 🏪 SP Hardware - E-commerce Platform

ระบบร้านค้าออนไนไล์ครบวงจรสำหรับวัสดุก่อสร้างและฮาร์ดแวร์ พร้อม LINE Integration และระบบจัดการแบบ Full-Stack

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)](https://tailwindcss.com/)

## ✨ คุณสมบัติหลัก

### 🛍️ Frontend (Customer)
- ✅ หน้าแรกพร้อม Hero Carousel และ Promotional Cards
- ✅ ระบบตะกร้าสินค้าแบบ Real-time
- ✅ ค้นหาและกรองสินค้า (หมวดหมู่, แบรนด์, ช่วงราคา)
- ✅ หน้ารายละเอียดสินค้าพร้อม Image Gallery (รองรับ 5 รูป)
- ✅ รีวิวจากลูกค้า
- ✅ Responsive Design - รองรับทุกหน้าจอ
- ✅ Contact Form พร้อม Google Maps
- ✅ LINE Integration สำหรับส่งออเดอร์

### �‍💼 Admin Panel
- ✅ ระบบ Login สำหรับผู้ดูแล
- ✅ จัดการสินค้า (เพิ่ม, แก้ไข, ลบ)
- ✅ อัพโหลดรูปสินค้าได้ถึง 5 รูป/สินค้า
- ✅ จัดการหมวดหมู่และแบรนด์
- ✅ Dashboard สรุปข้อมูล
- ✅ Image Upload ไป Supabase Storage

### �📱 LINE Integration
- ✅ LINE Login
- ✅ ส่งออเดอร์ไป LINE Chat
- ✅ Webhook Notifications
- ✅ Rich Messages

### �️ Backend & Database
- ✅ Next.js API Routes
- ✅ Supabase PostgreSQL
- ✅ Row Level Security (RLS)
- ✅ Image Storage ใน Supabase Storage
- ✅ RESTful API

## 🏗️ เทคโนโลยีที่ใช้

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15.5.4 (App Router) |
| **Frontend** | React 19.1.0, TypeScript |
| **Styling** | Tailwind CSS 4.0 |
| **Database** | Supabase (PostgreSQL) |
| **Storage** | Supabase Storage |
| **Authentication** | Custom Session-based |
| **Icons** | Lucide React |
| **Deployment** | Vercel (recommended) |

## 🚀 Quick Start

### ข้อกำหนด
- Node.js 20.x หรือสูงกว่า
- npm หรือ yarn
- Supabase Account

### 1. Clone Repository

```bash
git clone https://github.com/SP-Nut/sp-hw.git
cd sp-hw
npm install
```

### 2. ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# LINE Integration (Optional)
LINE_CHANNEL_ACCESS_TOKEN=your-line-token
LINE_CHANNEL_SECRET=your-line-secret
LINE_ADMIN_USER_ID=your-admin-user-id
LINE_LOGIN_CHANNEL_ID=your-login-channel-id
LINE_LOGIN_CHANNEL_SECRET=your-login-channel-secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

### 3. ตั้งค่า Database

ดู Schema ใน `supabase/migrations/` และรันใน Supabase SQL Editor

หรือใช้ Supabase CLI:
```bash
supabase db push
```

### 4. เริ่มใช้งาน

```bash
# Development Mode
npm run dev

# Build for Production
npm run build

# Start Production Server
npm start
```

เปิดเบราว์เซอร์ไปที่: **http://localhost:3000**

## 📁 โครงสร้างโปรเจค

```
sp-hw/
├── app/                    # Next.js App Router
│   ├── components/        # React Components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── PopularProducts.tsx
│   │   ├── TrustedBrands.tsx
│   │   ├── CustomerReviews.tsx
│   │   └── ContactSection.tsx
│   ├── contexts/          # React Context (Cart)
│   ├── data/              # Static Data
│   ├── api/               # API Routes
│   │   ├── products/
│   │   ├── categories/
│   │   ├── brands/
│   │   ├── admin/
│   │   └── line/
│   ├── admin/             # Admin Panel
│   ├── categories/        # Product Listing
│   ├── product/[id]/      # Product Detail
│   └── cart/              # Shopping Cart
├── lib/                   # Utilities
│   ├── supabase.ts       # Supabase Client
│   ├── database.ts       # DB Helpers
│   └── types.ts          # TypeScript Types
├── supabase/
│   └── migrations/       # Database Schema
├── public/               # Static Files
└── docs/                 # Documentation
```

## 🔑 API Endpoints

### Public APIs
```
GET  /api/products          # ดึงสินค้าทั้งหมด
GET  /api/products/[id]     # ดึงสินค้าตาม ID
GET  /api/products/search   # ค้นหาสินค้า
GET  /api/categories        # ดึงหมวดหมู่
GET  /api/brands            # ดึงแบรนด์
```

### Admin APIs (Protected)
```
POST /api/admin/auth        # Login
GET  /api/admin/check       # ตรวจสอบ Session
GET  /api/admin/products    # ดึงสินค้าทั้งหมด (Admin)
POST /api/products          # เพิ่มสินค้า
PUT  /api/products/[id]     # แก้ไขสินค้า
DELETE /api/products/[id]   # ลบสินค้า
```

### LINE APIs
```
POST /api/line/send-cart    # ส่งตะกร้าไป LINE
GET  /api/line/auth         # LINE Login
```

## 🚀 Deployment

### วิธีที่ 1: Deploy บน Vercel (แนะนำ)

```bash
# Push to GitHub
git push origin master

# Deploy
1. ไปที่ https://vercel.com
2. Import repository
3. ตั้งค่า Environment Variables
4. Deploy!
```

### วิธีที่ 2: Deploy แบบอื่น

ดูคู่มือใน:
- **[DEPLOY_NOW.md](./DEPLOY_NOW.md)** - Quick Start Guide
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Detailed Instructions

รองรับ: Vercel, Railway, Render, Docker, VPS

## 📚 เอกสารเพิ่มเติม

- [โครงสร้างโปรเจค](./docs/PROJECT_STRUCTURE.md)
- [ตั้งค่า Supabase](./docs/SUPABASE_SETUP.md)
- [LINE Integration](./docs/LINE_INTEGRATION_SETUP.md)
- [Customer LINE Setup](./docs/CUSTOMER_LINE_SETUP.md)

## 🛠️ Scripts

```bash
npm run dev          # เริ่ม development server
npm run build        # Build production
npm start            # เริ่ม production server
npm run lint         # ตรวจสอบ code quality
npm run lint:fix     # แก้ไข lint errors อัตโนมัติ
npm run type-check   # ตรวจสอบ TypeScript types
```

## 🔐 Admin Access

**Default Admin Credentials:**
- URL: `/admin/login`
- Username: ตามที่ตั้งใน `.env.local`
- Password: ตามที่ตั้งใน `.env.local`

⚠️ **สำคัญ:** เปลี่ยน credentials ก่อน deploy production!

## 🎨 Features Details

### 🛒 Shopping Cart
- เพิ่ม/ลบสินค้า
- ปรับจำนวน
- คำนวณราคารวมอัตโนมัติ
- บันทึกใน localStorage
- ส่งออเดอร์ไป LINE

### 🔍 Product Search & Filter
- ค้นหาด้วยชื่อสินค้า
- กรองตามหมวดหมู่
- กรองตามแบรนด์
- กรองตามช่วงราคา
- เรียงตาม: ราคา, ชื่อ, ความนิยม

### 📸 Image Management
- Upload รูปสินค้าได้ 5 รูป/สินค้า
- Automatic resize & optimization
- เก็บใน Supabase Storage
- CDN delivery
- Image gallery ในหน้า product detail

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly UI
- Optimized images per device

## 🐛 Known Issues & Limitations

- ยังไม่มีระบบ Payment Gateway
- ยังไม่มีระบบจัดการคำสั่งซื้อแบบเต็มรูปแบบ
- LINE Integration ต้องตั้งค่า Webhook เอง

## 🔄 Version History

### v1.0.0 (Current)
- ✅ Full-stack e-commerce platform
- ✅ Admin panel สมบูรณ์
- ✅ LINE Integration
- ✅ Multi-image support (5 images)
- ✅ Responsive design
- ✅ Production ready

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 👥 Contact

- **GitHub:** [SP-Nut](https://github.com/SP-Nut)
- **Project Link:** [https://github.com/SP-Nut/sp-hw](https://github.com/SP-Nut/sp-hw)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Vercel](https://vercel.com/)

---

**Made with ❤️ for SP Hardware**


## � Deployment

### วิธีที่ 1: Deploy บน Vercel (แนะนำ)

```bash
# Push to GitHub
git push origin master

# Deploy
1. ไปที่ https://vercel.com
2. Import repository
3. ตั้งค่า Environment Variables
4. Deploy!
```

### วิธีที่ 2: Deploy แบบอื่น

ดูคู่มือใน:
- **[DEPLOY_NOW.md](./DEPLOY_NOW.md)** - Quick Start Guide
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Detailed Instructions

รองรับ: Vercel, Railway, Render, Docker, VPS

## 📚 เอกสารเพิ่มเติม

- [โครงสร้างโปรเจค](./docs/PROJECT_STRUCTURE.md)
- [การตั้งค่า Supabase](./docs/SUPABASE_SETUP.md)
- [การตั้งค่า LINE Integration](./docs/LINE_INTEGRATION_SETUP.md)
- [คู่มือลูกค้า LINE](./docs/CUSTOMER_LINE_SETUP.md)

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Custom Admin Auth + LINE Login
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics

## 📁 โครงสร้างโปรเจค

```
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── components/        # React Components
│   ├── contexts/          # React Contexts
│   └── data/             # Static data files
├── docs/                  # Documentation
├── hooks/                 # Custom React Hooks
├── lib/                   # Utilities & Services
├── public/               # Static assets
├── scripts/              # Database scripts
└── supabase/             # Supabase configuration
    └── migrations/       # Database migrations
```

## 🤝 การพัฒนา

### Commands ที่สำคัญ

```bash
npm run dev          # เริ่ม development server
npm run build        # Build for production
npm run lint         # ตรวจสอบ code style
npm run db:seed      # Seed database with sample data
```

### Code Style

โปรเจคใช้ ESLint และ Prettier สำหรับการจัดรูปแบบโค้ด
ทำการ lint ก่อน commit เสมอ

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
