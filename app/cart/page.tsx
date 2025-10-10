"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, Truck, ArrowLeft, Shield, Link as LinkIcon } from "lucide-react";
import { useCart } from "../contexts/CartContext";

interface LineUser {
  userId: string;
  displayName: string;
  pictureUrl?: string;
}

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [lineUser, setLineUser] = useState<LineUser | null>(null);

  // ตรวจสอบ LINE Login status จาก URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const lineLogin = urlParams.get('lineLogin');
    const userId = urlParams.get('userId');
    const displayName = urlParams.get('displayName');

    if (lineLogin === 'success' && userId && displayName) {
      setLineUser({
        userId,
        displayName,
        pictureUrl: undefined
      });

      // ลบ parameters ออกจาก URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);

      // แสดงข้อความต้อนรับ
      setTimeout(() => {
        alert(`เชื่อมต่อ LINE สำเร็จ!\n\nสวัสดี ${displayName}\nตอนนี้คุณจะได้รับแจ้งเตือนออเดอร์ผ่าน LINE โดยตรง`);
      }, 500);
    }
  }, []);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    try {
      // เตรียมข้อมูลสำหรับส่งไป API
      const orderData = {
        items: items,
        subtotal: subtotal,
        savings: savings,
        shipping: shipping,
        total: total,
        customerInfo: lineUser ? {
          name: lineUser.displayName,
          lineUserId: lineUser.userId
        } : undefined,
        sendToAdmin: true,  // ส่งแจ้งเตือนไปแอดมินเสมอ
        sendToCustomer: true,  // พยายามส่งไปลูกค้าเสมอ (ทั้งกรณีมี User ID และไม่มี)
        sendToGroup: !lineUser  // ถ้าไม่มี User ID ให้ส่งไปกลุ่ม/OA
      };

      // ส่งข้อมูลไป API
      const response = await fetch('/api/line/send-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (result.success) {
        // สำเร็จ - แสดงข้อความและเปิด LINE
        let message = 'ส่งออเดอร์เรียบร้อยแล้ว!\n\n';
        
        if (result.results.adminNotified) {
          message += 'แอดมินได้รับแจ้งเตือนแล้ว\n';
        }
        
        if (result.results.customerNotified) {
          if (lineUser) {
            message += 'ส่งข้อความถึงคุณใน LINE แล้ว\n';
          } else {
            message += 'ส่งข้อความไปยัง LINE OA แล้ว\n';
            message += 'หากคุณเพิ่ม @spkansard เป็นเพื่อนแล้ว จะเห็นข้อความออเดอร์\n';
          }
        }
        
        message += '\nกำลังเปิด LINE OA @spkansard\n';
        message += lineUser 
          ? 'ตรวจสอบข้อความในแชท LINE ของคุณ' 
          : 'เพิ่มเป็นเพื่อนแล้วส่งข้อความ "สวัสดี" เพื่อเริ่มคุยกับแอดมิน';
        
        alert(message);
        
        // เปิด LINE OA
        const lineOAId = "spkansard";
        const lineUrl = `https://line.me/R/ti/p/@${lineOAId}`;
        window.open(lineUrl, '_blank');
        
        // ล้างตะกร้าหลังจากส่งออเดอร์สำเร็จ
        setTimeout(() => {
          clearCart();
        }, 2000);

      } else {
        // ไม่สำเร็จ - แสดง fallback (copy ข้อความแบบเดิม)
        console.error('API Error:', result);
        await handleFallbackCheckout();
      }

    } catch (error) {
      console.error('Checkout Error:', error);
      // เกิดข้อผิดพลาด - ใช้วิธีเดิม (copy ข้อความ)
      await handleFallbackCheckout();
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Fallback method (วิธีเดิม) เมื่อ API ไม่ทำงาน
  const handleFallbackCheckout = async () => {
    const orderSummary = generateOrderMessage();
    
    try {
      await navigator.clipboard.writeText(orderSummary);
      alert(`ระบบส่งออโต้มีปัญหา กลับไปใช้วิธีเดิม\n\nคัดลอกข้อความสรุปออเดอร์แล้ว!\nกำลังเปิด LINE OA @spkansard\nกรุณาวางข้อความในแชทแล้วกดส่ง`);
      
      const lineOAId = "spkansard";
      const lineUrl = `https://line.me/R/ti/p/@${lineOAId}`;
      window.open(lineUrl, '_blank');
      
    } catch {
      // ถ้า clipboard ก็ไม่ทำงาน ให้แสดงข้อความแบบ modal
      showFallbackModal(orderSummary);
    }
  };

  // แสดง modal สำหรับ copy ข้อความ (เมื่อ clipboard ไม่ทำงาน)
  const showFallbackModal = (orderSummary: string) => {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
      background: white;
      padding: 30px;
      border-radius: 10px;
      max-width: 90%;
      max-height: 80%;
      overflow: auto;
    `;
    
    content.innerHTML = `
      <h3 style="margin-bottom: 20px; color: #1E2E4F; font-size: 20px; font-weight: bold;">
        ข้อความสรุปออเดอร์
      </h3>
      <textarea 
        id="orderMessage" 
        style="width: 100%; height: 300px; padding: 15px; border: 2px solid #8FB3E2; border-radius: 8px; font-family: monospace; font-size: 14px; resize: none;"
        readonly
      >${orderSummary}</textarea>
      <div style="margin-top: 20px; text-align: center;">
        <button 
          onclick="document.getElementById('orderMessage').select(); document.execCommand('copy'); alert('คัดลอกแล้ว!'); document.body.removeChild(document.body.lastChild);"
          style="background: #1E2E4F; color: white; padding: 12px 24px; border: none; border-radius: 6px; font-weight: bold; margin-right: 10px; cursor: pointer;"
        >
          คัดลอกข้อความ
        </button>
        <button 
          onclick="window.open('https://line.me/R/ti/p/@spkansard', '_blank'); document.body.removeChild(document.body.lastChild);"
          style="background: #00B900; color: white; padding: 12px 24px; border: none; border-radius: 6px; font-weight: bold; margin-right: 10px; cursor: pointer;"
        >
          เปิด LINE OA
        </button>
        <button 
          onclick="document.body.removeChild(document.body.lastChild);"
          style="background: #666; color: white; padding: 12px 24px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;"
        >
          ปิด
        </button>
      </div>
      <p style="margin-top: 15px; color: #666; font-size: 14px; text-align: center;">
        ระบบส่งออโต้มีปัญหา กรุณาทำตามขั้นตอนเดิม:<br>
        1. กดปุ่ม "คัดลอกข้อความ" หรือเลือกข้อความแล้ว Ctrl+C<br>
        2. กดปุ่ม "เปิด LINE OA" เพื่อไปหาแชท @spkansard<br> 
        3. วางข้อความ (Ctrl+V) และกดส่ง
      </p>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
  };

  const generateOrderMessage = () => {
    const currentDate = new Date().toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    let message = `สั่งซื้อสินค้า - SP Hardware\n`;
    message += `วันที่: ${currentDate}\n\n`;
    
    message += `รายการสินค้า:\n`;
    message += `${'='.repeat(30)}\n`;
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   แบรนด์: ${item.brand}\n`;
      message += `   ราคา: ${item.price.toLocaleString()} บาท x ${item.quantity} ชิ้น\n`;
      message += `   รวม: ${(item.price * item.quantity).toLocaleString()} บาท\n\n`;
    });
    
    message += `${'='.repeat(30)}\n`;
    message += `ราคาสินค้า: ${subtotal.toLocaleString()} บาท\n`;
    
    if (savings > 0) {
      message += `ส่วนลดจากสินค้า: -${savings.toLocaleString()} บาท\n`;
    }
    
    message += `ค่าจัดส่ง: ${shipping === 0 ? 'ฟรี' : `${shipping.toLocaleString()} บาท`}\n`;
    message += `${'='.repeat(30)}\n`;
    message += `รวมทั้งสิ้น: ${total.toLocaleString()} บาท\n\n`;
    
    message += `กรุณาติดต่อกลับเพื่อยืนยันออเดอร์\n`;
    message += `ขอบคุณที่เลือกใช้บริการ SP Hardware`;
    
    return message;
  };

  const subtotal = getTotalPrice();
  const savings = items.reduce((sum, item) => {
    const originalPrice = item.originalPrice || item.price;
    return sum + ((originalPrice - item.price) * item.quantity);
  }, 0);
  const shipping = subtotal >= 2000 ? 0 : 150;
  const total = subtotal + shipping;

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

                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600 flex items-center">
                    <Truck className="h-4 w-4 mr-1" />
                    ค่าจัดส่ง
                  </span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "ฟรี" : `฿${shipping.toLocaleString()}`}
                  </span>
                </div>

                {subtotal < 2000 && (
                  <div className="text-xs sm:text-sm text-[#31487A] bg-[#8FB3E2]/10 p-2 sm:p-3 rounded-lg">
                    ซื้อเพิ่ม ฿{(2000 - subtotal).toLocaleString()} เพื่อได้รับส่งฟรี!
                  </div>
                )}
              </div>

              <div className="border-t pt-3 sm:pt-4 mb-4 sm:mb-6">
                <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
                  <span className="text-[#1E2E4F]">รวมทั้งสิ้น</span>
                  <span className="text-[#1E2E4F]">฿{total.toLocaleString()}</span>
                </div>
              </div>

              {/* LINE Login Section */}
              {!lineUser && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center mb-2 sm:mb-3">
                    <div className="text-xl sm:text-2xl mr-2 sm:mr-3">📱</div>
                    <div>
                      <h3 className="font-semibold text-green-800 text-sm sm:text-base">เข้าสู่ระบบ LINE</h3>
                      <p className="text-xs sm:text-sm text-green-600">เพื่อรับการติดตามออเดอร์แบบเรียลไทม์</p>
                    </div>
                  </div>
                  <button
                    onClick={() => window.location.href = '/api/line/auth?action=login'}
                    className="w-full py-2 px-4 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition flex items-center justify-center text-sm sm:text-base"
                  >
                    <LinkIcon className="h-4 w-4 mr-2" />
                    เชื่อมต่อ LINE เพื่อรับแจ้งเตือน
                  </button>
                  <p className="text-xs text-green-600 mt-2 text-center">
                    *ไม่บังคับ - คุณยังสามารถสั่งซื้อได้โดยไม่ต้องเข้าสู่ระบบ
                  </p>
                </div>
              )}

              {lineUser && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="text-xl sm:text-2xl mr-2 sm:mr-3">✅</div>
                    <div>
                      <h3 className="font-semibold text-blue-800 text-sm sm:text-base">เชื่อมต่อ LINE แล้ว</h3>
                      <p className="text-xs sm:text-sm text-blue-600">สวัสดี {lineUser.displayName}!</p>
                      <p className="text-xs text-blue-500">จะได้รับแจ้งเตือนผ่าน LINE โดยตรง</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Checkout Options */}
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition flex items-center justify-center text-sm sm:text-base ${
                    isCheckingOut
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-[#1E2E4F] text-white hover:bg-[#31487A]'
                  }`}
                >
                  <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  {isCheckingOut ? 'กำลังส่งออเดอร์...' : (lineUser ? 'ส่งออเดอร์ผ่าน LINE' : 'สั่งซื้อผ่าน LINE OA')}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                  <div>
                    <div className="flex justify-center mb-1">
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-[#31487A]" />
                    </div>
                    <div className="text-xs sm:text-sm text-[#31487A] font-medium">ปลอดภัย 100%</div>
                  </div>
                  <div>
                    <div className="flex justify-center mb-1">
                      <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-[#31487A]" />
                    </div>
                    <div className="text-xs sm:text-sm text-[#31487A] font-medium">ส่งฟรีครบ ฿2,000</div>
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