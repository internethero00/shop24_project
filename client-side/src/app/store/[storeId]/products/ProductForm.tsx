import { IProduct, IProductInput } from '@/shared/types/product.interface'
import { ICategory } from '@/shared/types/category.interface'
import { IColor } from '@/shared/types/color.interface'
import { useCreateProduct } from '@/hooks/queries/products/useCreateProduct'
import { useUpdateProduct } from '@/hooks/queries/products/useUpdateProduct'
import { useDeleteProduct } from '@/hooks/queries/products/useDeleteProduct'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from '../Store.module.css'
import { Heading } from '@/components/ui/Heading'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import { Button } from '@/components/ui/Button'
import { Trash } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { ImageUpload } from '@/components/ui/form-elements/image-upload/ImageUpload'

interface ProductFormProps {
	product?: IProduct | null;
	categories: ICategory[]
	colors: IColor[]
}

export function ProductForm({product, colors, categories}: ProductFormProps){
	const {createProduct, isLoadingCreate} = useCreateProduct()
	const {updateProduct, isLoadingUpdate} = useUpdateProduct()
	const {deleteProduct, isLoadingDelete} = useDeleteProduct()

	const title = product ? 'To change product' : 'To create product'
	const description = product ? 'To change product data' : 'To add a new product'
	const action = product ? 'To save' : 'To create'

	const form = useForm<IProductInput>({
		mode: 'onChange',
		values: {
			title: product?.title ?? '',
			description: product?.description ?? '',
			images: product?.images ?? [],
			price: product?.price ?? 0,
			categoryId: product?.category?.id ?? '',
			colorId: product?.color?.id ?? '',
		}
	})

	const onSubmit:SubmitHandler<IProductInput> = data => {
		data.price = Number(data.price)
		if (product) updateProduct(data)
		else createProduct(data)
	}

	return <div className={styles.wrapper}>
		<div className={styles.header}>
			<Heading title={title} description={description} />
			{product && (
				<ConfirmModal handleClick={() => deleteProduct()}>
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
					name="images"
					rules={{ required: "The image is required" }}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Images</FormLabel>
							<FormControl>
								<ImageUpload isDisabled={isLoadingCreate||isLoadingUpdate}
											 onChange={field.onChange}
											 value={field.value}/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className={styles.fields}>
					<FormField
						control={form.control}
						name="title"
						rules={{ required: "The title is required" }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Product name</FormLabel>
								<FormControl>
									<Input
										placeholder="Product name"
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
						name="price"
						rules={{ required: "The price is required" }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price of product</FormLabel>
								<FormControl>
									<Input
										placeholder="Price of product"
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
						name="categoryId"
						rules={{ required: "The category is required" }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Categories</FormLabel>
								<Select
									disabled={isLoadingUpdate || isLoadingCreate}
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Product category'/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											{categories.map(category => (
												<SelectItem value={category.id} key={category.id}>
													{category.title}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className={styles.fields}>
					<FormField
						control={form.control}
						name="colorId"
						rules={{ required: "The color is required" }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Colors</FormLabel>
								<Select
									disabled={isLoadingUpdate || isLoadingCreate}
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Product color'/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											{colors.map(color => (
												<SelectItem value={color.id} key={color.id}>
													{color.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField control={form.control} name='description'
						   rules={{ required: "The description is required" }}
						   render={({field}) => (
							   <FormItem>
								   <FormLabel>
									   Description
								   </FormLabel>
								   <FormControl>
									   <Textarea
										   className='min-h-[100px] max-h-[300px]'
										   placeholder='description'
										   disabled={isLoadingUpdate || isLoadingCreate} {...field}/>
								   </FormControl>
								   <FormMessage/>
							   </FormItem>
						   )}
				/>
				<Button variant='primary' disabled={isLoadingCreate || isLoadingUpdate }>{action}</Button>
			</form>
		</Form>
	</div>
}