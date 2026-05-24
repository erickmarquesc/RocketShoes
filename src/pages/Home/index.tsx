import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { FilterBar, FilterButton, ProductList, DiscountBanner, DiscountBadge } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';
import ProductModal from '../../components/ProductModal';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  category: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

type Category = 'all' | 'tenis' | 'moletom';
type SortOrder = 'asc' | 'desc' | null;

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const [category, setCategory] = useState<Category>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductFormatted | null>(null);
  const [hasDiscount] = useState(() => localStorage.getItem('@RocketShoes:hasDiscount') === 'true');
  const [hasDiscountMoletom] = useState(() => localStorage.getItem('@RocketShoes:hasDiscountMoletom') === 'true');
  const { cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = { ...sumAmount };
    newSumAmount[product.id] = product.amount;
    return newSumAmount;
  }, {} as CartItemsAmount);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get<Product[]>('products');
      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));
      setProducts(data);
    }
    loadProducts();
  }, []);

  const displayProducts = products
    .filter(p => category === 'all' || p.category === category)
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      if (sortOrder === 'desc') return b.price - a.price;
      return 0;
    });

  function handleSortClick(order: 'asc' | 'desc') {
    setSortOrder(prev => (prev === order ? null : order));
  }

  return (
    <>
      {hasDiscount && (
        <DiscountBanner>
          <span>🎁</span>
          <p>Você tem <strong>10% de desconto</strong> em todos os produtos!</p>
        </DiscountBanner>
      )}

      {!hasDiscount && hasDiscountMoletom && (
        <DiscountBanner $variant="moletom">
          <span>🧥</span>
          <p>Você tem <strong>5% de desconto</strong> em produtos de moletom!</p>
        </DiscountBanner>
      )}

      <FilterBar>
        <div className="group">
          <span className="label">Categoria</span>
          <FilterButton $active={category === 'all'} onClick={() => setCategory('all')}>
            Todos
          </FilterButton>
          <FilterButton $active={category === 'tenis'} onClick={() => setCategory('tenis')}>
            Tênis
          </FilterButton>
          <FilterButton $active={category === 'moletom'} onClick={() => setCategory('moletom')}>
            Moletom
          </FilterButton>
        </div>

        <div className="group">
          <span className="label">Preço</span>
          <FilterButton $active={sortOrder === 'asc'} onClick={() => handleSortClick('asc')}>
            Menor ↑
          </FilterButton>
          <FilterButton $active={sortOrder === 'desc'} onClick={() => handleSortClick('desc')}>
            Maior ↓
          </FilterButton>
        </div>
      </FilterBar>

      <ProductList>
        {displayProducts.map(product => (
          <li key={product.id}>
            {hasDiscount && <DiscountBadge>10% OFF</DiscountBadge>}
            {!hasDiscount && hasDiscountMoletom && product.category === 'moletom' && (
              <DiscountBadge $variant="moletom">5% OFF</DiscountBadge>
            )}
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <div className="price-area">
              {(hasDiscount || (hasDiscountMoletom && product.category === 'moletom')) && (
                <s>{product.priceFormatted}</s>
              )}
              <span>
                {hasDiscount
                  ? formatPrice(product.price * 0.9)
                  : hasDiscountMoletom && product.category === 'moletom'
                    ? formatPrice(product.price * 0.95)
                    : product.priceFormatted}
              </span>
            </div>
            <button
              type="button"
              data-testid="add-product-button"
              onClick={() => setSelectedProduct(product)}
            >
              <div data-testid="cart-product-quantity">
                <MdAddShoppingCart size={16} color="#FFF" />
                {cartItemsAmount[product.id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        >
          <ProductModal.Image />
          <ProductModal.Header />
          <ProductModal.DiscountBanner />
          <ProductModal.PriceSection />
          <ProductModal.SizeSelector />
          <ProductModal.CartButton />
        </ProductModal>
      )}
    </>
  );
};

export default Home;
