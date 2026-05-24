import { ReactNode } from 'react';
import { CartItemContext, CartItemContextData } from './context';
import { CartItemRow } from './styles';

interface CartItemRootProps extends CartItemContextData {
  children: ReactNode;
}

export function CartItemRoot({ product, stockAmount, onIncrement, onDecrement, onRemove, children }: CartItemRootProps) {
  return (
    <CartItemContext.Provider value={{ product, stockAmount, onIncrement, onDecrement, onRemove }}>
      <CartItemRow data-testid="product">
        {children}
      </CartItemRow>
    </CartItemContext.Provider>
  );
}
