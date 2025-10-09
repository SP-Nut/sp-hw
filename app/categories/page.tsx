"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Grid, List, ShoppingCart, Search, Check, Plus, Filter, X } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { categories } from "../data/categories";
import { brands } from "../data/brands";
import { products } from "../data/products";
import { filterProducts, sortProducts, paginateProducts, getBrandCounts } from "../data/utils";

// Component ที่ใช้ useSearchParams
function CategoriesContent() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [addedToCart, setAddedToCart] = useState<{[key: number]: boolean}>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const itemsPerPage = 8;
  const { addToCart, isInCart, getItemQuantity } = useCart();

  // Helper function to get button classes
  const getButtonClasses = (product: typeof products[0], isGrid: boolean = true) => {
    const baseClasses = isGrid 
      ? "px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300"
      : "px-3 sm:px-4 py-1.5 sm:py-2 font-medium text-xs sm:text-sm transition-all duration-300";
    
    if (!product.inStock) {
      return `${baseClasses} bg-gray-300 text-gray-500 cursor-not-allowed`;
    }
    
    if (addedToCart[product.id]) {
      return `${baseClasses} bg-green-600 text-white`;
    }
    
    if (isInCart(product.id)) {
      return `${baseClasses} bg-gray-700 text-white hover:bg-gray-900`;
    }
    
    return `${baseClasses} bg-gray-900 text-white hover:bg-gray-700`;
  };

  // Helper function to get button content
  const getButtonContent = (product: typeof products[0], isGrid: boolean = true) => {
    const iconClasses = isGrid ? "h-3 sm:h-4 w-3 sm:w-4 inline mr-1" : "h-3 sm:h-4 w-3 sm:w-4 inline mr-1 sm:mr-2";
    
    if (addedToCart[product.id]) {
      return <><Check className={iconClasses} />เพิ่มแล้ว</>;
    }
    
    if (isInCart(product.id)) {
      return isGrid 
        ? <><Plus className={iconClasses} />เพิ่ม ({getItemQuantity(product.id)})</>
        : <><Plus className={iconClasses} /><span className="hidden sm:inline">เพิ่มอีก</span><span className="sm:hidden">เพิ่ม</span> ({getItemQuantity(product.id)})</>;
    }
    
    return isGrid
      ? <><ShoppingCart className={iconClasses} />{product.inStock ? 'เพิ่ม' : 'หมด'}</>
      : <><ShoppingCart className={iconClasses} /><span className="hidden sm:inline">{product.inStock ? 'เพิ่มลงตะกร้า' : 'สินค้าหมด'}</span><span className="sm:hidden">{product.inStock ? 'เพิ่ม' : 'หมด'}</span></>;
  };

  // Helper function to reset all filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 10000]);
    setSelectedBrand('all');
    setSearchTerm('');
    setCurrentPage(1);
  };

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
    <div className="min-h-screen bg-gray-100 pt-20">
      {/* Header */}
      <div className="bg-gray-200 text-gray-900">
        <div className="container mx-auto px-12 md:px-16 max-w-full py-8 lg:py-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3">
            {selectedCategory === 'all' ? 'SHOP CATEGORIES' : 
             categories.find(cat => cat.id === selectedCategory)?.name || 'SHOP CATEGORIES'}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-light">เลือกซื้อวัสดุก่อสร้างคุณภาพสูง</p>
        </div>
      </div>

      <div className="container mx-auto px-12 md:px-16 max-w-full py-8 relative">
        {/* Mobile Filter Backdrop */}
        {showMobileFilters && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowMobileFilters(false)}
          />
        )}

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-3 font-bold transition-colors hover:bg-gray-700"
            >
              <Filter className="h-4 w-4" />
              {showMobileFilters ? 'ซ่อนตัวกรอง' : 'แสดงตัวกรอง'}
              {showMobileFilters ? <X className="h-4 w-4" /> : null}
            </button>
          </div>

          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block lg:w-1/5">
            <div className="bg-white p-4 space-y-4 sticky top-24">

              {/* Search */}
              <div>
                <h3 className="font-black text-base text-gray-900 mb-2 pb-2">ค้นหาสินค้า</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ค้นหาสินค้า..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 pl-8 pr-8 focus:outline-none bg-white transition-colors text-gray-900 text-sm"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-black text-base text-gray-900 mb-2 pb-2">หมวดหมู่</h3>
                <div className="space-y-1">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-2 py-1.5 transition-colors font-medium text-sm ${
                        selectedCategory === category.id
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className={`text-sm ${
                          selectedCategory === category.id 
                            ? 'text-gray-300' 
                            : 'text-gray-500'
                        }`}>({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-black text-base text-gray-900 mb-2 pb-2">ช่วงราคา</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="ต่ำสุด"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full px-2 py-1.5 text-gray-900 focus:outline-none transition-colors text-sm bg-gray-50"
                    />
                    <span className="text-gray-400 text-sm">-</span>
                    <input
                      type="number"
                      placeholder="สูงสุด"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
                      className="w-full px-2 py-1.5 text-gray-900 focus:outline-none transition-colors text-sm bg-gray-50"
                    />
                  </div>
                  <div className="text-sm text-gray-900 bg-gray-100 p-2 text-center border font-bold">
                    ฿{priceRange[0].toLocaleString()} - ฿{priceRange[1].toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Brand */}
              <div>
                <h3 className="font-black text-base text-gray-900 mb-2 pb-2">แบรนด์</h3>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-2 py-2 focus:outline-none text-gray-900 bg-white transition-colors font-medium text-sm"
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
                onClick={resetFilters}
                className="w-full py-2 text-gray-900 bg-gray-50 hover:bg-gray-900 hover:text-white transition-colors font-medium text-sm"
              >
                ล้างตัวกรอง
              </button>
            </div>
          </div>

          {/* Mobile Sidebar Filters */}
          <div className={`lg:hidden fixed top-0 left-0 h-full w-80 z-50 bg-white transform transition-transform duration-300 ease-in-out ${
            showMobileFilters ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="p-4 space-y-4 h-full overflow-y-auto">
              {/* Mobile Close Button */}
              <div className="flex justify-between items-center pb-3">
                <h2 className="font-black text-lg text-gray-900">ตัวกรองสินค้า</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <div>
                <h3 className="font-black text-base text-gray-900 mb-3 pb-2">ค้นหาสินค้า</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ค้นหาสินค้า..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 pl-8 pr-8 focus:outline-none bg-white transition-colors text-gray-900 text-sm"
                  />
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile Categories */}
              <div>
                <h3 className="font-black text-base text-gray-900 mb-3 pb-2">หมวดหมู่</h3>
                <div className="space-y-1">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 transition-colors font-medium text-sm ${
                        selectedCategory === category.id
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className={`text-xs ${
                          selectedCategory === category.id 
                            ? 'text-gray-300' 
                            : 'text-gray-500'
                        }`}>({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price Range */}
              <div>
                <h3 className="font-black text-base text-gray-900 mb-3 pb-2">ช่วงราคา</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="ต่ำสุด"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full px-2 py-2 text-gray-900 focus:outline-none transition-colors text-sm bg-gray-50"
                    />
                    <span className="text-gray-400 text-sm">-</span>
                    <input
                      type="number"
                      placeholder="สูงสุด"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
                      className="w-full px-2 py-2 text-gray-900 focus:outline-none transition-colors text-sm bg-gray-50"
                    />
                  </div>
                  <div className="text-sm text-gray-900 bg-gray-100 p-2 text-center border font-bold">
                    ฿{priceRange[0].toLocaleString()} - ฿{priceRange[1].toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Mobile Brand */}
              <div>
                <h3 className="font-black text-base text-gray-900 mb-3 pb-2">แบรนด์</h3>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-2 py-2 focus:outline-none text-gray-900 bg-white transition-colors font-medium text-sm"
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

              {/* Mobile Apply Button */}
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-3 bg-gray-900 text-white hover:bg-gray-700 transition-colors font-bold text-sm mb-3"
              >
                ปิดตัวกรอง
              </button>

              {/* Mobile Reset Filters */}
              <button 
                onClick={() => {
                  resetFilters();
                  setShowMobileFilters(false);
                }}
                className="w-full py-2 text-gray-900 bg-gray-50 hover:bg-gray-900 hover:text-white transition-colors font-bold text-sm"
              >
                ล้างตัวกรอง
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-4/5">
            {/* Toolbar */}
            <div className="bg-white p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-gray-900 font-bold">
                    แสดง {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)} จาก {sortedProducts.length} รายการ
                  </span>
                  {searchTerm && (
                    <div className="text-sm text-gray-600 mt-1 font-medium">
                      ผลการค้นหา: &ldquo;{searchTerm}&rdquo;
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 focus:outline-none text-gray-900 bg-white transition-colors font-bold"
                  >
                    <option value="name">เรียงตามชื่อ</option>
                    <option value="price-low">ราคาต่ำ - สูง</option>
                    <option value="price-high">ราคาสูง - ต่ำ</option>
                    <option value="rating">คะแนนสูงสุด</option>
                  </select>

                  {/* View Toggle */}
                  <div className="flex">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentProducts.map(product => (
                  <div key={product.id} className="group relative bg-white transition-all duration-300 overflow-hidden">
                    {/* Image Container */}
                    <Link href={`/product/${product.id}`}>
                      <div className="relative h-40 sm:h-48 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden cursor-pointer">
                        <div className="h-full flex items-center justify-center">
                          <span className="text-gray-400 font-medium text-xs sm:text-sm">รูปสินค้า</span>
                        </div>
                      
                      {/* Badges */}
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 flex justify-between items-start">
                        <div className="bg-gray-900 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold">
                          {product.brand}
                        </div>
                        {product.originalPrice > product.price && (
                          <div className="bg-red-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold">
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
                    </Link>
                    
                    {/* Content */}
                    <div className="p-3 sm:p-4">
                      {/* Title */}
                      <Link href={`/product/${product.id}`}>
                        <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-2 line-clamp-2 leading-tight cursor-pointer hover:text-gray-700">
                          {product.name}
                        </h4>
                      </Link>
                      
                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                      
                      {/* Price and Button */}
                      <div className="flex items-center justify-between pt-2 sm:pt-3">
                        <div className="flex flex-col">
                          <span className="text-base sm:text-lg font-bold text-gray-900">฿{product.price.toLocaleString()}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-xs sm:text-sm text-gray-500 line-through">
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
                          className={getButtonClasses(product, true)}
                        >
                          {getButtonContent(product, true)}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {currentProducts.map(product => (
                    <div key={product.id} className="bg-white transition-all duration-300 overflow-hidden">
                      <div className="flex">
                      {/* Image Section */}
                      <Link href={`/product/${product.id}`}>
                        <div className="relative w-32 sm:w-48 h-24 sm:h-32 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex-shrink-0 cursor-pointer">
                          <div className="h-full flex items-center justify-center">
                            <span className="text-gray-400 text-xs sm:text-sm">รูปสินค้า</span>
                          </div>
                        
                        {/* Badges */}
                        <div className="absolute top-1 sm:top-2 left-1 sm:left-2 right-1 sm:right-2 flex justify-between">
                          <div className="bg-gray-900 text-white px-1 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold">
                            {product.brand}
                          </div>
                          {product.originalPrice > product.price && (
                            <div className="bg-red-500 text-white px-1 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold">
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
                      </Link>
                      
                      {/* Content Section */}
                      <div className="flex-1 p-3 sm:p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <Link href={`/product/${product.id}`}>
                              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 leading-tight cursor-pointer hover:text-gray-700">
                                {product.name}
                              </h4>
                            </Link>
                            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3">
                              {product.description}
                            </p>
                            <span className="text-xs sm:text-sm text-gray-500">
                              ({product.reviews} รีวิว)
                            </span>
                          </div>
                          
                          {/* Price and Button Section */}
                          <div className="text-right ml-3 sm:ml-6">
                            <div className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                              ฿{product.price.toLocaleString()}
                            </div>
                            {product.originalPrice > product.price && (
                              <div className="text-xs sm:text-sm text-gray-500 line-through mb-3">
                                ฿{product.originalPrice.toLocaleString()}
                              </div>
                            )}
                            <button 
                              disabled={!product.inStock}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                              }}
                              className={getButtonClasses(product, false)}
                            >
                              {getButtonContent(product, false)}
                            </button>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {sortedProducts.length === 0 && (
              <div className="bg-white p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">ไม่พบสินค้าที่ตรงกับเงื่อนไข</h3>
                <p className="text-gray-600 mb-6">ลองปรับเปลี่ยนตัวกรองหรือค้นหาด้วยคำอื่น</p>
                <button 
                  onClick={resetFilters}
                  className="bg-gray-900 text-white px-6 py-2 hover:bg-gray-700 transition-colors font-bold"
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
                    className="px-3 py-2 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-bold"
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
                          className={`px-3 py-2 transition-colors font-bold ${
                            page === currentPage
                              ? 'bg-gray-900 text-white'
                              : 'bg-white hover:bg-gray-50 text-gray-900'
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
                    className="px-3 py-2 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-bold"
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

// Main component with Suspense boundary
export default function Categories() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    }>
      <CategoriesContent />
    </Suspense>
  );
}