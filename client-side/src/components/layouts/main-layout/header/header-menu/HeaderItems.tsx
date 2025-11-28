'use client'
import { HeaderCart } from '@/components/layouts/main-layout/header/header-menu/header-cart/HeaderCart'
import Link from 'next/link'
import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from '@/config/url.config'
import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader'
import { CreateStoreModal } from '@/components/ui/modals/CreateStoreModal'
import Image from 'next/image'
import styles from '@/components/layouts/main-layout/header/header-menu/HeaderMenu.module.css'
import { LogOut } from 'lucide-react'
import { useProfile } from '@/hooks/useProfile'

export function HeaderItems() {
	const {user, isLoading} = useProfile()

	return (
    <>
		<HeaderCart/>
		<Link href={PUBLIC_URL.explorer()}>
			<Button variant='ghost'>Catalogs</Button>
		</Link>
		{isLoading ? (
			<Loader size='sm'/>
		) : user ? (
			<>
				<Link href={DASHBOARD_URL.favorites()}>
					<Button variant='ghost'>
						Favorites
					</Button>
				</Link>
				{user.stores.length ? (
					<Link href={STORE_URL.home(user.stores[0].id)}>
						<Button variant='ghost'>My Stores</Button>
					</Link>
				) : (
					<CreateStoreModal>
						<Button variant='ghost'>To create store</Button>
					</CreateStoreModal>
				)}
				<Link href={DASHBOARD_URL.home()}>
					<Image
						src={user.picture}
						alt={user.name}
						width={42}
						height={42}
						className={styles.avatar}/>
				</Link>
			</>
		) : (<Link href={PUBLIC_URL.auth()}>
				<Button variant='primary'>
					<LogOut className={styles.icon}/>
					Log in
				</Button>
			</Link>
		)}
    </>
  )
}