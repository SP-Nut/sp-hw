"use client";

import Link from "next/link";
import { brands } from "../data/homepage-data";

export default function TrustedBrands() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-16 max-w-full">
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
  );
}
