"use client";

import React from "react";
import { 
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  Wrench,
  Package,
  Star,
  Lightbulb
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [currentReviewSlide, setCurrentReviewSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const heroImages = [
    {
      src: "/hero-promotion/1.png",
      alt: "SP Hardware - วัสดุก่อสร้างครบวงจร"
    },
    {
      src: "/hero-promotion/2.png",
      alt: "SP Hardware - คุณภาพระดับพรีเมียม"  
    },
    {
      src: "/hero-promotion/3.png",
      alt: "SP Hardware - เครื่องมือมืออาชีพ"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

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

  const nextReviewSlide = () => {
    setCurrentReviewSlide((prev) => {
      const cardsPerView = isMobile ? 1 : 4;
      const maxSlide = Math.max(0, customerReviews.length - cardsPerView);
      return prev >= maxSlide ? 0 : prev + 1;
    });
  };

  const prevReviewSlide = () => {
    setCurrentReviewSlide((prev) => {
      const cardsPerView = isMobile ? 1 : 4;
      const maxSlide = Math.max(0, customerReviews.length - cardsPerView);
      return prev <= 0 ? maxSlide : prev - 1;
    });
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // Otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextProductSlide();
    }
    if (isRightSwipe) {
      prevProductSlide();
    }
  };

  const promotionalCards = [
    {
      title: "กันสาดทึบแสง",
      description: "เมทัลชีท กระเบื้องลอน ลดสูงสุด 15%",
      icon: HomeIcon,
      discount: "15%",
      link: "/categories?cat=opaque-roof"
    },
    {
      title: "เครื่องมือช่าง",
      description: "สว่าน ค้อน เลื่อย ลดสูงสุด 12%",
      icon: Wrench, 
      discount: "12%",
      link: "/categories?cat=tools"
    },
    {
      title: "สี & วัสดุทาสี",
      description: "สีทาบ้าน รองพื้น ลดสูงสุด 10%",
      icon: Lightbulb,
      discount: "10%",
      link: "/categories?cat=paint"
    },
    {
      title: "อุปกรณ์ติดตั้ง",
      description: "สกรู ตะปู น็อต ลดสูงสุด 8%",
      icon: Package,
      discount: "8%",
      link: "/categories?cat=installation"
    }
  ];

  const popularProducts = [
    {
      id: 1,
      name: "เมทัลชีท SCG สีแดง",
      price: "285",
      originalPrice: "320",
      discount: "11% OFF",
      image: "/api/placeholder/200/200",
      rating: 4.8,
      sold: "2.5k+",
      category: "กันสาดทึบแสง",
      badge: "ขายดี"
    },
    {
      id: 2,
      name: "สว่านกระแทก Makita HP2050H",
      price: "3,850",
      originalPrice: "4,290",
      discount: "10% OFF",
      image: "/api/placeholder/200/200",
      rating: 4.9,
      sold: "1.8k+",
      category: "เครื่องมือช่าง",
      badge: "โปรพิเศษ"
    },
    {
      id: 3,
      name: "สีทาบ้าน TOA SuperShield 18L",
      price: "1,890",
      originalPrice: "2,100",
      discount: "10% OFF",
      image: "/api/placeholder/200/200",
      rating: 4.7,
      sold: "950+",
      category: "สี & วัสดุทาสี",
      badge: "แนะนำ"
    },
    {
      id: 4,
      name: "สกรูหลังคา เบอร์ 14 ขนาด 6.3x75mm",
      price: "12",
      originalPrice: "15",
      discount: "20% OFF",
      image: "/api/placeholder/200/200",
      rating: 4.6,
      sold: "5k+",
      category: "อุปกรณ์ติดตั้ง",
      badge: "ราคาดี"
    },
    {
      id: 5,
      name: "ชินโคไลท์ โปร่งแสง 0.5mm",
      price: "95",
      originalPrice: "110",
      discount: "14% OFF",
      image: "/api/placeholder/200/200",
      rating: 4.5,
      sold: "3.2k+",
      category: "กันสาดโปร่งแสง",
      badge: "ลดพิเศษ"
    },
    {
      id: 6,
      name: "ค้อนก้ามกระตุก Vessel หัวยาง",
      price: "280",
      originalPrice: "320",
      discount: "13% OFF",
      image: "/api/placeholder/200/200",
      rating: 4.8,
      sold: "1.5k+",
      category: "เครื่องมือช่าง",
      badge: "คุณภาพดี"
    }
  ];

  const brands = [
    {
      name: "ADRO",
      logo: "/api/placeholder/120/60",
      description: "วัสดุก่อสร้างคุณภาพสูง",
      link: "/categories?brand=adro"
    },
    {
      name: "TRE",
      logo: "/api/placeholder/120/60", 
      description: "เครื่องมือช่างมืออาชีพ",
      link: "/categories?brand=tre"
    },
    {
      name: "HKS",
      logo: "/api/placeholder/120/60",
      description: "อะไหล่และอุปกรณ์",
      link: "/categories?brand=hks"
    },
    {
      name: "VORSTEINER",
      logo: "/api/placeholder/120/60",
      description: "เครื่องมือและอุปกรณ์",
      link: "/categories?brand=vorsteiner"
    },
    {
      name: "ZAERO",
      logo: "/api/placeholder/120/60",
      description: "วัสดุคุณภาพพรีเมียม",
      link: "/categories?brand=zaero"
    },
    {
      name: "MILLTEK",
      logo: "/api/placeholder/120/60",
      description: "เครื่องมือและอุปกรณ์ช่าง",
      link: "/categories?brand=milltek"
    },
    {
      name: "3D DESIGN",
      logo: "/api/placeholder/120/60",
      description: "เทคโนโลยีและนวัตกรรม",
      link: "/categories?brand=3d-design"
    }
  ];

  const customerReviews = [
    {
      id: 1,
      name: "สมชาย ก.",
      date: "10/06/25",
      rating: 5,
      title: "คุณภาพดีมาก",
      comment: "สินค้าของแท้ คุณภาพเยี่ยม ใช้งานได้ดีจริงๆ",
      verified: true,
      product: "เมทัลชีท SCG สีแดง กันสาดทึบแสง"
    },
    {
      id: 2,
      name: "วิชัย ส.",
      date: "10/06/25",
      rating: 5,
      title: "ง่ายต่อการติดตั้ง",
      comment: "ใช้เวลาแค่ 10 นาทีในการติดตั้ง พอดีกับรถเป็นอย่างดี",
      verified: true,
      product: "สว่านกระแทก Makita HP2050H เครื่องมือช่าง"
    },
    {
      id: 3,
      name: "นิรันดร์ พ.",
      date: "10/07/25",
      rating: 5,
      title: "สะอาดและสวยงาม",
      comment: "ติดตั้งง่ายมาก ดูสวยงามและเรียบร้อย",
      verified: true,
      product: "สีทาบ้าน TOA SuperShield 18L สีขาวมุก"
    },
    {
      id: 4,
      name: "ประเสริฐ ม.",
      date: "10/07/25",
      rating: 5,
      title: "ติดตั้งง่าย ดูดีมาก",
      comment: "ใส่น๊อตได้ง่าย ดูเรียบร้อยมาก คุ้มค่ามากๆ",
      verified: true,
      product: "สกรูหลังคา เบอร์ 14 ขนาด 6.3x75mm"
    },
    {
      id: 5,
      name: "ศุภชัย ร.",
      date: "09/28/25",
      rating: 5,
      title: "ราคาดี คุณภาพเยี่ยม",
      comment: "ซื้อมาใช้หลังบ้าน โปร่งแสงดี ทนทานมาก",
      verified: true,
      product: "ชินโคไลท์ โปร่งแสง 0.5mm กันสาดโปร่งแสง"
    },
    {
      id: 6,
      name: "อรรณพ ว.",
      date: "09/25/25",
      rating: 4,
      title: "ค้อนหนักดี มือจับนิ่ม",
      comment: "ใช้งานสะดวก น้ำหนักพอดี ไม่หนักเกินไป",
      verified: true,
      product: "ค้อนก้ามกระตุก Vessel หัวยาง น้ำหนัก 280g"
    }
  ];





  return (
    <div className="bg-white">
      {/* Hero Section - Light AUTOID Style */}
      <div className="relative h-[80vh] overflow-hidden">
        {/* Background Images Slider */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
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

        {/* Hero Content */}
        <div className="absolute bottom-8 left-8 z-10 text-left text-white max-w-2xl">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-2 tracking-tight drop-shadow-lg whitespace-nowrap italic">
            SP HARDWARE
          </h1>
          <p className="text-base sm:text-lg lg:text-xl mb-4 text-white/90 font-light drop-shadow-md">
            ศูนย์รวมวัสดุก่อสร้างและเครื่องมือช่างคุณภาพสูง
          </p>
          <div className="flex">
            <Link href="/categories" className="bg-white text-gray-900 px-8 py-4 text-lg font-bold rounded-none hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 min-w-[200px] shadow-lg">
              เลือกซื้อสินค้า
            </Link>
          </div>
        </div>

        {/* Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/10 hover:bg-black/20 backdrop-blur text-gray-900 p-3 rounded-none transition-all duration-300 z-20 group"
        >
          <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/10 hover:bg-black/20 backdrop-blur text-gray-900 p-3 rounded-none transition-all duration-300 z-20 group"
        >
          <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-gray-900' 
                  : 'bg-gray-500 hover:bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Category Navigation - Full Width */}
      <div className="py-6 bg-white">
        <div className="px-4 sm:px-8 max-w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {promotionalCards.map((card, index) => (
              <Link key={index} href={card.link} className="group">
                <div className="relative h-28 sm:h-36 overflow-hidden bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md">
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      {React.createElement(card.icon, { className: "h-8 w-8 sm:h-10 sm:w-10 text-gray-300" })}
                    </div>
                  </div>
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                  
                  {/* Category Title */}
                  <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
                    <h3 className="text-white font-bold text-center text-xs sm:text-sm drop-shadow-lg">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Products Section - Light AUTOID Style */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-8 max-w-full">
          <div className="flex items-center justify-between mb-8">
            <div className="text-left">
              <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-2">
                SHOP FOR LESS
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
          <div className="overflow-hidden">
            <div 
              className="flex space-x-4 md:space-x-8 pb-4 transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentProductSlide * (isMobile ? 320 + 16 : 384 + 32)}px)`
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
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
          
          {/* Mobile Slide Indicators */}
          <div className="flex md:hidden justify-center mt-6 space-x-2">
            {Array.from({ length: Math.max(0, popularProducts.length - (isMobile ? 0 : 2)) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProductSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentProductSlide 
                    ? 'bg-gray-900' 
                    : 'bg-gray-300 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Trusted Brands Section - Light AUTOID Style */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-8 max-w-full">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 tracking-wide">
              TRUSTED BY TOP BRANDS
            </h2>
          </div>
          
          {/* Desktop Grid - Hidden on mobile */}
          <div className="hidden md:grid grid-cols-7 gap-6 items-center justify-items-center">
            {brands.map((brand, index) => (
              <Link key={index} href={brand.link} className="group w-full">
                <div className="bg-gray-100 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 h-24 flex items-center justify-center px-4 py-6">
                  <span className="text-lg font-black text-gray-700 group-hover:text-gray-900 transition-colors text-center">
                    {brand.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4 pb-4 px-2">
              {brands.map((brand, index) => (
                <Link key={index} href={brand.link} className="group flex-shrink-0">
                  <div className="bg-gray-100 hover:bg-gray-200 transition-all duration-300 h-20 w-32 flex items-center justify-center px-4 py-3">
                    <span className="text-sm font-black text-gray-700 group-hover:text-gray-900 transition-colors text-center">
                      {brand.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section - Light AUTOID Style */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-8 max-w-full">
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 tracking-wide">
              รีวิวจากลูกค้า
            </h2>
            
            {/* Overall Rating */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-blue-500 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">2,449 รีวิว</span>
              <Link href="/reviews" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                ดูรีวิวทั้งหมด
              </Link>
            </div>
          </div>

          {/* Desktop Reviews Slider - Hidden on mobile */}
          <div className="hidden md:block overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ 
                transform: `translateX(-${currentReviewSlide * 25}%)`
              }}
            >
              {customerReviews.map((review) => (
                <div key={review.id} className="bg-white p-6 border border-gray-200 flex-shrink-0 w-1/4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">{review.date}</p>
                      <p className="text-sm font-medium text-gray-900">
                        {review.name} {review.verified && (
                          <span className="text-xs text-gray-500">○ ลูกค้าที่ยืนยันแล้ว</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${
                          star <= review.rating 
                            ? 'text-blue-500 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">
                    {review.title}
                  </h3>

                  {/* Comment */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Reviews Scroll */}
          <div className="md:hidden overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4 pb-4">
              {customerReviews.map((review) => (
                <div key={review.id} className="bg-white p-4 border border-gray-200 flex-shrink-0 w-80">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-500">{review.date}</p>
                      <p className="text-sm font-medium text-gray-900">
                        {review.name} {review.verified && (
                          <span className="text-xs text-gray-500">○ ลูกค้าที่ยืนยันแล้ว</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${
                          star <= review.rating 
                            ? 'text-blue-500 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">
                    {review.title}
                  </h3>

                  {/* Comment */}
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows for desktop */}
          <div className="hidden md:flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevReviewSlide}
              className="p-2 bg-white border border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextReviewSlide}
              className="p-2 bg-white border border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer CTA - Light AUTOID Style */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-8 max-w-full text-center">
          <h2 className="text-4xl sm:text-6xl font-black text-gray-900 mb-8">
            THE #1 EXPERTS IN<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-900">
              CONSTRUCTION TOOLS
            </span>
          </h2>
          <p className="text-gray-600 text-xl mb-12 max-w-2xl mx-auto">
            มืออาชีพเลือกใช้ เพราะเราคือผู้เชี่ยวชาญด้านเครื่องมือและวัสดุก่อสร้าง
          </p>
          <Link 
            href="/categories" 
            className="inline-block bg-gray-900 text-white px-12 py-6 text-xl font-black hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            SHOP CONSTRUCTION TOOLS
          </Link>
        </div>
      </div>
    </div>
  );
}