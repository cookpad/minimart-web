import exp from "constants";
import { useEffect, useState } from "react";
import { Product } from "./product";

export type CartItem = {
  product: Product; // 商品
  quantity: number; // 個数
};

const CART_ITEM_STORAGE_KEY = "minimart-cart-item";
export const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const getCartItems = (): CartItem[] => {
    const strCurrentCartItems = localStorage.getItem(CART_ITEM_STORAGE_KEY);
    if (strCurrentCartItems === null) {
      return [];
    } else {
      return JSON.parse(strCurrentCartItems);
    }
  };

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_ITEM_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    const newCartItems = cartItems.concat();
    // 同じプロダクトが既にある場合
    for (let i = 0; i < newCartItems.length; i++) {
      if (newCartItems[i].product.id === product.id) {
        newCartItems[i].quantity++;
        setCartItems(newCartItems);
        return;
      }
    }
    // 同じプロダクトが既にない場合
    const newCartItem: CartItem = {
      product: product,
      quantity: 1,
    };
    newCartItems.push(newCartItem);
    setCartItems(newCartItems);
  };

  const increment = (id: string) => {
    const newCartItems = cartItems.concat();
    for (let i = 0; i < newCartItems.length; i++) {
      if (newCartItems[i].product.id === id) {
        newCartItems[i].quantity++;
        setCartItems(newCartItems);
        return;
      }
    }
  };
  const decrement = (id: string) => {
    const newCartItems = cartItems.concat();
    for (let i = 0; i < newCartItems.length; i++) {
      if (newCartItems[i].product.id === id) {
        if (newCartItems[i].quantity > 0) {
          newCartItems[i].quantity--;
        }
        setCartItems(newCartItems);
        return;
      }
    }
  };

  return { cartItems, addToCart, increment, decrement };
};

export const clearCart = () => {
  localStorage.setItem(CART_ITEM_STORAGE_KEY, JSON.stringify([]));
};
