import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, is_popular } = body;

    if (!id || typeof is_popular !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid request: id and is_popular (boolean) are required' },
        { status: 400 }
      );
    }

    // Update product is_popular status
    const { data, error } = await supabase
      .from('products')
      .update({ is_popular })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating product popular status:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      product: data[0],
      message: `Product ${is_popular ? 'marked as' : 'removed from'} popular`
    });
  } catch (error) {
    console.error('Error in update popular API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
