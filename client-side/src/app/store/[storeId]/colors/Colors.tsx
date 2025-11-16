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
import { useGetColors } from '@/hooks/queries/colors/useGetColors'
import { IColor } from "@/shared/types/color.interface";
import { colorColumns } from '@/app/store/[storeId]/colors/ColorColumns'
import { formatDate } from '@/utils/date/format-date'

export function Colors(){
	const params = useParams<{storeId: string}>()

	const {colors, isLoading} = useGetColors()

	const formattedColors: IColor[] = colors ?
		colors.map(color =>
			({
				id: color.id,
				name: color.name,
				createdAt: formatDate(color.createdAt),
				value: color.value,
				storeId: color.storeId
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
              title={`${colors?.length} Colors`}
              description="Colors of the store"
            />
            <div className={styles.buttons}>
              <Link href={STORE_URL.colorCreate(params.storeId)}>
				  <Button variant='primary'>
					  <Plus/>
					  To Create
				  </Button>
			  </Link>
            </div>
          </div>
			<div className={styles.table}>
				<DataTable columns={colorColumns} data={formattedColors} filterKey='name'/>
			</div>
        </>
      )}
    </div>
  );
}