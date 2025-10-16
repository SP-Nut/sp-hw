import { useState, useEffect } from 'react'

// Types
interface Product {
  id: number
  name: string
  price: number
  originalPrice: number | null
  brand: string | null
  category: string | null
  rating: number | null
  reviews: number | null
  image: string | null
  inStock: boolean | null
  description: string | null
}

interface Category {
  id: string
  name: string
}

interface Brand {
  id: string
  name: string
}

// Custom hook สำหรับดึงสินค้าทั้งหมด
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const response = await fetch('/api/products')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setProducts(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}

// Custom hook สำหรับดึงสินค้าตาม ID
export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/${id}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            setProduct(null)
            setError('Product not found')
          } else {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          return
        }
        
        const data = await response.json()
        setProduct(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to fetch product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return { product, loading, error }
}

// Custom hook สำหรับดึงหมวดหมู่
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        const response = await fetch('/api/categories')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setCategories(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching categories:', err)
        setError('Failed to fetch categories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}

// Custom hook สำหรับดึงแบรนด์
export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBrands() {
      try {
        setLoading(true)
        const response = await fetch('/api/brands')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setBrands(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching brands:', err)
        setError('Failed to fetch brands')
      } finally {
        setLoading(false)
      }
    }

    fetchBrands()
  }, [])

  return { brands, loading, error }
}

// Custom hook สำหรับค้นหาสินค้า
export function useSearchProducts(query: string, category?: string, brand?: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query && !category && !brand) {
      setProducts([])
      return
    }

    async function searchProducts() {
      try {
        setLoading(true)
        
        const params = new URLSearchParams()
        if (query) params.append('q', query)
        if (category) params.append('category', category)
        if (brand) params.append('brand', brand)

        const response = await fetch(`/api/products/search?${params}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setProducts(data)
        setError(null)
      } catch (err) {
        console.error('Error searching products:', err)
        setError('Failed to search products')
      } finally {
        setLoading(false)
      }
    }

    searchProducts()
  }, [query, category, brand])

  return { products, loading, error }
}

// Export types
export type { Product, Category, Brand }