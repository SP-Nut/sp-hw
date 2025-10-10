import { Product } from './products';

// สินค้าหมวดหมู่อื่นๆ
export const othersProducts: Product[] = [
  {
    id: 21,
    name: "น้ำยาทำความสะอาดหลังคา",
    description: "น้ำยาทำความสะอาดเฉพาะสำหรับหลังคาเมทัลชีท และกันสาด ช่วยขจัดคราบสกปรก ตะไคร่น้ำ และป้องกันการเกิดสนิม ปริมาณ 1 ลิตร ทำความสะอาดได้ 50-80 ตร.ม.",
    price: 250,
    originalPrice: 300,
    brand: "Clean Master",
    category: "others",
    rating: 4.5,
    reviews: 28,
    image: "/placeholder-product.jpg",
    inStock: true
  },
  {
    id: 22,
    name: "ตะแกรงระบายน้ำกันใบไม้",
    description: "ตะแกรงกรองใบไม้สำหรับท่อระบายน้ำฝน ป้องกันการอุดตันจากใบไม้และเศษขยะ ติดตั้งง่าย วัสดุพลาสติก ABS ทนทานต่อแสงแดดและฝน",
    price: 120,
    originalPrice: 120,
    brand: "GuardFlow",
    category: "others",
    rating: 4.2,
    reviews: 15,
    image: "/placeholder-product.jpg",
    inStock: true
  },
  {
    id: 23,
    name: "แปรงขัดหลังคายาว",
    description: "แปรงขัดหลังคาด้ามยาวพิเศษ 3 เมตร สำหรับทำความสะอาดหลังคาสูง โดยไม่ต้องปีนขึ้นไป ขนแปรงนิ่มไม่ทำลายสี ด้ามอะลูมิเนียมน้ำหนักเบา",
    price: 480,
    originalPrice: 550,
    brand: "Long Reach",
    category: "others",
    rating: 4.7,
    reviews: 12,
    image: "/placeholder-product.jpg",
    inStock: true
  }
];