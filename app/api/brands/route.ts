import { NextResponse } from 'next/server'
import { getAllBrands } from '@/lib/database'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET() {
  try {
    const brands = await getAllBrands()
    return NextResponse.json(brands)
  } catch (error) {
    console.error('API Error - Get Brands:', error)
    return NextResponse.json(
      { error: 'Failed to fetch brands' },
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
      .from('brands')
      .insert({ id, name })
      .select()
      .single()

    if (error) {
      console.error('Database Error - Create Brand:', error)
      return NextResponse.json(
        { error: 'Failed to create brand', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('API Error - Create Brand:', error)
    return NextResponse.json(
      { error: 'Failed to create brand' },
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
      .from('brands')
      .update({ name })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database Error - Update Brand:', error)
      return NextResponse.json(
        { error: 'Failed to update brand', details: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Brand not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API Error - Update Brand:', error)
    return NextResponse.json(
      { error: 'Failed to update brand' },
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
        { error: 'Brand ID is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('brands')
      .delete()
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database Error - Delete Brand:', error)
      return NextResponse.json(
        { error: 'Failed to delete brand', details: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Brand not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Brand deleted successfully', data })
  } catch (error) {
    console.error('API Error - Delete Brand:', error)
    return NextResponse.json(
      { error: 'Failed to delete brand' },
      { status: 500 }
    )
  }
}