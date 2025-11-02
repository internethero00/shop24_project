import Link from 'next/link'
import { PUBLIC_URL } from '@/config/url.config'
import styles from './Logo.module.css'
import { SITE_NAME } from '@/constants/seo.constants'
import Image from 'next/image'

export function Logo() {
	return <Link href={PUBLIC_URL.home()} className={styles.logo}>
		<Image src='/images/logo.svg' alt={SITE_NAME} width={30} height={30} />
		<div>{SITE_NAME}</div>
	</Link>;
}