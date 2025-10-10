// Product Type Definition
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  brand: string;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  inStock: boolean;
  description: string;
}

// Import ข้อมูลสินค้าจากไฟล์แยก
import { opaqueRoofProducts } from './products-opaque-roof';
import { translucentRoofProducts } from './products-translucent-roof';
import { installationProducts } from './products-installation';
import { toolsProducts } from './products-tools';
import { hardwareProducts } from './products-hardware';
import { paintProducts } from './products-paint';
import { othersProducts } from './products-others';

// รวมสินค้าทั้งหมด
export const products: Product[] = [
  ...opaqueRoofProducts,
  ...translucentRoofProducts,
  ...installationProducts,
  ...toolsProducts,
  ...hardwareProducts,
  ...paintProducts,
  ...othersProducts
];

// Export แยกตามหมวดหมู่สำหรับใช้งานเฉพาะ
export {
  opaqueRoofProducts,
  translucentRoofProducts,
  installationProducts,
  toolsProducts,
  hardwareProducts,
  paintProducts,
  othersProducts
};