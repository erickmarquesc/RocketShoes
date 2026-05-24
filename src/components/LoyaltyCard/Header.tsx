import { useLoyaltyCard } from './context';
import { LoyaltyHeader } from './styles';

export function LoyaltyCardHeader() {
  const { orderId } = useLoyaltyCard();
  return (
    <LoyaltyHeader>
      <div>
        <h3>Cartão Fidelidade</h3>
        <p>A cada 10 compras, ganhe 10% de desconto!</p>
      </div>
      <span>{orderId}</span>
    </LoyaltyHeader>
  );
}
