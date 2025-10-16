import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET() {
  try {
    console.log('Public Products API: Fetching products...')
    
    // Direct Supabase query - show all products
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

    if (error) {
      console.error('Supabase Error:', error)
      throw error
    }

    console.log('Public Products from DB:', data?.length || 0, 'items')
    
    // Map to consistent format (same as admin)
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

    console.log('Final public products result:', products.length, 'items')
    return NextResponse.json(products)
    
  } catch (error) {
    console.error('API Error - Get Products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      name, 
      price, 
      original_price, 
      brand_id, 
      category_id, 
      image,
      in_stock, 
      description 
    } = body

    // Validate required fields
    if (!name || !price || !brand_id || !category_id) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, brand_id, category_id' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('products')
      .insert({
        name,
        price: parseFloat(price),
        original_price: original_price ? parseFloat(original_price) : null,
        brand_id,
        category_id,
        image: image || null,
        in_stock: in_stock !== undefined ? in_stock : true,
        description: description || null
      })
      .select()
      .single()

    // Store images array in the description field temporarily or handle it differently
    // For now, we'll just use the first image as the main image

    if (error) {
      console.error('Database Error - Create Product:', error)
      
      // ถ้า custom_id ซ้ำ ให้ใช้ auto-generated ID แทน
      if (error.code === '23505') { // unique constraint violation
        console.log('Custom ID already exists, trying without custom_id...')
        
        const { data: retryData, error: retryError } = await supabase
          .from('products')
          .insert({
            name,
            price: parseFloat(price),
            original_price: original_price ? parseFloat(original_price) : null,
            brand_id,
            category_id,
            image: image || null,
            in_stock: in_stock !== undefined ? in_stock : true,
            description: description || null
          })
          .select()
          .single()
          
        if (retryError) {
          return NextResponse.json(
            { error: 'Failed to create product', details: retryError.message },
            { status: 500 }
          )
        }
        
        return NextResponse.json(retryData, { status: 201 })
      }
      
      return NextResponse.json(
        { error: 'Failed to create product', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('API Error - Create Product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { 
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
    } = body

    // Validate required fields
    if (!id || !name || !price || !brand_id || !category_id) {
      return NextResponse.json(
        { error: 'Missing required fields: id, name, price, brand_id, category_id' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('products')
      .update({
        name,
        price: parseFloat(price),
        original_price: original_price ? parseFloat(original_price) : null,
        brand_id,
        category_id,
        rating: rating ? parseFloat(rating) : 0,
        reviews: reviews ? parseInt(reviews) : 0,
        image: image || null,
        in_stock: in_stock !== undefined ? in_stock : true,
        description: description || null
      })
      .eq('id', parseInt(id))
      .select()
      .single()

    if (error) {
      console.error('Database Error - Update Product:', error)
      return NextResponse.json(
        { error: 'Failed to update product', details: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API Error - Update Product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', parseInt(id))
      .select()
      .single()

    if (error) {
      console.error('Database Error - Delete Product:', error)
      return NextResponse.json(
        { error: 'Failed to delete product', details: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Product deleted successfully', data })
  } catch (error) {
    console.error('API Error - Delete Product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}