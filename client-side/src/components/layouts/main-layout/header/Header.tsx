import styles from './Header.module.css'
import { Logo } from '@/components/layouts/main-layout/header/logo/Logo'
import { HeaderMenu } from '@/components/layouts/main-layout/header/header-menu/HeaderMenu'

export function Header() {
  return (
    <div className={styles.header}>
      	<Logo/>
		<div className={styles.search}>Search</div>
		<HeaderMenu/>
    </div>
  )
}