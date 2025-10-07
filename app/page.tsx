"use client";

import React from "react";
import { 
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  Wrench,
  Package,
  Star,
  Lightbulb,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const promotionImages = [
    {
      src: "/hero-promotion/1.png",
      alt: "โปรโมชั่น 1"
    },
    {
      src: "/hero-promotion/2.png",
      alt: "โปรโมชั่น 2"  
    },
    {
      src: "/hero-promotion/3.png",
      alt: "โปรโมชั่น 3"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotionImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [promotionImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promotionImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promotionImages.length) % promotionImages.length);
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
      name: "SCG",
      logo: "/api/placeholder/100/50",
      description: "เมทัลชีท กระเบื้อง คุณภาพพ remium",
      color: "bg-gradient-to-br from-[#1E2E4F] to-[#31487A]",
      link: "/categories?brand=scg"
    },
    {
      name: "Makita",
      logo: "/api/placeholder/100/50", 
      description: "เครื่องมือช่างมืออาชีพ",
      color: "bg-gradient-to-br from-[#31487A] to-[#8FB3E2]",
      link: "/categories?brand=makita"
    },
    {
      name: "TOA",
      logo: "/api/placeholder/100/50",
      description: "สี และวัสดุทาสี คุณภาพดี",
      color: "bg-gradient-to-br from-[#8FB3E2] to-[#31487A]",
      link: "/categories?brand=toa"
    },
    {
      name: "Vessel",
      logo: "/api/placeholder/100/50",
      description: "อุปกรณ์และเครื่องมือ",
      color: "bg-gradient-to-br from-[#1E2E4F] to-[#8FB3E2]",
      link: "/categories?brand=vessel"
    },
    {
      name: "Shinkolite",
      logo: "/api/placeholder/100/50",
      description: "แผ่นโปร่งแสง พลาสติก",
      color: "bg-gradient-to-br from-[#31487A] to-[#1E2E4F]",
      link: "/categories?brand=shinkolite"
    },
    {
      name: "Bosch",
      logo: "/api/placeholder/100/50",
      description: "เครื่องมือไฟฟ้า เทคโนโลยีชั้นนำ",
      color: "bg-gradient-to-br from-[#8FB3E2] to-[#1E2E4F]",
      link: "/categories?brand=bosch"
    }
  ];

  const categories = [
    {
      title: "กันสาดทึบแสง",
      icon: HomeIcon,
      color: "bg-[#1E2E4F]",
      link: "/categories?cat=opaque-roof"
    },
    {
      title: "กันสาดโปร่งแสง",
      icon: Lightbulb,
      color: "bg-[#31487A]",
      link: "/categories?cat=translucent-roof"
    },
    {
      title: "อุปกรณ์ติดตั้ง",
      icon: Package,
      color: "bg-[#8FB3E2]",
      link: "/categories?cat=installation"
    },
    {
      title: "เครื่องมือช่าง",
      icon: Wrench,
      color: "bg-[#1E2E4F]",
      link: "/categories?cat=tools"
    },
    {
      title: "ฮาร์ดแวร์",
      icon: Package,
      color: "bg-[#31487A]",
      link: "/categories?cat=hardware"
    },
    {
      title: "สี & วัสดุทาสี",
      icon: Lightbulb,
      color: "bg-[#8FB3E2]",
      link: "/categories?cat=paint"
    },
    {
      title: "สินค้ายอดนิยม",
      icon: Star,
      color: "bg-[#1E2E4F]",
      link: "/categories"
    },
    {
      title: "ดูสินค้าทั้งหมด",
      icon: CreditCard,
      color: "bg-[#31487A]",
      link: "/categories"
    }
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Promotion Section */}
      <div className="py-6 bg-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative aspect-[16/5] w-full overflow-hidden bg-gradient-to-r from-[#1E2E4F] to-[#31487A] rounded-lg shadow-xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 rounded-lg">
              <div className="w-full h-full bg-repeat opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>

            {/* Banner Images Slider */}
            <div className="absolute inset-0 z-10">
              {promotionImages.map((image, index) => (
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
                    className="object-cover rounded-lg"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            {/* Navigation Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur text-white p-3 rounded-full transition-all duration-300 z-20 group"
            >
              <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur text-white p-3 rounded-full transition-all duration-300 z-20 group"
            >
              <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
              {promotionImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>


          </div>
        </div>
      </div>

      {/* Promotional Cards */}
      <div className="py-6 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {promotionalCards.map((card, index) => (
              <Link key={index} href={card.link} className="group">
                <div className="bg-white border border-gray-200 hover:border-[#8FB3E2] rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="text-center">
                    <div className="mb-3 p-2 bg-gradient-to-br from-[#1E2E4F] to-[#31487A] rounded-full inline-flex group-hover:from-[#31487A] group-hover:to-[#8FB3E2] transition-all duration-300">
                      {React.createElement(card.icon, { className: "h-6 w-6 text-white" })}
                    </div>
                    <h3 className="font-bold text-[#1E2E4F] mb-2 text-sm">{card.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-3">{card.description}</p>
                    <div className="bg-gradient-to-r from-[#1E2E4F] to-[#31487A] text-white text-xs font-bold py-1 px-3 rounded-full">ลด {card.discount}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Products Section */}
      <div className="py-8 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-6">

            <h2 className="text-xl font-bold text-[#1E2E4F] mb-2">สินค้ายอดนิยม</h2>
            <Link href="/categories" className="inline-flex items-center text-[#1E2E4F] hover:text-[#31487A] font-semibold text-xs mt-2 group">
              ดูสินค้าทั้งหมด
              <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {popularProducts.slice(0, 5).map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-100 hover:border-[#8FB3E2] group h-full flex flex-col">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-16 w-16 text-[#8FB3E2] group-hover:text-[#31487A] transition-colors" />
                    </div>
                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-[#1E2E4F] to-[#31487A] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {product.badge}
                    </div>
                    {/* Discount */}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-[#31487A] to-[#8FB3E2] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {product.discount}
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-[#1E2E4F] text-sm leading-tight mb-3 line-clamp-2 group-hover:text-[#31487A] transition-colors flex-1">
                      {product.name}
                    </h3>
                    
                    {/* Category */}
                    <p className="text-xs text-[#8FB3E2] font-medium mb-3 bg-[#8FB3E2]/10 px-2 py-1 rounded-full inline-block">{product.category}</p>
                    
                    {/* Rating & Sold */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-yellow-700 ml-1 font-medium">{product.rating}</span>
                      </div>
                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">ขายแล้ว {product.sold}</span>
                    </div>
                    
                    {/* Price */}
                    <div className="border-t border-gray-100 pt-3 mt-auto">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-[#1E2E4F]">฿{product.price}</span>
                          <span className="text-xs text-gray-500 line-through ml-2">฿{product.originalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
      
        </div>
      </div>

      {/* Shop by Brands Section */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Brand Slider */}
          <div className="relative bg-white rounded-2xl shadow-lg p-8 overflow-hidden">
            {/* Header inside card */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center bg-gradient-to-r from-[#1E2E4F] to-[#31487A] text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                <Star className="h-4 w-4 mr-2" />
                ช้อปตามแบรนด์
              </div>
            </div>
            {/* Navigation Buttons */}
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-10">
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-10">
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
            
            {/* Brand Logos Container */}
            <div className="flex items-center justify-center gap-8 md:gap-12">
              {brands.slice(0, 6).map((brand, index) => (
                <Link key={index} href={brand.link} className="group flex-shrink-0">
                  <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-300 transform hover:scale-105 w-32 h-20 flex items-center justify-center">
                    {/* Brand Logo/Name */}
                    <div className="text-center">
                      <span className="text-lg font-bold text-gray-700 group-hover:text-[#1E2E4F] transition-colors">
                        {brand.name}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              <div className="w-2 h-2 bg-[#1E2E4F] rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="py-8 bg-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center bg-gradient-to-r from-[#8FB3E2] to-[#31487A] text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
              <Package className="h-3 w-3 mr-1" />
              หมวดหมู่สินค้า
            </div>
            <h2 className="text-xl font-bold text-[#1E2E4F] mb-2">เลือกซื้อตามหมวดหมู่</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((category, index) => (
              <Link key={index} href={category.link} className="group">
                <div className={`${category.color} text-white rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 min-h-[80px] flex flex-col justify-center relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                  </div>
                  <div className="relative z-10">
                    <div className="mb-2 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                      {React.createElement(category.icon, { className: "h-5 w-5" })}
                    </div>
                    <h3 className="text-xs font-semibold leading-tight">{category.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}