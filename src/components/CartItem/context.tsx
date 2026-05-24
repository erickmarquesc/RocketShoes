import { createContext, useContext } from 'react';

export interface CartItemProduct {
  id: number;
  title: string;
  image: string;
  amount: number;
  size?: string;
  priceFormatted: string;
  subTotal: string;
}

export interface CartItemContextData {
  product: CartItemProduct;
  stockAmount: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export const CartItemContext = createContext<CartItemContextData>({} as CartItemContextData);

export function useCartItem(): CartItemContextData {
  return useContext(CartItemContext);
}
