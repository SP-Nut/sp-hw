"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ShoppingCart, Check, Plus, ArrowLeft } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { categories } from "../../data/categories";
import { products } from "../../data/products";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id as string);
  const product = products.find(p => p.id === productId);
  
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart, isInCart, getItemQuantity } = useCart();

  // ถ้าไม่เจอสินค้า redirect กลับไปหน้า categories
  useEffect(() => {
    if (!product) {
      router.push('/categories');
    }
  }, [product, router]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      brand: product.brand,
      image: product.image,
      inStock: product.inStock
    };
    
    addToCart(cartItem);
    
    // Show feedback animation
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      <div className="container mx-auto px-12 md:px-16 max-w-full py-6">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center text-gray-900 hover:text-gray-600 mb-6 transition-colors bg-white px-4 py-2 shadow-sm hover:shadow-md transform hover:scale-105 font-semibold"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          กลับไปหน้าก่อน
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-2">
            {/* Main Image */}
            <div className="relative bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-[3/2] bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-base font-light">รูปสินค้า</span>
              </div>
              
              {/* Badges */}
              <div className="absolute top-2 left-2 right-2 flex justify-between">
                <div className="bg-gray-900 text-white px-2 py-1 text-xs font-bold shadow-sm">
                  {product.brand}
                </div>
                {product.originalPrice > product.price && (
                  <div className="bg-red-500 text-white px-2 py-1 text-xs font-bold shadow-sm">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                )}
              </div>

              {!product.inStock && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                  <div className="bg-white text-gray-900 px-4 py-2 font-bold shadow-sm text-sm">
                    สินค้าหมด
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-1">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="aspect-square bg-white shadow-sm hover:shadow cursor-pointer transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <span className="text-gray-400 text-xs font-medium">รูป {index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white p-6 shadow-md">
            {/* Product Title & Description */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 tracking-tight">{product.name}</h1>
              <p className="text-lg text-gray-600 leading-relaxed font-light">{product.description}</p>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 my-6" />

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline space-x-4 mb-2">
                <span className="text-3xl font-black text-gray-900">฿{product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-gray-500 line-through font-medium">
                    ฿{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.originalPrice > product.price && (
                <div className="text-lg text-green-600 font-bold">
                  ประหยัด ฿{(product.originalPrice - product.price).toLocaleString()}
                </div>
              )}
            </div>

            {/* Divider */}
            <hr className="border-gray-200 my-6" />

            {/* Product Info */}
            <div className="mb-6">
              <h3 className="text-lg font-black text-gray-900 mb-4">ข้อมูลสินค้า</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 font-semibold">แบรนด์:</span>
                  <span className="font-bold text-gray-900">{product.brand}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 font-semibold">หมวดหมู่:</span>
                  <span className="font-bold text-gray-900">{categories.find(cat => cat.id === product.category)?.name || product.category}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 font-semibold">สถานะ:</span>
                  <span className={`font-bold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'มีสินค้า' : 'สินค้าหมด'}
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 my-6" />

            {/* Action Buttons */}
            <div className="mb-6">
              <button 
                disabled={!product.inStock}
                onClick={handleAddToCart}
                className={`w-full py-4 px-6 font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${
                  product.inStock 
                    ? addedToCart
                      ? 'bg-green-600 text-white'
                      : isInCart(product.id)
                      ? 'bg-gray-800 text-white hover:bg-gray-900'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none transform-none'
                }`}
              >
                {addedToCart ? (
                  <><Check className="h-5 w-5 inline mr-3" />เพิ่มแล้ว</>
                ) : isInCart(product.id) ? (
                  <><Plus className="h-5 w-5 inline mr-3" />เพิ่มอีก ({getItemQuantity(product.id)})</>
                ) : (
                  <><ShoppingCart className="h-5 w-5 inline mr-3" />{product.inStock ? 'เพิ่มลงตะกร้า' : 'สินค้าหมด'}</>
                )}
              </button>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 my-6" />

            {/* Additional Info */}
            <div>
              <h3 className="font-black text-gray-900 mb-4 text-lg">ข้อมูลเพิ่มเติม</h3>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-gray-900 mr-3">•</span>
                  <span className="font-medium">รับประกันคุณภาพ 1 ปี</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 mr-3">•</span>
                  <span className="font-medium">มีบริการติดตั้งโดยช่างมืออาชีพ</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 mr-3">•</span>
                  <span className="font-medium">รองรับการคืนเงิน 7 วัน</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}