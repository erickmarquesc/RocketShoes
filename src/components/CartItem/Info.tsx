import { useCartItem } from './context';
import { CartItemInfo as CartItemInfoStyled } from './styles';

export function CartItemInfo() {
  const { product } = useCartItem();
  return (
    <CartItemInfoStyled>
      <strong>{product.title}</strong>
      {product.size && <small>Tamanho: {product.size}</small>}
      <span>{product.priceFormatted}</span>
    </CartItemInfoStyled>
  );
}
