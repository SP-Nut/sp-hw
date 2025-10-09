"use client";

import React, { useState, useEffect } from "react";
import { 
  ChevronLeft,
  ChevronRight,
  Package,
  Star
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { 
  heroImages, 
  promotionalCards, 
  popularProducts, 
  brands, 
  customerReviews 
} from "./data/homepage-data";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [currentReviewSlide, setCurrentReviewSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [heroTouchStart, setHeroTouchStart] = useState(0);
  const [heroTouchEnd, setHeroTouchEnd] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
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
        <div className="absolute bottom-4 sm:bottom-8 left-12 md:left-16 right-4 sm:right-auto z-10 text-left text-white max-w-2xl">
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
          className="hidden sm:block absolute left-12 md:left-16 top-1/2 transform -translate-y-1/2 bg-black/10 hover:bg-black/20 backdrop-blur text-gray-900 p-3 rounded-none transition-all duration-300 z-20 group"
        >
          <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden sm:block absolute right-12 md:right-16 top-1/2 transform -translate-y-1/2 bg-black/10 hover:bg-black/20 backdrop-blur text-gray-900 p-3 rounded-none transition-all duration-300 z-20 group"
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
        <div className="container mx-auto px-12 md:px-16 max-w-full">
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
        <div className="container mx-auto px-12 md:px-16 max-w-full">
          <div className="text-center">
            <h2 className="text-white font-black text-2xl sm:text-3xl lg:text-4xl tracking-wide italic">
              SP HARDWARE ศูนย์รวมวัสดุกันสาดมากที่สุดในไทย
            </h2>
          </div>
        </div>
      </div>

      {/* Popular Products Section - Light AUTOID Style */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-12 md:px-16 max-w-full">
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

      {/* Trusted Brands Section - Light AUTOID Style */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-12 md:px-16 max-w-full">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 tracking-wide">
              PARTNER
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
        <div className="container mx-auto px-12 md:px-16 max-w-full">
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
                <div key={review.id} className="bg-white p-6 flex-shrink-0 w-1/4">
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
                <div key={review.id} className="bg-white p-4 flex-shrink-0 w-80">
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

      {/* Contact & Location Section */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-12 md:px-16 max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">CONTACT US</span>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-2 mb-3 tracking-wide">
                  Get In Touch
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  ติดต่อเราสำหรับคำปรึกษาเกี่ยวกับวัสดุก่อสร้าง หรือสอบถามข้อมูลสินค้า
                </p>
              </div>

              <form className="space-y-4">
                {/* Row 1: Name and Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ชื่อ <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="ชื่อ"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      นามสกุล
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="นามสกุล"
                    />
                  </div>
                </div>

                {/* Row 2: Phone and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      เบอร์โทร <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="tel" 
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="เบอร์โทร"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Email Address"
                    />
                  </div>
                </div>

                {/* Row 3: Topic and LINE ID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      บริษัท/หน่วยงาน
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="บริษัท/หน่วยงาน"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID LINE
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                      placeholder="ID LINE"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    รายละเอียด
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-vertical text-sm"
                    placeholder="รายละเอียด"
                  />
                </div>

                <button 
                  type="submit"
                  className="text-white font-bold py-2.5 px-8 rounded transition-all duration-300 text-sm tracking-wide hover:opacity-90"
                  style={{ backgroundColor: '#1e2e4f' }}
                >
                  ส่งข้อมูล
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-black text-gray-900 mb-6 tracking-wide">Contact Information</h3>
              
              <p className="text-gray-600 text-base mb-8 leading-relaxed">
                ติดต่อเราสำหรับคำปรึกษาเกี่ยวกับวัสดุก่อสร้าง หรือสอบถามข้อมูลสินค้า 
                ทีมงานของเราพร้อมให้คำแนะนำและบริการที่ดีที่สุด ติดต่อได้ทุกช่องทางตามสะดวก
              </p>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {/* Call Us */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#1e2e4f]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">Call Us</h4>
                    <p className="text-gray-600 text-base">02-936-8841-2</p>
                    <p className="text-gray-600 text-base">084-909-7777</p>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#1e2e4f]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">Email Us</h4>
                    <p className="text-gray-600 text-base">spkansards@gmail.com</p>
                    <p className="text-gray-600 text-base">FAX: 02-936-8843</p>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#1e2e4f]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">Website</h4>
                    <p className="text-gray-600 text-base">www.spkansard.com</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#1e2e4f]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">Address</h4>
                    <p className="text-gray-600 text-base">เลขที่ 28/101 ถ.รัชดา-รามอินทรา<br />แขวงคลองกุ่ม เขตบึงกุ่ม กทม. 10230</p>
                  </div>
                </div>
              </div>

              {/* Follow Us */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3 text-base">Follow Us On</h4>
                <div className="flex space-x-2">
                  <a href="#" className="w-10 h-10 bg-[#1e2e4f] hover:bg-[#2a3b5f] text-white rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#1e2e4f] hover:bg-[#2a3b5f] text-white rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.1.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.744-1.378l-.628 2.43c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                  <a href="https://line.me/R/ti/p/@sp-hardware" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#1e2e4f] hover:bg-[#2a3b5f] text-white rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.30 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        <div className="container mx-auto px-12 md:px-16 max-w-full text-center">
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