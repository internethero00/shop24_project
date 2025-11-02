import styles from './Sidebar.module.css'
import { Logo } from '@/components/layouts/main-layout/header/logo/Logo'
import {Navigation} from '@/components/layouts/store-layout/sidebar/navigation/Navigation'

export function Sidebar() {
	return <div className={styles.sidebar}>
		<Logo/>
		<Navigation/>
	</div>;
}