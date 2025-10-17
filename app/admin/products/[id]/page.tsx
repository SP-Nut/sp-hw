'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Upload, X } from 'lucide-react'
import { Product, Category, Brand } from '@/lib/types'
import { uploadProductImage } from '@/lib/supabase-storage'

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string>('')

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    original_price: '',
    brand_id: '',
    category_id: '',
    in_stock: true,
    description: ''
  })

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadingImages, setUploadingImages] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const { id } = await params
        
        // Load product, categories, and brands in parallel
        const [productRes, categoriesRes, brandsRes] = await Promise.all([
          fetch(`/api/products/${id}`),
          fetch('/api/categories'),
          fetch('/api/brands')
        ])

        if (!productRes.ok) {
          throw new Error('Product not found')
        }

        const productData = await productRes.json()
        const categoriesData = await categoriesRes.json()
        const brandsData = await brandsRes.json()

        setProduct(productData)
        setCategories(categoriesData.filter((cat: Category) => cat.id !== 'all'))
        setBrands(brandsData.filter((brand: Brand) => brand.id !== 'all'))

        // Populate form with product data
        setFormData({
          name: productData.name || '',
          price: productData.price?.toString() || '',
          original_price: productData.original_price?.toString() || '',
          brand_id: productData.brand_id || '',
          category_id: productData.category_id || '',
          in_stock: productData.in_stock !== false,
          description: productData.description || ''
        })

      } catch (err) {
        console.error('Error loading data:', err)
        setError('ไม่สามารถโหลดข้อมูลได้')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [params])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (selectedFiles.length + files.length > 5) {
      alert('สามารถเลือกรูปภาพได้สูงสุด 5 รูป')
      return
    }
    setSelectedFiles(prev => [...prev, ...files].slice(0, 5))
  }

  const removeSelectedImage = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!product) return

    // Validate price format
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      setError('กรุณากรอกราคาที่ถูกต้อง');
      return;
    }

    // Check price limit (PostgreSQL numeric(10,2) max is 99,999,999.99)
    if (price > 99999999) {
      setError('ราคาสูงเกินไป กรุณากรอกราคาไม่เกิน 99,999,999 บาท');
      return;
    }

    setSaving(true)
    setError('')

    try {
      // Upload new images if selected
      const imageUrls: string[] = []
      if (selectedFiles.length > 0) {
        setUploadingImages(true)
        const productId = `product_${product.id}_${Date.now()}`
        
        try {
          // Upload all selected images
          for (let i = 0; i < selectedFiles.length; i++) {
            const url = await uploadProductImage(selectedFiles[i], productId, i)
            if (url) imageUrls.push(url)
          }
        } catch (uploadError) {
          console.error('Error uploading images:', uploadError)
          // Continue without images if upload fails
        } finally {
          setUploadingImages(false)
        }
      }

      const updateData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        original_price: formData.original_price ? parseFloat(formData.original_price) : undefined,
        ...(imageUrls.length > 0 && { 
          image: imageUrls[0], // First image as main image
          images: imageUrls   // Enable images array
        })
      }

      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update product')
      }

      // Show success message
      alert('อัปเดตข้อมูลสินค้าสำเร็จ!')
    } catch (err) {
      console.error('Error updating product:', err)
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการอัพเดตสินค้า')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!product) return
    
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบสินค้านี้? การกระทำนี้ไม่สามารถยกเลิกได้')) {
      return
    }

    setSaving(true)
    setError('')

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      // Show success message and go back
      alert('ลบสินค้าสำเร็จ!')
      router.back()
    } catch (err) {
      console.error('Error deleting product:', err)
      setError('เกิดข้อผิดพลาดในการลบสินค้า')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    )
  }

  if (error && !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            กลับไปหน้าก่อนหน้า
          </button>
        </div>
      </div>
    )
  }

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
              <span className="text-slate-800 font-medium">แก้ไขสินค้า</span>
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
        <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm">
          <div className="p-6 border-b border-slate-200/50">
            <h1 className="text-2xl font-bold text-slate-800">
              แก้ไขสินค้า: {product?.name}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
              {/* ชื่อสินค้า */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                ชื่อสินค้า *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ระบุชื่อสินค้า"
              />
            </div>

            {/* ราคา & ราคาเดิม */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">
                  ราคา (บาท) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* หมวดหมู่ & แบรนด์ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category_id" className="block text-sm font-medium text-slate-700 mb-2">
                  หมวดหมู่ *
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                รูปภาพสินค้า (สูงสุด 5 รูป) - อัปโหลดใหม่เท่านั้น
              </label>
              
              {/* File Input */}
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 font-medium">คลิกเพื่อเลือกรูปภาพใหม่</p>
                  <p className="text-sm text-slate-500 mt-2">รองรับ JPG, PNG, WebP (สูงสุด 5MB ต่อรูป)</p>
                </label>
              </div>

              {/* Selected Images Preview */}
              {selectedFiles.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
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

            {/* สถานะสินค้า */}
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="in_stock"
                  name="in_stock"
                  checked={formData.in_stock}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <label htmlFor="in_stock" className="ml-2 block text-sm text-slate-700">
                  มีสินค้าในสต็อก
                </label>
              </div>
            </div>

            {/* คำอธิบาย */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                รายละเอียดสินค้า
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="รายละเอียดสินค้า..."
              />
            </div>

            {/* ปุ่ม */}
            <div className="flex justify-between pt-6 border-t border-slate-200/50">
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving || uploadingImages}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ลบสินค้า
              </button>
              
              <div className="space-x-4">
                <button
                  type="button"
                  onClick={() => router.push('/admin/products')}
                  className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImages}
                  className={`px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center space-x-2 transition-all ${
                    (saving || uploadingImages) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Save className="h-4 w-4" />
                  <span>
                    {uploadingImages ? 'กำลังอัพโหลดรูป...' : saving ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}