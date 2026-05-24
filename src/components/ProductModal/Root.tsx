import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

import { useCart } from '../../hooks/useCart';
import { ProductModalContext, Product } from './context';
import { CloseButton, ImageSection, ContentSection, ModalContainer, Overlay } from './styles';

const SIZES_CLOTHING = ['P', 'M', 'G', 'GG'];
const SIZES_SHOES = ['36', '38', '40', '42'];

interface ProductModalRootProps {
  product: Product;
  onClose: () => void;
  children: React.ReactNode;
}

export function ProductModalRoot({ product, onClose, children }: ProductModalRootProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addProduct } = useCart();

  const hasDiscount = localStorage.getItem('@RocketShoes:hasDiscount') === 'true';
  const hasDiscountMoletom = localStorage.getItem('@RocketShoes:hasDiscountMoletom') === 'true';
  const moletomDiscountApplies = !hasDiscount && hasDiscountMoletom && product.category === 'moletom';
  const effectivePrice = hasDiscount ? product.price * 0.9
    : moletomDiscountApplies ? product.price * 0.95
    : product.price;

  const sizes = product.category === 'tenis' ? SIZES_SHOES : SIZES_CLOTHING;

  function addToCart() {
    if (!selectedSize) return;
    addProduct(product.id, selectedSize);
    onClose();
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  // Route Image into ImageSection, everything else into ContentSection
  const imageChild = React.Children.toArray(children).find(
    child => React.isValidElement(child) && (child.type as { displayName?: string }).displayName === 'ProductModal.Image'
  );
  const contentChildren = React.Children.toArray(children).filter(
    child => !(React.isValidElement(child) && (child.type as { displayName?: string }).displayName === 'ProductModal.Image')
  );

  return (
    <ProductModalContext.Provider
      value={{ product, onClose, selectedSize, setSelectedSize, sizes, hasDiscount, moletomDiscountApplies, effectivePrice, addToCart }}
    >
      <Overlay onClick={handleOverlayClick}>
        <ModalContainer>
          <CloseButton onClick={onClose} aria-label="Fechar modal">
            <MdClose size={20} />
          </CloseButton>
          <ImageSection>{imageChild}</ImageSection>
          <ContentSection>{contentChildren}</ContentSection>
        </ModalContainer>
      </Overlay>
    </ProductModalContext.Provider>
  );
}
