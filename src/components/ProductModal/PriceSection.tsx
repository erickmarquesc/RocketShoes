import { formatPrice } from '../../util/format';
import { useProductModal } from './context';
import { PriceBadge } from './styles';

export function ProductModalPriceSection() {
  const { product, hasDiscount, moletomDiscountApplies, effectivePrice } = useProductModal();
  const installment = formatPrice(effectivePrice / 12);

  return (
    <div className="price-row">
      {(hasDiscount || moletomDiscountApplies) && (
        <span className="from-price">
          DE <s>{formatPrice(product.price)}</s>, por
        </span>
      )}
      <div className="current-price">
        <PriceBadge>{formatPrice(effectivePrice)}</PriceBadge>
        <span className="installment">Em 12x s/ juros de {installment}</span>
      </div>
    </div>
  );
}
