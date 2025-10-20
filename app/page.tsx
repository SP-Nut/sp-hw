"use client";

import { useState, useEffect } from "react";
import { 
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { 
  heroImages, 
  promotionalCards
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
    }, 6000);
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
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover select-none pointer-events-none"
                priority={index === 0}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-4 sm:bottom-8 left-4 md:left-16 right-4 sm:right-auto z-10 text-left text-white max-w-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black mb-2 sm:mb-2 tracking-tight drop-shadow-lg italic">
            SP HARDWARE
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 text-white/90 font-light drop-shadow-md leading-tight">
            ศูนย์รวมวัสดุกันสาดมากที่สุดในไทย
          </p>
          <div className="flex">
            <Link href="/categories" className="bg-white text-gray-900 px-4 sm:px-8 py-2 sm:py-4 text-base sm:text-lg font-bold rounded-none hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 sm:min-w-[200px] shadow-lg">
              เลือกซื้อสินค้า
            </Link>
          </div>
        </div>

        {/* Navigation Controls - Hidden on mobile */}
        <button
          onClick={prevSlide}
          className="hidden sm:block absolute left-4 md:left-16 top-1/2 transform -translate-y-1/2 bg-black/10 hover:bg-black/20 backdrop-blur text-gray-900 p-3 rounded-none transition-all duration-300 z-20 group"
        >
          <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden sm:block absolute right-4 md:right-16 top-1/2 transform -translate-y-1/2 bg-black/10 hover:bg-black/20 backdrop-blur text-gray-900 p-3 rounded-none transition-all duration-300 z-20 group"
        >
          <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-2 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Category Navigation - BMW Style Layout (2+1 Cards) */}
      <div className="py-8 bg-gray-100">
        <div className="container mx-auto px-4 md:px-16 max-w-full">
          {/* Mobile: Stack all cards vertically */}
          <div className="lg:hidden grid grid-cols-1 gap-4">
            {promotionalCards.slice(0, 3).map((card, index) => {
              const isExternalLink = card.link.startsWith('http');
              
              if (isExternalLink) {
                return (
                  <a key={index} href={card.link} target="_blank" rel="noopener noreferrer" className="group">
                    <div className="relative h-64 overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl">
                  {/* Background Image */}
                  <Image
                    src={`/hero-promotion/${index + 1}.png`}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 rounded-2xl" />
                  
                  {/* Main Content */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
                    <div className="mb-2">
                      <p className="text-white/70 text-sm font-bold tracking-[0.3em] uppercase">
                        {card.subtitle}
                      </p>
                    </div>
                    <div className="mb-3">
                      <h3 className="text-white font-black text-lg leading-tight tracking-tight drop-shadow-2xl">
                        {card.title.toUpperCase()}
                      </h3>
                    </div>
                    <div className="mb-4">
                      <p className="text-white/90 text-sm font-medium leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-2xl" />
                </div>
              </a>
            );
              }
              
              return (
                <Link key={index} href={card.link} className="group">
                  <div className="relative h-64 overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl">
                    {/* Background Image */}
                    <Image
                      src={`/hero-promotion/${index + 1}.png`}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 rounded-2xl" />
                    
                    {/* Main Content */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
                      <div className="mb-2">
                        <p className="text-white/70 text-sm font-bold tracking-[0.3em] uppercase">
                          {card.subtitle}
                        </p>
                      </div>
                      <div className="mb-3">
                        <h3 className="text-white font-black text-lg leading-tight tracking-tight drop-shadow-2xl">
                          {card.title.toUpperCase()}
                        </h3>
                      </div>
                      <div className="mb-4">
                        <p className="text-white/90 text-sm font-medium leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-2xl" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Desktop: 2 small cards on left, 1 large card on right */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-6 h-[500px] w-full">
            {/* Left Column: 2 stacked small cards */}
            <div className="flex flex-col gap-6 w-full">
              {promotionalCards.slice(0, 2).map((card, index) => {
                const isExternalLink = card.link.startsWith('http');
                
                if (isExternalLink) {
                  return (
                    <a key={index} href={card.link} target="_blank" rel="noopener noreferrer" className="group flex-1">
                  <div className="relative h-full overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl">
                    {/* Background Image */}
                    <Image
                      src={`/hero-promotion/${index + 1}.png`}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 rounded-2xl" />
                    
                    {/* Main Content */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
                      <div className="mb-2">
                        <p className="text-white/70 text-xs font-bold tracking-[0.3em] uppercase">
                          {card.subtitle}
                        </p>
                      </div>
                      <div className="mb-3">
                        <h3 className="text-white font-black text-xl xl:text-2xl leading-tight tracking-tight drop-shadow-2xl">
                          {card.title.toUpperCase()}
                        </h3>
                      </div>
                      <div className="mb-4">
                        <p className="text-white/90 text-sm font-medium leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-2xl" />
                    
                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-white/10 group-hover:border-t-white/20 transition-all duration-300" />
                  </div>
                </a>
              );
                }
                
                return (
                  <Link key={index} href={card.link} className="group flex-1">
                    <div className="relative h-full overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl">
                      {/* Background Image */}
                      <Image
                        src={`/hero-promotion/${index + 1}.png`}
                        alt={card.title}
                        fill
                        className="object-cover"
                      />
                      
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 rounded-2xl" />
                      
                      {/* Main Content */}
                      <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
                        <div className="mb-2">
                          <p className="text-white/70 text-xs font-bold tracking-[0.3em] uppercase">
                            {card.subtitle}
                          </p>
                        </div>
                        <div className="mb-3">
                          <h3 className="text-white font-black text-xl xl:text-2xl leading-tight tracking-tight drop-shadow-2xl">
                            {card.title.toUpperCase()}
                          </h3>
                        </div>
                        <div className="mb-4">
                          <p className="text-white/90 text-sm font-medium leading-relaxed">
                            {card.description}
                          </p>
                        </div>
                      </div>

                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-2xl" />
                      
                      {/* Corner Accent */}
                      <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-white/10 group-hover:border-t-white/20 transition-all duration-300" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Right Column: 1 large card */}
            <div className="w-full">
              {promotionalCards.slice(2, 3).map((card, index) => {
                const isExternalLink = card.link.startsWith('http');
                
                if (isExternalLink) {
                  return (
                    <a key={index + 2} href={card.link} target="_blank" rel="noopener noreferrer" className="group block h-full">
                  <div className="relative h-full overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl">
                    {/* Background Image */}
                    <Image
                      src={`/hero-promotion/3.png`}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 rounded-2xl" />
                    
                    {/* Main Content */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center">
                      <div className="mb-4">
                        <p className="text-white/70 text-base font-bold tracking-[0.3em] uppercase">
                          {card.subtitle}
                        </p>
                      </div>
                      <div className="mb-6">
                        <h3 className="text-white font-black text-3xl xl:text-4xl leading-tight tracking-tight drop-shadow-2xl">
                          {card.title.toUpperCase()}
                        </h3>
                      </div>
                      <div className="mb-8">
                        <p className="text-white/90 text-lg font-medium leading-relaxed max-w-md">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-2xl" />
                    
                    {/* Corner Accents */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[60px] border-l-transparent border-t-[60px] border-t-white/10 group-hover:border-t-white/20 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 w-0 h-0 border-r-[60px] border-r-transparent border-b-[60px] border-b-white/10 group-hover:border-b-white/20 transition-all duration-300" />
                  </div>
                </a>
              );
                }
                
                return (
                  <Link key={index + 2} href={card.link} className="group block h-full">
                    <div className="relative h-full overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl">
                      {/* Background Image */}
                      <Image
                        src={`/hero-promotion/3.png`}
                        alt={card.title}
                        fill
                        className="object-cover"
                      />
                      
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 rounded-2xl" />
                      
                      {/* Main Content */}
                      <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center">
                        <div className="mb-4">
                          <p className="text-white/70 text-base font-bold tracking-[0.3em] uppercase">
                            {card.subtitle}
                          </p>
                        </div>
                        <div className="mb-6">
                          <h3 className="text-white font-black text-3xl xl:text-4xl leading-tight tracking-tight drop-shadow-2xl">
                            {card.title.toUpperCase()}
                          </h3>
                        </div>
                        <div className="mb-8">
                          <p className="text-white/90 text-lg font-medium leading-relaxed max-w-md">
                            {card.description}
                          </p>
                        </div>
                      </div>

                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-2xl" />
                      
                      {/* Corner Accents */}
                      <div className="absolute top-0 right-0 w-0 h-0 border-l-[60px] border-l-transparent border-t-[60px] border-t-white/10 group-hover:border-t-white/20 transition-all duration-300" />
                      <div className="absolute bottom-0 left-0 w-0 h-0 border-r-[60px] border-r-transparent border-b-[60px] border-b-white/10 group-hover:border-b-white/20 transition-all duration-300" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Members-Only Club Section */}
      <div className="py-8" style={{ backgroundColor: '#1e2e4f' }}>
        <div className="container mx-auto px-4 md:px-16 max-w-full">
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

      {/* Footer CTA - Light AUTOID Style */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-16 max-w-full text-center">
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