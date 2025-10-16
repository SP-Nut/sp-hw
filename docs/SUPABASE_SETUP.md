# Supabase Database Setup Guide

## 📊 การเปลี่ยนจาก Mock Data ไป Supabase Database

โปรเจ็กต์นี้ได้ถูกอัพเดตให้ใช้ **Supabase** เป็น database แทนการใช้ mock data ใน code แล้ว

## 🚀 การติดตั้งและใช้งาน

### 1. สร้าง Supabase Project

1. ไปที่ [supabase.com](https://supabase.com/)
2. สร้างบัญชีใหม่หรือเข้าสู่ระบบ
3. คลิก "New Project"
4. เลือก Organization และใส่ชื่อ Project
5. เลือก Region ที่ใกล้ที่สุด (แนะนำ Southeast Asia)
6. ใส่รหิสผ่าน Database

### 2. Setup Database Schema

1. ใน Supabase Dashboard ไปที่ **SQL Editor**
2. คัดลอกและรัน SQL จากไฟล์ `supabase/migrations/001_initial_schema.sql`
3. หรือใช้ **Table Editor** สร้างตารางตามโครงสร้างด้านล่าง

### 3. กำหนด Environment Variables

แก้ไขไฟล์ `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**หา URL และ Key ได้จาก:**
- ไปที่ Project Dashboard → Settings → API
- `NEXT_PUBLIC_SUPABASE_URL` = Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key
- `SUPABASE_SERVICE_ROLE_KEY` = service_role key (ใช้สำหรับ seed data)

### 4. Seed ข้อมูล

รันคำสั่งเพื่ออัพโหลด mock data ไปยัง database:

```bash
npm run db:seed
```

## 📋 โครงสร้าง Database

### Tables

#### `categories`
- `id` (VARCHAR) - Primary Key
- `name` (VARCHAR) - ชื่อหมวดหมู่
- `created_at`, `updated_at` (TIMESTAMP)

#### `brands` 
- `id` (VARCHAR) - Primary Key  
- `name` (VARCHAR) - ชื่อแบรนด์
- `created_at`, `updated_at` (TIMESTAMP)

#### `products`
- `id` (SERIAL) - Primary Key
- `name` (VARCHAR) - ชื่อสินค้า
- `price` (DECIMAL) - ราคา
- `original_price` (DECIMAL) - ราคาเดิม
- `brand_id` (VARCHAR) - FK to brands
- `category_id` (VARCHAR) - FK to categories
- `rating` (DECIMAL) - คะแนนรีวิว
- `reviews` (INTEGER) - จำนวนรีวิว
- `image` (VARCHAR) - URL รูปภาพ
- `in_stock` (BOOLEAN) - สถานะสินค้า
- `description` (TEXT) - รายละเอียด
- `created_at`, `updated_at` (TIMESTAMP)

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|---------|-------------|
| `/api/products` | GET | ดึงสินค้าทั้งหมด |
| `/api/products/[id]` | GET | ดึงสินค้าตาม ID |
| `/api/products/search` | GET | ค้นหาและกรองสินค้า |
| `/api/categories` | GET | ดึงหมวดหมู่ทั้งหมด |
| `/api/brands` | GET | ดึงแบรนด์ทั้งหมด |

### Query Parameters สำหรับ Search API:
- `?q=search_term` - ค้นหาด้วยคำค้นหา
- `?category=category_id` - กรองตามหมวดหมู่
- `?brand=brand_id` - กรองตามแบรนด์

## 🎯 Custom Hooks

### `useProducts()`
```typescript
const { products, loading, error } = useProducts()
```

### `useProduct(id)`  
```typescript
const { product, loading, error } = useProduct(productId)
```

### `useCategories()`
```typescript
const { categories, loading, error } = useCategories()
```

### `useBrands()`
```typescript
const { brands, loading, error } = useBrands()
```

### `useSearchProducts(query, category?, brand?)`
```typescript
const { products, loading, error } = useSearchProducts('คีย์เวิร์ด', 'opaque-roof')
```

## 🔐 Security Features

- **Row Level Security (RLS)** เปิดใช้งานแล้ว
- **Public Read Access** สำหรับทุกตาราง
- **Real-time subscriptions** พร้อมใช้งาน (เพิ่มในอนาคต)

## 🎨 ข้อดีที่ได้รับ

✅ **Performance**: ดึงข้อมูลแบบ dynamic แทนการโหลด static data  
✅ **Scalability**: เพิ่มสินค้าได้ไม่จำกัดผ่าน Supabase Dashboard  
✅ **Real-time**: รองรับการอัพเดตแบบ real-time  
✅ **Search**: ค้นหาข้อมูลได้เร็วและแม่นยำ  
✅ **Admin**: จัดการข้อมูลผ่าน Supabase Dashboard  
✅ **Backup**: มี backup อัตโนมัติ  

## 🚨 หมายเหตุ

1. **ใน Development**: ใช้ Free Tier ของ Supabase (500MB Database, 50MB File Storage)
2. **ใน Production**: อาจต้อง upgrade plan ตามการใช้งาน  
3. **Environment Variables**: ห้ามใส่ Service Role Key ใน client-side code
4. **Images**: ปัจจุบันยังใช้ placeholder images สามารถอัพโหลดใน Supabase Storage ได้

## 🔄 Migration จาก Mock Data

- ✅ Mock data ยังคงอยู่ในโฟลเดอร์ `app/data` สำหรับ backup
- ✅ Components ทั้งหมดใช้ API แทน direct import แล้ว
- ✅ มี loading states และ error handling
- ✅ Type safety ด้วย TypeScript

---

🎉 **ตอนนี้แอปพลิเคชันพร้อมใช้งานกับ Supabase Database แล้ว!**