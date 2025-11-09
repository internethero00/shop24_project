'use client'
import { useUpdateStore } from '@/hooks/queries/stores/useUpdateStore'
import { useDeleteStore } from '@/hooks/queries/stores/useDeleteStore'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IStoreEdit } from '@/shared/types/store.interface'
import styles from '../Store.module.css'
import { Heading } from '@/components/ui/Heading'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import { Button } from '@/components/ui/Button'
import { Trash } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'
import { Textarea } from '@/components/ui/Textarea'

export function Settings() {
	const {store, updateStore, isLoadingUpdate} = useUpdateStore()
	const {deleteStore, isLoadingDelete} = useDeleteStore()

	const form = useForm<IStoreEdit>({
		mode: 'onChange',
		values: {
			title: store?.title || '',
			description: store?.description || ''
		}
	})

	const onSubmit: SubmitHandler<IStoreEdit> = data => {
		updateStore(data)
	}
	return <div className={styles.wrapper}>
		<div className={styles.header}>
			<Heading title='Settings' description='Settings of the store' />
			<ConfirmModal handleClick={() => deleteStore()}>
				<Button size='icon' variant='primary' disabled={isLoadingDelete}>
					<Trash className='size-4'/>
				</Button>
			</ConfirmModal>
		</div>
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className={styles.fields}>
					<FormField control={form.control} name='title' rules={{required: "The title is required"}}
							   render={({field}) => (
								   <FormItem>
									   <FormLabel>
										   Store Name
									   </FormLabel>
									   <FormControl>
										   <Input placeholder='Name' disabled={isLoadingUpdate} {...field}/>
									   </FormControl>
									   <FormMessage/>
								   </FormItem>
							   )}
					/>
				</div>
					<FormField control={form.control} name='description'
							   render={({field}) => (
								   <FormItem>
									   <FormLabel>
										   Description
									   </FormLabel>
									   <FormControl>
										   <Textarea
											   className='min-h-[100px] max-h-[300px]'
											   placeholder='description'
											   disabled={isLoadingUpdate} {...field}/>
									   </FormControl>
									   <FormMessage/>
								   </FormItem>
							   )}
					/>
					<Button variant='primary' disabled={isLoadingUpdate}>
						To Save
					</Button>
			</form>
		</Form>
	</div>
}