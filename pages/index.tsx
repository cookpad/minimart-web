import { FC, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import { listProducts, Product } from "../lib/product";
import { Layout } from "../components/Layout";

const TopPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    listProducts().then((products) => setProducts(products));
  }, []);

  return (
    <Layout>
      <ul className={styles.list}>
        {products.map((product) => (
          <li key={product.id} className={styles.listItem}>
            {/* このリンク先はないので新規ページを作る */}
            <Link href={`/products/${product.id}`}>
              <a className={styles.link}>
                <div className={styles.imageWrapper}>
                  <img className={styles.image} src={product.imageUrl} alt={`${product.name}の写真`} />
                  <div className={styles.price}>{product.price}円</div>
                </div>
                <div className={styles.productName}>{product.name}</div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default TopPage;
