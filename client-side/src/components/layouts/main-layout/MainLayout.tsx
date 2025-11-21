import { PropsWithChildren } from 'react'
import styles from './MainLayout.module.css'
import { Header } from '@/components/layouts/main-layout/header/Header'
import { Footer } from '@/components/layouts/main-layout/footer/Footer'

export function MainLayout({children}: PropsWithChildren<unknown>) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.layout}>
		  <Header />
		  <main className={styles.main}>{children}</main>
		  <Footer/>
	  </div>
    </div>
  )
}