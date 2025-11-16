import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { CreateColor } from '@/app/store/[storeId]/colors/create/CreateColor'

export const metadata: Metadata = {
	title: 'Create color',
	...NO_INDEX_PAGE
}

export default function CreateColorPage() {
	return <CreateColor/>

}