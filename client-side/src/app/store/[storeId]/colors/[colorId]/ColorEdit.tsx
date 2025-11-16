'use client'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { ColorForm } from '@/app/store/[storeId]/colors/ColorForm'
import { colorService } from '@/services/color.service'

export function ColorEdit() {
	const params = useParams<{colorId: string}>()


	const {data} = useQuery({
		queryKey: ['get color'],
		queryFn: () => colorService.getById(params.colorId)
	})

	return (<ColorForm
		color={data}
	/>)
}