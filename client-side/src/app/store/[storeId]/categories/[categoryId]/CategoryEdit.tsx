'use client'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { categoryService } from '@/services/category.service'
import { CategoryForm } from '@/app/store/[storeId]/categories/CategoryForm'

export function CategoryEdit() {
	const params = useParams<{categoryId: string}>()


	const {data} = useQuery({
		queryKey: ['get category'],
		queryFn: () => categoryService.getById(params.categoryId)
	})

	return (<CategoryForm
		category={data}
	/>)
}