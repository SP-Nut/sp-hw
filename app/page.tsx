"use client";

import { useState, useEffect } from "react";
import { 
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { 
  heroImages
} from "./data/homepage-data";
import PopularProducts from "./components/PopularProducts";
import TrustedBrands from "./components/TrustedBrands";
import CustomerReviews from "./components/CustomerReviews";
import ContactSection from "./components/ContactSection";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroTouchStart, setHeroTouchStart] = useState(0);
  const [heroTouchEnd, setHeroTouchEnd] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 2900);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  // Hero touch handlers for swipe navigation
  const handleHeroTouchStart = (e: React.TouchEvent) => {
    setHeroTouchEnd(0);
    setHeroTouchStart(e.targetTouches[0].clientX);
  };

  const handleHeroTouchMove = (e: React.TouchEvent) => {
    setHeroTouchEnd(e.targetTouches[0].clientX);
  };

  const handleHeroTouchEnd = () => {
    if (!heroTouchStart || !heroTouchEnd) return;
    const distance = heroTouchStart - heroTouchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section - Light AUTOID Style */}
      <div 
        className="relative h-[600px] sm:h-[700px] lg:h-[80vh] overflow-hidden touch-pan-y"
        onTouchStart={handleHeroTouchStart}
        onTouchMove={handleHeroTouchMove}
        onTouchEnd={handleHeroTouchEnd}
        style={{ 
          touchAction: 'pan-y',
          minHeight: '500px',
          maxHeight: '800px'
        }}
      >
        {/* Background Images Slider */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Desktop Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                className="hidden sm:block absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
                loading={index === 0 ? "eager" : "lazy"}
                style={{
                  imageRendering: 'crisp-edges',
                  filter: 'contrast(1.1) saturate(1.05)',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                  willChange: 'transform'
                }}
              />
              
              {/* Mobile Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.srcMobile || image.src}
                alt={image.alt}
                className="block sm:hidden absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
                loading={index === 0 ? "eager" : "lazy"}
                style={{
                  imageRendering: 'crisp-edges',
                  filter: 'contrast(1.1) saturate(1.05)',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                  willChange: 'transform'
                }}
              />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          {/* Mobile Layout */}
          <div className="sm:hidden">
            <div className="bg-gradient-to-t from-black/60 via-black/40 to-transparent w-full py-6">
              <div className="px-4 text-left text-white">
                <h1 className="text-2xl font-black mb-2 tracking-tight drop-shadow-2xl italic text-shadow-lg">
                  SP HARDWARE
                </h1>
                <p className="text-sm mb-3 text-white/95 font-light drop-shadow-xl leading-tight text-shadow">
                  ศูนย์รวมวัสดุกันสาดมากที่สุดในไทย
                </p>
                <div className="flex">
                  <Link href="/categories" className="bg-white text-gray-900 px-5 py-2.5 text-base font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                    เลือกซื้อสินค้า
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Full Width Black Background */}
          <div className="hidden sm:block">
            {/* Full Width Black Background */}
            <div className="bg-gradient-to-t from-black/70 via-black/50 to-transparent w-full py-8 md:py-12 lg:py-16">
              <div className="px-4 lg:px-8 xl:px-16 text-left text-white max-w-3xl">
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-black mb-2 tracking-tight drop-shadow-2xl italic text-shadow-lg">
                  SP HARDWARE
                </h1>
                <p className="text-base md:text-lg lg:text-xl mb-4 text-white/95 font-light drop-shadow-xl leading-tight text-shadow">
                  ศูนย์รวมวัสดุกันสาดมากที่สุดในไทย
                </p>
                <div className="flex">
                  <Link href="/categories" className="bg-white text-gray-900 px-8 py-4 text-lg font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 min-w-[200px] shadow-2xl">
                    เลือกซื้อสินค้า
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls - Hidden on mobile */}
        <button
          onClick={prevSlide}
          className="hidden sm:block absolute left-4 md:left-16 top-1/2 transform -translate-y-1/2 bg-black/10 hover:bg-black/20 backdrop-blur text-white p-3 rounded-lg transition-all duration-300 z-20 group"
        >
          <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden sm:block absolute right-4 md:right-16 top-1/2 transform -translate-y-1/2 bg-black/10 hover:bg-black/20 backdrop-blur text-white p-3 rounded-lg transition-all duration-300 z-20 group"
        >
          <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-2 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Members-Only Club Section */}
      <div className="py-8" style={{ backgroundColor: '#1e2e4f' }}>
        <div className="px-4 lg:px-8 xl:px-16 max-w-full">
          <div className="text-center">
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl tracking-wide italic">
              SP HARDWARE ศูนย์รวมวัสดุกันสาดมากที่สุดในไทย
            </h2>
          </div>
        </div>
      </div>

      {/* Popular Products Section */}
      <PopularProducts />

      {/* Trusted Brands Section */}
      <TrustedBrands />

      {/* Customer Reviews Section */}
      <CustomerReviews />

      {/* Contact & Location Section */}
      <ContactSection />

      {/* Full Width Map Section - No bottom margin */}
      <div className="-mt-0">
        <div className="overflow-hidden">
          <div className="h-64 md:h-80 lg:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.948627582844!2d100.6539081!3d13.8193919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6257c238b67d:0xee9648c1a7c7c912!2sSP%20Kansard%20%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97%20%E0%B9%80%E0%B8%AD%E0%B8%AA%E0%B8%9E%E0%B8%B5%20%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%AA%E0%B8%B2%E0%B8%94%20%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94!5e0!3m2!1sth!2sth!4v1697701234567!5m2!1sth!2sth"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SP Kansard Location"
            />
          </div>
        </div>
      </div>

      {/* Footer CTA - Professional Construction Style */}
      <div className="py-16 sm:py-20 bg-gray-100">
        <div className="px-4 lg:px-8 xl:px-16 max-w-full text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e2e4f] mb-6">
            ผู้เชี่ยวชาญด้านวัสดุก่อสร้าง
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            มากกว่า 25 ปี ที่เราเป็นศูนย์รวมวัสดุกันสาดและอุปกรณ์ก่อสร้างครบวงจร พร้อมทีมงานมืออาชีพให้คำปรึกษา
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/categories" 
              className="inline-block bg-[#1e2e4f] text-white px-8 py-4 text-lg font-bold rounded-lg hover:bg-[#31487a] transition-all duration-300 transform hover:scale-105"
            >
              ดูสินค้าทั้งหมด
            </Link>
            <a 
              href="https://line.me/R/ti/p/@576kulwa" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#06C755] text-white px-8 py-4 text-lg font-bold rounded-lg hover:bg-[#05b04c] transition-all duration-300 transform hover:scale-105"
            >
              ติดต่อเราทาง LINE
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}