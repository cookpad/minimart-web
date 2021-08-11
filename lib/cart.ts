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
