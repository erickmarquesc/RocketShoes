import { MdDelete } from 'react-icons/md';
import { useCartItem } from './context';
import { CartItemRemove } from './styles';

export function CartItemRemoveButton() {
  const { onRemove } = useCartItem();
  return (
    <CartItemRemove type="button" data-testid="remove-product" onClick={onRemove}>
      <MdDelete size={20} />
    </CartItemRemove>
  );
}
