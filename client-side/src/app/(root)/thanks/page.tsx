import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import styles from '../hero/Hero.module.css'
import Link from 'next/link'
import { PUBLIC_URL } from '@/config/url.config'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
	title: 'Thanks page',
	...NO_INDEX_PAGE
}

export default function ThanksPage() {
	return (
		<div className={styles.section}>
			<h1 className={styles.heading}>Thank you for your purchase</h1>
			<Link href={PUBLIC_URL.home()}>
				<Button variant='primary'>
					Back to Home
					<ArrowRight/>
				</Button>
			</Link>
		</div>
	)

}
