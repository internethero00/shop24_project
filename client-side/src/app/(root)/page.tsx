import type {Metadata} from 'next'
import Home from '@/app/(root)/Home'


export const metadata: Metadata = {
	title: 'All shops in one place',
}

export default function Page() {
	return <Home/>

}
