import type {Metadata} from 'next'
import Auth from '@/app/auth/Auth'



export const metadata: Metadata = {
	title: 'Authorization',
}

export default function AuthPage() {
	return <Auth/>

}