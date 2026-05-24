import { ProductModalRoot } from './Root';
import { ProductModalImage } from './Image';
import { ProductModalHeader } from './Header';
import { ProductModalDiscountBanner } from './DiscountBanner';
import { ProductModalPriceSection } from './PriceSection';
import { ProductModalSizeSelector } from './SizeSelector';
import { ProductModalCartButton } from './CartButton';

const ProductModal = Object.assign(ProductModalRoot, {
  Image: ProductModalImage,
  Header: ProductModalHeader,
  DiscountBanner: ProductModalDiscountBanner,
  PriceSection: ProductModalPriceSection,
  SizeSelector: ProductModalSizeSelector,
  CartButton: ProductModalCartButton,
});

export default ProductModal;
