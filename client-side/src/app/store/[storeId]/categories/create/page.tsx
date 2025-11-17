import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { CreateCategory } from '@/app/store/[storeId]/categories/create/CreateCategory'

export const metadata: Metadata = {
	title: 'Create category',
	...NO_INDEX_PAGE
}

export default function CreateCategoryPage() {
	return <CreateCategory/>

}