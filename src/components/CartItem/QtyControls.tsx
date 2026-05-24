import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import { useCartItem } from './context';
import { CartItemQty } from './styles';

export function CartItemQtyControls() {
  const { product, stockAmount, onIncrement, onDecrement } = useCartItem();
  return (
    <CartItemQty>
      <button
        type="button"
        data-testid="decrement-product"
        disabled={product.amount <= 1}
        onClick={onDecrement}
      >
        <MdRemoveCircleOutline size={20} />
      </button>
      <input
        type="text"
        data-testid="product-amount"
        readOnly
        value={product.amount}
      />
      <button
        type="button"
        data-testid="increment-product"
        disabled={product.amount >= stockAmount}
        onClick={onIncrement}
      >
        <MdAddCircleOutline size={20} />
      </button>
    </CartItemQty>
  );
}
