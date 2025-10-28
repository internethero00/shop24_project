import type {Metadata} from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Store } from 'lucide-react'




export const metadata: Metadata = {
	title: 'Store management',
	...NO_INDEX_PAGE
}

export default function StorePage() {
	return <Store/>

}