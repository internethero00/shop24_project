'use client'
import { useParams } from 'next/navigation'
import styles from '../Store.module.css'
import { DataTableLoading } from '@/components/ui/data-table/DataTableLoading'
import { Heading } from '@/components/ui/Heading'
import Link from 'next/link'
import { STORE_URL } from '@/config/url.config'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table/DataTable'
import { formatDate } from '@/utils/date/format-date'
import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'
import { ICategory } from '@/shared/types/category.interface'
import { categoryColumns } from '@/app/store/[storeId]/categories/CategoryColumns'

export function Categories(){
	const params = useParams<{storeId: string}>()

	const {categories, isLoading} = useGetCategories()

	const formattedCategories: ICategory[] = categories ?
		categories.map(category =>
			({
				id: category.id,
				title: category.title,
				createdAt: formatDate(category.createdAt),
				description: category.description,
				storeId: category.storeId
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
              title={`${categories?.length} Categories`}
              description="Categories of the store"
            />
            <div className={styles.buttons}>
              <Link href={STORE_URL.categoryCreate(params.storeId)}>
				  <Button variant='primary'>
					  <Plus/>
					  To Create
				  </Button>
			  </Link>
            </div>
          </div>
			<div className={styles.table}>
				<DataTable columns={categoryColumns} data={formattedCategories} filterKey='title'/>
			</div>
        </>
      )}
    </div>
  );
}