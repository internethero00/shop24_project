import type {Metadata} from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Hero } from '@/app/(root)/hero/Hero'


export const metadata: Metadata = {
	title: 'Hero page',
	...NO_INDEX_PAGE
}

export default function HeroPage() {
	return <Hero/>

}
