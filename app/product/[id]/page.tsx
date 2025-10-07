"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ShoppingCart, Check, Plus, Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";
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
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#31487A] hover:text-[#1E2E4F]">หน้าแรก</Link>
            <span className="text-gray-400">/</span>
            <Link href="/categories" className="text-[#31487A] hover:text-[#1E2E4F]">หมวดหมู่สินค้า</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center text-[#31487A] hover:text-[#1E2E4F] mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          กลับไปหน้าก่อน
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-xl">รูปสินค้า</span>
              </div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded text-sm font-bold text-[#31487A] shadow-sm">
                  {product.brand}
                </div>
                {product.originalPrice > product.price && (
                  <div className="bg-red-500 text-white px-3 py-2 rounded text-sm font-bold">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                )}
              </div>

              {!product.inStock && (
                <div className="absolute inset-0 bg-black/80 rounded-lg flex items-center justify-center">
                  <div className="bg-white text-gray-900 px-6 py-3 rounded font-bold">
                    สินค้าหมด
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded border-2 border-transparent hover:border-[#31487A] cursor-pointer transition-colors flex items-center justify-center">
                  <span className="text-gray-400 text-sm">รูป {index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1E2E4F] mb-4">{product.name}</h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{product.description}</p>
            </div>

            {/* Price */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-baseline space-x-4 mb-3">
                <span className="text-4xl font-bold text-[#1E2E4F]">฿{product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ฿{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.originalPrice > product.price && (
                <div className="text-lg text-green-600 font-medium">
                  ประหยัด ฿{(product.originalPrice - product.price).toLocaleString()}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1E2E4F] mb-4">ข้อมูลสินค้า</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">แบรนด์:</span>
                  <span className="font-semibold text-[#1E2E4F]">{product.brand}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">หมวดหมู่:</span>
                  <span className="font-semibold text-[#1E2E4F]">{categories.find(cat => cat.id === product.category)?.name || product.category}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">สถานะ:</span>
                  <span className={`font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'มีสินค้า' : 'สินค้าหมด'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button 
                disabled={!product.inStock}
                onClick={handleAddToCart}
                className={`w-full py-4 px-8 font-medium text-xl transition-all duration-300 ${
                  product.inStock 
                    ? addedToCart
                      ? 'bg-green-600 text-white'
                      : isInCart(product.id)
                      ? 'bg-[#31487A] text-white hover:bg-[#1E2E4F]'
                      : 'bg-[#1E2E4F] text-white hover:bg-[#31487A]'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {addedToCart ? (
                  <><Check className="h-6 w-6 inline mr-3" />เพิ่มแล้ว</>
                ) : isInCart(product.id) ? (
                  <><Plus className="h-6 w-6 inline mr-3" />เพิ่มอีก ({getItemQuantity(product.id)})</>
                ) : (
                  <><ShoppingCart className="h-6 w-6 inline mr-3" />{product.inStock ? 'เพิ่มลงตะกร้า' : 'สินค้าหมด'}</>
                )}
              </button>
              
              <button className="w-full py-4 px-8 border-2 border-[#31487A] text-[#31487A] hover:bg-[#31487A] hover:text-white transition-all duration-300 font-medium text-xl">
                <Heart className="h-6 w-6 inline mr-3" />
                เพิ่มในรายการโปรด
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-[#1E2E4F] mb-4 text-lg">ข้อมูลเพิ่มเติม</h3>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-[#31487A] mr-2">•</span>
                  รับประกันคุณภาพ 1 ปี
                </li>
                <li className="flex items-start">
                  <span className="text-[#31487A] mr-2">•</span>
                  มีบริการติดตั้งโดยช่างมืออาชีพ
                </li>
                <li className="flex items-start">
                  <span className="text-[#31487A] mr-2">•</span>
                  รองรับการคืนเงิน 7 วัน
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}