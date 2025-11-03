'use client'
import { useParams } from 'next/navigation'
import { IMenuItem } from '@/components/layouts/store-layout/sidebar/navigation/menu.interface'
import { Album, BarChart, FolderKanban, PaintBucket, Settings } from 'lucide-react'
import { STORE_URL } from '@/config/url.config'
import styles from './Navigation.module.css'
import { MenuItem } from '@/components/layouts/store-layout/sidebar/navigation/MenuItem'

export function Navigation() {
	const params = useParams<{storeId: string}>();

	const routes : IMenuItem[] = [
		{
			icon: BarChart,
			link: STORE_URL.home(params.storeId),
			value: 'Statistics',
		},
		{
			icon: FolderKanban,
			link: STORE_URL.products(params.storeId),
			value: 'Products',
		},
		{
			icon: Album,
			link: STORE_URL.categories(params.storeId),
			value: 'Categories',
		},
		{
			icon: PaintBucket,
			link: STORE_URL.colors(params.storeId),
			value: 'Colors',
		},
		{
			icon: PaintBucket,
			link: STORE_URL.reviews(params.storeId),
			value: 'Reviews',
		},
		{
			icon: Settings,
			link: STORE_URL.settings(params.storeId),
			value: 'Settings',
		},

	]

	return <div className={styles.wrapper}>
		<div className={styles.navigation}>
			{routes.map(route => (
				<MenuItem key={route.value} route={route} />
			))}
		</div>
	</div>
}