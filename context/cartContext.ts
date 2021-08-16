import React from "react";
import { CartProps } from '../hooks/useCart';

const initialValue: CartProps = {
  cartItems: [],
  cartItemCount: 0,
  totalPrice: 0,
  addCartItem: () => {},
  resetCartItem: () => {},
}

export const CartContext = React.createContext<CartProps>(initialValue);
