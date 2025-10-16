import { NextResponse } from 'next/server'
import { searchProducts, getProductsByCategory, getProductsByBrand } from '@/lib/database'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')

    let products = []

    if (query) {
      // ค้นหาสินค้าตามคำค้นหา
      products = await searchProducts(query)
    } else if (category) {
      // กรองตามหมวดหมู่
      products = await getProductsByCategory(category)
    } else if (brand) {
      // กรองตามแบรนด์
      products = await getProductsByBrand(brand)
    } else {
      // ถ้าไม่มีพารามิเตอร์ ให้ส่ง error
      return NextResponse.json(
        { error: 'Missing search parameters' },
        { status: 400 }
      )
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error('API Error - Search Products:', error)
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    )
  }
}