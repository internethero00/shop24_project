import { useParams, useRouter } from 'next/navigation'
import { useMutation} from '@tanstack/react-query'
import { storeService } from '@/services/store.service'
import toast from 'react-hot-toast'
import { useMemo } from 'react'
import { PUBLIC_URL } from '@/config/url.config'

export function useDeleteStore() {
	const params = useParams<{storeId: string}>();
	const router = useRouter()

	const {mutate: deleteStore, isPending: isLoadingDelete} = useMutation({
		mutationKey: ['delete store'],
		mutationFn: () => storeService.delete(params.storeId),
		onSuccess() {
			toast.success('Store successfully deleted')
			router.push(PUBLIC_URL.home())
		},
		onError() {
			toast.error('Store delete error')
		}
	})

	return useMemo(() => ({deleteStore, isLoadingDelete}), [deleteStore ,isLoadingDelete])
}