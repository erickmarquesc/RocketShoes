import { useProductModal } from './context';
import { AddButton } from './styles';

export function ProductModalCartButton() {
  const { selectedSize, addToCart } = useProductModal();
  return (
    <AddButton
      type="button"
      data-testid="modal-add-to-cart"
      disabled={!selectedSize}
      onClick={addToCart}
    >
      {selectedSize ? 'Adicionar ao carrinho' : 'Selecione um tamanho'}
    </AddButton>
  );
}
