import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IProductInput } from '@/shared/types/product.interface'
import { productService } from '@/services/product.service'
import toast from 'react-hot-toast'
import { STORE_URL } from '@/config/url.config'
import { useMemo } from 'react'

export const useCreateProduct = () => {
	const params = useParams<{storeId: string}>();
	const {push} = useRouter()

	const queryClient = useQueryClient()

	const {mutate: createProduct, isPending: isLoadingCreate} = useMutation({
		mutationKey: ['create product'],
		mutationFn: (data: IProductInput) =>
			productService.create(data, params.storeId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get products for store dashboard'],
			})
			toast.success('Product created successfully.')
			push(STORE_URL.products(params.storeId))
		},
		onError() {
			toast.error('Error creating product')
		}

	})

	return useMemo(() => ({createProduct, isLoadingCreate}), [createProduct, isLoadingCreate])
}