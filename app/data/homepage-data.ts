// Homepage data - extracted to separate file for better organization
import { HeroImage } from '@/lib/types';

export const heroImages: HeroImage[] = [
  {
    src: "/hero-promotion/1.png",
    srcMobile: "/hero-mobile/1.png",
    alt: "SP Hardware - วัสดุก่อสร้างครบวงจร"
  },
  {
    src: "/hero-promotion/2.png",
    srcMobile: "/hero-mobile/2.png",
    alt: "SP Hardware - คุณภาพระดับพรีเมียม"  
  },
  {
    src: "/hero-promotion/3.png",
    srcMobile: "/hero-mobile/3.png",
    alt: "SP Hardware - เครื่องมือมืออาชีพ"
  }
];

export const promotionalCards = [
  {
    title: "เลือกวัสดุ",
    description: "เลือกซื้อวัสดุก่อสร้างคุณภาพสูง",
    discount: "เลือกเลย",
    link: "/categories",
    subtitle: "BUILD YOUR ULTIMATE",
    image: "/bg-incard/เลือกวัสดุ.webp"
  },
  {
    title: "ปรึกษาเรา",
    description: "ปรึกษาเรื่องวัสดุและการก่อสร้าง",
    discount: "สอบถาม",
    link: "https://line.me/R/ti/p/@576kulwa",
    subtitle: "BUILD YOUR ULTIMATE",
    image: "/bg-incard/ปรึกษา.webp"
  },
  {
    title: "เกี่ยวกับเรา",
    description: "SP Group ผู้เชี่ยวชาญด้านวัสดุก่อสร้าง",
    discount: "อ่านเพิ่ม",
    link: "/about",
    subtitle: "BUILD YOUR ULTIMATE",
    image: "/bg-incard/เกี่ยวกับเรา.webp"
  },
  {
    title: "อุปกรณ์ติดตั้ง",
    description: "สกรู ตะปู น็อต ลดสูงสุด 8%",
    discount: "8%",
    link: "/categories?cat=installation",
    subtitle: "BUILD YOUR ULTIMATE"
  }
];

export const brands = [
  { name: "BlueScope", image: "/partner/BlueScope.png", link: "/categories?brand=bluescope" },
  { name: "ZACS", image: "/partner/Zacs.png", link: "/categories?brand=zacs" },
  { name: "LionRoof", image: "/partner/Lionroof.png", link: "/categories?brand=lionroof" },
  { name: "DreamRoof", image: "/partner/DreamRoof.png", link: "/categories?brand=dreamroof" },
  { name: "RoofyRoof", image: "/partner/RoofyRoof.png", link: "/categories?brand=roofyroof" },
  { name: "Miniwave", image: "/partner/Miniwave.png", link: "/categories?brand=miniwave" },
  { name: "Makrolon", image: "/partner/Makrolon%20Polycabonate.png", link: "/categories?brand=makrolon" },
  { name: "Sunpoly", image: "/partner/Sunpoly%20Polycabonate.png", link: "/categories?brand=sunpoly" },
  { name: "TN Polycarbonate", image: "/partner/TN%20Polycarbonate.png", link: "/categories?brand=tn" },
  { name: "D-Lite FiberGlass", image: "/partner/D-Lite%20FiberGlass.png", link: "/categories?brand=dlite" },
  { name: "Goodsense", image: "/partner/Goodsense%20AluminiumRoof.png", link: "/categories?brand=goodsense" },
  { name: "Corner Stone", image: "/partner/Corner%20Stone%20Polycarbonate.png", link: "/categories?brand=cornerstone" },
  { name: "Inno Cons", image: "/partner/logo-inno-cons.png", link: "/categories?brand=innocons" },
  { name: "Inno Cons Logo", image: "/partner/inno-conslogo-02-1-2.png", link: "/categories?brand=innocons" },
  { name: "VG", image: "/partner/Logo%20-%20VG%20%E0%B8%82%E0%B8%B2%E0%B8%A7%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%81%E0%B8%A3%E0%B8%A1-01.png", link: "/categories?brand=vg" },
  { name: "Mini Gold", image: "/partner/logo-mini%20gold.png", link: "/categories?brand=minigold" },
  { name: "Rhino Plus", image: "/partner/logo-rhino%20plus.png", link: "/categories?brand=rhinoplus" },
  { name: "ชินโคไล", image: "/partner/%E0%B9%82%E0%B8%A5%E0%B9%82%E0%B8%81%E0%B9%89%E0%B8%8A%E0%B8%B4%E0%B8%99%E0%B9%82%E0%B8%84%E0%B9%84%E0%B8%A5.png", link: "/categories?brand=shinkolite" },
  { name: "ไวนิล S.B.", image: "/partner/%E0%B9%84%E0%B8%A7%E0%B8%99%E0%B8%B4%E0%B8%A5%20S.B..png", link: "/categories?brand=vinyl-sb" },
  { name: "ไวนิล ตราภูเขา", image: "/partner/%E0%B9%84%E0%B8%A7%E0%B8%99%E0%B8%B4%E0%B8%A5%20%E0%B8%95%E0%B8%A3%E0%B8%B2%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%82%E0%B8%B2.png", link: "/categories?brand=vinyl-mountain" },
  { name: "SP เมทัลชีท", image: "/partner/%E0%B9%80%E0%B8%AD%E0%B8%AA%E0%B8%9E%E0%B8%B5%20%E0%B9%80%E0%B8%A1%E0%B8%97%E0%B8%B1%E0%B8%A5%E0%B8%8A%E0%B8%B5%E0%B8%97.png", link: "/categories?brand=sp-metalsheet" }
];

