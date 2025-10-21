import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get popular products with brand and category info
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        brand:brands(id, name),
        category:categories(id, name)
      `)
      .eq('is_popular', true)
      .eq('in_stock', true)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching popular products:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform the data to match frontend expectations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedProducts = (products || []).map((product: any) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.original_price,
      brand: product.brand?.name || product.brand_id,
      category: product.category?.name || product.category_id,
      rating: product.rating,
      reviews: product.reviews,
      image: product.image,
      images: product.images,
      inStock: product.in_stock,
      isPopular: product.is_popular,
      description: product.description,
    }));

    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error('Error in popular products API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
