import { FC, useState, useEffect } from "react";
import styles from "./product.module.css";
import { Product } from "../../lib/product";
import { Layout } from "../../components/Layout";
import { getProduct } from "../../lib/product";
import { useRouter } from "next/dist/client/router";
import { useCartItems } from "../../lib/cartitem";

const ProductPage: FC = () => {
  const router = useRouter();
  const productId = router.query.id;
  const [product, setProduct] = useState<Product | null>(null);
  const { cartItems, addToCart } = useCartItems();

  const cartItemCnt = cartItems.reduce((sum, e) => sum + e.quantity, 0);

  useEffect(() => {
    if (typeof productId === "string") {
      getProduct(productId).then((product) => setProduct(product));
    }
  }, [productId]);

  if (product === null) {
    return (
      <Layout cartItemCnt={cartItemCnt}>
        <h3>Loading ...</h3>
      </Layout>
    );
  } else {
    return (
      <Layout cartItemCnt={cartItemCnt}>
        <img className={styles.image} src={product.imageUrl} alt={`${product.name}の写真`} />
        <h3 className={styles.productName}>{product.name}</h3>
        <div className={styles.price}>{product.price}</div>
        <div>
          <p>{product.description}</p>
        </div>
        <div className={styles.buttonWrapper}>
          <button className={styles.addToCartButton} onClick={() => addToCart(product)}>
            カートに追加する
          </button>
        </div>
      </Layout>
    );
  }
};

export default ProductPage;
