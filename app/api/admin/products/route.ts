import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET() {
  try {
    console.log('Admin Products API: Fetching products...')
    
    // Direct Supabase query
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        price,
        original_price,
        brand_id,
        category_id,
        rating,
        reviews,
        image,
        in_stock,
        description
      `)
      .order('id')
    
    console.log('Admin Products from DB:', data?.length || 0, 'items')
    console.log('Admin Products names:', data?.map(p => p.name).slice(0, 5))

    if (error) {
      console.error('Supabase Error:', error)
      throw error
    }

    console.log('Products from DB:', data?.length || 0, 'items')
    console.log('Sample product:', data?.[0])

    // Map to consistent format
    const products = (data || []).map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      original_price: product.original_price || undefined,
      brand_id: product.brand_id || '',
      category_id: product.category_id || '',
      rating: product.rating || 0,
      reviews: product.reviews || 0,
      image: product.image || undefined,
      in_stock: product.in_stock !== null ? product.in_stock : true,
      description: product.description || undefined,
      // Legacy fields for backward compatibility
      brand: product.brand_id || null,
      category: product.category_id || null,
      originalPrice: product.original_price || null,
      inStock: product.in_stock !== null ? product.in_stock : true
    }))

    console.log('Final products result:', products.length, 'items')
    return NextResponse.json(products)
    
  } catch (error) {
    console.error('API Error - Get Admin Products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin products', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}