"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ShoppingCart, Check, Plus, ArrowLeft, X, ZoomIn, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useProduct, useCategories } from "../../../hooks/useApi";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id as string);
  
  const { product, loading: productLoading, error: productError } = useProduct(productId);
  const { categories } = useCategories();
  
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const { addToCart, isInCart, getItemQuantity } = useCart();



  // ถ้าไม่เจอสินค้าและโหลดเสร็จแล้ว redirect กลับไปหน้า categories
  useEffect(() => {
    if (!productLoading && productError) {
      router.push('/categories');
    }
  }, [productLoading, productError, router]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Get the current selected image or fallback to first available image
    const productImages = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
    const currentImage = productImages[selectedImageIndex] || productImages[0] || '';
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || undefined,
      brand: product.brand || '',
      image: currentImage,
      inStock: product.inStock || false
    };
    
    addToCart(cartItem);
    
    // Show feedback animation
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const openZoomModal = () => {
    setIsZoomModalOpen(true);
  };

  const closeZoomModal = () => {
    setIsZoomModalOpen(false);
  };

  const goToPreviousImage = useCallback(() => {
    const productImages = product?.images && product.images.length > 0 ? product.images : (product?.image ? [product.image] : []);
    if (productImages.length > 1) {
      setSelectedImageIndex((prev) => prev === 0 ? productImages.length - 1 : prev - 1);
    }
  }, [product]);

  const goToNextImage = useCallback(() => {
    const productImages = product?.images && product.images.length > 0 ? product.images : (product?.image ? [product.image] : []);
    if (productImages.length > 1) {
      setSelectedImageIndex((prev) => prev === productImages.length - 1 ? 0 : prev + 1);
    }
  }, [product]);

  // Handle keyboard events for zoom modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isZoomModalOpen) return;
      
      switch (event.key) {
        case 'Escape':
          closeZoomModal();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          goToPreviousImage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNextImage();
          break;
      }
    };

    if (isZoomModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isZoomModalOpen, goToPreviousImage, goToNextImage]);

  if (productLoading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20 sm:pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e2e4f] mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดข้อมูลสินค้า...</p>
        </div>
      </div>
    );
  }

  if (productError || !product) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20 sm:pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">ไม่พบสินค้าที่ค้นหา</p>
          <button 
            onClick={() => router.back()}
            className="bg-[#1e2e4f] text-white px-4 py-2 rounded hover:bg-[#31487a]"
          >
            กลับไปหน้าก่อน
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 sm:pt-24">
      <div className="container mx-auto px-3 sm:px-4 md:px-16 max-w-full py-3 sm:py-6">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center text-white bg-[#1e2e4f] hover:bg-[#31487a] mb-4 sm:mb-6 transition-colors px-3 sm:px-4 py-2 sm:py-2 shadow-sm hover:shadow-md transform hover:scale-105 font-semibold text-sm sm:text-base rounded-md"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          กลับไปหน้าก่อน
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Product Images */}
          <div className="space-y-1 sm:space-y-2">
            {/* Main Image */}
            <div className="relative bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-lg overflow-hidden">
              <div 
                className="aspect-[3/2] bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center cursor-pointer group"
                onClick={openZoomModal}
              >
                {(() => {
                  // Get images array or fallback to single image
                  const productImages = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
                  const currentImage = productImages[selectedImageIndex] || productImages[0];
                  
                  return currentImage && currentImage !== '' && !currentImage.includes('placeholder') ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={currentImage} 
                        alt={`${product.name} - รูปที่ ${selectedImageIndex + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.src = `https://via.placeholder.com/400x300/f3f4f6/6b7280?text=${encodeURIComponent(product.name || 'ไม่พบรูป')}`;
                        }}
                      />
                      {/* Zoom Icon Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg">
                          <ZoomIn className="h-6 w-6 text-gray-900" />
                        </div>
                      </div>
                      
                      {/* Click to zoom hint */}
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                          คลิกเพื่อซูม
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <span className="text-gray-500 text-sm sm:text-base font-medium">{product.name || 'รูปสินค้า'}</span>
                    </div>
                  );
                })()}
              </div>
              
              {/* Badges */}
              <div className="absolute top-2 left-2 right-2 flex justify-between">
                <div className="flex space-x-2">
                  <div className="bg-[#1e2e4f] text-white px-2 py-1 text-xs font-bold shadow-sm rounded">
                    {product.brand}
                  </div>
                  {(() => {
                    const productImages = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
                    return productImages.length > 1 && (
                      <div className="bg-green-600 text-white px-2 py-1 text-xs font-bold shadow-sm rounded flex items-center">
                        <Camera className="h-3 w-3 mr-1" />
                        {productImages.length}
                      </div>
                    );
                  })()}
                </div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="bg-red-500 text-white px-2 py-1 text-xs font-bold shadow-sm rounded">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                )}
              </div>

              {!product.inStock && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                  <div className="bg-white text-gray-900 px-3 sm:px-4 py-2 font-bold shadow-sm text-sm rounded">
                    สินค้าหมด
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery - Only show if multiple images */}
            {(() => {
              const productImages = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
              return productImages.length > 1 ? (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">รูปสินค้า</h3>
                    <span className="text-sm text-green-600 flex items-center">
                      <Camera className="h-4 w-4 mr-1" />
                      {productImages.length} รูป
                    </span>
                  </div>
                  <div className={`grid gap-2 ${productImages.length === 2 ? 'grid-cols-2' : productImages.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                    {productImages.map((image, index) => (
                      <div 
                        key={index} 
                        className={`aspect-square bg-white shadow-sm hover:shadow cursor-pointer transition-all duration-300 transform hover:scale-105 overflow-hidden rounded-md ${
                          selectedImageIndex === index ? 'ring-2 ring-[#1e2e4f]' : ''
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={image} 
                          alt={`${product.name} - รูปที่ ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}
          </div>

          {/* Product Details */}
          <div className="bg-white p-4 sm:p-6 shadow-md rounded-lg">
            {/* Product Title & Description */}
            <div className="mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-2 sm:mb-3 tracking-tight leading-tight">{product.name}</h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-light">{product.description}</p>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 my-4 sm:my-6" />

            {/* Price */}
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-4 mb-2">
                <span className="text-2xl sm:text-3xl font-black text-gray-900">฿{product.price.toLocaleString()}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-base sm:text-lg text-gray-500 line-through font-medium mt-1 sm:mt-0">
                    ฿{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="text-base sm:text-lg text-green-600 font-bold">
                  ประหยัด ฿{(product.originalPrice - product.price).toLocaleString()}
                </div>
              )}
            </div>

            {/* Divider */}
            <hr className="border-gray-200 my-4 sm:my-6" />

            {/* Product Info */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-black text-gray-900 mb-3 sm:mb-4">ข้อมูลสินค้า</h3>
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-semibold text-sm sm:text-base">แบรนด์:</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">{product.brand}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-semibold text-sm sm:text-base">หมวดหมู่:</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">{categories.find(cat => cat.id === product.category)?.name || product.category}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 font-semibold text-sm sm:text-base">สถานะ:</span>
                  <span className={`font-bold text-sm sm:text-base ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'มีสินค้า' : 'สินค้าหมด'}
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 my-4 sm:my-6" />

            {/* Action Buttons */}
            <div className="mb-4 sm:mb-6">
              <button 
                disabled={!product.inStock}
                onClick={handleAddToCart}
                className={`w-full py-3 sm:py-4 px-4 sm:px-6 font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg rounded-lg ${
                  product.inStock 
                    ? addedToCart
                      ? 'bg-green-600 text-white'
                      : isInCart(product.id)
                      ? 'bg-[#31487a] text-white hover:bg-[#192338]'
                      : 'bg-[#1e2e4f] text-white hover:bg-[#31487a]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none transform-none'
                }`}
              >
                {addedToCart ? (
                  <><Check className="h-4 w-4 sm:h-5 sm:w-5 inline mr-2 sm:mr-3" />เพิ่มแล้ว</>
                ) : isInCart(product.id) ? (
                  <><Plus className="h-4 w-4 sm:h-5 sm:w-5 inline mr-2 sm:mr-3" />เพิ่มอีก ({getItemQuantity(product.id)})</>
                ) : (
                  <><ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 inline mr-2 sm:mr-3" />{product.inStock ? 'เพิ่มลงตะกร้า' : 'สินค้าหมด'}</>
                )}
              </button>
            </div>


          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeZoomModal}
        >
          <div className="relative max-w-full max-h-full">
            {/* Close Button */}
            <button
              onClick={closeZoomModal}
              className="absolute top-4 right-4 z-10 text-white p-2 hover:text-gray-300 transition-all duration-300"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Navigation Arrows - Only show if multiple images */}
            {(() => {
              const productImages = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
              
              return productImages.length > 1 && (
                <>
                  {/* Previous Image Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPreviousImage();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white p-2 hover:text-gray-300 transition-all duration-300"
                  >
                    <ChevronLeft className="h-10 w-10" />
                  </button>

                  {/* Next Image Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNextImage();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white p-2 hover:text-gray-300 transition-all duration-300"
                  >
                    <ChevronRight className="h-10 w-10" />
                  </button>
                </>
              );
            })()}

            {/* Image Counter */}
            {(() => {
              const productImages = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
              
              return productImages.length > 1 && (
                <div className="absolute top-4 left-4 z-10 text-white text-lg font-semibold">
                  {selectedImageIndex + 1} / {productImages.length}
                </div>
              );
            })()}

            {/* Zoomed Image */}
            <div className="relative max-w-[90vw] max-h-[90vh] overflow-auto">
              {(() => {
                const productImages = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
                const currentImage = productImages[selectedImageIndex] || productImages[0];
                
                return currentImage && currentImage !== '' && !currentImage.includes('placeholder') ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={currentImage} 
                    alt={`${product.name} - รูปที่ ${selectedImageIndex + 1} (ซูม)`}
                    className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = `https://via.placeholder.com/800x600/f3f4f6/6b7280?text=${encodeURIComponent(product.name || 'ไม่พบรูป')}`;
                    }}
                  />
                ) : (
                  <div className="w-96 h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-lg">
                    <span className="text-gray-500 text-lg font-medium">{product.name || 'รูปสินค้า'}</span>
                  </div>
                );
              })()}
            </div>

            {/* Image Navigation for Multiple Images */}
            {(() => {
              const productImages = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
              
              return productImages.length > 1 && (
                <>
                  {/* Dot Navigation */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex space-x-3 p-2">
                      {productImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImageIndex(index);
                          }}
                          className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                            selectedImageIndex === index 
                              ? 'bg-white border-white' 
                              : 'bg-transparent border-white/70 hover:border-white'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Navigation Hint */}
                  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10 text-white text-sm text-center">
                    ใช้ลูกศร ← → หรือคลิกปุ่มเพื่อสลับรูป
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}