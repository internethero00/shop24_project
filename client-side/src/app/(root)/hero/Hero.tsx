import styles from './Hero.module.css'
import { SITE_DESCRIPTION } from '@/constants/seo.constants'
import Link from 'next/link'
import { PUBLIC_URL } from '@/config/url.config'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <div className={styles.section}>
      <h1 className={styles.heading}>
		  Be a seller and be a buyer in <span>one place.</span>
	  </h1>
		<p className={styles.description}>{SITE_DESCRIPTION}</p>
		<Link href={PUBLIC_URL.explorer()}>
			<Button variant='primary'>Let see Products
			<ArrowRight/>
			</Button>
		</Link>
    </div>
  )
}