import { FC, useContext } from 'react';
import styles from "./cart.module.css";
import { Layout } from "../components/Layout";
import { CartContext } from '../context/cartContext';

const CartPage: FC = () => {
  const { cartItems, totalPrice } = useContext(CartContext);

  return (
    <Layout>
      <ul className={styles.list}>
        {cartItems.map((cartItem) => (
          <li key={cartItem.product.id} className={styles.listItem}>
            <div className={styles.listItemLeft}>
              <img className={styles.full} src={cartItem.product.imageUrl} alt={`${cartItem.product.name}の写真`} />
            </div>
            <div className={styles.listItemRight}>
              <p>{cartItem.product.name} {cartItem.product.price}円</p>
              <p>{cartItem.quantity}個</p>
            </div>
          </li>
        ))}
      </ul>
      <p className={styles.totalPrice}>合計：{totalPrice}円</p>
      <button className={styles.orderButton}>注文する</button>
    </Layout>
  );
};

export default CartPage;
