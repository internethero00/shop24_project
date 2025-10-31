import styles from './Auth.module.css'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { SERVER_URL } from '@/config/api.config'
import { FcGoogle } from 'react-icons/fc'
import { FaYandex } from 'react-icons/fa'

export function Social() {
	const router = useRouter()

	return <div className={styles.social}>
		<Button variant='outline' onClick={() => router.push(`${SERVER_URL}/auth/google`)}>
			<FcGoogle/>
			Sign in with Google
		</Button>
		<Button variant='outline' onClick={() => router.push(`${SERVER_URL}/auth/yandex`)}>
			<FaYandex color='#FC#F1D'/>
			Sign in with Yandex
		</Button>
	</div>
}