import { useCartItem } from './context';

export function CartItemImage() {
  const { product } = useCartItem();
  return <img src={product.image} alt={product.title} />;
}
