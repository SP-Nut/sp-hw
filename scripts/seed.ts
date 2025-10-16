// Seed script สำหรับอัพโหลดข้อมูลไป Supabase
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// โหลด environment variables
config({ path: '.env.local' })

// Define data inline (moved from mock files)
const categories = [
  { id: "opaque-roof", name: "หลังคาเมทัลชีทอึทึบ" },
  { id: "translucent-roof", name: "หลังคาเมทัลชีทโปร่งแสง" },
  { id: "installation", name: "วัสดุติดตั้ง" },
  { id: "tools", name: "เครื่องมือ" },
  { id: "hardware", name: "ฮาร์ดแวร์" },
  { id: "paint", name: "สี" },
  { id: "others", name: "อื่นๆ" }
];

const brands = [
  { id: "SCG", name: "SCG" },
  { id: "Thaibev", name: "Thaibev" },
  { id: "CP", name: "CP" },
  { id: "Sahapat", name: "สหพัฒน์" },
  { id: "Siam", name: "สยาม" },
  { id: "Thai", name: "ไทย" },
  { id: "Asia", name: "เอเชีย" },
  { id: "Global", name: "โกลบอล" },
  { id: "Standard", name: "มาตรฐาน" },
  { id: "Premium", name: "พรีเมียม" },
  { id: "Economy", name: "ประหยัด" },
  { id: "Professional", name: "โปรเฟสชั่นนัล" },
  { id: "Industrial", name: "อุตสาหกรรม" },
  { id: "Commercial", name: "คอมเมอร์เชียล" },
  { id: "Residential", name: "ที่อยู่อาศัย" },
  { id: "Universal", name: "ยูนิเวอร์แซล" },
  { id: "Supreme", name: "สุพรีม" },
  { id: "Ultimate", name: "อัลติเมท" },
  { id: "Advanced", name: "แอดวานซ์" },
  { id: "Basic", name: "เบสิค" },
  { id: "Essential", name: "เอสเซนเชียล" },
  { id: "Plus", name: "พลัส" },
  { id: "Max", name: "แม็กซ์" },
  { id: "Pro", name: "โปร" },
  { id: "Super", name: "ซุปเปอร์" },
  { id: "Mega", name: "เมก้า" },
  { id: "Ultra", name: "อัลตรา" },
  { id: "Elite", name: "อีลิท" },
  { id: "Master", name: "มาสเตอร์" }
];

// Sample products data - you may want to add more
const products = [
  {
    id: 1,
    name: "หลังคาเมทัลชีท ตรา SCG 0.35 มม.",
    price: 450,
    originalPrice: 500,
    brand: "SCG",
    category: "หลังคาเมทัลชีทอึทึบ",
    rating: 4.5,
    reviews: 28,
    image: "/images/products/roof-sheet-1.jpg",
    inStock: true,
    description: "หลังคาเมทัลชีทคุณภาพสูง กันสนิม ทนทาน เหมาะสำหรับการก่อสร้าง"
  }
  // Add more sample products as needed
];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // ใช้ service role key สำหรับ seed

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables:')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌')
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅' : '❌')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedCategories() {
  console.log('🌱 Seeding categories...')
  
  // กรองเอาแค่ category ที่ไม่ใช่ 'all'
  const categoriesToSeed = categories
    .filter(cat => cat.id !== 'all')
    .map(cat => ({
      id: cat.id,
      name: cat.name
    }))

  const { data, error } = await supabase
    .from('categories')
    .upsert(categoriesToSeed, { onConflict: 'id' })

  if (error) {
    console.error('❌ Error seeding categories:', error)
    throw error
  }

  console.log(`✅ Seeded ${categoriesToSeed.length} categories`)
  return data
}

async function seedBrands() {
  console.log('🌱 Seeding brands...')
  
  // กรองเอาแค่ brand ที่ไม่ใช่ 'all'
  const brandsToSeed = brands
    .filter(brand => brand.id !== 'all')
    .map(brand => ({
      id: brand.id,
      name: brand.name
    }))

  const { data, error } = await supabase
    .from('brands')
    .upsert(brandsToSeed, { onConflict: 'id' })

  if (error) {
    console.error('❌ Error seeding brands:', error)
    throw error
  }

  console.log(`✅ Seeded ${brandsToSeed.length} brands`)
  return data
}

async function seedProducts() {
  console.log('🌱 Seeding products...')
  
  // ลบข้อมูลเดิมก่อน
  await supabase.from('products').delete().neq('id', 0)
  
  const productsToSeed = products.map(product => ({
    name: product.name,
    price: product.price,
    original_price: product.originalPrice,
    brand_id: product.brand,
    category_id: product.category,
    rating: product.rating,
    reviews: product.reviews,
    image: product.image,
    in_stock: product.inStock,
    description: product.description
  }))

  const { data, error } = await supabase
    .from('products')
    .insert(productsToSeed)

  if (error) {
    console.error('❌ Error seeding products:', error)
    throw error
  }

  console.log(`✅ Seeded ${productsToSeed.length} products`)
  return data
}

async function main() {
  try {
    console.log('🚀 Starting database seed...')
    
    // Seed ตามลำดับ (categories และ brands ก่อน แล้วค่อย products)
    await seedCategories()
    await seedBrands()
    await seedProducts()
    
    console.log('🎉 Database seed completed successfully!')
  } catch (error) {
    console.error('💥 Seed failed:', error)
    process.exit(1)
  }
}

// Run the seed function
if (require.main === module) {
  main()
}

export { seedCategories, seedBrands, seedProducts }