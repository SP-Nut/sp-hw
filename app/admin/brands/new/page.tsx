"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft } from 'lucide-react';

export default function NewBrand() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.id || !formData.name) {
      alert('กรุณากรอกรหัสแบรนด์และชื่อแบรนด์');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/brands', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: formData.id.toLowerCase().replace(/\s+/g, '-'),
          name: formData.name,
          description: formData.description
        }),
      });

      if (response.ok) {
        alert('เพิ่มแบรนด์สำเร็จ');
        router.push('/admin');
      } else {
        const error = await response.json();
        alert('เกิดข้อผิดพลาด: ' + (error.message || 'ไม่สามารถเพิ่มแบรนด์ได้'));
      }
    } catch (error) {
      console.error('Error creating brand:', error);
      alert('เกิดข้อผิดพลาดในการเพิ่มแบรนด์');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/admin')}
            className="flex items-center text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับไปหน้าจัดการ
          </button>
          <h1 className="text-3xl font-bold text-slate-900">เพิ่มแบรนด์ใหม่</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
              ข้อมูลแบรนด์
            </h2>
            
            {/* Brand ID */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                รหัสแบรนด์ *
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="เช่น bosch, makita, stanley"
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                รหัสแบรนด์จะถูกแปลงเป็นตัวพิมพ์เล็กและแทนที่ช่องว่างด้วย -
              </p>
            </div>

            {/* Brand Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                ชื่อแบรนด์ *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="ระบุชื่อแบรนด์"
                required
              />
            </div>

          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push('/admin')}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
              disabled={loading}
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>กำลังบันทึก...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>บันทึกแบรนด์</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}