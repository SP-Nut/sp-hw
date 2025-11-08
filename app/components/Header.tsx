"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Package, Info, Phone } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTopbarIndex, setCurrentTopbarIndex] = useState(0);
  const { getTotalItems } = useCart();
  const pathname = usePathname();
  const cartCount = getTotalItems();

  // Check if we're on homepage
  const isHomePage = pathname === '/';

  // Topbar messages
  const topbarMessages = [
    "★★★★★ RATED 4.85 / 5 BY 2,300+ REVIEWS",
    "บริษัท เอสพี กันสาด จำกัด - ผู้เชี่ยวชาญด้านวัสดุกันสาด",
    "ศูนย์รวมวัสดุกันสาดครบวงจร มาตรฐานคุณภาพระดับมืออาชีพ",
    "ประสบการณ์กว่า 15 ปี ในธุรกิจวัสดุก่อสร้างและฮาร์ดแวร์",
    "บริการจัดส่งทั่วประเทศ พร้อมทีมงานให้คำปรึกษา",
    "ติดต่อสอบถาม: 091-939-7000 | LINE: @sphardware9"
  ];

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8; // 80vh hero height
      setIsScrolled(window.scrollY > heroHeight * 0.5); // เริ่มเปลี่ยนเมื่อ scroll ครึ่งหนึ่งของ hero
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial position
    } else {
      setIsScrolled(true); // Always show background on other pages
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  // Topbar message rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTopbarIndex((prev) => (prev + 1) % topbarMessages.length);
    }, 3000); // เปลี่ยนทุกๆ 3 วินาที

    return () => clearInterval(timer);
  }, [topbarMessages.length]);





  return (
    <>
      {/* Top Promotion Bar - แยกออกจาก Header */}
      <div className={`fixed top-0 left-0 right-0 z-40 text-white py-1.5 md:py-2 transition-all duration-300 ${
        !isScrolled && isHomePage 
          ? 'transform translate-y-0 opacity-100' 
          : 'transform -translate-y-full opacity-0 pointer-events-none'
      }`} style={{backgroundColor: '#1e2e4f'}}>
        <div className="container mx-auto px-4 md:px-16 max-w-full">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 text-xs md:text-sm font-medium">
              <span className="font-bold italic transition-all duration-500 opacity-100 text-center">
                {topbarMessages[currentTopbarIndex]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - อยู่ด้านล่าง topbar */}
      <header className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        !isScrolled && isHomePage 
          ? 'top-8 md:top-10 bg-transparent' 
          : 'top-0 bg-white shadow-md'
      }`}>
      <div className={`py-4 md:py-4 transition-all duration-300 ${
        isScrolled || !isHomePage 
          ? 'border-b border-gray-200' 
          : 'border-b border-transparent'
      }`}>
        <div className="container mx-auto px-4 md:px-16 max-w-full">
          <div className="flex items-center justify-between">
            {/* Left Section - Logo */}
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                className={`lg:hidden transition-colors mr-3 md:mr-4 p-1 ${
                  isScrolled || !isHomePage 
                    ? 'text-gray-900 hover:text-gray-600' 
                    : 'text-white hover:text-gray-200'
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center group">
                <div className="w-20 h-12 sm:w-24 sm:h-16 md:w-32 md:h-20 transition-transform group-hover:scale-105">
                  <Image
                    src="/logo.png"
                    alt="SP Hardware Logo"
                    width={128}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Center Section - Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
              <Link href="/categories?cat=opaque-roof" className={`font-medium transition-colors ${
                isScrolled || !isHomePage 
                  ? 'text-gray-900 hover:text-blue-600' 
                  : 'text-white hover:text-gray-200'
              }`}>
                กันสาดทึบแสง
              </Link>
              <Link href="/categories?cat=translucent-roof" className={`font-medium transition-colors ${
                isScrolled || !isHomePage 
                  ? 'text-gray-900 hover:text-blue-600' 
                  : 'text-white hover:text-gray-200'
              }`}>
                กันสาดโปร่งแสง
              </Link>
              <Link href="/categories?cat=installation" className={`font-medium transition-colors ${
                isScrolled || !isHomePage 
                  ? 'text-gray-900 hover:text-blue-600' 
                  : 'text-white hover:text-gray-200'
              }`}>
                อุปกรณ์ติดตั้ง
              </Link>
              <Link href="/categories?cat=tools" className={`font-medium transition-colors ${
                isScrolled || !isHomePage 
                  ? 'text-gray-900 hover:text-blue-600' 
                  : 'text-white hover:text-gray-200'
              }`}>
                เครื่องมือช่าง
              </Link>
              <Link href="/categories?cat=hardware" className={`font-medium transition-colors ${
                isScrolled || !isHomePage 
                  ? 'text-gray-900 hover:text-blue-600' 
                  : 'text-white hover:text-gray-200'
              }`}>
                อุปกรณ์ฮาร์ดแวร์
              </Link>
              <Link href="/categories?cat=paint" className={`font-medium transition-colors ${
                isScrolled || !isHomePage 
                  ? 'text-gray-900 hover:text-blue-600' 
                  : 'text-white hover:text-gray-200'
              }`}>
                สี & วัสดุทาสี
              </Link>
              <Link href="/about" className={`font-medium transition-colors ${
                pathname === '/about' ? 'text-blue-600' : 
                (isScrolled || !isHomePage 
                  ? 'text-gray-900 hover:text-blue-600' 
                  : 'text-white hover:text-gray-200')
              }`}>
                เกี่ยวกับเรา & ติดต่อ
              </Link>
            </nav>

            {/* Right Section - Icons */}
            <div className="flex items-center space-x-3">
              {/* Contact Info - Desktop only */}
              <div className={`hidden xl:flex items-center space-x-1 text-sm ${
                isScrolled || !isHomePage 
                  ? 'text-gray-700' 
                  : 'text-white'
              }`}>
                <Phone className="h-4 w-4" />
                <span className="font-medium">091-939-7000</span>
              </div>

              {/* Cart */}
              <Link href="/cart" className={`relative transition-colors p-1 ${
                isScrolled || !isHomePage 
                  ? 'text-gray-900 hover:text-blue-600' 
                  : 'text-white hover:text-gray-200'
              }`}>
                <ShoppingCart className="h-6 w-6 md:h-5 md:w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold min-w-[20px] h-[20px] flex items-center justify-center rounded-full">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
            </div>


          </div>
        </div>
      </div>

      {/* Mobile Menu - SP Hardware Style */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 md:px-8 py-4 md:py-6 max-w-full">
            <nav className="space-y-2 md:space-y-4">
              <Link
                href="/categories?cat=opaque-roof"
                className="flex items-center py-2 md:py-3 text-gray-900 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="h-4 w-4 md:h-5 md:w-5 mr-3" />
                กันสาดทึบแสง
              </Link>
              <Link
                href="/categories?cat=translucent-roof"
                className="flex items-center py-2 md:py-3 text-gray-900 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="h-4 w-4 md:h-5 md:w-5 mr-3" />
                กันสาดโปร่งแสง
              </Link>
              <Link
                href="/categories?cat=installation"
                className="flex items-center py-2 md:py-3 text-gray-900 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="h-4 w-4 md:h-5 md:w-5 mr-3" />
                อุปกรณ์ติดตั้ง
              </Link>
              <Link
                href="/categories?cat=tools"
                className="flex items-center py-2 md:py-3 text-gray-900 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="h-4 w-4 md:h-5 md:w-5 mr-3" />
                เครื่องมือช่าง
              </Link>
              <Link
                href="/categories?cat=hardware"
                className="flex items-center py-2 md:py-3 text-gray-900 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="h-4 w-4 md:h-5 md:w-5 mr-3" />
                อุปกรณ์ฮาร์ดแวร์
              </Link>
              <Link
                href="/categories?cat=paint"
                className="flex items-center py-2 md:py-3 text-gray-900 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="h-4 w-4 md:h-5 md:w-5 mr-3" />
                สี & วัสดุทาสี
              </Link>
              <Link
                href="/about"
                className="flex items-center py-2 md:py-3 text-gray-900 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="h-4 w-4 md:h-5 md:w-5 mr-3" />
                เกี่ยวกับเรา & ติดต่อ
              </Link>

              {/* Contact Info */}
              <div className="pt-4 md:pt-6 mt-4 md:mt-6 border-t border-gray-200 text-center">
                <div className="flex items-center justify-center space-x-2 text-gray-900 mb-2">
                  <Phone className="h-4 w-4" />
                  <span className="font-medium text-sm md:text-base">091-939-7000</span>
                </div>
                <p className="text-xs md:text-sm text-gray-600">ศูนย์รวมวัสดุก่อสร้าง - บริการครบวงจร</p>
              </div>
            </nav>
          </div>
        </div>
      )}

    </header>
    </>
  );
}