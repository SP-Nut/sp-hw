"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { customerReviews } from "../data/homepage-data";

export default function CustomerReviews() {
  const [currentReviewSlide, setCurrentReviewSlide] = useState(0);
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

  return (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 md:px-16 max-w-full">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1e2e4f] mb-4">
            รีวิวจากลูกค้า
          </h2>
          
          {/* Overall Rating */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-yellow-500 fill-current" />
              ))}
            </div>
            <span className="text-sm text-gray-600">2,449 รีวิว</span>
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
              <div key={review.id} className="bg-white p-6 flex-shrink-0 w-1/4 rounded-lg shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">{review.date}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {review.name} {review.verified && (
                        <span className="text-xs text-green-600">✓ ยืนยันแล้ว</span>
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
                          ? 'text-yellow-500 fill-current' 
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
              <div key={review.id} className="bg-white p-4 flex-shrink-0 w-80 rounded-lg shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500">{review.date}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {review.name} {review.verified && (
                        <span className="text-xs text-green-600">✓ ยืนยันแล้ว</span>
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
                          ? 'text-yellow-500 fill-current' 
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
            className="p-2 bg-white hover:bg-[#1e2e4f] text-[#1e2e4f] hover:text-white border border-gray-300 hover:border-[#1e2e4f] transition-all duration-300 rounded-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={nextReviewSlide}
            className="p-2 bg-white hover:bg-[#1e2e4f] text-[#1e2e4f] hover:text-white border border-gray-300 hover:border-[#1e2e4f] transition-all duration-300 rounded-lg"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
