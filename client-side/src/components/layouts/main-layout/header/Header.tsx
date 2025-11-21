import styles from './Header.module.css'
import { Logo } from '@/components/layouts/main-layout/header/logo/Logo'
import { HeaderMenu } from '@/components/layouts/main-layout/header/header-menu/HeaderMenu'
import { SearchInput } from '@/components/layouts/main-layout/header/search-input/SearchInput'

export function Header() {
  return (
    <div className={styles.header}>
      	<Logo/>
		<div className={styles.search}>
			<SearchInput/>
		</div>
		<HeaderMenu/>
    </div>
  )
}