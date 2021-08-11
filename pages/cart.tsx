import { FC, useEffect, useState } from "react";
import { CartItem, clearCart, getCartItemCount, getCartItems } from "../lib/cart";
import styles from "./cart.module.css";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";

const CartPage: FC = () => {
  const router = useRouter();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const amount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  useEffect(() => {
    setCartItemCount(getCartItemCount());
  }, []);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleSubmitOrder = () => {
    alert("注文しました");
    router.push("/");
    clearCart();
  };

  return (
    <Layout cartItemCount={cartItemCount}>
      <ul className={styles.list}>
        {cartItems.map((item) => (
          <li className={styles.listItem} key={item.product.id}>
            <img src={item.product.imageUrl} className={styles.image} alt="" />
            <div className={styles.itemContent}>
              <div>
                {item.product.name} {item.product.price}円
              </div>
              <div className={styles.quantity}>{item.quantity}個</div>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.amount}>合計: {amount}円</div>
      <div className={styles.orderButtonWrapper}>
        <button className={styles.orderButton} onClick={handleSubmitOrder}>
          注文する
        </button>
      </div>
    </Layout>
  );
};

export default CartPage;
