import { useGetStatistics } from '@/hooks/queries/statistics/useGetStatistics'
import styles from './MainStatistics.module.css'
import { MainStatisticsItem } from '@/app/store/[storeId]/statistics/main-statistics/MainStatisticsItem'

export function MainStatistics() {
	const {main} = useGetStatistics()
	return <div className={styles.main}>
		{main?.length ?
			main.map(item => (
				<MainStatisticsItem key={item.id} item={item} />
			)) :
			(<div>No data for statistics</div>)
		}
	</div>
}