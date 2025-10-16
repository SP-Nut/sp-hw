import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    
    console.log('GET Product API - ID:', id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Supabase Error:', error)
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }
      throw error
    }

    console.log('Product found:', data)
    
    // Map to consistent format (same as main products API)
    const product = {
      id: data.id,
      name: data.name,
      price: data.price,
      original_price: data.original_price || undefined,
      brand_id: data.brand_id || '',
      category_id: data.category_id || '',
      rating: data.rating || 0,
      reviews: data.reviews || 0,
      image: data.image || undefined,
      in_stock: data.in_stock !== null ? data.in_stock : true,
      description: data.description || undefined,
      // Legacy fields for backward compatibility
      brand: data.brand_id || null,
      category: data.category_id || null,
      originalPrice: data.original_price || null,
      inStock: data.in_stock !== null ? data.in_stock : true
    }
    
    return NextResponse.json(product)
  } catch (error) {
    console.error('API Error - Get Product by ID:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    
    console.log('PUT Product API - ID:', id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    console.log('PUT Product API - Body:', body)
    
    // Validate required fields
    if (!body.name || body.price === undefined) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      )
    }

    // Prepare update object
    const updateData: Record<string, unknown> = {}
    
    if (body.name !== undefined) updateData.name = body.name
    if (body.price !== undefined) updateData.price = parseFloat(body.price)
    if (body.original_price !== undefined) updateData.original_price = body.original_price ? parseFloat(body.original_price) : null
    if (body.brand_id !== undefined) updateData.brand_id = body.brand_id
    if (body.category_id !== undefined) updateData.category_id = body.category_id
    if (body.rating !== undefined) updateData.rating = body.rating
    if (body.reviews !== undefined) updateData.reviews = body.reviews
    if (body.image !== undefined) updateData.image = body.image
    if (body.in_stock !== undefined) updateData.in_stock = body.in_stock
    if (body.description !== undefined) updateData.description = body.description

    console.log('Update data:', updateData)

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase Update Error:', error)
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }
      throw error
    }

    console.log('Product updated successfully:', data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('API Error - Update Product:', error)
    return NextResponse.json(
      { error: 'Failed to update product', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    
    console.log('DELETE Product API - ID:', id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase Delete Error:', error)
      throw error
    }

    console.log('Product deleted successfully:', id)
    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('API Error - Delete Product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}