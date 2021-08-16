import type { AppProps } from "next/app";
import "./_app.css";
import { CartContext } from '../context/cartContext';
import useCart from '../hooks/useCart';

export default function App({ Component, pageProps }: AppProps) {
  const cart = useCart();

  return (
    <CartContext.Provider value={cart}>
      <Component {...pageProps} />
    </CartContext.Provider>
  )
}
