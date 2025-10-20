import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET() {
  try {
    console.log('Debug Products API: Checking product images...')
    
    const { data, error } = await supabase
      .from('products')
      .select('id, name, image')
      .limit(5)

    if (error) {
      console.error('Supabase Error:', error)
      throw error
    }

    console.log('Debug Products - Raw data from DB:', data)

    const result = {
      count: data?.length || 0,
      products: data?.map(p => ({
        id: p.id,
        name: p.name,
        image: p.image,
        hasImage: !!p.image,
        imageLength: p.image?.length || 0
      })) || []
    }

    console.log('Debug Products - Final result:', result)
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('Debug API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch debug products', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}