# Product Data Structure

โครงสร้างข้อมูลสินค้าได้ถูกแยกออกเป็นไฟล์ต่างๆ เพื่อให้จัดการง่ายขึ้น

## ไฟล์ข้อมูลสินค้า

### ไฟล์หลัก
- `products.ts` - ไฟล์หลักที่รวมข้อมูลทุกหมวดหมู่

### ไฟล์แยกตามหมวดหมู่
- `products-opaque-roof.ts` - กันสาดทึบแสง (ID: 1-4)
- `products-translucent-roof.ts` - กันสาดโปร่งแสง (ID: 5-17) **อัพเดตตามราคาล่าสุด**
- `products-installation.ts` - อุปกรณ์ติดตั้ง (ID: 18-23)
- `products-tools.ts` - เครื่องมือช่าง (ID: 24-29)
- `products-hardware.ts` - อุปกรณ์ฮาร์ดแวร์ (ID: 30-35)
- `products-paint.ts` - สี & วัสดุทาสี (ID: 36-41)

## การใช้งาน

### Import ข้อมูลทั้งหมด
```typescript
import { products } from './data/products';
```

### Import เฉพาะหมวดหมู่
```typescript
import { translucentRoofProducts } from './data/products-translucent-roof';
import { toolsProducts } from './data/products-tools';
```

## สินค้าโปร่งแสงที่อัพเดต

ข้อมูลในหมวด **กันสาดโปร่งแสง** ได้ถูกอัพเดตตามราคาล่าสุดจากตารางราคา:

1. **Shinkolite Prime 10mm** - ฿8,350
2. **Shinkolite Heat Cut/Nature 6mm** - ฿5,550  
3. **Shinkolite Superior 6mm** - ฿4,250
4. **Shinkolite Shade series 4mm** - ฿3,850
5. **Embossed Sheet 3mm** - ฿3,300
6. **D-Lite/J-Roof 1.5mm/1.2mm** - ฿3,100
7. **D-Lite คลื่น 1.2mm (สีเทา)** - ฿2,650
8. **D-Lite คลื่น 1.2mm** - ฿2,550
9. **ไฟเสโลนเล็ก 1.2mm/1.5mm** - ฿2,550
10. **Buffalo 1.2mm** - ฿2,150
11. **Polycarbonate 10mm** - ฿2,150
12. **Polycarbonate 8mm** - ฿2,000
13. **Polycarbonate 6mm** - ฿1,800

## การจัดการ ID

- ID ไม่ซ้ำกันทั้งระบบ
- แยกช่วงตามหมวดหมู่เพื่อป้องกันความขัดแย้ง
- สามารถเพิ่ม ID ใหม่ต่อจากหมายเลขสุดท้ายของแต่ละหมวด

## ไฟล์สำรอง

- `products-old-backup.ts` - ไฟล์เดิมก่อนการแยก (สำรองไว้)