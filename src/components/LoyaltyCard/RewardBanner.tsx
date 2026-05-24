import { useLoyaltyCard } from './context';
import { DiscountBanner } from './styles';

export function LoyaltyCardRewardBanner() {
  const { discountActivated, moletomDiscountActivated } = useLoyaltyCard();
  return (
    <>
      {discountActivated && (
        <DiscountBanner>
          <strong>🎁 Você ganhou 10% de desconto!</strong>
          <span>O desconto já está ativo em todos os produtos.</span>
        </DiscountBanner>
      )}
      {moletomDiscountActivated && (
        <DiscountBanner $variant="moletom">
          <strong>🧥 Você ganhou 5% de desconto!</strong>
          <span>Válido para todos os produtos de moletom.</span>
        </DiscountBanner>
      )}
    </>
  );
}
