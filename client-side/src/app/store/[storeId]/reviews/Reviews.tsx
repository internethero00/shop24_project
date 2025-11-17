'use client'
import styles from '@/app/store/[storeId]/Store.module.css'
import { DataTableLoading } from '@/components/ui/data-table/DataTableLoading'
import { Heading } from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import { useGetReviews } from '@/hooks/queries/reviews/useGetReviews'
import { formatDate } from '@/utils/date/format-date'
import { IReviewColumn, reviewColumns } from '@/app/store/[storeId]/reviews/ReviewColumns'

export function Reviews(){

	const {reviews, isLoading} = useGetReviews()

	const formattedReviews: IReviewColumn[] = reviews ?
		reviews.map(review =>
			({
				id: review.id,
				createdAt: formatDate(review.createdAt),
				rating: Array.from({length: review.rating}).map(() => '⭐').join(' '),
				username: review.user.name
			}))
		: []
	return (
		<div className={styles.wrapper}>
			{isLoading ? (
				<DataTableLoading />
			) : (
				<>
					<div className={styles.header}>
						<Heading
							title={`${reviews?.length} Reviews`}
							description="Reviews of the store"
						/>
					</div>
					<div className={styles.table}>
						<DataTable columns={reviewColumns} data={formattedReviews}/>
					</div>
				</>
			)}
		</div>
	);
}