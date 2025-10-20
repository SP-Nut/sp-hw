import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test API call to our own products endpoint
    const response = await fetch('http://localhost:3000/api/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    console.log('Test Internal API - Products received:', data?.length || 0);
    if (data && data.length > 0) {
      console.log('Sample products for frontend test:', data.slice(0, 2));
    }

    return NextResponse.json({
      status: 'success',
      productsCount: data?.length || 0,
      sampleProducts: data?.slice(0, 2) || [],
      message: 'Products API test completed'
    });
    
  } catch (error) {
    console.error('Test API Error:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        error: 'Failed to test products API', 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}