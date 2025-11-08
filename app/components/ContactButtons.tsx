"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Phone, Mail, X } from "lucide-react";

export default function ContactButtons() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // ปิดเมนูเมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-contact-menu]')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const contactOptions = [
    {
      icon: <MessageCircle className="w-full h-full" />,
      label: "LINE",
      action: () => {
        window.open("https://line.me/R/ti/p/@sphardware9", "_blank");
        setIsOpen(false);
      },
      bgColor: "bg-green-500",
      description: "LINE",
      angle: 225
    },
    {
      icon: <Phone className="w-full h-full" />,
      label: "โทร",
      action: () => {
        window.open("tel:091-939-7000", "_self");
        setIsOpen(false);
      },
      bgColor: "bg-blue-500",
      description: "โทร",
      angle: 180
    },
    {
      icon: <Mail className="w-full h-full" />,
      label: "อีเมลล์",
      action: () => {
        window.open("mailto:sphardware9@gmail.com", "_self");
        setIsOpen(false);
      },
      bgColor: "bg-red-500",
      description: "อีเมลล์",
      angle: 135
    }
  ];

  // คำนวณตำแหน่งแบบวงกลม - รองรับมือถือ
  const getPosition = (angle: number) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const radius = isMobile ? 55 : 70; // รัศมีเล็กลงสำหรับมือถือ
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius
    };
  };

  return (
    <div className="fixed bottom-16 sm:bottom-20 right-4 sm:right-6 z-50" data-contact-menu>
      {/* Simple backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/5 -z-10 transition-opacity duration-200" />
      )}

      {/* Clean Container */}
      <div className="relative">
        
        {/* Contact Options - Clean circles */}
        {contactOptions.map((option, index) => {
          const position = getPosition(option.angle);
          return (
            <div
              key={index}
              className={`absolute transition-all duration-300 ease-out ${
                isOpen 
                  ? 'opacity-100 scale-100 pointer-events-auto' 
                  : 'opacity-0 scale-0 pointer-events-none'
              }`}
              style={{
                transform: isOpen 
                  ? `translate(${position.x}px, ${position.y}px)` 
                  : 'translate(0, 0)',
                transitionDelay: isOpen ? `${index * 100}ms` : '0ms'
              }}
            >
              <div className="group relative">
                {/* Mobile-friendly Tooltip */}
                <div className="absolute right-10 sm:right-12 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
                  {option.description}
                </div>
                
                {/* Responsive Button */}
                <button
                  onClick={option.action}
                  className={`${option.bgColor} hover:brightness-110 active:scale-95 text-white p-2.5 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 touch-manipulation`}
                  aria-label={option.label}
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5">
                    {option.icon}
                  </div>
                </button>
              </div>
            </div>
          );
        })}

        {/* Main Toggle Button - Mobile responsive */}
        <button
          onClick={toggleMenu}
          className={`bg-[#1E2E4F] hover:bg-[#31487A] text-white p-3 sm:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation ${
            isOpen ? 'rotate-45' : 'rotate-0'
          }`}
          aria-label="ช่องทางติดต่อ"
        >
          {isOpen ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </button>

        {/* Responsive notification dot */}
        {!isOpen && (
          <div className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
        )}
      </div>
    </div>
  );
}