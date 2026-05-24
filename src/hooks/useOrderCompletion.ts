import { useHistory } from 'react-router-dom';

interface UseOrderCompletionParams {
  cardName: string;
  clearCart: () => void;
}

function generateOrderId(): string {
  const ts = Date.now().toString(36).slice(-4).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${ts}-${rand}`;
}

export function useOrderCompletion({ cardName, clearCart }: UseOrderCompletionParams) {
  const history = useHistory();

  function finishOrder() {
    const orderId = generateOrderId();

    if (localStorage.getItem('@RocketShoes:hasDiscount') === 'true') {
      localStorage.removeItem('@RocketShoes:hasDiscount');
    }
    if (localStorage.getItem('@RocketShoes:hasDiscountMoletom') === 'true') {
      localStorage.removeItem('@RocketShoes:hasDiscountMoletom');
    }

    const currentCount = parseInt(localStorage.getItem('@RocketShoes:loyaltyCount') || '0', 10);
    const newCount = currentCount + 1;

    let discountActivated = false;
    let moletomDiscountActivated = false;

    if (newCount >= 10) {
      localStorage.setItem('@RocketShoes:hasDiscount', 'true');
      localStorage.setItem('@RocketShoes:loyaltyCount', '0');
      discountActivated = true;
    } else {
      localStorage.setItem('@RocketShoes:loyaltyCount', String(newCount));
      if (newCount === 2) {
        localStorage.setItem('@RocketShoes:hasDiscountMoletom', 'true');
        moletomDiscountActivated = true;
      }
    }

    clearCart();
    history.push('/success', {
      cardName,
      orderId,
      loyaltyCount: discountActivated ? 10 : newCount,
      discountActivated,
      moletomDiscountActivated,
    });
  }

  return { finishOrder };
}
