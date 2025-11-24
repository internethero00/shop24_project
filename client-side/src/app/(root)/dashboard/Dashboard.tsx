'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { saveTokenStorage } from '@/services/auth/auth-token.service'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth/auth.service'
import { useProfile } from '@/hooks/useProfile'
import { IOrderColumn, orderColumns } from '@/app/(root)/dashboard/OrderColumns'
import { formatDate } from '@/utils/date/format-date'
import { EnumOrderStatus } from '@/shared/types/order.interface'
import { formatPrice } from '@/utils/string/format-price'
import styles from './Dashboard.module.css'
import { Button } from '@/components/ui/Button'
import { LogOut } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table/DataTable'

export function Dashboard() {

	const router = useRouter()

	const searchParams = useSearchParams()
	useEffect(() => {
		const accessToken = searchParams.get('accessToken')

		if (accessToken) {
			saveTokenStorage(accessToken)

		}

	}, [searchParams])

	const {user} = useProfile()

	const {mutate: logout} = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {router.push('/auth')}
	})

	if (!user) return null

	const formattedOrders: IOrderColumn[] = user.orders.map(order => ({
		createdAt: formatDate(order.createdAt),
		status: order.status === EnumOrderStatus.PENDING ? "Pending" : "Paid",
		total: formatPrice(order.total),
	}))

	return <div className={styles.wrapper}>
		<div className={styles.header}>
			<h1>Your orders</h1>
			<Button variant='ghost' onClick={() => logout()}>
				<LogOut/>
				Log out
			</Button>
		</div>
		<DataTable columns={orderColumns} data={formattedOrders}/>
	</div>
}