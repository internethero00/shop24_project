'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './SearchInput.module.css'
import { Input } from '@/components/ui/form-elements/Input'
import { Button } from '@/components/ui/Button'
import { PUBLIC_URL } from '@/config/url.config'
import { Search } from 'lucide-react'

export function SearchInput() {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const router = useRouter()
  return (
    <div className={styles.form}>
      <Input placeholder='Serch' value={searchTerm}
			 onChange={(e) => setSearchTerm(e.target.value)} />
		<Button variant='primary'
				onClick={() => router.push(PUBLIC_URL.explorer(`?searchTerm=${searchTerm}`))}>
			<Search/>
		</Button>
    </div>
  )
}