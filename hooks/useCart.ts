import { CartItem, getCartItemsFromLocalStorage, setCartItemsToLocalStorage } from "../lib/cart";
import { Product } from "../lib/product";
import { useState, useEffect, useMemo } from 'react';

export type CartProps = {
  cartItems: CartItem[];
  cartItemCount: number;
  totalPrice: number;
  addCartItem: (product: Product) => void;
  resetCartItem: () => void;
};

export default function useCart(): CartProps {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCartItemsFromLocalStorage());
  }, []);

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, cartItem) => sum + cartItem.quantity * cartItem.product.price, 0);
  }, [cartItems]);

  const addCartItem = (product: Product): void => {
    const prev = cartItems;
    // 商品が既にカートに入っているか確認するため
    const cartItem = prev.find((cartItem) => {
      return cartItem.product.id === product.id;
    });

    if (cartItem) {
      cartItem.quantity++;
    } else {
      prev.push({ product, quantity: 1 });
    }
    console.log(prev);

    setCartItems(prev);
    setCartItemsToLocalStorage(cartItems);
  };

  const resetCartItem = (): void => {
    setCartItems([]);
    setCartItemsToLocalStorage([]);
  };

  return {
    cartItems,
    cartItemCount,
    totalPrice,
    addCartItem,
    resetCartItem,
  };
}
