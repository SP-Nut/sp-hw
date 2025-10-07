"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Grid, List, ShoppingCart, Search, Check, Plus } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { categories } from "../data/categories";
import { brands } from "../data/brands";
import { products } from "../data/products";
import { filterProducts, sortProducts, paginateProducts, getBrandCounts } from "../data/utils";

export default function Categories() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [addedToCart, setAddedToCart] = useState<{[key: number]: boolean}>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 8;
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const handleAddToCart = (product: typeof products[0]) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      brand: product.brand,
      image: product.image,
      inStock: product.inStock
    };
    
    addToCart(cartItem);
    
    // Show feedback animation
    setAddedToCart(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('cat');

  // Set initial category based on URL parameter
  useEffect(() => {
    if (categoryParam && categoryParam !== 'all') {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);



  // Get brand counts
  const brandCounts = getBrandCounts(products);

  // Apply filters and sorting
  const filteredProducts = filterProducts(products, {
    category: selectedCategory,
    brand: selectedBrand,
    priceRange: priceRange,
    searchTerm: searchTerm
  });

  const sortedProducts = sortProducts(filteredProducts, sortBy);

  // Apply pagination
  const paginationResult = paginateProducts(sortedProducts, currentPage, itemsPerPage);
  const { products: currentProducts, totalPages, startIndex, endIndex } = paginationResult;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, priceRange, sortBy, searchTerm]);




  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#1E2E4F] text-white">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <h1 className="text-4xl font-bold text-white mb-3">
            {selectedCategory === 'all' ? 'หมวดหมู่สินค้า' : 
             categories.find(cat => cat.id === selectedCategory)?.name || 'หมวดหมู่สินค้า'}
          </h1>
          <p className="text-lg text-[#8FB3E2]">เลือกซื้อวัสดุก่อสร้างคุณภาพสูง</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white shadow-sm border border-gray-200 p-6 space-y-6">
              {/* Search */}
              <div>
                <h3 className="font-semibold text-lg text-[#1E2E4F] mb-3 pb-2 border-b border-gray-100">ค้นหาสินค้า</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ค้นหาสินค้า..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 focus:border-[#31487A] focus:outline-none bg-white transition-colors text-[#1E2E4F]"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      type="button"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold text-lg text-[#1E2E4F] mb-3 pb-2 border-b border-gray-100">หมวดหมู่</h3>
                <div className="space-y-1">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 transition-colors font-medium ${
                        selectedCategory === category.id
                          ? 'bg-[#1E2E4F] text-white'
                          : 'text-[#1E2E4F] hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className={`text-sm ${
                          selectedCategory === category.id 
                            ? 'text-[#8FB3E2]' 
                            : 'text-gray-500'
                        }`}>({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-lg text-[#1E2E4F] mb-3 pb-2 border-b border-gray-100">ช่วงราคา</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="ต่ำสุด"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 text-[#1E2E4F] focus:border-[#31487A] focus:outline-none transition-colors"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="สูงสุด"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
                      className="w-full px-3 py-2 border border-gray-300 text-[#1E2E4F] focus:border-[#31487A] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="text-sm text-[#31487A] bg-gray-50 p-2 text-center border">
                    ฿{priceRange[0].toLocaleString()} - ฿{priceRange[1].toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Brand */}
              <div>
                <h3 className="font-semibold text-lg text-[#1E2E4F] mb-3 pb-2 border-b border-gray-100">แบรนด์</h3>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 focus:border-[#31487A] focus:outline-none text-[#1E2E4F] bg-white transition-colors"
                >
                  {brands.map(brand => {
                    const brandCount = brand.id === 'all' 
                      ? products.length 
                      : brandCounts[brand.id] || 0;
                    
                    return (
                      <option key={brand.id} value={brand.id}>
                        {brand.name} ({brandCount})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Reset Filters */}
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange([0, 10000]);
                  setSelectedBrand('all');
                  setSearchTerm('');
                  setCurrentPage(1);
                }}
                className="w-full py-2 text-[#31487A] border border-[#31487A] hover:bg-[#31487A] hover:text-white transition-colors"
              >
                ล้างตัวกรอง
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[#1E2E4F] font-medium">
                    แสดง {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)} จาก {sortedProducts.length} รายการ
                  </span>
                  {searchTerm && (
                    <div className="text-sm text-[#31487A] mt-1">
                      ผลการค้นหา: &ldquo;{searchTerm}&rdquo;
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 focus:border-[#31487A] focus:outline-none text-[#1E2E4F] bg-white transition-colors"
                  >
                    <option value="name">เรียงตามชื่อ</option>
                    <option value="price-low">ราคาต่ำ - สูง</option>
                    <option value="price-high">ราคาสูง - ต่ำ</option>
                    <option value="rating">คะแนนสูงสุด</option>
                  </select>

                  {/* View Toggle */}
                  <div className="flex border border-gray-300">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#1E2E4F] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 transition-colors border-l border-gray-300 ${viewMode === 'list' ? 'bg-[#1E2E4F] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map(product => (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <div className="group relative bg-white hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-gray-300">
                    {/* Image Container */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
                      <div className="h-full flex items-center justify-center">
                        <span className="text-gray-400 font-medium text-sm">รูปสินค้า</span>
                      </div>
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                        <div className="bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-bold text-[#31487A] shadow-sm">
                          {product.brand}
                        </div>
                        {product.originalPrice > product.price && (
                          <div className="bg-red-500 text-white px-2 py-1 text-xs font-bold">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </div>
                        )}
                      </div>
                      
                      {/* Stock Status */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                          <div className="bg-white text-gray-900 px-4 py-2 font-bold text-sm">
                            สินค้าหมด
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      {/* Title */}
                      <h4 className="font-semibold text-base text-[#1E2E4F] mb-2 line-clamp-2 leading-tight">
                        {product.name}
                      </h4>
                      
                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                      
                      {/* Price and Button */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-[#1E2E4F]">฿{product.price.toLocaleString()}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ฿{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <button 
                          disabled={!product.inStock}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
                            product.inStock 
                              ? addedToCart[product.id]
                                ? 'bg-green-600 text-white'
                                : isInCart(product.id)
                                ? 'bg-[#31487A] text-white hover:bg-[#1E2E4F]'
                                : 'bg-[#1E2E4F] text-white hover:bg-[#31487A]'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {addedToCart[product.id] ? (
                            <><Check className="h-4 w-4 inline mr-1" />เพิ่มแล้ว</>
                          ) : isInCart(product.id) ? (
                            <><Plus className="h-4 w-4 inline mr-1" />เพิ่ม ({getItemQuantity(product.id)})</>
                          ) : (
                            <><ShoppingCart className="h-4 w-4 inline mr-1" />{product.inStock ? 'เพิ่ม' : 'หมด'}</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {currentProducts.map(product => (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <div className="bg-white border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden">
                      <div className="flex">
                      {/* Image Section */}
                      <div className="relative w-48 h-32 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex-shrink-0">
                        <div className="h-full flex items-center justify-center">
                          <span className="text-gray-400 text-sm">รูปสินค้า</span>
                        </div>
                        
                        {/* Badges */}
                        <div className="absolute top-2 left-2 right-2 flex justify-between">
                          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-bold text-[#31487A]">
                            {product.brand}
                          </div>
                          {product.originalPrice > product.price && (
                            <div className="bg-red-500 text-white px-2 py-1 text-xs font-bold">
                              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                            </div>
                          )}
                        </div>
                        
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                            <div className="bg-white text-gray-900 px-3 py-1 font-bold text-xs">
                              หมด
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-[#1E2E4F] mb-2 leading-tight">
                              {product.name}
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                              {product.description}
                            </p>
                            <span className="text-sm text-gray-500">
                              ({product.reviews} รีวิว)
                            </span>
                          </div>
                          
                          {/* Price and Button Section */}
                          <div className="text-right ml-6">
                            <div className="text-xl font-bold text-[#1E2E4F] mb-1">
                              ฿{product.price.toLocaleString()}
                            </div>
                            {product.originalPrice > product.price && (
                              <div className="text-sm text-gray-500 line-through mb-3">
                                ฿{product.originalPrice.toLocaleString()}
                              </div>
                            )}
                            <button 
                              disabled={!product.inStock}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                              }}
                              className={`px-4 py-2 font-medium text-sm transition-all duration-300 ${
                                product.inStock 
                                  ? addedToCart[product.id]
                                    ? 'bg-green-600 text-white'
                                    : isInCart(product.id)
                                    ? 'bg-[#31487A] text-white hover:bg-[#1E2E4F]'
                                    : 'bg-[#1E2E4F] text-white hover:bg-[#31487A]'
                                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              {addedToCart[product.id] ? (
                                <><Check className="h-4 w-4 inline mr-2" />เพิ่มแล้ว</>
                              ) : isInCart(product.id) ? (
                                <><Plus className="h-4 w-4 inline mr-2" />เพิ่มอีก ({getItemQuantity(product.id)})</>
                              ) : (
                                <><ShoppingCart className="h-4 w-4 inline mr-2" />{product.inStock ? 'เพิ่มลงตะกร้า' : 'สินค้าหมด'}</>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* No Results */}
            {sortedProducts.length === 0 && (
              <div className="bg-white border border-gray-200 p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-[#1E2E4F] mb-3">ไม่พบสินค้าที่ตรงกับเงื่อนไข</h3>
                <p className="text-gray-600 mb-6">ลองปรับเปลี่ยนตัวกรองหรือค้นหาด้วยคำอื่น</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 10000]);
                    setSelectedBrand('all');
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                  className="bg-[#1E2E4F] text-white px-6 py-2 hover:bg-[#31487A] transition-colors font-medium"
                >
                  ล้างตัวกรองทั้งหมด
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[#1E2E4F]"
                  >
                    ก่อนหน้า
                  </button>
                  
                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                    // Show first page, last page, current page and adjacent pages
                    if (
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 transition-colors ${
                            page === currentPage
                              ? 'bg-[#1E2E4F] text-white'
                              : 'border border-gray-300 hover:bg-gray-50 text-[#1E2E4F]'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      (page === currentPage - 2 && currentPage > 3) ||
                      (page === currentPage + 2 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <span key={page} className="px-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                  
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[#1E2E4F]"
                  >
                    ถัดไป
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}