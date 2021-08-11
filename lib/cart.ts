import { useCallback, useEffect, useMemo, useState } from "react";
import { Product } from "./product";

const STORAGE_KEY = "minimart:cart";

type CartItem = {
  product: Product;
  quantity: number;
};

export function addToCart(product: Product): void {
  const cartItems: CartItem[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  const item = cartItems.find((item) => item.product.id === product.id);

  if (item) {
    item.quantity++;
  } else {
    cartItems.push({ product, quantity: 1 });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
}

export function clearCart(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function useCartItemCount(): { cartItemCount: number; updateCartItemCount: () => void } {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    setCartItemCount(getCartItemCount());
  }, []);

  const updateCartItemCount = useCallback(() => {
    setCartItemCount(getCartItemCount());
  }, []);

  return { cartItemCount, updateCartItemCount };
}

export function useCartItems(): { cartItems: CartItem[]; amount: number } {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const amount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  return { cartItems, amount };
}

function getCartItemCount(): number {
  const cartItems: CartItem[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  return cartItems.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartItems(): CartItem[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}
