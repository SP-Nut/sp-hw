"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Upload, X } from 'lucide-react';
import { uploadProductImage } from '@/lib/supabase-storage';

interface Category {
  id: string;
  name: string;
}

interface Brand {
  id: string;
  name: string;
}

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    original_price: '',
    brand_id: '',
    category_id: '',
    in_stock: true,
    description: ''
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const [categoriesRes, brandsRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/brands')
      ]);

      const categoriesData = await categoriesRes.json();
      const brandsData = await brandsRes.json();

      setCategories(categoriesData.filter((cat: Category) => cat.id !== 'all'));
      setBrands(brandsData.filter((brand: Brand) => brand.id !== 'all'));
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (selectedFiles.length + files.length > 4) {
      alert('สามารถเลือกรูปภาพได้สูงสุด 4 รูป');
      return;
    }
    setSelectedFiles(prev => [...prev, ...files].slice(0, 4));
  };

  const removeSelectedImage = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    if (selectedFiles.length === 0) {
      console.log('No files selected for upload');
      return [];
    }

    console.log(`Starting upload of ${selectedFiles.length} files...`);
    setUploadingImages(true);
    const uploadedUrls: string[] = [];
    const productId = `product_${Date.now()}`;

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        console.log(`Uploading file ${i + 1}/${selectedFiles.length}:`, file.name, `(${file.size} bytes)`);
        
        const url = await uploadProductImage(file, productId, i);
        if (url) {
          console.log(`✅ Upload ${i + 1} successful:`, url);
          uploadedUrls.push(url);
        } else {
          console.error(`❌ Upload ${i + 1} failed`);
        }
      }
      
      console.log(`Upload complete. ${uploadedUrls.length}/${selectedFiles.length} files uploaded successfully`);
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setUploadingImages(false);
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.brand_id || !formData.category_id) {
      alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      return;
    }

    // Validate price format
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      alert('กรุณากรอกราคาที่ถูกต้อง');
      return;
    }

    // Check price limit (PostgreSQL numeric(10,2) max is 99,999,999.99)
    if (price > 99999999) {
      alert('ราคาสูงเกินไป กรุณากรอกราคาไม่เกิน 99,999,999 บาท');
      return;
    }

    setLoading(true);

    try {
      // Upload images first
      const imageUrls = await uploadImages();
      
      const productData = {
        ...formData,
        // Convert string prices to numbers with validation
        price: parseFloat(formData.price) || 0,
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        // Use first uploaded image as main image
        image: imageUrls[0] || ''
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('เพิ่มสินค้าสำเร็จ!');
        // Reset form
        setFormData({
          name: '',
          price: '',
          original_price: '',
          brand_id: '',
          category_id: '',
          in_stock: true,
          description: ''
        });
        setSelectedFiles([]);
      } else {
        const error = await response.json();
        alert(`เกิดข้อผิดพลาด: ${error.error}`);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('เกิดข้อผิดพลาดในการเพิ่มสินค้า');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Simple Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <span className="text-slate-500">Admin</span>
              <span>/</span>
              <span className="text-slate-500">จัดการสินค้า</span>
              <span>/</span>
              <span className="text-slate-800 font-medium">เพิ่มสินค้าใหม่</span>
            </div>
            <button
              onClick={() => router.back()}
              className="text-slate-500 hover:text-slate-700 text-sm"
            >
              ✕ ปิด
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Form */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm">
          <div className="p-6 border-b border-slate-200/50">
            <h1 className="text-2xl font-bold text-slate-800">เพิ่มสินค้าใหม่</h1>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">


            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                ชื่อสินค้า *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ระบุชื่อสินค้า"
              />
            </div>

            {/* Price & Original Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  ราคา (บาท) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label htmlFor="original_price" className="block text-sm font-medium text-slate-700 mb-2">
                  ราคาเดิม (บาท)
                </label>
                <input
                  type="number"
                  id="original_price"
                  name="original_price"
                  value={formData.original_price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Category & Brand */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category_id" className="block text-sm font-medium text-slate-700 mb-2">
                  หมวดหมู่ *
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">เลือกหมวดหมู่</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="brand_id" className="block text-sm font-medium text-slate-700 mb-2">
                  แบรนด์ *
                </label>
                <select
                  id="brand_id"
                  name="brand_id"
                  value={formData.brand_id}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">เลือกแบรนด์</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                รูปภาพสินค้า (สูงสุด 4 รูป)
              </label>
              
              {/* File Input */}
              <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                uploadingImages 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-slate-300 hover:border-blue-400'
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                  id="image-upload"
                  disabled={uploadingImages}
                />
                <label htmlFor="image-upload" className={`cursor-pointer ${uploadingImages ? 'pointer-events-none' : ''}`}>
                  {uploadingImages ? (
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
                  ) : (
                    <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  )}
                  <p className={`font-medium ${uploadingImages ? 'text-blue-600' : 'text-slate-600'}`}>
                    {uploadingImages ? 'กำลังอัปโหลดรูปภาพ...' : 'คลิกเพื่อเลือกรูปภาพ'}
                  </p>
                  {!uploadingImages && (
                    <p className="text-sm text-slate-500 mt-2">รองรับ JPG, PNG, WebP (สูงสุด 5MB ต่อรูป)</p>
                  )}
                </label>
              </div>

              {/* Selected Images Preview */}
              {selectedFiles.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSelectedImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* In Stock */}
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="in_stock"
                  name="in_stock"
                  checked={formData.in_stock}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <label htmlFor="in_stock" className="ml-2 block text-sm text-slate-700">
                  มีสินค้าในสต็อก
                </label>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                รายละเอียดสินค้า
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="รายละเอียดสินค้า..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200/50">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                disabled={loading || uploadingImages}
                className={`px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center space-x-2 transition-all ${
                  (loading || uploadingImages) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Save className="h-4 w-4" />
                <span>
                  {uploadingImages ? 'กำลังอัพโหลดรูป...' : loading ? 'กำลังบันทึก...' : 'บันทึกสินค้า'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}