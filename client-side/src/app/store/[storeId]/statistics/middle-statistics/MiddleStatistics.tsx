import { useGetStatistics } from '@/hooks/queries/statistics/useGetStatistics'
import styles from './MiddleStatistics.module.css'
import { Overview } from '@/app/store/[storeId]/statistics/middle-statistics/Overview'
import { LastUsers } from '@/app/store/[storeId]/statistics/middle-statistics/LastUsers'

export function MiddleStatistics() {
	const {middle} = useGetStatistics()
	return <div className={styles.middle}>
		{middle?.monthlySales.length || middle?.lastUsers.length ? (
			<>
			<div className={styles.overview}>
				<Overview data={middle.monthlySales} />
			</div>
			<div className={styles.last_users}>
				<LastUsers data={middle.lastUsers}/>
			</div>
			</>
		):
			(<div>No data for statistics</div>)}
	</div>
}