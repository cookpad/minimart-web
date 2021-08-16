import { FC } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./Layout.module.css";

type Props = {
  cartItemCount: number;
};

export const Layout: FC<Props> = ({ cartItemCount, children }) => {
  return (
    <div>
      <Head>
        <title>Mini Mart</title>
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Link href="/">Mini Mart</Link>
        </h1>
        <div className={styles.menu}>
          <Link href="/category">🥕</Link>
          <span> | </span>
          <Link href="/search">🔎</Link>
          <span> | </span>
          <Link href="/user">⚙️</Link>
          <span> | </span>
          <Link href="/cart">
            <a>
              <span>🛒</span>
              <span className={styles.cartCount}>({cartItemCount})</span>
            </a>
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};
