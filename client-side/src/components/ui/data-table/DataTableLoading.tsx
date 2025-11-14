import styles from './DataTable.module.css'
import { Skeleton } from '@/components/ui/Skeleton'
import { Card, CardContent } from '@/components/ui/Card'
import { Loader } from '@/components/ui/Loader'

export function DataTableLoading(){
	return (
		<div className={styles.loading}>
			<Skeleton className={styles.heading}/>
			<Skeleton className={styles.search}/>
			<Card className={styles.table}>
				<CardContent>
					<div className={styles.loader_wrapper}>
						<Loader />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}