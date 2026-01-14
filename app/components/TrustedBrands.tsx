"use client";

import Link from "next/link";
import Image from "next/image";
import { brands } from "../data/homepage-data";

export default function TrustedBrands() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-16 max-w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1e2e4f] mb-3">
            แบรนด์พันธมิตร
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">แบรนด์คุณภาพที่เราคัดสรรมาเพื่อคุณ</p>
        </div>
        
        {/* Desktop Grid - 7 columns for 21 items (3 rows) */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-7 gap-4 items-center justify-items-center">
          {brands.map((brand, index) => (
            <Link key={index} href={brand.link} className="group w-full">
              <div className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-[#1e2e4f] transition-all duration-300 transform hover:scale-105 h-20 flex items-center justify-center px-3 py-2 rounded-lg shadow-sm">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={100}
                  height={50}
                  className="object-contain max-h-14 w-auto"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex space-x-3 pb-4 px-2">
            {brands.map((brand, index) => (
              <Link key={index} href={brand.link} className="group flex-shrink-0">
                <div className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-[#1e2e4f] transition-all duration-300 h-20 w-28 flex items-center justify-center px-2 py-2 rounded-lg shadow-sm">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={100}
                    height={50}
                    className="object-contain max-h-14 w-auto"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
