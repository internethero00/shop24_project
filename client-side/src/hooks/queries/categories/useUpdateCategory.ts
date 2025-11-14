import { useParams } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useMemo } from 'react'
import { ICategoryInput } from '@/shared/types/category.interface'
import { categoryService } from '@/services/category.service'

export const useUpdateCategory = () => {
	const params = useParams<{categoryId: string}>();

	const queryClient = useQueryClient();

	const {mutate: updateCategory, isPending: isLoadingUpdate} = useMutation({
		mutationKey: ['update category'],
		mutationFn: (data: ICategoryInput) => categoryService.update(params.categoryId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get categories for store dashboard']
			})
			toast.success('Updated category successfully')
		},
		onError() {
			toast.error('Error updating category')
		}
	})

	return useMemo(() => ({
		updateCategory, isLoadingUpdate
	}), [updateCategory, isLoadingUpdate])
}