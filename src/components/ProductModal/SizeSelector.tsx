import { useProductModal } from './context';
import { SizeButton } from './styles';

export function ProductModalSizeSelector() {
  const { sizes, selectedSize, setSelectedSize } = useProductModal();
  return (
    <div className="sizes">
      <strong>Tamanhos</strong>
      <div className="size-buttons">
        {sizes.map(size => (
          <SizeButton
            key={size}
            type="button"
            $selected={selectedSize === size}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </SizeButton>
        ))}
      </div>
    </div>
  );
}
