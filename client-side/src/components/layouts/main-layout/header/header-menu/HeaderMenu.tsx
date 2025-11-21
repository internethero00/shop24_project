'use client'
import { useProfile } from '@/hooks/useProfile'
import styles from './HeaderMenu.module.css'
import { HeaderCart } from '@/components/layouts/main-layout/header/header-menu/header-cart/HeaderCart'
import Link from 'next/link'
import { PUBLIC_URL } from '@/config/url.config'
import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader'
import { LogOut } from 'lucide-react'

export function HeaderMenu() {
	const {user, isLoading} = useProfile()
  return (
    <div className={styles.header_menu}>
		<HeaderCart/>
		<Link href={PUBLIC_URL.explorer()}>
			<Button variant='ghost'>Catalogs</Button>
		</Link>
		{isLoading ? (
			<Loader size='sm'/>
		) : user ? (
			<>
			</>
		) : (<Link href={PUBLIC_URL.auth()}>
				<Button variant='primary'>
					<LogOut className={styles.icon}/>
					Log in
				</Button>
			</Link>
		)}
    </div>
  )
}