export const customerReviews = [
  {
    id: 1,
    name: "สมชาย ก.",
    date: "10/06/25",
    rating: 5,
    title: "คุณภาพดีมาก",
    comment: "สินค้าของแท้ คุณภาพเยี่ยม ใช้งานได้ดีจริงๆ",
    verified: true,
    product: "เมทัลชีท SCG สีแดง กันสาดทึบแสง"
  },
  {
    id: 2,
    name: "วิชัย ส.",
    date: "10/06/25",
    rating: 5,
    title: "ง่ายต่อการติดตั้ง",
    comment: "ใช้เวลาแค่ 10 นาทีในการติดตั้ง พอดีกับรถเป็นอย่างดี",
    verified: true,
    product: "สว่านกระแทก Makita HP2050H เครื่องมือช่าง"
  },
  {
    id: 3,
    name: "นิรันดร์ พ.",
    date: "10/07/25",
    rating: 5,
    title: "สะอาดและสวยงาม",
    comment: "ติดตั้งง่ายมาก ดูสวยงามและเรียบร้อย",
    verified: true,
    product: "สีทาบ้าน TOA SuperShield 18L สีขาวมุก"
  },
  {
    id: 4,
    name: "ประเสริฐ ม.",
    date: "10/07/25",
    rating: 5,
    title: "ติดตั้งง่าย ดูดีมาก",
    comment: "ใส่น๊อตได้ง่าย ดูเรียบร้อยมาก คุ้มค่ามากๆ",
    verified: true,
    product: "สกรูหลังคา เบอร์ 14 ขนาด 6.3x75mm"
  },
  {
    id: 5,
    name: "ศุภชัย ร.",
    date: "09/28/25",
    rating: 5,
    title: "ราคาดี คุณภาพเยี่ยม",
    comment: "ซื้อมาใช้หลังบ้าน โปร่งแสงดี ทนทานมาก",
    verified: true,
    product: "ชินโคไลท์ โปร่งแสง 0.5mm กันสาดโปร่งแสง"
  },
  {
    id: 6,
    name: "อรรณพ ว.",
    date: "09/25/25",
    rating: 4,
    title: "ค้อนหนักดี มือจับนิ่ม",
    comment: "ใช้งานสะดวก น้ำหนักพอดี ไม่หนักเกินไป",
    verified: true,
    product: "ค้อนก้ามกระตุก Vessel หัวยาง น้ำหนัก 280g"
  }
];