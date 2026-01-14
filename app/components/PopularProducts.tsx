"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ShoppingCart, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../contexts/CartContext";

interface PopularProduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  brand: string;
  category: string;
  image?: string;
  images?: string[];
  inStock: boolean;
  description?: string;
}

export default function PopularProducts() {
  const [products, setProducts] = useState<PopularProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedProducts, setAddedProducts] = useState<Set<number>>(new Set());
  const { addToCart, isInCart } = useCart();

  // Fetch popular products from API
  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await fetch('/api/products/popular');
        const data = await response.json();
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching popular products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: PopularProduct) => {
    e.preventDefault();
    e.stopPropagation();
    
    const imageUrl = product.images?.[0] || product.image || '';
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      brand: product.brand,
      image: imageUrl,
      inStock: product.inStock
    });

    // Show added feedback
    setAddedProducts(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 1500);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 md:px-16 max-w-full">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e2e4f] mx-auto mb-4"></div>
            <p className="text-gray-600">กำลังโหลดสินค้ายอดนิยม...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show message if no popular products
  if (products.length === 0) {
    return (
      <div className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 md:px-16 max-w-full">
          <div className="text-center py-12">
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4">
              สินค้ายอดนิยม
            </h2>
            <p className="text-gray-600">ยังไม่มีสินค้ายอดนิยม</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 md:px-16 max-w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1e2e4f] mb-1">
              สินค้ายอดนิยม
            </h2>
          </div>
          <Link href="/categories" className="inline-flex items-center text-[#31487a] hover:text-[#1e2e4f] font-semibold text-sm sm:text-base group">
            ดูทั้งหมด
            <ChevronRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* Products Grid - 2 columns mobile, 3 tablet, 4 desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {products.map((product) => {
            const justAdded = addedProducts.has(product.id);
            const inCart = isInCart(product.id);
            
            return (
              <div key={product.id} className="group relative">
                <Link href={`/product/${product.id}`}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      ) : product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-gray-400 text-xs">ไม่มีรูปภาพ</span>
                        </div>
                      )}
                      {/* Brand Badge */}
                      <div className="absolute top-2 left-2 bg-[#1e2e4f] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                        {product.brand}
                      </div>
                      {/* Discount */}
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </div>
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-2.5 sm:p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight mb-1.5 sm:mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem]">
                        {product.name}
                      </h3>
                      
                      {/* Category - Hidden on small mobile */}
                      <p className="hidden sm:block text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">{product.category}</p>
                      
                      {/* Price */}
                      <div className="mt-auto">
                        <div className="flex items-baseline gap-1.5 mb-2">
                          <span className="text-base sm:text-lg font-bold text-[#1e2e4f]">฿{product.price.toLocaleString()}</span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-[10px] sm:text-xs text-gray-400 line-through">฿{product.originalPrice.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                
                {/* Add to Cart Button - Overlay at bottom */}
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  disabled={!product.inStock}
                  className={`absolute bottom-2.5 sm:bottom-4 right-2.5 sm:right-4 p-2 sm:p-2.5 rounded-full shadow-lg transition-all duration-300 ${
                    justAdded 
                      ? 'bg-green-500 text-white' 
                      : inCart
                        ? 'bg-[#1e2e4f] text-white'
                        : product.inStock 
                          ? 'bg-white text-[#1e2e4f] hover:bg-[#1e2e4f] hover:text-white' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {justAdded ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
