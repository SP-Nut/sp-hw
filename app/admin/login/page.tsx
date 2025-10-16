"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#1e2e4f] via-[#31487a] to-[#4a5c7a] flex items-center justify-center px-4 z-50 overflow-y-auto">
      <div className="w-full max-w-md mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                <Lock className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Admin Login</h2>
              <p className="text-slate-600 text-lg">เข้าสู่ระบบจัดการเว็บไซต์</p>
            </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อผู้ใช้
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e2e4f] focus:border-transparent"
                  placeholder="admin"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                รหัสผ่าน
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e2e4f] focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-medium text-white bg-gradient-to-r from-[#1e2e4f] to-[#31487a] hover:from-[#31487a] hover:to-[#1e2e4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e2e4f] transition-all duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  กำลังเข้าสู่ระบบ...
                </div>
              ) : (
                <div className="flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  เข้าสู่ระบบ
                </div>
              )}
            </button>
          </form>
          
          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-white hover:text-gray-200 text-sm underline"
            >
              กลับไปหน้าหลัก
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}