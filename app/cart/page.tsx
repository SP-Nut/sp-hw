"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Shield } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    try {
      // สร้างข้อความออเดอร์
      const orderMessage = generateOrderMessage();
      
      // LINE OA ID
      const lineOAId = "576kulwa";
      
      // เข้ารหัสข้อความสำหรับ URL
      const encodedMessage = encodeURIComponent(orderMessage);
      
      // สร้าง LINE URL ที่เปิดแชทพร้อมข้อความ
      const lineUrl = `https://line.me/R/oaMessage/@${lineOAId}/?${encodedMessage}`;
      
      // เปิด LINE
      window.open(lineUrl, '_blank');
      
      // แสดงข้อความแนะนำ
      alert('กำลังเปิด LINE...\n\nข้อความออเดอร์จะถูกพิมพ์ไว้ให้แล้ว\nกรุณากดปุ่ม "ส่ง" ใน LINE เพื่อส่งออเดอร์ให้แอดมิน');
      
      // ล้างตะกร้าหลังจากเปิด LINE
      setTimeout(() => {
        clearCart();
      }, 3000);

    } catch (error) {
      console.error('Checkout Error:', error);
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const generateOrderMessage = () => {
    const currentDate = new Date().toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    let message = `🛒 สั่งซื้อสินค้า\n`;
    message += `📅 ${currentDate}\n\n`;
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   ${item.brand} | ฿${item.price.toLocaleString()} x ${item.quantity}\n\n`;
    });
    
    message += `💰 รวม: ฿${subtotal.toLocaleString()}`;
    message += `\n\n✅ แอดมินจะติดต่อกลับเพื่อยืนยันออเดอร์`;
    
    return message;
  };

  const subtotal = getTotalPrice();
  const savings = items.reduce((sum, item) => {
    const originalPrice = item.originalPrice || item.price;
    return sum + ((originalPrice - item.price) * item.quantity);
  }, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-16 max-w-full">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ตะกร้าสินค้าว่าง</h2>
            <p className="text-gray-600 mb-8">ยังไม่มีสินค้าในตะกร้า เริ่มเลือกซื้อสินค้าได้เลย</p>
            <Link 
              href="/categories"
              className="bg-[#1E2E4F] text-white px-8 py-3 font-medium hover:bg-[#31487A] transition inline-flex items-center rounded-lg"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              เลือกซื้อสินค้า
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      {/* Header */}
      <div className="bg-[#1e2e4f] text-white">
        <div className="container mx-auto px-4 md:px-16 max-w-full py-8 lg:py-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">ตะกร้าสินค้า</h1>
          <p className="text-base sm:text-lg text-gray-300 font-light">
            {items.length} รายการ ({items.reduce((sum, item) => sum + item.quantity, 0)} ชิ้น) - จัดการสินค้าในตะกร้าของคุณ
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-16 max-w-full py-8">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 sm:p-6 border-b flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-semibold">รายการสินค้า</h2>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">ล้างตะกร้า</span>
                </button>
              </div>
              
              <div className="divide-y">
                {items.map(item => (
                  <div key={item.id} className="p-3 sm:p-4 md:p-6">
                    <div className="flex gap-3 sm:gap-4">
                      {/* Product Image */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-400 text-xs">รูป</span>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="text-xs sm:text-sm text-[#31487A] font-bold">{item.brand}</div>
                            <h3 className="font-semibold text-[#1E2E4F] mb-1 text-sm sm:text-base line-clamp-2">{item.name}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                              <span className="text-base sm:text-lg md:text-xl font-bold text-[#1E2E4F]">
                                ฿{item.price.toLocaleString()}
                              </span>
                              {item.originalPrice && item.originalPrice > item.price && (
                                <span className="text-xs sm:text-sm text-gray-500 line-through">
                                  ฿{item.originalPrice.toLocaleString()}  
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition ml-2"
                          >
                            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="p-1.5 sm:p-2 hover:bg-gray-100 transition"
                            >
                              <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                              className="w-12 sm:w-16 text-center py-1.5 sm:py-2 border-0 focus:ring-0 text-sm"
                              min="1"
                            />
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="p-1.5 sm:p-2 hover:bg-gray-100 transition"
                            >
                              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-semibold text-gray-900 text-sm sm:text-base">
                              ฿{(item.price * item.quantity).toLocaleString()}
                            </div>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <div className="text-xs sm:text-sm text-green-600">
                                ประหยัด ฿{((item.originalPrice - item.price) * item.quantity).toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>

                        {!item.inStock && (
                          <div className="mt-2 text-sm text-red-600">
                            สินค้าหมด จะถูกลบออกจากตะกร้าอัตโนมัติ
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="p-4 sm:p-6 border-t bg-[#8FB3E2]/10">
                <Link 
                  href="/categories"
                  className="inline-flex items-center text-[#31487A] hover:text-[#1E2E4F] font-bold text-sm sm:text-base"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  เลือกซื้อสินค้าต่อ
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">สรุปคำสั่งซื้อ</h2>

              {/* Price Breakdown */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">ราคาสินค้า ({items.reduce((sum, item) => sum + item.quantity, 0)} ชิ้น)</span>
                  <span>฿{subtotal.toLocaleString()}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-600 text-sm sm:text-base">
                    <span>ส่วนลดจากสินค้า</span>
                    <span>-฿{savings.toLocaleString()}</span>
                  </div>
                )}

                <div className="text-xs sm:text-sm text-[#31487A] bg-[#8FB3E2]/10 p-2 sm:p-3 rounded-lg">
                  💬 ค่าจัดส่งคุยกับแอดมินทีหลังได้เลย
                </div>
              </div>

              <div className="border-t pt-3 sm:pt-4 mb-4 sm:mb-6">
                <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
                  <span className="text-[#1E2E4F]">รวมทั้งสิ้น</span>
                  <span className="text-[#1E2E4F]">฿{subtotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition flex items-center justify-center text-sm sm:text-base ${
                    isCheckingOut
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-[#00B900] text-white hover:bg-green-600'
                  }`}
                >
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  {isCheckingOut ? 'กำลังเปิด LINE...' : 'สั่งซื้อผ่าน LINE'}
                </button>
                <p className="text-xs text-gray-500 text-center">
                  กดปุ่มแล้วจะเปิด LINE พร้อมข้อความออเดอร์ให้กดส่ง
                </p>
              </div>

              {/* Trust Badges */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
                <div className="flex justify-center">
                  <div className="text-center">
                    <div className="flex justify-center mb-1">
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-[#31487A]" />
                    </div>
                    <div className="text-xs sm:text-sm text-[#31487A] font-medium">ปลอดภัย 100%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Viewed or Recommended */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <h3 className="text-xl sm:text-2xl font-bold text-[#1E2E4F] mb-4 sm:mb-6">สินค้าที่แนะนำ</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              { id: 4, name: "สกรูเมทัลชีท 4.8x25mm", price: 8, image: "/placeholder-product.jpg" },
              { id: 5, name: "ยางปิดผนึกเมทัลชีท", price: 45, image: "/placeholder-product.jpg" },
              { id: 6, name: "แผ่นเมทัลชีท 0.7mm สีแดง", price: 320, image: "/placeholder-product.jpg" },
              { id: 7, name: "น็อตเมทัลชีท M6x50", price: 12, image: "/placeholder-product.jpg" }
            ].map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
                <div className="h-32 sm:h-40 md:h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-xs sm:text-sm">รูปสินค้า</span>
                </div>
                <div className="p-3 sm:p-4">
                  <h4 className="font-semibold mb-2 line-clamp-2 text-sm sm:text-base">{product.name}</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-base sm:text-lg md:text-xl font-bold text-[#1E2E4F]">฿{product.price.toLocaleString()}</span>
                    <button className="bg-[#1E2E4F] text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold hover:bg-[#31487A] transition rounded">
                      <span className="hidden sm:inline">เพิ่มลงตะกร้า</span>
                      <span className="sm:hidden">เพิ่ม</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}