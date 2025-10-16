import { supabase } from './supabase'
import { Product, Category, Brand } from './types'

// Database service class
export class DatabaseService {
  
  // Products operations
  static async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        price,
        original_price,
        brand_id,
        category_id,
        rating,
        reviews,
        image,
        in_stock,
        description
      `)
      .eq('in_stock', true)
      .order('id')

    if (error) {
      console.error('Error fetching products:', error)
      throw new Error('Failed to fetch products')
    }

    return data?.map(DatabaseService.mapProductFromDB) || []
  }

  static async getAllProductsForAdmin(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        price,
        original_price,
        brand_id,
        category_id,
        rating,
        reviews,
        image,
        in_stock,
        description
      `)
      .order('id')

    if (error) {
      console.error('Error fetching products for admin:', error)
      throw new Error('Failed to fetch products')
    }

    return data?.map(DatabaseService.mapProductFromDB) || []
  }

  static async getProductById(id: number): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        price,
        original_price,
        brand_id,
        category_id,
        rating,
        reviews,
        image,
        in_stock,
        description
      `)
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Product not found
      }
      console.error('Error fetching product:', error)
      throw new Error('Failed to fetch product')
    }

    return data ? DatabaseService.mapProductFromDB(data) : null
  }

  static async getProductsByCategory(categoryId: string): Promise<Product[]> {
    if (categoryId === 'all') {
      return this.getAllProducts()
    }

    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        price,
        original_price,
        brand_id,
        category_id,
        rating,
        reviews,
        image,
        in_stock,
        description
      `)
      .eq('category_id', categoryId)
      .eq('in_stock', true)
      .order('id')

    if (error) {
      console.error('Error fetching products by category:', error)
      throw new Error('Failed to fetch products by category')
    }

    return data?.map(DatabaseService.mapProductFromDB) || []
  }

  static async getProductsByBrand(brandId: string): Promise<Product[]> {
    if (brandId === 'all') {
      return this.getAllProducts()
    }

    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        price,
        original_price,
        brand_id,
        category_id,
        rating,
        reviews,
        image,
        in_stock,
        description
      `)
      .eq('brand_id', brandId)
      .eq('in_stock', true)
      .order('id')

    if (error) {
      console.error('Error fetching products by brand:', error)
      throw new Error('Failed to fetch products by brand')
    }

    return data?.map(DatabaseService.mapProductFromDB) || []
  }

  static async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        price,
        original_price,
        brand_id,
        category_id,
        rating,
        reviews,
        image,
        in_stock,
        description
      `)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .eq('in_stock', true)
      .order('id')

    if (error) {
      console.error('Error searching products:', error)
      throw new Error('Failed to search products')
    }

    return data?.map(DatabaseService.mapProductFromDB) || []
  }

  // Product management operations (Admin only)
  static async updateProduct(id: number, productData: Partial<Product>): Promise<Product | null> {
    try {
      console.log('updateProduct called with:', { id, productData })
      
      // First get the existing product
      const existingProduct = await DatabaseService.getProductById(id)
      if (!existingProduct) {
        console.log('Product not found:', id)
        return null
      }

      console.log('Existing product found:', existingProduct)

      // Prepare update object with only defined fields
      const updateObject: Record<string, unknown> = {}
      
      if (productData.name !== undefined) updateObject.name = productData.name
      if (productData.price !== undefined) updateObject.price = productData.price
      if (productData.original_price !== undefined) updateObject.original_price = productData.original_price
      if (productData.brand_id !== undefined) updateObject.brand_id = productData.brand_id
      if (productData.category_id !== undefined) updateObject.category_id = productData.category_id
      if (productData.rating !== undefined) updateObject.rating = productData.rating
      if (productData.reviews !== undefined) updateObject.reviews = productData.reviews
      if (productData.image !== undefined) updateObject.image = productData.image
      if (productData.in_stock !== undefined) updateObject.in_stock = productData.in_stock
      if (productData.description !== undefined) updateObject.description = productData.description

      if (Object.keys(updateObject).length === 0) {
        console.log('No fields to update')
        return existingProduct // No changes
      }

      console.log('Update object:', updateObject)

      // Direct Supabase update with proper typing
      const { data, error } = await supabase
        .from('products')
        .update(updateObject as never)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Supabase update error:', error)
        throw error
      }

      console.log('Update successful:', data)
      
      // Return the updated product mapped to our format
      return data ? DatabaseService.mapProductFromDB(data) : null
    } catch (error) {
      console.error('Error in updateProduct:', error)
      throw error
    }
  }

  static async deleteProduct(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting product:', error)
      return false
    }

    return true
  }

  // Categories operations
  static async getAllCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name')
      .order('name')

    if (error) {
      console.error('Error fetching categories:', error)
      throw new Error('Failed to fetch categories')
    }

    // เพิ่ม "ทั้งหมด" category
    return [
      { id: 'all', name: 'ทั้งหมด' },
      ...(data || [])
    ]
  }

  // Brands operations
  static async getAllBrands(): Promise<Brand[]> {
    const { data, error } = await supabase
      .from('brands')
      .select('id, name')
      .order('name')

    if (error) {
      console.error('Error fetching brands:', error)
      throw new Error('Failed to fetch brands')
    }

    // เพิ่ม "ทุกแบรนด์" brand
    return [
      { id: 'all', name: 'ทุกแบรนด์' },
      ...(data || [])
    ]
  }

  // Helper method to map database product to application product
  private static mapProductFromDB(dbProduct: {
    id: number
    name: string
    price: number
    original_price: number | null
    brand_id: string | null
    category_id: string | null
    rating: number | null
    reviews: number | null
    image: string | null
    in_stock: boolean | null
    description: string | null
  }): Product {
    return {
      id: dbProduct.id,
      name: dbProduct.name,
      price: dbProduct.price,
      original_price: dbProduct.original_price ?? undefined,
      brand_id: dbProduct.brand_id ?? '',
      category_id: dbProduct.category_id ?? '',
      rating: dbProduct.rating ?? 0,
      reviews: dbProduct.reviews ?? 0,
      image: dbProduct.image ?? undefined,
      in_stock: dbProduct.in_stock ?? true,
      description: dbProduct.description ?? undefined
    }
  }
}

// Export ค่า default สำหรับใช้งานง่าย
export const {
  getAllProducts,
  getAllProductsForAdmin,
  getProductById,
  getProductsByCategory,
  getProductsByBrand,
  searchProducts,
  getAllCategories,
  getAllBrands,
  updateProduct,
  deleteProduct
} = DatabaseService