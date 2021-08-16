import { Product } from './product';

const LOCAL_STORAGE_KEY = 'minimart:cart'

export type CartItem = {
  product: Product;
  quantity: number;
}

export function getCartItemsFromLocalStorage(): CartItem[] {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
}

export function setCartItemsToLocalStorage(cartItems: CartItem[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
}
