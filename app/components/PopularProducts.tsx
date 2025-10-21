"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState<PopularProduct[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const nextProductSlide = () => {
    setCurrentProductSlide((prev) => {
      const cardsPerView = isMobile ? 1 : 3;
      const maxSlide = Math.max(0, products.length - cardsPerView);
      return prev >= maxSlide ? 0 : prev + 1;
    });
  };

  const prevProductSlide = () => {
    setCurrentProductSlide((prev) => {
      const cardsPerView = isMobile ? 1 : 3;
      const maxSlide = Math.max(0, products.length - cardsPerView);
      return prev <= 0 ? maxSlide : prev - 1;
    });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="py-16 bg-gray-100">
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
      <div className="py-16 bg-gray-100">
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
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 md:px-16 max-w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="text-left">
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-2">
              สินค้ายอดนิยม
            </h2>
            <Link href="/categories" className="inline-flex items-center text-gray-600 hover:text-gray-900 font-semibold text-lg group">
              ดูสินค้าทั้งหมด
              <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {/* Navigation Controls - Hidden on mobile */}
          <div className="hidden md:flex space-x-2">
            <button 
              onClick={prevProductSlide}
              className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-all duration-300 rounded-full group"
            >
              <ChevronLeft className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={nextProductSlide}
              className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-all duration-300 rounded-full group"
            >
              <ChevronRight className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
        
        {/* Scrollable Products Container */}
        <div className="overflow-hidden md:block">
          <div className="md:hidden overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4 pb-4 px-1">
              {products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group flex-shrink-0 w-80">
                  <div className="bg-white transition-colors duration-300 overflow-hidden">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="320px"
                        />
                      ) : product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="320px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-gray-400 text-sm">ไม่มีรูปภาพ</span>
                        </div>
                      )}
                      {/* Brand Badge */}
                      <div className="absolute top-4 left-4 bg-gray-900 text-white text-sm font-bold px-4 py-2">
                        {product.brand}
                      </div>
                      {/* Discount */}
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-4 py-2">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </div>
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-bold text-gray-900 text-base leading-tight mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors">
                        {product.name}
                      </h3>
                      
                      {/* Category */}
                      <p className="text-sm text-gray-600 font-medium mb-6 uppercase tracking-wide">{product.category}</p>
                      
                      {/* Price */}
                      <div className="border-t border-gray-200 pt-6 mt-auto">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl font-bold text-gray-900">฿{product.price.toLocaleString()}</span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="text-base text-gray-500 line-through ml-3">฿{product.originalPrice.toLocaleString()}</span>
                            )}
                          </div>
                          <span className={`text-sm font-bold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                            {product.inStock ? 'มีสินค้า' : 'หมด'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div 
              className="flex space-x-8 pb-4 transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentProductSlide * 416}px)`
              }}
            >
              {products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group flex-shrink-0 w-80 md:w-96">
                  <div className="bg-white transition-colors duration-300 overflow-hidden">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="384px"
                        />
                      ) : product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="384px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-gray-400">ไม่มีรูปภาพ</span>
                        </div>
                      )}
                      {/* Brand Badge */}
                      <div className="absolute top-4 left-4 bg-gray-900 text-white text-sm font-bold px-4 py-2">
                        {product.brand}
                      </div>
                      {/* Discount */}
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-4 py-2">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </div>
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-bold text-gray-900 text-base lg:text-lg leading-tight mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors">
                        {product.name}
                      </h3>
                      
                      {/* Category */}
                      <p className="text-sm text-gray-600 font-medium mb-6 uppercase tracking-wide">{product.category}</p>
                      
                      {/* Price */}
                      <div className="border-t border-gray-200 pt-6 mt-auto">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl lg:text-2xl font-bold text-gray-900">฿{product.price.toLocaleString()}</span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="text-base text-gray-500 line-through ml-3">฿{product.originalPrice.toLocaleString()}</span>
                            )}
                          </div>
                          <span className={`text-sm font-bold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                            {product.inStock ? 'มีสินค้า' : 'หมด'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
