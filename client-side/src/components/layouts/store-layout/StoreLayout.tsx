import type { PropsWithChildren } from "react";
import styles from "./StoreLayout.module.css";
import { Sidebar } from '@/components/layouts/store-layout/sidebar/Sidebar'
import { Header } from '@/components/layouts/store-layout/header/Header'

export function StoreLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.layout}>
        <div className={styles.sidebar}>
            <Sidebar/>
        </div>
        <div className={styles.header}>
            <Header/>
        </div>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
