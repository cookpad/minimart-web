import { FC } from "react";
import styles from "./cart.module.css";
import { Layout } from "../../components/Layout";
import { clearCart, useCartItems } from "../../lib/cartitem";

const TopPage: FC = () => {
  const { cartItems } = useCartItems();
  const cartItemCnt = cartItems.reduce((sum, e) => sum + e.quantity, 0);
  const priceSum = cartItems.reduce((sum, e) => sum + e.product.price * e.quantity, 0);

  const order = () => {
    window.alert("注文しました");
    clearCart();
    window.location.href = "/";
  };

  return (
    <Layout cartItemCnt={cartItemCnt}>
      <table>
        {cartItems.map((cartItem) => (
          <tr key={cartItem.product.id} className={styles.listItem}>
            <td className={styles.imageWrapper}>
              <img className={styles.image} src={cartItem.product.imageUrl} alt={`${cartItem.product.name}の写真`} />
            </td>
            <td className={styles.description}>
              <div className={styles.productName}>
                {cartItem.product.name} {cartItem.product.price}円
              </div>
              <div>{cartItem.quantity}個</div>
            </td>
          </tr>
        ))}
      </table>
      <div className={styles.priceSum}>合計: {priceSum}円</div>
      <div className={styles.buttonWrapper}>
        <button className={styles.orderButton} onClick={order}>
          注文する
        </button>
      </div>
    </Layout>
  );
};

export default TopPage;
