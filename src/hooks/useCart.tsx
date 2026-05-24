import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}
interface UpdateProductAmount {
  productId: number;
  amount: number;
}
interface CartContextData {
  cart: Product[];
  stockMap: Record<number, number>;
  addProduct: (productId: number, size?: string) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [stockMap, setStockMap] = useState<Record<number, number>>({});

  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const prevCartRef = useRef<Product[]>();

  useEffect(() => {
    prevCartRef.current = cart;
  });

  const cartPreviousValue = prevCartRef.current ?? cart;

  useEffect(() => {
    if (cartPreviousValue !== cart) {
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart))
    }
  }, [cart, cartPreviousValue]);

  useEffect(() => {
    if (cart.length === 0) return;
    Promise.all(cart.map(p => api.get(`/stock/${p.id}`))).then(responses => {
      const map: Record<number, number> = {};
      responses.forEach((r, i) => { map[cart[i].id] = r.data.amount; });
      setStockMap(map);
    }).catch(() => {});
  }, [cart]);

  const addProduct = async (productId: number, size?: string) => {
    try {
      const updatedCart = [...cart];
      const productExists = updatedCart.find(product => product.id === productId);

      const stock = await api.get(`/stock/${productId}`);

      const stockAmount = stock.data.amount;
      const correntAmount = productExists ? productExists.amount : 0;
      const amount = correntAmount + 1;

      if (amount > stockAmount) {
        toast.error(`Quantidade solicitada fora de estoque`);
        return;
      }

      if (productExists) {
        productExists.amount = amount;
      } else {
        const product = await api.get(`/products/${productId}`);
        const hasDiscount = localStorage.getItem('@RocketShoes:hasDiscount') === 'true';
        const hasDiscountMoletom = localStorage.getItem('@RocketShoes:hasDiscountMoletom') === 'true';
        const isMoletom = product.data.category === 'moletom';
        const discountFactor = hasDiscount ? 0.9
          : (hasDiscountMoletom && isMoletom ? 0.95 : 1);
        const newProduct = {
          ...product.data,
          price: product.data.price * discountFactor,
          amount: 1,
          ...(size && { size }),
        };
        updatedCart.push(newProduct);
      }

      setCart(updatedCart);

    } catch {
      toast.error('Erro na adição do produto')
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(product => product.id === productId);

      if(productIndex >= 0) {
        updatedCart.splice(productIndex, 1);
        setCart(updatedCart);
      }else{
        throw Error();
      }
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if(amount <= 0) {
        return;
      }
      const stock = await api.get(`/stock/${productId}`);
      const stockAmount = stock.data.amount;

      if(amount > stockAmount){
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      const updatedCart = [...cart];
      const productExists = updatedCart.find(product => product.id === productId);

      if (productExists){
        productExists.amount = amount;
        setCart(updatedCart);
      }else{
        throw Error();
      }
    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, stockMap, addProduct, removeProduct, updateProductAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
