import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { CategoryEdit } from '@/app/store/[storeId]/categories/[categoryId]/CategoryEdit'

export const metadata: Metadata = {
	title: 'Category settings',
	...NO_INDEX_PAGE
}

export default function CategoryEditPage() {
	return <CategoryEdit/>

}