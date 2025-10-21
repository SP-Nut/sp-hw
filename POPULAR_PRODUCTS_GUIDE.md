# การเพิ่มฟีเจอร์สินค้ายอดนิยม (Popular Products)

## การอัพเดทฐานข้อมูล

คุณต้องรัน SQL migration ในไฟล์ `supabase/migrations/005_add_is_popular_column.sql` ในฐานข้อมูล Supabase:

### วิธีรัน Migration:

1. **เข้า Supabase Dashboard:**
   - ไปที่ https://supabase.com/dashboard
   - เลือก Project: dprnuymsapgtejuncqge
   - คลิกที่ **SQL Editor** ในเมนูซ้าย

2. **รัน SQL:**
   ```sql
   -- Add is_popular column to products table
   ALTER TABLE products 
   ADD COLUMN is_popular BOOLEAN DEFAULT false;

   -- Create index for better performance when querying popular products
   CREATE INDEX idx_products_is_popular ON products(is_popular);

   -- Add comment to explain the column
   COMMENT ON COLUMN products.is_popular IS 'Flag to mark product as popular/featured on homepage';
   ```

3. **กด RUN** เพื่อ execute SQL

## การใช้งาน

### 1. ตั้งค่าสินค้ายอดนิยมในหน้า Admin:
- ไปที่ `/admin` → แท็บ **จัดการสินค้า**
- คลิกปุ่ม **⭐ ตั้งค่า** ในคอลัมน์ "ยอดนิยม" ของสินค้าที่ต้องการ
- ปุ่มจะเปลี่ยนเป็น **⭐ ยอดนิยม** สีทอง
- สินค้านั้นจะแสดงในหน้าแรกที่ส่วน "สินค้ายอดนิยม"

### 2. สินค้ายอดนิยมจะแสดงที่:
- หน้าแรกของเว็บไซต์ (Homepage)
- ส่วน "สินค้ายอดนิยม"
- แสดงสูงสุด 10 รายการ
- แสดงเฉพาะสินค้าที่มีสต็อก (in_stock = true)

### 3. API Endpoints:

#### Get Popular Products:
```
GET /api/products/popular
```
Response: รายการสินค้ายอดนิยมทั้งหมด (สูงสุด 10 รายการ)

#### Toggle Popular Status (Admin Only):
```
PATCH /api/admin/products/popular
Body: {
  "id": 123,
  "is_popular": true
}
```

## ฟีเจอร์ที่เพิ่มมา:

✅ เพิ่มฟิลด์ `is_popular` ในตาราง products
✅ API สำหรับดึงสินค้ายอดนิยม (`/api/products/popular`)
✅ API สำหรับอัพเดทสถานะยอดนิยม (`/api/admin/products/popular`)
✅ ปุ่ม Toggle ในหน้า Admin Dashboard
✅ Component `PopularProducts` ดึงข้อมูลจริงจากฐานข้อมูล
✅ แสดงรูปภาพสินค้าจริง พร้อม discount badge
✅ คลิกที่สินค้าเพื่อดูรายละเอียด

## หมายเหตุ:

- สินค้าที่ตั้งเป็นยอดนิยมจะแสดงไอคอนดาวสีทองในหน้า Admin
- ระบบจะแสดงเฉพาะสินค้าที่มีสต็อกเท่านั้น
- สามารถตั้งสินค้ายอดนิยมได้ไม่จำกัดจำนวน แต่แสดงเพียง 10 รายการแรก
