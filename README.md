# 🏪 SP Hardware - E-commerce Platform

ระบบร้านค้าออนไลน์สำหรับวัสดุก่อสร้างและฮาร์ดแวร์ พร้อม LINE Integration

## ✨ คุณสมบัติหลัก

- 🛍️ ระบบตะกร้าสินค้าและการสั่งซื้อ
- 🔍 ค้นหาและกรองสินค้า (หมวดหมู่, แบรนด์, ราคา)
- 📱 LINE Integration (LINE Login + Order Notifications)
- 👨‍💼 ระบบจัดการผู้ดูแล
- 🎨 Responsive Design ด้วย Tailwind CSS
- ⚡ Next.js 15 with App Router
- 🗄️ Supabase Database

## 🚀 การติดตั้งและใช้งาน

### 1. Clone และติดตั้ง Dependencies

```bash
git clone [repository-url]
cd sphw
npm install
```

### 2. ตั้งค่า Environment Variables

คัดลอกไฟล์ `.env.local.example` เป็น `.env.local` และกรอกข้อมูล:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# LINE Integration
LINE_CHANNEL_ACCESS_TOKEN=your-line-access-token
LINE_CHANNEL_SECRET=your-line-channel-secret
LINE_ADMIN_USER_ID=your-admin-user-id

# Admin Authentication
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-admin-password
```

### 3. ตั้งค่า Database

```bash
# Run database migrations
npm run db:migrate

# Seed sample data
npm run db:seed
```

### 4. เริ่มใช้งาน

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

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
