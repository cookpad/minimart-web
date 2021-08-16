import { FC, useEffect, useState, useContext } from 'react';
import { useRouter } from "next/dist/client/router";
import styles from "./[id].module.css";
import { getProduct, Product } from "../../lib/product";
import { Layout } from "../../components/Layout";
import { CartContext } from '../../context/cartContext';

const ProductPage: FC = () => {
  const [product, setProduct] = useState<Product>();
  const { addCartItem } = useContext(CartContext);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id === undefined) return;
    getProduct(id.toString()).then((product) => setProduct(product));
  }, [id]);

  const onClickAddCart = () => {
    if (!product) return;
    addCartItem(product);
  }

  return (
    <Layout>
        <img className={styles.full} src={product?.imageUrl} alt={`${product?.name}の写真`} />
        <div className={styles.container}>
          <h2>{product?.name}</h2>
          <p>{product?.price}</p>
          <p>{product?.description}</p>
          <button className={styles.addCartButton} onClick={onClickAddCart}>カートに追加する</button>
        </div>
    </Layout>
  );
};

export default ProductPage;
