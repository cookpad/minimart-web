import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProduct, Product } from "../../lib/product";
import { Layout } from "../../components/Layout";
import styles from "./[id].module.css";

const ProductPage: FC = () => {
  const router = useRouter();
  const id = router.query.id ? String(router.query.id) : null;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id === null) return;
    getProduct(id).then((product) => setProduct(product));
  }, [id]);

  if (product === null) return null;

  return (
    <Layout>
      <img src={product.imageUrl} alt={`${product.name}の写真`} className={styles.image} />
      <div className={styles.product}>
        <h2>{product.name}</h2>
        <p>{product.price}円</p>
        <p>{product.description}</p>
        <button className={styles.addCartBtn}>カートに追加する</button>
      </div>
    </Layout>
  );
};

export default ProductPage;
