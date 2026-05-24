import { CartItemRoot } from './Root';
import { CartItemImage } from './Image';
import { CartItemInfo } from './Info';
import { CartItemQtyControls } from './QtyControls';
import { CartItemSubtotal } from './Subtotal';
import { CartItemRemoveButton } from './RemoveButton';

const CartItem = Object.assign(CartItemRoot, {
  Image: CartItemImage,
  Info: CartItemInfo,
  QtyControls: CartItemQtyControls,
  Subtotal: CartItemSubtotal,
  RemoveButton: CartItemRemoveButton,
});

export default CartItem;
