import AxiosMock from 'axios-mock-adapter';
import { waitFor, render, fireEvent } from '@testing-library/react';

import { api } from '../../services/api';
import Home from '../../pages/Home';
import { useCart } from '../../hooks/useCart';

const apiMock = new AxiosMock(api);
const mockedAddProduct = vi.fn();
const mockedUseCartHook = vi.mocked(useCart);

vi.mock('../../hooks/useCart');

const products = [
  {
    id: 1,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
    price: 179.9,
    title: 'Tenis de Caminhada Leve Confortavel',
    category: 'tenis',
  },
  {
    id: 2,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
    price: 139.9,
    title: 'Tenis VR Caminhada Confortavel Detalhes Couro Masculino',
    category: 'tenis',
  },
  {
    id: 3,
    title: 'Tenis Adidas Duramo Lite 2.0',
    price: 219.9,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg',
    category: 'tenis',
  },
  {
    id: 4,
    title: 'Moletom Básico',
    price: 200,
    image: 'https://example.com/moletom.jpg',
    category: 'moletom',
  },
];

const baseCartValue = {
  cart: [
    {
      amount: 2,
      id: 1,
      image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
      price: 179.9,
      title: 'Tenis de Caminhada Leve Confortavel',
    },
    {
      amount: 1,
      id: 2,
      image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
      price: 139.9,
      title: 'Tenis VR Caminhada Confortavel Detalhes Couro Masculino',
    },
  ],
  addProduct: mockedAddProduct,
  removeProduct: vi.fn(),
  updateProductAmount: vi.fn(),
  stockMap: {},
  clearCart: vi.fn(),
};

describe('Home Page', () => {
  beforeAll(() => {
    apiMock.onGet('products').reply(200, products);
  });

  beforeEach(() => {
    mockedUseCartHook.mockReturnValue(baseCartValue);
    localStorage.clear();
  });

  it('should be able to render each product quantity added to cart', async () => {
    const { getAllByTestId } = render(<Home />);

    await waitFor(() => getAllByTestId('cart-product-quantity'), { timeout: 200 });

    const [first, second, third] = getAllByTestId('cart-product-quantity');

    expect(first).toHaveTextContent('2');
    expect(second).toHaveTextContent('1');
    expect(third).toHaveTextContent('0');
  });

  it('should be able to add a product to cart', async () => {
    const { getAllByTestId, getByTestId, getByRole, rerender } = render(<Home />);

    await waitFor(() => getAllByTestId('add-product-button'), { timeout: 200 });

    const [addFirstProduct] = getAllByTestId('add-product-button');
    fireEvent.click(addFirstProduct);

    // First product is category 'tenis', so sizes are 36/38/40/42
    const sizeButton = getByRole('button', { name: '38' });
    fireEvent.click(sizeButton);

    const modalAddButton = getByTestId('modal-add-to-cart');
    fireEvent.click(modalAddButton);

    expect(mockedAddProduct).toHaveBeenCalledWith(1, '38');

    mockedUseCartHook.mockReturnValueOnce({
      ...baseCartValue,
      cart: [{ ...baseCartValue.cart[0], amount: 3 }],
    });

    rerender(<Home />);

    const [firstProductCartQuantity] = getAllByTestId('cart-product-quantity');
    expect(firstProductCartQuantity).toHaveTextContent('3');
  });

  it('should show the discount banner when hasDiscount is active', async () => {
    localStorage.setItem('@RocketShoes:hasDiscount', 'true');

    const { getByText, getAllByTestId } = render(<Home />);

    await waitFor(() => getAllByTestId('add-product-button'), { timeout: 200 });

    // Text is split across <strong> and a text node inside <p>, so match via
    // body textContent instead of a single-element query.
    expect(document.body.textContent).toMatch(
      /10% de desconto.*em todos os produtos/i
    );
  });

  it('should show strikethrough original prices and discounted values when hasDiscount is active', async () => {
    localStorage.setItem('@RocketShoes:hasDiscount', 'true');

    const { getAllByTestId } = render(<Home />);

    await waitFor(() => getAllByTestId('add-product-button'), { timeout: 200 });

    // Strikethrough <s> elements should exist for the original prices
    const strikethroughs = document.querySelectorAll('s');
    expect(strikethroughs.length).toBeGreaterThan(0);

    // Discounted price for product 1: 179.9 * 0.9 = 161.91 -> "161,91" in pt-BR
    // Using textContent match to avoid Intl non-breaking-space inconsistencies
    expect(document.body.textContent).toMatch(/161,91/);
  });

  it('should not show discount banner when hasDiscount is not set', async () => {
    const { queryByText, getAllByTestId } = render(<Home />);

    await waitFor(() => getAllByTestId('add-product-button'), { timeout: 200 });

    expect(
      queryByText(/10% de desconto em todos os produtos/i)
    ).not.toBeInTheDocument();
  });

  it('should show the moletom discount banner when hasDiscountMoletom is active', async () => {
    localStorage.setItem('@RocketShoes:hasDiscountMoletom', 'true');

    const { getAllByTestId } = render(<Home />);

    await waitFor(() => getAllByTestId('add-product-button'), { timeout: 200 });

    expect(document.body.textContent).toMatch(/5% de desconto.*em produtos de moletom/i);
  });

  it('should show 5% OFF badge and discounted price only on moletom products', async () => {
    localStorage.setItem('@RocketShoes:hasDiscountMoletom', 'true');

    const { getAllByTestId } = render(<Home />);

    await waitFor(() => getAllByTestId('add-product-button'), { timeout: 200 });

    // Moletom product at 200 * 0.95 = 190 -> "190,00"
    expect(document.body.textContent).toMatch(/190,00/);

    // Tenis products should NOT be discounted (179.9 appears unchanged, not 161.91)
    expect(document.body.textContent).toMatch(/179,90/);
    expect(document.body.textContent).not.toMatch(/161,91/);
  });

  it('should not show moletom banner when hasDiscountMoletom is not set', async () => {
    const { queryByText, getAllByTestId } = render(<Home />);

    await waitFor(() => getAllByTestId('add-product-button'), { timeout: 200 });

    expect(
      queryByText(/5% de desconto.*em produtos de moletom/i)
    ).not.toBeInTheDocument();
  });
});
