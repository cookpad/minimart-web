import { FC, useState, useEffect } from "react";
import styles from "./product.module.css";
import { Product, CartItem } from "../../lib/product";
import { Layout } from "../../components/Layout";
import { getProduct } from "../../lib/product";
import { useRouter } from "next/dist/client/router";

const CART_ITEM_STORAGE_KEY = "minimart-cart-item";
const addToCart = (product: Product) => {
  const strCurrentCartItems = localStorage.getItem(CART_ITEM_STORAGE_KEY);
  // 空の場合
  if (strCurrentCartItems === null) {
    const cartItem: CartItem = {
      product: product,
      quantity: 1,
    };
    const cartItems = [cartItem];
    localStorage.setItem(CART_ITEM_STORAGE_KEY, JSON.stringify(cartItems));

    // 空ではない場合
  } else {
    const currentCartItems = JSON.parse(strCurrentCartItems) as CartItem[];
    // 同じプロダクトが既にある場合
    for (let i = 0; i < currentCartItems.length; i++) {
      if (currentCartItems[i].product.id === product.id) {
        currentCartItems[i].quantity++;
        localStorage.setItem(CART_ITEM_STORAGE_KEY, JSON.stringify(currentCartItems));
        return;
      }
    }
    // 同じプロダクトが既にない場合
    const newCartItem: CartItem = {
      product: product,
      quantity: 1,
    };
    currentCartItems.push(newCartItem);
    localStorage.setItem(CART_ITEM_STORAGE_KEY, JSON.stringify(currentCartItems));
  }
};

const ProductPage: FC = () => {
  const router = useRouter();
  const productId = router.query.id;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (typeof productId === "string") {
      getProduct(productId).then((product) => setProduct(product));
    }
  }, [productId]);

  if (product === null) {
    return (
      <Layout>
        <h3>Loading ...</h3>
      </Layout>
    );
  } else {
    return (
      <Layout>
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
