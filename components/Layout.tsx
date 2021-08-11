import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./Layout.module.css";

type Props = {};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Mini Mart</title>
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Link href="/">Mini Mart</Link>
        </h1>
        <div className={styles.cart}>
          {/* このリンク先はないので新規ページを作る */}
          <Link href="/cart">
            <a>
              <span>🛒</span>
              <span className={styles.cartCount}>({/* ここにカートに入っているアイテム数を入れる */})</span>
            </a>
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};
