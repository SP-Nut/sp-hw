import { Product } from './products';

// ฟังก์ชันกรองสินค้า
export const filterProducts = (
  products: Product[],
  filters: {
    category: string;
    brand: string;
    priceRange: [number, number];
    searchTerm: string;
  }
) => {
  return products.filter(product => {
    // Filter by category
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    
    // Filter by brand
    if (filters.brand !== 'all' && product.brand.toLowerCase() !== filters.brand.toLowerCase()) return false;
    
    // Filter by price range
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
    
    // Filter by search term (name, description, brand)
    if (filters.searchTerm.trim() !== '') {
      const searchLower = filters.searchTerm.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(searchLower);
      const descriptionMatch = product.description.toLowerCase().includes(searchLower);
      const brandMatch = product.brand.toLowerCase().includes(searchLower);
      
      if (!nameMatch && !descriptionMatch && !brandMatch) return false;
    }
    
    return true;
  });
};

// ฟังก์ชันเรียงลำดับสินค้า
export const sortProducts = (products: Product[], sortBy: string) => {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });
};

// ฟังก์ชันแบ่งหน้า
export const paginateProducts = (products: Product[], page: number, itemsPerPage: number) => {
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return {
    products: currentProducts,
    totalPages,
    startIndex,
    endIndex,
    totalItems: products.length
  };
};

// ฟังก์ชันนับสินค้าในแต่ละแบรนด์
export const getBrandCounts = (products: Product[]) => {
  const counts: { [key: string]: number } = {};
  
  products.forEach(product => {
    counts[product.brand] = (counts[product.brand] || 0) + 1;
  });
  
  return counts;
};