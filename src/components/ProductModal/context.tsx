import { createContext, useContext } from 'react';

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
}

export interface ProductModalContextData {
  product: Product;
  onClose: () => void;
  selectedSize: string | null;
  setSelectedSize: (size: string) => void;
  sizes: string[];
  hasDiscount: boolean;
  moletomDiscountApplies: boolean;
  effectivePrice: number;
  addToCart: () => void;
}

export const ProductModalContext = createContext<ProductModalContextData>(
  {} as ProductModalContextData
);

export function useProductModal(): ProductModalContextData {
  return useContext(ProductModalContext);
}
