"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Package, Star } from "lucide-react";
import Link from "next/link";
import { popularProducts } from "../data/homepage-data";

export default function PopularProducts() {
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
      const maxSlide = Math.max(0, popularProducts.length - cardsPerView);
      return prev >= maxSlide ? 0 : prev + 1;
    });
  };

  const prevProductSlide = () => {
    setCurrentProductSlide((prev) => {
      const cardsPerView = isMobile ? 1 : 3;
      const maxSlide = Math.max(0, popularProducts.length - cardsPerView);
      return prev <= 0 ? maxSlide : prev - 1;
    });
  };

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
              {popularProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group flex-shrink-0 w-80">
                  <div className="bg-white transition-colors duration-300 overflow-hidden">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-20 w-20 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                      {/* Badge */}
                      <div className="absolute top-4 left-4 bg-gray-900 text-white text-sm font-bold px-4 py-2">
                        {product.badge}
                      </div>
                      {/* Discount */}
                      <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-4 py-2">
                        {product.discount}
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-bold text-gray-900 text-base leading-tight mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors">
                        {product.name}
                      </h3>
                      
                      {/* Category */}
                      <p className="text-sm text-gray-600 font-medium mb-4 uppercase tracking-wide">{product.category}</p>
                      
                      {/* Rating & Sold */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-500 fill-current" />
                          <span className="text-base text-gray-700 ml-2 font-medium">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">{product.sold} รีวิว</span>
                      </div>
                      
                      {/* Price */}
                      <div className="border-t border-gray-200 pt-6 mt-auto">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl font-bold text-gray-900">฿{product.price}</span>
                            <span className="text-base text-gray-500 line-through ml-3">฿{product.originalPrice}</span>
                          </div>
                          <span className="text-sm text-green-600 font-bold">มีสินค้า</span>
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
              {popularProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group flex-shrink-0 w-80 md:w-96">
                  <div className="bg-white transition-colors duration-300 overflow-hidden">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-20 w-20 lg:h-24 lg:w-24 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                      {/* Badge */}
                      <div className="absolute top-4 left-4 bg-gray-900 text-white text-sm font-bold px-4 py-2">
                        {product.badge}
                      </div>
                      {/* Discount */}
                      <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-4 py-2">
                        {product.discount}
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-bold text-gray-900 text-base lg:text-lg leading-tight mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors">
                        {product.name}
                      </h3>
                      
                      {/* Category */}
                      <p className="text-sm text-gray-600 font-medium mb-4 uppercase tracking-wide">{product.category}</p>
                      
                      {/* Rating & Sold */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-500 fill-current" />
                          <span className="text-base text-gray-700 ml-2 font-medium">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">{product.sold} รีวิว</span>
                      </div>
                      
                      {/* Price */}
                      <div className="border-t border-gray-200 pt-6 mt-auto">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl lg:text-2xl font-bold text-gray-900">฿{product.price}</span>
                            <span className="text-base text-gray-500 line-through ml-3">฿{product.originalPrice}</span>
                          </div>
                          <span className="text-sm text-green-600 font-bold">มีสินค้า</span>
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
