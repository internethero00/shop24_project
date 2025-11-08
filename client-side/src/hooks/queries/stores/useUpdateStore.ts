import { useParams } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { storeService } from '@/services/store.service'
import { IStoreEdit } from '@/shared/types/store.interface'
import toast from 'react-hot-toast'
import { useMemo } from 'react'

export function useUpdateStore() {

	const params = useParams<{storeId: string}>();
	const queryClient = useQueryClient();

	const {data: store} = useQuery({
		queryKey: ['store', params.storeId],
		queryFn: () => storeService.getById(params.storeId)
	})

	const {mutate: updateStore, isPending: isLoadingUpdate} = useMutation({
		mutationKey: ['update store'],
		mutationFn: (data: IStoreEdit) => storeService.update(params.storeId, data),
		onSuccess(store) {
			queryClient.invalidateQueries({
				queryKey: ['profile'],
			})
			toast.success('Store successfully updated')
		},
		onError() {
			toast.error('Store update error')
		}
	})

	return useMemo(() => ({store, updateStore, isLoadingUpdate}), [store, updateStore, isLoadingUpdate])

}