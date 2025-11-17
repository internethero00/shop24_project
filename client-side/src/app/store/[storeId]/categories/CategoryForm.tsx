import { SubmitHandler, useForm } from 'react-hook-form'
import styles from '../Store.module.css'
import { Heading } from '@/components/ui/Heading'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import { Button } from '@/components/ui/Button'
import { Trash } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'
import { ICategory, ICategoryInput } from '@/shared/types/category.interface'
import { useCreateCategory } from '@/hooks/queries/categories/useCreateCategory'
import { useUpdateCategory } from '@/hooks/queries/categories/useUpdateCategory'
import { useDeleteCategory } from '@/hooks/queries/categories/useDeleteCategory'
import { Textarea } from '@/components/ui/Textarea'

interface CategoryFormProps {
	category?: ICategory
}

export function CategoryForm({category}: CategoryFormProps){
	const {createCategory, isLoadingCreate} = useCreateCategory()
	const {updateCategory, isLoadingUpdate} = useUpdateCategory()
	const {deleteCategory, isLoadingDelete} = useDeleteCategory()

	const title = category ? 'To change category' : 'To create category'
	const description = category ? 'To change category data' : 'To add a new category'
	const action = category ? 'To save' : 'To create'

	const form = useForm<ICategoryInput>({
		mode: 'onChange',
		values: {
			title: category?.title ?? '',
			description: category?.description ?? '',
		}
	})

	const onSubmit:SubmitHandler<ICategoryInput> = data => {
		if (category) updateCategory(data)
		else createCategory(data)
	}

	return <div className={styles.wrapper}>
		<div className={styles.header}>
			<Heading title={title} description={description} />
			{category && (
				<ConfirmModal handleClick={() => deleteCategory()}>
					<Button
						size='icon'
						variant='primary'
						disabled={isLoadingDelete}
					>
						<Trash className='size-4'/>
					</Button>
				</ConfirmModal>
			)}
		</div>
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='mt-4'>
					<FormField
						control={form.control}
						name="title"
						rules={{ required: "The name is required" }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category name</FormLabel>
								<FormControl>
									<Input
										placeholder="Category name"
										type="text"
										disabled={isLoadingCreate || isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description of category</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Description of category"
										disabled={isLoadingCreate || isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

				<Button variant='primary' disabled={isLoadingCreate || isLoadingUpdate }>{action}</Button>
			</form>
		</Form>
	</div>
}