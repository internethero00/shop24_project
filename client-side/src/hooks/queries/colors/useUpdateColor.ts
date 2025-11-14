import { useParams } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IColorInput } from '@/shared/types/color.interface'
import { colorService } from '@/services/color.service'
import toast from 'react-hot-toast'
import { useMemo } from 'react'

export const useUpdateColor = () => {
	const params = useParams<{colorId: string}>();

	const queryClient = useQueryClient();

	const {mutate: updateColor, isPending: isLoadingUpdate} = useMutation({
		mutationKey: ['update color'],
		mutationFn: (data: IColorInput) => colorService.update(params.colorId, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get colors for store dashboard']
			})
			toast.success('Updated color successfully')
		},
		onError() {
			toast.error('Error updating color')
		}
	})

	return useMemo(() => ({
		updateColor, isLoadingUpdate
	}), [updateColor, isLoadingUpdate])
}