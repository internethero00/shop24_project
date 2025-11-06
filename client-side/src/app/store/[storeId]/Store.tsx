'use client'
import styles from './Store.module.css'
import { Heading } from '@/components/ui/Heading'
import { MainStatistics } from '@/app/store/[storeId]/statistics/main-statistics/MainStatistics'

export function Store() {
	return <div className={styles.wrapper}>
		<Heading title='Statistics'/>
		<MainStatistics/>
	</div>
}