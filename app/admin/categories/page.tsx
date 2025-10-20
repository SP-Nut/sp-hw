'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'

interface Category {
  id: string
  name: string
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  
  // Form states
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string>('')
  const [newCategory, setNewCategory] = useState({ id: '', name: '' })
  const [editName, setEditName] = useState('')

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories', {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        
        // Filter out 'all' category for admin interface
        const filteredCategories = data.filter((cat: Category) => cat.id !== 'all')
        
        setCategories(filteredCategories)
      } else {
        const errorText = await response.text()
        setError(`API Error: ${response.status} - ${errorText}`)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      setError(`ไม่สามารถโหลดข้อมูลหมวดหมู่ได้: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Small delay to ensure component is mounted
    const timer = setTimeout(() => {
      fetchCategories()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Add new category
  const handleAdd = async () => {
    if (!newCategory.id || !newCategory.name) {
      setError('กรุณากรอกรหัสและชื่อหมวดหมู่')
      return
    }

    // Check if ID already exists
    if (categories.find(cat => cat.id === newCategory.id)) {
      setError('รหัสหมวดหมู่นี้มีอยู่แล้ว')
      return
    }

    setSaving(true)
    setError('')

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      })

      if (response.ok) {
        const newCat = await response.json()
        setCategories(prev => [...prev, newCat])
        setNewCategory({ id: '', name: '' })
        setIsAdding(false)
        alert('เพิ่มหมวดหมู่สำเร็จ!')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'เกิดข้อผิดพลาด')
      }
    } catch (error) {
      console.error('Error adding category:', error)
      setError('เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่')
    } finally {
      setSaving(false)
    }
  }

  // Update category
  const handleUpdate = async (id: string) => {
    if (!editName.trim()) {
      setError('กรุณากรอกชื่อหมวดหมู่')
      return
    }

    setSaving(true)
    setError('')

    try {
      const response = await fetch('/api/categories', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name: editName }),
      })

      if (response.ok) {
        const updatedCat = await response.json()
        setCategories(prev => prev.map(cat => 
          cat.id === id ? updatedCat : cat
        ))
        setEditingId('')
        setEditName('')
        alert('อัปเดตหมวดหมู่สำเร็จ!')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'เกิดข้อผิดพลาด')
      }
    } catch (error) {
      console.error('Error updating category:', error)
      setError('เกิดข้อผิดพลาดในการอัปเดตหมวดหมู่')
    } finally {
      setSaving(false)
    }
  }

  // Delete category
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`คุณแน่ใจหรือไม่ที่จะลบหมวดหมู่ "${name}"? การกระทำนี้ไม่สามารถยกเลิกได้`)) {
      return
    }

    setSaving(true)
    setError('')

    try {
      const response = await fetch(`/api/categories?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setCategories(prev => prev.filter(cat => cat.id !== id))
        alert('ลบหมวดหมู่สำเร็จ!')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'เกิดข้อผิดพลาด')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      setError('เกิดข้อผิดพลาดในการลบหมวดหมู่')
    } finally {
      setSaving(false)
    }
  }

  const startEdit = (category: Category) => {
    setEditingId(category.id)
    setEditName(category.name)
    setError('')
  }

  const cancelEdit = () => {
    setEditingId('')
    setEditName('')
    setError('')
  }

  const cancelAdd = () => {
    setIsAdding(false)
    setNewCategory({ id: '', name: '' })
    setError('')
  }

  // Add sample categories
  const addSampleCategories = async () => {
    setSaving(true)
    setError('')

    try {
      console.log('Adding sample categories...')
      const response = await fetch('/api/admin/add-sample-categories', {
        method: 'POST'
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Sample categories result:', result)
        alert('เพิ่มข้อมูลตัวอย่างสำเร็จ!')
        // Refresh categories
        await fetchCategories()
      } else {
        const errorData = await response.json()
        console.error('Error adding sample categories:', errorData)
        setError(errorData.error || 'เกิดข้อผิดพลาดในการเพิ่มข้อมูลตัวอย่าง')
      }
    } catch (error) {
      console.error('Error adding sample categories:', error)
      setError(`เกิดข้อผิดพลาด: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Simple Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <span className="text-slate-500">Admin</span>
              <span>/</span>
              <span className="text-slate-800 font-medium">จัดการหมวดหมู่</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm">
          {/* Header */}
          <div className="p-6 border-b border-slate-200/50">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-800">จัดการหมวดหมู่สินค้า</h1>
              <div className="flex items-center space-x-2">
                <button
                  onClick={fetchCategories}
                  disabled={saving || loading}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-all"
                >
                  <span>รีเฟรช</span>
                </button>
                <button
                  onClick={() => setIsAdding(true)}
                  disabled={isAdding || saving}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all"
                >
                  <Plus className="h-4 w-4" />
                  <span>เพิ่มหมวดหมู่ใหม่</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Add New Category Form */}
            {isAdding && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">เพิ่มหมวดหมู่ใหม่</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      รหัสหมวดหมู่ *
                    </label>
                    <input
                      type="text"
                      value={newCategory.id}
                      onChange={(e) => setNewCategory(prev => ({ ...prev, id: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="เช่น: electronics"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      ชื่อหมวดหมู่ *
                    </label>
                    <input
                      type="text"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="เช่น: อุปกรณ์อิเล็กทรอนิกส์"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={cancelAdd}
                    disabled={saving}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={handleAdd}
                    disabled={saving}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    <span>{saving ? 'กำลังบันทึก...' : 'บันทึก'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Categories List */}
            <div className="space-y-3">
              {categories.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <p className="mb-4">ยังไม่มีหมวดหมู่ในระบบ</p>
                  <button
                    onClick={addSampleCategories}
                    disabled={saving}
                    className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    <span>{saving ? 'กำลังเพิ่มข้อมูล...' : 'เพิ่มข้อมูลตัวอย่าง'}</span>
                  </button>
                </div>
              ) : (
                categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex-1">
                      {editingId === category.id ? (
                        <div className="flex items-center space-x-3">
                          <div className="text-sm font-mono text-slate-500 w-32">
                            {category.id}
                          </div>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="ชื่อหมวดหมู่"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center space-x-3">
                          <div className="text-sm font-mono text-slate-500 w-32">
                            {category.id}
                          </div>
                          <div className="text-slate-800 font-medium">
                            {category.name}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {editingId === category.id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(category.id)}
                            disabled={saving}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            disabled={saving}
                            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(category)}
                            disabled={saving || editingId !== ''}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(category.id, category.name)}
                            disabled={saving || editingId !== ''}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}