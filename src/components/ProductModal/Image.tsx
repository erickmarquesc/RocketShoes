import { useProductModal } from './context';

export function ProductModalImage() {
  const { product } = useProductModal();
  return <img src={product.image} alt={product.title} />;
}

ProductModalImage.displayName = 'ProductModal.Image';
