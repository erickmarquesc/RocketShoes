import { renderHook, act, waitFor } from '@testing-library/react';
import AxiosMock from 'axios-mock-adapter';

import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { useCart, CartProvider } from '../../hooks/useCart';

const apiMock = new AxiosMock(api);

vi.mock('react-toastify');

const mockedToastError = vi.mocked(toast.error);
const mockedSetItemLocalStorage = vi.spyOn(Storage.prototype, 'setItem');
const initialStoragedData = [
  {
    id: 1,
    amount: 2,
    image:
      'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
    price: 179.9,
    title: 'Tênis de Caminhada Leve Confortável',
  },
  {
    id: 2,
    amount: 1,
    image:
      'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
    price: 139.9,
    title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino',
  },
];

describe('useCart Hook', () => {
  beforeEach(() => {
    apiMock.reset();

    vi
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValueOnce(JSON.stringify(initialStoragedData));
  });

  it('should be able to initialize cart with localStorage value', () => {
    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          amount: 2,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
          price: 179.9,
          title: 'Tênis de Caminhada Leve Confortável',
        },
        {
          id: 2,
          amount: 1,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
          price: 139.9,
          title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino',
        },
      ])
    );
  });

  it('should be able to add a new product', async () => {
    const productId = 3;

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 3,
      amount: 2,
    });
    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 3,
      title: 'Tênis Adidas Duramo Lite 2.0',
      price: 219.9,
      image:
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg',
    });

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    await act(async () => {
      result.current.addProduct(productId);
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          amount: 2,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
          price: 179.9,
          title: 'Tênis de Caminhada Leve Confortável',
        },
        {
          id: 2,
          amount: 1,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
          price: 139.9,
          title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino',
        },
        {
          id: 3,
          amount: 1,
          title: 'Tênis Adidas Duramo Lite 2.0',
          price: 219.9,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg',
        },
      ])
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@RocketShoes:cart',
      JSON.stringify(result.current.cart)
    );
  });

  it('should not be able add a product that does not exist', async () => {
    const productId = 4;

    apiMock.onGet(`stock/${productId}`).reply(404);
    apiMock.onGet(`products/${productId}`).reply(404);

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    await act(async () => {
      result.current.addProduct(productId);
    });

    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith(
          'Erro na adição do produto'
        );
        expect(result.current.cart).toEqual(
          expect.arrayContaining(initialStoragedData)
        );
        expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
      },
      { timeout: 200 }
    );
  });

  it('should be able to increase a product amount when adding a product that already exists on cart', async () => {
    const productId = 1;

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 1,
      amount: 3,
    });
    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 1,
      image:
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
      price: 179.9,
      title: 'Tênis de Caminhada Leve Confortável',
    });

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    await act(async () => {
      result.current.addProduct(productId);
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          amount: 3,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
          price: 179.9,
          title: 'Tênis de Caminhada Leve Confortável',
        },
        {
          id: 2,
          amount: 1,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
          price: 139.9,
          title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino',
        },
      ])
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@RocketShoes:cart',
      JSON.stringify(result.current.cart)
    );
  });

  it('should not be able to increase a product amount when running out of stock', async () => {
    const productId = 2;

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 2,
      amount: 1,
    });

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    await act(async () => {
      result.current.addProduct(productId);
    });

    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith(
          'Quantidade solicitada fora de estoque'
        );
        expect(result.current.cart).toEqual(
          expect.arrayContaining(initialStoragedData)
        );
        expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
      },
      { timeout: 200 }
    );
  });

  it('should be able to remove a product', () => {
    const productId = 2;

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.removeProduct(productId);
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          amount: 2,
          id: 1,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
          price: 179.9,
          title: 'Tênis de Caminhada Leve Confortável',
        },
      ])
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@RocketShoes:cart',
      JSON.stringify(result.current.cart)
    );
  });

  it('should not be able to remove a product that does not exist', () => {
    const productId = 3;

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.removeProduct(productId);
    });

    expect(mockedToastError).toHaveBeenCalledWith('Erro na remoção do produto');
    expect(result.current.cart).toEqual(
      expect.arrayContaining(initialStoragedData)
    );
    expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
  });

  it('should be able to update a product amount', async () => {
    const productId = 2;

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 2,
      amount: 5,
    });

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    await act(async () => {
      result.current.updateProductAmount({ amount: 2, productId });
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          amount: 2,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
          price: 179.9,
          title: 'Tênis de Caminhada Leve Confortável',
        },
        {
          id: 2,
          amount: 2,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
          price: 139.9,
          title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino',
        },
      ])
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@RocketShoes:cart',
      JSON.stringify(result.current.cart)
    );
  });

  it('should not be able to update a product that does not exist', async () => {
    const productId = 4;

    apiMock.onGet(`stock/${productId}`).reply(404);

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    await act(async () => {
      result.current.updateProductAmount({ amount: 3, productId });
    });

    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith(
          'Erro na alteração de quantidade do produto'
        );
        expect(result.current.cart).toEqual(
          expect.arrayContaining(initialStoragedData)
        );
        expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
      },
      { timeout: 200 }
    );
  });

  it('should not be able to update a product amount when running out of stock', async () => {
    const productId = 2;

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 2,
      amount: 1,
    });

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    await act(async () => {
      result.current.updateProductAmount({ amount: 2, productId });
    });

    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith(
          'Quantidade solicitada fora de estoque'
        );
        expect(result.current.cart).toEqual(
          expect.arrayContaining(initialStoragedData)
        );
        expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
      },
      { timeout: 200 }
    );
  });

  it('should not be able to update a product amount to a value smaller than 1', () => {
    const productId = 2;

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.updateProductAmount({ amount: 0, productId });
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining(initialStoragedData)
    );
    expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
  });

  it('should be able to clear the cart', () => {
    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cart).toEqual([]);
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@RocketShoes:cart',
      '[]'
    );
  });

  it('should be able to add a product with a size', async () => {
    const productId = 3;

    apiMock.onGet(`stock/${productId}`).reply(200, { id: 3, amount: 5 });
    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 3,
      title: 'Tênis Adidas Duramo Lite 2.0',
      price: 219.9,
      image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg',
    });

    const { result } = renderHook(useCart, { wrapper: CartProvider });

    await act(async () => {
      result.current.addProduct(productId, 'M');
    });

    const added = result.current.cart.find(p => p.id === productId);
    expect(added).toBeDefined();
    expect(added?.size).toBe('M');
  });

  it('should apply 10% discount to price when hasDiscount flag is active', async () => {
    const productId = 3;

    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
      if (key === '@RocketShoes:cart') return JSON.stringify(initialStoragedData);
      if (key === '@RocketShoes:hasDiscount') return 'true';
      return null;
    });

    apiMock.onGet(`stock/${productId}`).reply(200, { id: 3, amount: 5 });
    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 3,
      title: 'Tênis Adidas Duramo Lite 2.0',
      price: 219.9,
      image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg',
    });

    const { result } = renderHook(useCart, { wrapper: CartProvider });

    await act(async () => {
      result.current.addProduct(productId);
    });

    const added = result.current.cart.find(p => p.id === productId);
    expect(added?.price).toBeCloseTo(219.9 * 0.9, 2);
  });

  it('should keep full price when hasDiscount flag is not active', async () => {
    const productId = 3;

    // Ensure no discount leaks from previous test's mockImplementation
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
      if (key === '@RocketShoes:cart') return JSON.stringify(initialStoragedData);
      return null;
    });

    apiMock.onGet(`stock/${productId}`).reply(200, { id: 3, amount: 5 });
    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 3,
      title: 'Tênis Adidas Duramo Lite 2.0',
      price: 219.9,
      image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg',
    });

    const { result } = renderHook(useCart, { wrapper: CartProvider });

    await act(async () => {
      result.current.addProduct(productId);
    });

    const added = result.current.cart.find(p => p.id === productId);
    expect(added?.price).toBe(219.9);
  });

  it('should apply 5% discount to moletom products when hasDiscountMoletom flag is active', async () => {
    const productId = 3;

    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
      if (key === '@RocketShoes:cart') return JSON.stringify(initialStoragedData);
      if (key === '@RocketShoes:hasDiscountMoletom') return 'true';
      return null;
    });

    apiMock.onGet(`stock/${productId}`).reply(200, { id: 3, amount: 5 });
    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 3,
      title: 'Moletom Básico',
      price: 200,
      category: 'moletom',
      image: 'https://example.com/moletom.jpg',
    });

    const { result } = renderHook(useCart, { wrapper: CartProvider });

    await act(async () => {
      result.current.addProduct(productId);
    });

    const added = result.current.cart.find(p => p.id === productId);
    expect(added?.price).toBeCloseTo(200 * 0.95, 2);
  });

  it('should NOT apply moletom 5% discount to non-moletom products', async () => {
    const productId = 3;

    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
      if (key === '@RocketShoes:cart') return JSON.stringify(initialStoragedData);
      if (key === '@RocketShoes:hasDiscountMoletom') return 'true';
      return null;
    });

    apiMock.onGet(`stock/${productId}`).reply(200, { id: 3, amount: 5 });
    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 3,
      title: 'Tênis Adidas Duramo Lite 2.0',
      price: 219.9,
      category: 'tenis',
      image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg',
    });

    const { result } = renderHook(useCart, { wrapper: CartProvider });

    await act(async () => {
      result.current.addProduct(productId);
    });

    const added = result.current.cart.find(p => p.id === productId);
    expect(added?.price).toBe(219.9);
  });

  it('should apply 10% (not 5%) when both hasDiscount and hasDiscountMoletom are active for moletom', async () => {
    const productId = 3;

    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
      if (key === '@RocketShoes:cart') return JSON.stringify(initialStoragedData);
      if (key === '@RocketShoes:hasDiscount') return 'true';
      if (key === '@RocketShoes:hasDiscountMoletom') return 'true';
      return null;
    });

    apiMock.onGet(`stock/${productId}`).reply(200, { id: 3, amount: 5 });
    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 3,
      title: 'Moletom Básico',
      price: 200,
      category: 'moletom',
      image: 'https://example.com/moletom.jpg',
    });

    const { result } = renderHook(useCart, { wrapper: CartProvider });

    await act(async () => {
      result.current.addProduct(productId);
    });

    const added = result.current.cart.find(p => p.id === productId);
    expect(added?.price).toBeCloseTo(200 * 0.9, 2);
  });
});
