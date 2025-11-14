import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { STORE_URL } from '@/config/url.config'
import { useMemo } from 'react'
import { categoryService } from '@/services/category.service'

export const useDeleteCategory = () => {
	const params = useParams<{storeId: string; categoryId: string}>();
	const {push} = useRouter();

	const queryClient = useQueryClient();

	const {mutate: deleteCategory, isPending: isLoadingDelete} = useMutation({
		mutationKey: ['delete category'],
		mutationFn: () => categoryService.delete(params.categoryId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get categories for store dashboard']
			})
			toast.success('Category successfully deleted')
			push(STORE_URL.categories(params.storeId))
		},
		onError() {
			toast.error('Error deleting category')
		}
	})

	return useMemo(() => ({
		deleteCategory, isLoadingDelete
	}), [deleteCategory, isLoadingDelete])
}