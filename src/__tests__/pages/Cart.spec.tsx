import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { useCart } from '../../hooks/useCart';
import Cart from '../../pages/Cart';
import { Product } from '../../types';

const mockedRemoveProduct = vi.fn();
const mockedUpdateProductAmount = vi.fn();
const mockedUseCartHook = vi.mocked(useCart);

vi.mock('../../hooks/useCart');

const baseCart: Product[] = [
  {
    amount: 1,
    id: 1,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
    price: 179.9,
    title: 'Tênis de Caminhada Leve Confortável',
  },
  {
    amount: 2,
    id: 2,
    image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
    price: 139.9,
    title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino',
  },
];

const mockCartValue = (cart = baseCart) => ({
  cart,
  stockMap: { 1: 5, 2: 5 },
  removeProduct: mockedRemoveProduct,
  updateProductAmount: mockedUpdateProductAmount,
  addProduct: vi.fn(),
  clearCart: vi.fn(),
});

const renderCart = () =>
  render(
    <MemoryRouter>
      <Cart />
    </MemoryRouter>
  );

describe('Cart Page', () => {
  beforeEach(() => {
    mockedUseCartHook.mockReturnValue(mockCartValue());
  });

  it('should be able to increase/decrease a product amount', () => {
    const { getAllByTestId, rerender } = renderCart();

    const [incrementFirstProduct] = getAllByTestId('increment-product');
    const [, decrementSecondProduct] = getAllByTestId('decrement-product');
    const [firstProductAmount, secondProductAmount] = getAllByTestId('product-amount');

    expect(firstProductAmount).toHaveDisplayValue('1');
    expect(secondProductAmount).toHaveDisplayValue('2');

    fireEvent.click(incrementFirstProduct);
    fireEvent.click(decrementSecondProduct);

    expect(mockedUpdateProductAmount).toHaveBeenCalledWith({ amount: 2, productId: 1 });
    expect(mockedUpdateProductAmount).toHaveBeenCalledWith({ amount: 1, productId: 2 });

    mockedUseCartHook.mockReturnValueOnce(
      mockCartValue([
        { ...baseCart[0], amount: 2 },
        { ...baseCart[1], amount: 1 },
      ])
    );

    rerender(<MemoryRouter><Cart /></MemoryRouter>);

    expect(firstProductAmount).toHaveDisplayValue('2');
    expect(secondProductAmount).toHaveDisplayValue('1');
  });

  it('should not be able to decrease a product amount when value is 1', () => {
    const { getAllByTestId } = renderCart();

    const [decrementFirstProduct] = getAllByTestId('decrement-product');
    const [firstProductAmount] = getAllByTestId('product-amount');

    expect(firstProductAmount).toHaveDisplayValue('1');

    fireEvent.click(decrementFirstProduct);

    expect(decrementFirstProduct).toHaveProperty('disabled');
    expect(mockedUpdateProductAmount).not.toHaveBeenCalled();
  });

  it('should disable the increment button when stock limit is reached', () => {
    mockedUseCartHook.mockReturnValue(
      mockCartValue([{ ...baseCart[0], amount: 5 }])
    );
    // stockMap[1] = 5, amount = 5, so 5 >= 5 → disabled
    const { getAllByTestId } = renderCart();
    const [incrementFirstProduct] = getAllByTestId('increment-product');

    expect(incrementFirstProduct).toBeDisabled();
  });

  it('should show the product size when it has one', () => {
    mockedUseCartHook.mockReturnValue(
      mockCartValue([{ ...baseCart[0], size: 'M' }])
    );

    const { getByText } = renderCart();

    expect(getByText('Tamanho: M')).toBeInTheDocument();
  });

  it('should be able to remove a product', () => {
    const { getAllByTestId, rerender } = renderCart();

    const [removeFirstProduct] = getAllByTestId('remove-product');
    const [firstProduct, secondProduct] = getAllByTestId('product');

    expect(firstProduct).toBeInTheDocument();
    expect(secondProduct).toBeInTheDocument();

    fireEvent.click(removeFirstProduct);

    expect(mockedRemoveProduct).toHaveBeenCalledWith(1);

    mockedUseCartHook.mockReturnValueOnce(mockCartValue([baseCart[1]]));

    rerender(<MemoryRouter><Cart /></MemoryRouter>);

    expect(firstProduct).not.toBeInTheDocument();
    expect(secondProduct).toBeInTheDocument();
  });
});
