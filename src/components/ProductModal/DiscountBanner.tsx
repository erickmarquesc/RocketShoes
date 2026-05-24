import { useProductModal } from './context';
import { ModalDiscountBanner } from './styles';

export function ProductModalDiscountBanner() {
  const { hasDiscount, moletomDiscountApplies } = useProductModal();
  return (
    <>
      {hasDiscount && (
        <ModalDiscountBanner>
          <span>🎁</span>
          Você tem <strong>10% de desconto</strong> em todos os produtos!
        </ModalDiscountBanner>
      )}
      {moletomDiscountApplies && (
        <ModalDiscountBanner $variant="moletom">
          <span>🧥</span>
          Você tem <strong>5% de desconto</strong> em produtos de moletom!
        </ModalDiscountBanner>
      )}
    </>
  );
}
