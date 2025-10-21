"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Package, Tag, Star, Eye, Settings, LogOut, BarChart3, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  original_price?: number;
  brand_id: string;
  category_id: string;
  rating: number;
  reviews: number;
  image?: string;
  in_stock: boolean;
  is_popular?: boolean;
  description?: string;
  // Legacy fields for backward compatibility
  brand?: string | null;
  category?: string | null;
  originalPrice?: number | null;
  inStock?: boolean | null;
  isPopular?: boolean;
}

interface Category {
  id: string;
  name: string;
}

interface Brand {
  id: string;
  name: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories' | 'brands'>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalBrands: 0,
    inStockProducts: 0,
    outOfStockProducts: 0,
    categoryStats: [] as Array<{
      name: string,
      productCount: number,
      inStockCount: number,
      percentage: number
    }>
  });

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/check');
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
      router.push('/admin/login');
    }
  }, [router]);

  // Check authentication on mount (only once)
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchData = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      // Always fetch all data for statistics
      const [productsRes, categoriesRes, brandsRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/categories'),
        fetch('/api/brands')
      ]);

      // Check if responses are successful
      if (!productsRes.ok) {
        throw new Error(`Products API error: ${productsRes.status}`);
      }
      if (!categoriesRes.ok) {
        throw new Error(`Categories API error: ${categoriesRes.status}`);
      }
      if (!brandsRes.ok) {
        throw new Error(`Brands API error: ${brandsRes.status}`);
      }

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      const brandsData = await brandsRes.json();

      // Validate data structure
      const validProducts = Array.isArray(productsData) ? productsData : [];
      const validCategories = Array.isArray(categoriesData) ? categoriesData.filter((cat: Category) => cat.id !== 'all') : [];
      const validBrands = Array.isArray(brandsData) ? brandsData.filter((brand: Brand) => brand.id !== 'all') : [];

      setProducts(validProducts);
      setCategories(validCategories);
      setBrands(validBrands);

      // Calculate statistics
      const inStock = validProducts.filter((p: Product) => p.in_stock || p.inStock).length;
      
      // Calculate category statistics
      const categoryStats = validCategories.map((category: Category) => {
        const categoryProducts = validProducts.filter((p: Product) => 
          p.category_id === category.id || p.category === category.id || p.category === category.name
        );
        const categoryInStock = categoryProducts.filter((p: Product) => p.in_stock || p.inStock).length;
        
        return {
          name: category.name,
          productCount: categoryProducts.length,
          inStockCount: categoryInStock,
          percentage: validProducts.length > 0 ? Math.round((categoryProducts.length / validProducts.length) * 100) : 0
        };
      });
      
      setStats({
        totalProducts: validProducts.length,
        totalCategories: validCategories.length,
        totalBrands: validBrands.length,
        inStockProducts: inStock,
        outOfStockProducts: validProducts.length - inStock,
        categoryStats: categoryStats
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
      // Set empty arrays on error to prevent crashes
      setProducts([]);
      setCategories([]);
      setBrands([]);
      setStats({
        totalProducts: 0,
        totalCategories: 0,
        totalBrands: 0,
        inStockProducts: 0,
        outOfStockProducts: 0,
        categoryStats: []
      });
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Reset selections when changing tabs
  useEffect(() => {
    setSelectedProducts(new Set());
    setSelectedBrands(new Set());
  }, [activeTab]);

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e2e4f] mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated (this shouldn't happen due to router.push above, but just in case)
  if (!isAuthenticated) {
    router.push('/admin/login');
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e2e4f] mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังเปลี่ยนเส้นทาง...</p>
        </div>
      </div>
    );
  }

  const deleteProduct = async (id: number) => {
    if (!confirm('คุณต้องการลบสินค้านี้หรือไม่?')) return;
    
    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        fetchData();
      } else {
        alert('เกิดข้อผิดพลาดในการลบสินค้า');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('เกิดข้อผิดพลาดในการลบสินค้า');
    }
  };


  const deleteBrand = async (id: string) => {
    if (!confirm('คุณต้องการลบแบรนด์นี้หรือไม่?')) return;
    
    try {
      const res = await fetch(`/api/brands?id=${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        fetchData();
      } else {
        alert('เกิดข้อผิดพลาดในการลบแบรนด์');
      }
    } catch (error) {
      console.error('Error deleting brand:', error);
      alert('เกิดข้อผิดพลาดในการลบแบรนด์');
    }
  };

  // Multiple selection functions
  const toggleProductSelection = (id: number) => {
    setSelectedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectAllProducts = () => {
    if (selectedProducts.size === products.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(products.map(p => p.id)));
    }
  };

  const deleteSelectedProducts = async () => {
    if (selectedProducts.size === 0) {
      alert('กรุณาเลือกสินค้าที่ต้องการลบ');
      return;
    }
    
    if (!confirm(`คุณต้องการลบสินค้า ${selectedProducts.size} รายการที่เลือกไว้หรือไม่?`)) return;
    
    setLoading(true);
    try {
      const deletePromises = Array.from(selectedProducts).map(id =>
        fetch(`/api/products?id=${id}`, { method: 'DELETE' })
      );
      
      const results = await Promise.all(deletePromises);
      const failedDeletes = results.filter(res => !res.ok);
      
      if (failedDeletes.length === 0) {
        alert(`ลบสินค้าสำเร็จ ${selectedProducts.size} รายการ`);
        setSelectedProducts(new Set());
      } else {
        alert(`ลบสินค้าสำเร็จ ${results.length - failedDeletes.length} รายการ, ล้มเหลว ${failedDeletes.length} รายการ`);
      }
      
      fetchData();
    } catch (error) {
      console.error('Error deleting products:', error);
      alert('เกิดข้อผิดพลาดในการลบสินค้า');
    } finally {
      setLoading(false);
    }
  };

  // Toggle product popular status
  const togglePopular = async (productId: number, currentStatus: boolean) => {
    try {
      const response = await fetch('/api/admin/products/popular', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: productId,
          is_popular: !currentStatus
        }),
      });

      if (response.ok) {
        // Update local state
        setProducts(prev => prev.map(p => 
          p.id === productId 
            ? { ...p, is_popular: !currentStatus, isPopular: !currentStatus }
            : p
        ));
      } else {
        alert('เกิดข้อผิดพลาดในการอัพเดทสถานะ');
      }
    } catch (error) {
      console.error('Error toggling popular:', error);
      alert('เกิดข้อผิดพลาดในการอัพเดทสถานะ');
    }
  };

  const toggleBrandSelection = (id: string) => {
    setSelectedBrands(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectAllBrands = () => {
    if (selectedBrands.size === brands.length) {
      setSelectedBrands(new Set());
    } else {
      setSelectedBrands(new Set(brands.map(b => b.id)));
    }
  };

  const deleteSelectedBrands = async () => {
    if (selectedBrands.size === 0) {
      alert('กรุณาเลือกแบรนด์ที่ต้องการลบ');
      return;
    }
    
    if (!confirm(`คุณต้องการลบแบรนด์ ${selectedBrands.size} รายการที่เลือกไว้หรือไม่?`)) return;
    
    setLoading(true);
    try {
      const deletePromises = Array.from(selectedBrands).map(id =>
        fetch(`/api/brands?id=${id}`, { method: 'DELETE' })
      );
      
      const results = await Promise.all(deletePromises);
      const failedDeletes = results.filter(res => !res.ok);
      
      if (failedDeletes.length === 0) {
        alert(`ลบแบรนด์สำเร็จ ${selectedBrands.size} รายการ`);
        setSelectedBrands(new Set());
      } else {
        alert(`ลบแบรนด์สำเร็จ ${results.length - failedDeletes.length} รายการ, ล้มเหลว ${failedDeletes.length} รายการ`);
      }
      
      fetchData();
    } catch (error) {
      console.error('Error deleting brands:', error);
      alert('เกิดข้อผิดพลาดในการลบแบรนด์');
    } finally {
      setLoading(false);
    }
  };

  // Add sample data functions
  const addSampleData = async () => {
    if (!confirm('คุณต้องการเพิ่มข้อมูลตัวอย่างหรือไม่? (หมวดหมู่, แบรนด์, และสินค้า)')) return;
    
    setLoading(true);
    try {
      // Add categories first
      const categoriesRes = await fetch('/api/admin/add-sample-categories', { method: 'POST' });
      console.log('Categories result:', await categoriesRes.json());

      // Add brands
      const brandsRes = await fetch('/api/admin/add-sample-brands', { method: 'POST' });
      console.log('Brands result:', await brandsRes.json());

      // Add products
      const productsRes = await fetch('/api/admin/add-sample-products', { method: 'POST' });
      console.log('Products result:', await productsRes.json());

      alert('เพิ่มข้อมูลตัวอย่างสำเร็จ!');
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error adding sample data:', error);
      alert('เกิดข้อผิดพลาดในการเพิ่มข้อมูลตัวอย่าง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 shadow-sm">
        <div className="w-full px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
                <p className="text-xs text-slate-500">ระบบจัดการเว็บไซต์</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link 
                href="/" 
                className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Eye className="h-4 w-4 mr-2" />
                ดูเว็บไซต์
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 lg:px-6 py-6 flex-1 overflow-y-auto">
        {/* Tab Navigation */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 mb-6">
          <div className="p-2">
            <nav className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  activeTab === 'dashboard'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                ภาพรวม
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  activeTab === 'products'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <Package className="h-4 w-4 mr-2" />
                สินค้า
                <span className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full text-xs">
                  {(products || []).length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`flex items-center px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  activeTab === 'categories'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <Tag className="h-4 w-4 mr-2" />
                หมวดหมู่
                <span className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full text-xs">
                  {(categories || []).length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('brands')}
                className={`flex items-center px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  activeTab === 'brands'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <Star className="h-4 w-4 mr-2" />
                แบรนด์
                <span className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full text-xs">
                  {(brands || []).length}
                </span>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Dashboard Overview Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">ภาพรวมระบบ</h2>
                    <p className="text-slate-500 mt-1">สถิติและข้อมูลสำคัญของเว็บไซต์</p>
                  </div>
                </div>
                
                {loading ? (
                  <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                    <p className="text-slate-600 mt-4 font-medium">กำลังโหลดข้อมูล...</p>
                  </div>
                ) : (
                  <>
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                      <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <Package className="h-4 w-4 text-white" />
                              </div>
                              <p className="text-slate-600 text-sm font-medium">สินค้าทั้งหมด</p>
                            </div>
                            <p className="text-3xl font-bold text-slate-800">{stats.totalProducts.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                                <ShoppingCart className="h-4 w-4 text-white" />
                              </div>
                              <p className="text-slate-600 text-sm font-medium">สินค้าพร้อมขาย</p>
                            </div>
                            <p className="text-3xl font-bold text-slate-800">{stats.inStockProducts.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                                <Tag className="h-4 w-4 text-white" />
                              </div>
                              <p className="text-slate-600 text-sm font-medium">หมวดหมู่</p>
                            </div>
                            <p className="text-3xl font-bold text-slate-800">{stats.totalCategories.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                                <Star className="h-4 w-4 text-white" />
                              </div>
                              <p className="text-slate-600 text-sm font-medium">แบรนด์</p>
                            </div>
                            <p className="text-3xl font-bold text-slate-800">{stats.totalBrands.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Statistics */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Category Statistics */}
                      <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center space-x-3 mb-6">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                            <Tag className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-800">สถิติหมวดหมู่</h3>
                            <p className="text-sm text-slate-500">การกระจายสินค้าตามหมวดหมู่</p>
                          </div>
                        </div>
                        <div className="space-y-3 max-h-72 overflow-y-auto">
                          {stats.categoryStats.map((category, index) => (
                            <div key={index} className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/50">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full"></div>
                                  <span className="font-medium text-slate-800">{category.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg font-bold text-slate-700">
                                    {category.productCount}
                                  </span>
                                  <span className="text-sm font-medium text-slate-500">รายการ</span>
                                </div>
                              </div>
                            </div>
                          ))}
                          {stats.categoryStats.length === 0 && (
                            <div className="text-center py-8">
                              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Tag className="h-6 w-6 text-slate-400" />
                              </div>
                              <p className="text-slate-500 font-medium">ไม่มีข้อมูลหมวดหมู่</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Stock Status */}
                      <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center space-x-3 mb-6">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                            <Package className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-800">สถานะสินค้า</h3>
                            <p className="text-sm text-slate-500">สถิติสต็อกสินค้า</p>
                          </div>
                        </div>
                        
                        {/* Stock Overview */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-600">สัดส่วนสต็อก</span>
                            <span className="text-sm font-medium text-slate-700">
                              {stats.totalProducts > 0 ? Math.round((stats.inStockProducts / stats.totalProducts) * 100) : 0}% พร้อมขาย
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-500" 
                              style={{ width: `${stats.totalProducts > 0 ? (stats.inStockProducts / stats.totalProducts) * 100 : 0}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200/50">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                <span className="font-medium text-slate-700">พร้อมขาย</span>
                              </div>
                              <span className="font-bold text-emerald-600 text-lg">{stats.inStockProducts.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-red-50/80 rounded-xl border border-red-200/50">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="font-medium text-slate-700">หมดสต็อก</span>
                              </div>
                              <span className="font-bold text-red-600 text-lg">{stats.outOfStockProducts.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                          <Plus className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">การจัดการด่วน</h3>
                          <p className="text-sm text-slate-500">เข้าถึงฟีเจอร์สำคัญได้อย่างรวดเร็ว</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                          href="/admin/products/new"
                          className="group flex items-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-white/30 transition-colors">
                            <Plus className="h-4 w-4" />
                          </div>
                          <span className="font-medium">เพิ่มสินค้าใหม่</span>
                        </Link>
                        <Link
                          href="/admin/categories"
                          className="group flex items-center p-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl hover:from-purple-700 hover:to-violet-700 transition-all duration-200 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-white/30 transition-colors">
                            <Tag className="h-4 w-4" />
                          </div>
                          <span className="font-medium">จัดการหมวดหมู่</span>
                        </Link>
                        <button
                          onClick={() => setActiveTab('brands')}
                          className="group flex items-center p-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-200 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-white/30 transition-colors">
                            <Star className="h-4 w-4" />
                          </div>
                          <span className="font-medium">จัดการแบรนด์</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">จัดการสินค้า</h2>
                    <p className="text-slate-500 mt-1">เพิ่ม แก้ไข และลบข้อมูลสินค้า</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedProducts.size > 0 && (
                      <button
                        onClick={deleteSelectedProducts}
                        className="flex items-center px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 font-medium"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        <span>ลบที่เลือก ({selectedProducts.size})</span>
                      </button>
                    )}
                    <Link
                      href="/admin/products/new"
                      className="flex items-center px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 font-medium"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      <span>เพิ่มสินค้าใหม่</span>
                    </Link>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                    <p className="text-slate-600 mt-4 font-medium">กำลังโหลดสินค้า...</p>
                  </div>
                ) : (
                  <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-slate-200/50">
                        <thead className="bg-slate-50/80">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                              <input
                                type="checkbox"
                                checked={selectedProducts.size === products.length && products.length > 0}
                                onChange={selectAllProducts}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                              สินค้า
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                              ราคา
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                              หมวดหมู่
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                              แบรนด์
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                              สถานะ
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                              ยอดนิยม
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                              การกระทำ
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white/50 divide-y divide-slate-200/30">
                        {(products || []).map((product) => (
                          <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedProducts.has(product.id)}
                                onChange={() => toggleProductSelection(product.id)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-12 w-12 flex-shrink-0">
                                  {product.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img 
                                      src={product.image} 
                                      alt={product.name}
                                      className="h-12 w-12 rounded-lg object-cover border border-slate-200"
                                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.nextElementSibling?.classList.remove('hidden');
                                      }}
                                    />
                                  ) : null}
                                  {!product.image && (
                                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border border-slate-200">
                                      <Package className="h-6 w-6 text-slate-400" />
                                    </div>
                                  )}
                                  <div className={`h-12 w-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border border-slate-200 ${product.image ? 'hidden' : ''}`}>
                                    <Package className="h-6 w-6 text-slate-400" />
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-semibold text-slate-900 max-w-xs truncate">
                                    {product.name || 'ไม่มีชื่อ'}
                                  </div>
                                  <div className="text-xs text-slate-500 font-mono">ID: {product.id}</div>
                                  {product.rating > 0 && (
                                    <div className="flex items-center mt-1">
                                      <Star className="h-3 w-3 text-amber-400 fill-current" />
                                      <span className="text-xs text-slate-600 ml-1">
                                        {product.rating.toFixed(1)} ({product.reviews} รีวิว)
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-bold text-slate-900">
                                ฿{product.price?.toLocaleString() || '0'}
                              </div>
                              {product.original_price && product.original_price > product.price && (
                                <div className="text-xs text-slate-500 line-through">
                                  ฿{product.original_price.toLocaleString()}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                                {(() => {
                                  const category = categories.find(cat => cat.id === product.category_id);
                                  return category ? category.name : product.category_id || 'ไม่ระบุ';
                                })()}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-slate-700">
                                {(() => {
                                  const brand = brands.find(b => b.id === product.brand_id);
                                  return brand ? brand.name : product.brand_id || 'ไม่ระบุ';
                                })()}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${
                                product.in_stock
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                  product.in_stock ? 'bg-emerald-500' : 'bg-red-500'
                                }`}></div>
                                {product.in_stock ? 'มีสินค้า' : 'หมดสต็อก'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <button
                                onClick={() => togglePopular(product.id, product.is_popular || false)}
                                className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                                  product.is_popular || product.isPopular
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                                title={product.is_popular || product.isPopular ? 'ลบออกจากยอดนิยม' : 'ตั้งเป็นยอดนิยม'}
                              >
                                <Star className={`h-3 w-3 mr-1 ${product.is_popular || product.isPopular ? 'fill-current' : ''}`} />
                                {product.is_popular || product.isPopular ? 'ยอดนิยม' : 'ตั้งค่า'}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <Link
                                  href={`/admin/products/${product.id}`}
                                  className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="แก้ไขสินค้า"
                                >
                                  <Edit className="h-4 w-4" />
                                </Link>
                                <button
                                  onClick={() => deleteProduct(product.id)}
                                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                  title="ลบสินค้า"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Empty state */}
                    {(products || []).length === 0 && !loading && (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Package className="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-800 mb-2">ยังไม่มีสินค้าในระบบ</h3>
                        <p className="text-slate-500 mb-6">เริ่มต้นด้วยการเพิ่มสินค้าแรกของคุณหรือเพิ่มข้อมูลตัวอย่าง</p>
                        <div className="flex items-center justify-center space-x-4">
                          <Link
                            href="/admin/products/new"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            เพิ่มสินค้าใหม่
                          </Link>
                          <button
                            onClick={addSampleData}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <Package className="h-4 w-4 mr-2" />
                            เพิ่มข้อมูลตัวอย่าง
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">จัดการหมวดหมู่</h2>
                    <p className="text-slate-500 mt-1">ดูรายการหมวดหมู่และเข้าสู่หน้าจัดการ</p>
                  </div>
                  <Link
                    href="/admin/categories"
                    className="flex items-center px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 font-medium"
                  >
                    <Tag className="h-4 w-4 mr-2" />
                    <span>เข้าสู่หน้าจัดการหมวดหมู่</span>
                  </Link>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                    <p className="text-slate-600 mt-4 font-medium">กำลังโหลดหมวดหมู่...</p>
                  </div>
                ) : (
                  <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm p-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">หมวดหมู่ในระบบ</h3>
                      <p className="text-sm text-slate-500">รายการหมวดหมู่ทั้งหมดในระบบ (คลิกปุ่มด้านบนเพื่อจัดการ)</p>
                    </div>
                    
                    {(categories || []).length === 0 ? (
                      <div className="text-center py-8 text-slate-500">
                        <Tag className="h-12 w-12 mx-auto mb-3 opacity-40" />
                        <p>ยังไม่มีหมวดหมู่ในระบบ</p>
                        <p className="text-sm mt-1">คลิกปุ่มจัดการหมวดหมู่เพื่อเพิ่มหมวดหมู่ใหม่</p>
                      </div>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {(categories || []).map((category, index) => (
                          <div key={category.id} className="group p-4 bg-slate-50/80 rounded-xl border border-slate-200/50 hover:bg-white hover:shadow-md transition-all duration-200">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                    {index + 1}
                                  </div>
                                  <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                                    {category.name}
                                  </h4>
                                </div>
                                <p className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">
                                  ID: {category.id}
                                </p>
                                <div className="mt-3 text-xs text-slate-600">
                                  {/* Show product count if available */}
                                  {(() => {
                                    const categoryProducts = (products || []).filter(p => 
                                      p.category_id === category.id || p.category === category.id || p.category === category.name
                                    );
                                    return categoryProducts.length > 0 ? (
                                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                                        <Package className="h-3 w-3 mr-1" />
                                        {categoryProducts.length} สินค้า
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                        <Package className="h-3 w-3 mr-1" />
                                        ไม่มีสินค้า
                                      </span>
                                    );
                                  })()}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-8 p-4 bg-blue-50/80 border border-blue-200/50 rounded-xl">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Tag className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-1">หน้าจัดการหมวดหมู่แบบเต็มรูปแบบ</h4>
                          <p className="text-sm text-blue-700 mb-3">
                            เข้าสู่หน้าจัดการหมวดหมู่เพื่อเพิ่ม แก้ไข หรือลบหมวดหมู่ได้อย่างสมบูรณ์
                          </p>
                          <Link
                            href="/admin/categories"
                            className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            เปิดหน้าจัดการหมวดหมู่
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Brands Tab */}
            {activeTab === 'brands' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">จัดการแบรนด์</h2>
                    {selectedBrands.size > 0 && (
                      <p className="text-sm text-gray-500 mt-1">เลือกไว้ {selectedBrands.size} รายการ</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedBrands.size > 0 && (
                      <>
                        <button
                          onClick={selectAllBrands}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          {selectedBrands.size === brands.length ? 'ยกเลิกเลือกทั้งหมด' : 'เลือกทั้งหมด'}
                        </button>
                        <button
                          onClick={deleteSelectedBrands}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>ลบที่เลือก ({selectedBrands.size})</span>
                        </button>
                      </>
                    )}
                    <Link
                      href="/admin/brands/new"
                      className="bg-[#1e2e4f] text-white px-4 py-2 rounded-lg hover:bg-[#31487a] flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>เพิ่มแบรนด์ใหม่</span>
                    </Link>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e2e4f] mx-auto"></div>
                    <p className="text-gray-600 mt-2">กำลังโหลด...</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {(brands || []).map((brand) => (
                      <div key={brand.id} className={`bg-gray-50 rounded-lg p-4 border-2 transition-colors ${
                        selectedBrands.has(brand.id) ? 'border-blue-500 bg-blue-50' : 'border-transparent'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              checked={selectedBrands.has(brand.id)}
                              onChange={() => toggleBrandSelection(brand.id)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                            />
                            <div>
                              <h3 className="font-medium text-gray-900">{brand.name}</h3>
                              <p className="text-sm text-gray-500">ID: {brand.id}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Link
                              href={`/admin/brands/${brand.id}`}
                              className="text-[#1e2e4f] hover:text-[#31487a]"
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => deleteBrand(brand.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}