"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCart, Search, Menu, X, Package, Info, MessageCircle, Phone, ChevronDown } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentHeaderSlide, setCurrentHeaderSlide] = useState(0);
  const { getTotalItems } = useCart();
  const pathname = usePathname();
  const cartCount = getTotalItems();

  const headerPromotionImages = [
    {
      src: "/header-promotion/1.png",
      alt: "โปรโมชั่น Header 1"
    },
    {
      src: "/header-promotion/2.png",
      alt: "โปรโมชั่น Header 2"
    },
    {
      src: "/header-promotion/3.png",
      alt: "โปรโมชั่น Header 3"
    }
  ];

  const handleLineAdd = () => {
    window.open('https://line.me/R/ti/p/@your-line-oa', '_blank');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100); // Hide promotion banner after scrolling 100px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeaderSlide((prev) => (prev + 1) % headerPromotionImages.length);
    }, 3000); // Change slide every 2.5 seconds
    return () => clearInterval(timer);
  }, [headerPromotionImages.length]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      {/* Top Banner Image Area - Full Width No Padding */}
      <div className={`w-full relative overflow-hidden transition-all duration-300 ${
        isScrolled ? 'h-0 opacity-0' : 'h-12 sm:h-20 md:h-24 opacity-100'
      }`}>
        {/* Header Promotion Images Slider */}
        <div className="absolute inset-0">
          {headerPromotionImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentHeaderSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-1 sm:bottom-2 right-2 sm:right-4 flex space-x-1 z-10">
          {headerPromotionImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeaderSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 touch-manipulation ${
                index === currentHeaderSlide 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/75 active:bg-white'
              }`}
            />
          ))}
        </div>
      </div>



      {/* Info Bar */}
      <div className="hidden lg:block bg-[#31487A] text-white py-2">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between text-sm">
            <span>ศูนย์รวมวัสดุก่อสร้างมากที่สุดในไทย - บริการครบวงจร</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>089-123-4567</span>
              </div>
              <span>Call Center 1160</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white py-2 sm:py-4 border-b border-gray-100">
        <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Left Section - Logo */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile menu button */}
              <button
                className="lg:hidden p-1.5 sm:p-2 text-[#1E2E4F] hover:bg-gray-50 active:bg-gray-100 rounded-lg transition-colors touch-manipulation"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </button>
              
              {/* Logo */}
              <Link href="/" className="flex items-center group">
                <div className="w-20 h-12 sm:w-24 sm:h-14 md:w-28 md:h-16 lg:w-32 lg:h-18 transition-transform group-hover:scale-105">
                  <Image
                    src="/logo.png"
                    alt="SP Hardware Logo"
                    width={128}
                    height={72}
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg lg:max-w-xl mx-4 lg:mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="ค้นหาสินค้า..."
                  className="w-full px-3 py-2 lg:px-4 lg:py-3 pl-10 lg:pl-12 pr-10 lg:pr-12 border border-gray-200 rounded-lg focus:border-[#8FB3E2] focus:outline-none focus:ring-2 focus:ring-[#8FB3E2]/20 bg-gray-50 placeholder-gray-400 text-sm lg:text-base"
                />
                <Search className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                <button 
                  onClick={handleSearch}
                  className="absolute right-1.5 lg:right-2 top-1/2 transform -translate-y-1/2 bg-[#8FB3E2] hover:bg-[#31487A] active:bg-[#1E2E4F] text-white px-2 py-1 lg:px-3 lg:py-1.5 rounded-md transition-colors text-sm lg:text-base touch-manipulation"
                >
                  ค้นหา
                </button>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              {/* Mobile Search Button */}
              <button 
                className="md:hidden p-1.5 sm:p-2 text-gray-600 hover:bg-gray-50 active:bg-gray-100 rounded-lg transition-colors touch-manipulation"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              {/* LINE Button */}
              <button 
                onClick={handleLineAdd}
                className="hidden sm:flex items-center space-x-1 sm:space-x-2 bg-[#06C755] hover:bg-green-600 active:bg-green-700 text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors shadow-sm text-sm touch-manipulation"
              >
                <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>LINE</span>
              </button>
              
              {/* Cart */}
              <Link href="/cart" className="relative p-1.5 sm:p-2 text-gray-600 hover:text-[#1E2E4F] active:text-[#31487A] transition-colors group touch-manipulation">
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-500 text-white text-xs font-bold min-w-[16px] h-[16px] sm:min-w-[18px] sm:h-[18px] flex items-center justify-center rounded-full">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Bar */}
      <div className="hidden lg:block bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <nav className="flex items-center space-x-6 py-3 relative">
            <div 
              className="relative"
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
              onMouseLeave={() => setIsCategoryDropdownOpen(false)}
            >
              <Link href="/categories" className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/categories' ? 'bg-[#31487A] text-white' : 'bg-[#1E2E4F] text-white hover:bg-[#31487A]'
              }`}>
                <Package className="h-4 w-4" />
                <span>หมวดหมู่สินค้า</span>
                <ChevronDown className="h-3 w-3" />
              </Link>
              
              {/* Dropdown Menu */}
              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <Link href="/categories?cat=opaque-roof" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#1E2E4F] transition-colors">
                      <div className="font-medium">กันสาดทึบแสง</div>
                      <div className="text-xs text-gray-500">เมทัลชีท ไวนิลรูฟ อลูมิเนียม</div>
                    </Link>
                    <Link href="/categories?cat=translucent-roof" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#1E2E4F] transition-colors">
                      <div className="font-medium">กันสาดโปร่งแสง</div>
                      <div className="text-xs text-gray-500">ชินโคไลท์ โพลีอีตัน โพลีคาร์บอเนต</div>
                    </Link>
                    <Link href="/categories?cat=installation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#1E2E4F] transition-colors">
                      <div className="font-medium">อุปกรณ์ติดตั้ง</div>
                      <div className="text-xs text-gray-500">สกรูหลังคา รางน้ำฝน ยางรอง</div>
                    </Link>
                    <Link href="/categories?cat=tools" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#1E2E4F] transition-colors">
                      <div className="font-medium">เครื่องมือช่าง</div>
                      <div className="text-xs text-gray-500">สว่าน เลื่อยฉลุ เครื่องมือไฟฟ้า</div>
                    </Link>
                    <Link href="/categories?cat=hardware" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#1E2E4F] transition-colors">
                      <div className="font-medium">อุปกรณ์ฮาร์ดแวร์</div>
                      <div className="text-xs text-gray-500">ตะปู น็อต สกรู วัสดุยึดติด</div>
                    </Link>
                    <Link href="/categories?cat=paint" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#1E2E4F] transition-colors">
                      <div className="font-medium">สี & วัสดุทาสี</div>
                      <div className="text-xs text-gray-500">สีทาหลังคา สีรองพื้น น้ำยาทำความสะอาด</div>
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 px-4 py-2">
                    <Link href="/categories" className="text-xs text-[#1E2E4F] hover:text-[#31487A] font-medium">
                      ดูหมวดหมู่ทั้งหมด →
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="/about" className={`py-2 px-3 text-sm font-medium transition-colors hover:text-[#1E2E4F] ${
              pathname === '/about' ? 'text-[#1E2E4F] border-b-2 border-[#8FB3E2]' : 'text-gray-600'
            }`}>
              เกี่ยวกับเรา & ติดต่อ
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3 max-w-7xl">
            <nav className="space-y-2">
              <Link
                href="/categories"
                className={`flex items-center py-2 px-3 rounded text-sm ${
                  pathname === '/categories' ? 'bg-[#1E2E4F] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="h-4 w-4 mr-3" />
                หมวดหมู่สินค้า
              </Link>
              <Link
                href="/about"
                className={`flex items-center py-2 px-3 rounded text-sm ${
                  pathname === '/about' ? 'bg-[#1E2E4F] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="h-4 w-4 mr-3" />
                เกี่ยวกับเรา & ติดต่อ
              </Link>

              {/* LINE Button */}
              <button 
                onClick={handleLineAdd}
                className="w-full bg-[#06C755] text-white py-2 px-3 rounded text-sm flex items-center justify-center space-x-2 mt-3"
              >
                <MessageCircle className="h-4 w-4" />
                <span>เพิ่มเพื่อน LINE</span>
              </button>

              {/* Contact Info */}
              <div className="pt-4 mt-4 border-t border-gray-100 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-2">
                  <Phone className="h-4 w-4" />
                  <span>089-123-4567</span>
                </div>
                <p className="text-xs text-gray-500">ศูนย์รวมวัสดุก่อสร้างมากที่สุดในไทย</p>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Search Modal */}
      {isSearchOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-16">
          <div className="bg-white w-full max-w-sm mx-4 rounded">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">ค้นหาสินค้า</h3>
                <button onClick={() => setIsSearchOpen(false)} className="p-1">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="ค้นหาสินค้า..."
                  className="w-full px-3 py-2 pl-9 pr-12 border rounded focus:border-[#1E2E4F] focus:outline-none"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <button 
                  onClick={handleSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#1E2E4F] text-white px-2 py-1 rounded text-xs"
                >
                  ค้นหา
                </button>
              </div>
              
              {/* Quick Search */}
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">ค้นหายอดนิยม:</p>
                <div className="flex flex-wrap gap-1">
                  {['สว่าน', 'ค้อน', 'ไขควง', 'แซว'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setSearchQuery(item);
                        handleSearch();
                      }}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}