import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET() {
  try {
    console.log('API: Fetching categories...')
    
    // Try direct Supabase call first
    const { data, error } = await supabase
      .from('categories')
      .select('id, name')
      .order('name')

    if (error) {
      console.error('Supabase Error:', error)
      throw error
    }

    console.log('Categories from DB:', data)

    // Add "ทั้งหมด" category and return
    const result = [
      { id: 'all', name: 'ทั้งหมด' },
      ...(data || [])
    ]

    console.log('Final categories result:', result)
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('API Error - Get Categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, name } = body

    if (!id || !name) {
      return NextResponse.json(
        { error: 'Missing required fields: id, name' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('categories')
      .insert({ id, name })
      .select()
      .single()

    if (error) {
      console.error('Database Error - Create Category:', error)
      return NextResponse.json(
        { error: 'Failed to create category', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('API Error - Create Category:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, name } = body

    if (!id || !name) {
      return NextResponse.json(
        { error: 'Missing required fields: id, name' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('categories')
      .update({ name })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database Error - Update Category:', error)
      return NextResponse.json(
        { error: 'Failed to update category', details: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API Error - Update Category:', error)
    return NextResponse.json(
      { error: 'Failed to update category' },
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
        { error: 'Category ID is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database Error - Delete Category:', error)
      return NextResponse.json(
        { error: 'Failed to delete category', details: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Category deleted successfully', data })
  } catch (error) {
    console.error('API Error - Delete Category:', error)
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}