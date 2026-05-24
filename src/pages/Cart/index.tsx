import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useCart } from '../../hooks/useCart';
import { useOrderCompletion } from '../../hooks/useOrderCompletion';
import { formatPrice } from '../../util/format';
import PaymentForm from '../../components/PaymentForm';
import CartItem from '../../components/CartItem';
import { Container, ContentLayout, LeftColumn, RightColumn, ProductList, Total } from './styles';

const Cart = (): JSX.Element => {
  const { cart, stockMap, removeProduct, updateProductAmount, clearCart } = useCart();
  const history = useHistory();
  const [isFormValid, setIsFormValid] = useState(false);
  const [cardName, setCardName] = useState('');

  const { finishOrder } = useOrderCompletion({ cardName, clearCart });

  useEffect(() => {
    if (cart.length === 0) {
      history.push('/');
    }
  }, [cart, history]);

  const cartFormatted = cart.map(product => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount),
  }));

  const total = formatPrice(
    cart.reduce((sumTotal, product) => sumTotal + product.price * product.amount, 0)
  );

  return (
    <Container>
      <ContentLayout>
        <LeftColumn>
          <ProductList>
            <div className="list-header" aria-hidden="true">
              <span />
              <span>Produto</span>
              <span>Qtd</span>
              <span>Subtotal</span>
              <span />
            </div>

            {cartFormatted.map(product => (
              <CartItem
                key={product.id}
                product={product}
                stockAmount={stockMap[product.id] ?? Infinity}
                onIncrement={() => updateProductAmount({ productId: product.id, amount: product.amount + 1 })}
                onDecrement={() => updateProductAmount({ productId: product.id, amount: product.amount - 1 })}
                onRemove={() => removeProduct(product.id)}
              >
                <CartItem.Image />
                <CartItem.Info />
                <CartItem.QtyControls />
                <CartItem.Subtotal />
                <CartItem.RemoveButton />
              </CartItem>
            ))}
          </ProductList>
        </LeftColumn>

        <RightColumn>
          <PaymentForm onValidChange={setIsFormValid} onNameChange={setCardName} />

          <footer>
            <Total>
              <span>TOTAL</span>
              <strong>{total}</strong>
            </Total>

            <button type="button" disabled={!isFormValid} onClick={finishOrder}>
              Finalizar pedido
            </button>
          </footer>
        </RightColumn>
      </ContentLayout>
    </Container>
  );
};

export default Cart;
