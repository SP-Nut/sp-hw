// Product Type Definition
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  brand: string;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  inStock: boolean;
  description: string;
}

// ข้อมูลสินค้าทั้งหมด
export const products: Product[] = [
  // กันสาดทึบแสง (Opaque Roof)
  {
    id: 1,
    name: "แผ่นเมทัลชีท 0.5mm สีน้ำเงิน",
    price: 280,
    originalPrice: 350,
    brand: "SCG",
    category: "opaque-roof",
    rating: 4.5,
    reviews: 23,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "แผ่นเมทัลชีทคุณภาพสูง กันสนิม ทนทาน ปิดแสง 100% เหมาะกับกันแดด–กันฝนทั่วบ้าน"
  },
  {
    id: 2,
    name: "ไวนิลดรีมรูฟ รุ่นคลิปล็อค สีแดง",
    price: 450,
    originalPrice: 520,
    brand: "Vinyl Dream",
    category: "opaque-roof",
    rating: 4.8,
    reviews: 41,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "หลังคาไวนิลคุณภาพสูง ระบบคลิปล็อค ติดตั้งง่าย ทึบแสง 100% กันแดดกันฝนได้ดีเยี่ยม"
  },
  {
    id: 3,
    name: "อลูมิเนียมรูฟ หนา 0.8mm สีเงิน",
    price: 380,
    originalPrice: 420,
    brand: "SCG",
    category: "opaque-roof",
    rating: 4.3,
    reviews: 18,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "หลังคาอลูมิเนียมคุณภาพสูง น้ำหนักเบา ทนทานต่อสภาพอากาศ ปิดแสงสนิท"
  },
  {
    id: 4,
    name: "เมทัลชีท หนา 0.7mm สีเขียว",
    price: 320,
    originalPrice: 380,
    brand: "TOA",
    category: "opaque-roof",
    rating: 4.4,
    reviews: 29,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "แผ่นเมทัลชีทหนาพิเศษ เคลือบสีคุณภาพ กันสนิมเยี่ยม ปิดแสง 100%"
  },

  // กันสาดโปร่งแสง (Translucent Roof)
  {
    id: 5,
    name: "ชินโคไลท์ แบบลอน ใส",
    price: 180,
    originalPrice: 220,
    brand: "Shinko",
    category: "translucent-roof",
    rating: 4.7,
    reviews: 67,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "แผ่นชินโคไลท์โปร่งแสง กัน UV 99% แต่อยู่สบายไม่ร้อน ทนทานต่อแรงกระแทก"
  },
  {
    id: 6,
    name: "โพลีอีตัน แบบเรียบ สีฟ้าใส",
    price: 195,
    originalPrice: 240,
    brand: "CPAC",
    category: "translucent-roof",
    rating: 4.5,
    reviews: 89,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "แผ่นโพลีอีตันคุณภาพสูง โปร่งแสงนุ่มนวล กัน UV เหมาะสำหรับพื้นที่ต้องการแสงธรรมชาติ"
  },
  {
    id: 7,
    name: "โพลีคาร์บอเนต แบบลอน หนา 6mm",
    price: 290,
    originalPrice: 350,
    brand: "SCG",
    category: "translucent-roof",
    rating: 4.9,
    reviews: 145,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "โพลีคาร์บอเนตพรีเมียม โปร่งแสงดีเยี่ยม กัน UV 100% ทนแรงกระแทกสูง"
  },
  {
    id: 8,
    name: "ชินโคไลท์ แบบเรียบ สีเขียวใส",
    price: 165,
    originalPrice: 200,
    brand: "Shinko",
    category: "translucent-roof",
    rating: 4.6,
    reviews: 78,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "แผ่นชินโคไลท์เรียบ โปร่งแสงสีเขียวอ่อน ให้แสงนุ่มตา กัน UV ได้ดี"
  },

  // อุปกรณ์ติดตั้ง (Installation Accessories)
  {
    id: 9,
    name: "สกรูหลังคา 6x150mm (100 ตัว)",
    price: 185,
    originalPrice: 220,
    brand: "SCG",
    category: "installation",
    rating: 4.3,
    reviews: 56,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "สกรูหลังคาคุณภาพสูง หัวฮ็อกซ์ ชุบกัลวาไนซ์ กันสนิม พร้อมปะเก็นยาง"
  },
  {
    id: 10,
    name: "รางน้ำฝนอลูมิเนียม 4 นิ้ว",
    price: 145,
    originalPrice: 180,
    brand: "TOA",
    category: "installation",
    rating: 4.5,
    reviews: 34,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "รางน้ำฝนอลูมิเนียมคุณภาพสูง ทนทานต่อสภาพอากาศ ไม่เป็นสนิม"
  },
  {
    id: 11,
    name: "ข้อต่อรางน้ำฝน มุม 90 องศา",
    price: 45,
    originalPrice: 55,
    brand: "CPAC",
    category: "installation",
    rating: 4.4,
    reviews: 28,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "ข้อต่อรางน้ำฝน พลาสติก ABS คุณภาพสูง ทนทานต่อรังสี UV"
  },
  {
    id: 12,
    name: "ยางรองหลังคา EPDM 3x50mm",
    price: 65,
    originalPrice: 80,
    brand: "SCG",
    category: "installation",
    rating: 4.6,
    reviews: 42,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "ยางรองหลังคา EPDM ทนทานต่อสภาพอากาศ ยืดหยุ่นดี กันน้ำรั่วซึม"
  },

  // เครื่องมือช่าง (Tools)
  {
    id: 13,
    name: "สว่านไฟฟ้า 18V พร้อมแบตเตอรี่",
    price: 2890,
    originalPrice: 3200,
    brand: "Makita",
    category: "tools",
    rating: 4.9,
    reviews: 145,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "สว่านไฟฟ้าพกพา แบตเตอรี่ลิเธียม เหมาะสำหรับงานติดตั้งหลังคา"
  },
  {
    id: 14,
    name: "เลื่อยฉลุ โรตารี่ 710W",
    price: 1850,
    originalPrice: 2100,
    brand: "Makita",
    category: "tools",
    rating: 4.7,
    reviews: 89,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "เลื่อยฉลุไฟฟ้า เหมาะสำหรับตัดแผ่นหลังคา ทำงานแม่นยำ"
  },

  // อุปกรณ์ฮาร์ดแวร์ (Hardware)
  {
    id: 15,
    name: "ตะปูปูน 3 นิ้ว (1 กิโลกรัม)",
    price: 85,
    originalPrice: 95,
    brand: "TOA",
    category: "hardware",
    rating: 4.3,
    reviews: 56,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "ตะปูเหล็กชุบสังกะสี กันสนิม แข็งแรงทนทาน เหมาะสำหรับงานก่อสร้าง"
  },

  // สี & วัสดุทาสี (Paint & Coating)
  {
    id: 16,
    name: "สีทาหลังคา TOA ชิลด์ สีแดง",
    price: 890,
    originalPrice: 950,
    brand: "TOA",
    category: "paint",
    rating: 4.7,
    reviews: 89,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "สีทาหลังคาคุณภาพสูง กันร้อน กันซึม ทนทานต่อแสงแดดและฝน ลดอุณหภูมิภายในบ้าน"
  },
  {
    id: 17,
    name: "สีรองพื้นกันสนิม Beger สีเทา",
    price: 450,
    originalPrice: 520,
    brand: "Beger",
    category: "paint",
    rating: 4.5,
    reviews: 67,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "สีรองพื้นกันสนิมสำหรับโลหะ ป้องกันการกร่อน เพิ่มความทนทานให้โครงสร้าง"
  },
  {
    id: 18,
    name: "สีน้ำมันเงา Dulux สีขาว 1 แกลลอน",
    price: 1250,
    originalPrice: 1400,
    brand: "Dulux",
    category: "paint",
    rating: 4.8,
    reviews: 125,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "สีน้ำมันเงาคุณภาพพรีเมียม ทาง่าย เรียบเนียน ทนทาน เหมาะสำหรับงานไม้และโลหะ"
  },
  {
    id: 19,
    name: "น้ำยาทำความสะอาดหลังคา SCG",
    price: 320,
    originalPrice: 380,
    brand: "SCG",
    category: "paint",
    rating: 4.4,
    reviews: 45,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "น้ำยาทำความสะอาดหลังคาพิเศษ กำจัดคราบสกปรก มอส เตรียมพื้นผิวก่อนทาสี"
  },
  {
    id: 20,
    name: "สีสเปรย์ Nippon Paint สีเงิน",
    price: 180,
    originalPrice: 220,
    brand: "Nippon",
    category: "paint",
    rating: 4.3,
    reviews: 38,
    image: "/placeholder-product.jpg",
    inStock: true,
    description: "สีสเปรย์คุณภาพสูง สำหรับงานซ่อมแซมจุดเล็ก ๆ แห้งเร็ว ติดทนทาน"
  }
];