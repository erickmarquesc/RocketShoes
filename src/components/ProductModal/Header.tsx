import { useProductModal } from './context';

export function ProductModalHeader() {
  const { product } = useProductModal();
  return (
    <>
      <h2>{product.title}</h2>
      {product.description && <p>{product.description}</p>}
    </>
  );
}
