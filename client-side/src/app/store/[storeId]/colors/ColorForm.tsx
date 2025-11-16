import { IColor, IColorInput } from "@/shared/types/color.interface";
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from '../Store.module.css'
import { Heading } from '@/components/ui/Heading'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import { Button } from '@/components/ui/Button'
import { Trash } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'
import { useDeleteColor } from '@/hooks/queries/colors/useDeleteColor'
import { useCreateColor } from '@/hooks/queries/colors/useCreateColor'
import { useUpdateColor } from '@/hooks/queries/colors/useUpdateColor'

interface ColorFormProps {
	color?: IColor
}

export function ColorForm({color}: ColorFormProps){
	const {createColor, isLoadingCreate} = useCreateColor()
	const {updateColor, isLoadingUpdate} = useUpdateColor()
	const {deleteColor, isLoadingDelete} = useDeleteColor()

	const title = color ? 'To change color' : 'To create color'
	const description = color ? 'To change color data' : 'To add a new color'
	const action = color ? 'To save' : 'To create'

	const form = useForm<IColorInput>({
		mode: 'onChange',
		values: {
			name: color?.name ?? '',
			value: color?.value ?? '',
		}
	})

	const onSubmit:SubmitHandler<IColorInput> = data => {
		if (color) updateColor(data)
		else createColor(data)
	}

	return <div className={styles.wrapper}>
		<div className={styles.header}>
			<Heading title={title} description={description} />
			{color && (
				<ConfirmModal handleClick={() => deleteColor()}>
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
				<div className={styles.fields}>
					<FormField
						control={form.control}
						name="name"
						rules={{ required: "The name is required" }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Color name</FormLabel>
								<FormControl>
									<Input
										placeholder="Color name"
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
						name="value"
						rules={{ required: "The value is required" }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Value of color</FormLabel>
								<FormControl>
									<Input
										placeholder="Value of color"
										type="text"
										disabled={isLoadingCreate || isLoadingUpdate}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button variant='primary' disabled={isLoadingCreate || isLoadingUpdate }>{action}</Button>
			</form>
		</Form>
	</div>
}