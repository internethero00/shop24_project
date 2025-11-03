'use client'
import { IMenuItem } from '@/components/layouts/store-layout/sidebar/navigation/menu.interface'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import styles from './Navigation.module.css'

interface MenuItemProps {
	route: IMenuItem;
}

export function MenuItem({route}: MenuItemProps){
	const pathname = usePathname()
	return <Link href={route.link} className={cn(styles.route,
		{[styles.active]: (pathname === route.link)})}>
		<route.icon/>
		{route.value}
	</Link>
}