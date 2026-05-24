import { useCartItem } from './context';
import { CartItemSubtotalText } from './styles';

export function CartItemSubtotal() {
  const { product } = useCartItem();
  return <CartItemSubtotalText>{product.subTotal}</CartItemSubtotalText>;
}
