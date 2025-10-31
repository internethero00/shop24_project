import { UseFormReturn } from 'react-hook-form'
import { IAuthForm } from '@/shared/types/auth.interface'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'
import { validEmail } from '@/shared/regex'

interface AuthFieldsProps {
	form:  UseFormReturn<IAuthForm, any, IAuthForm>
	isPending: boolean
	isReg?: boolean
}

export function AuthFields({form, isPending, isReg=false}: AuthFieldsProps) {
	return <>
		{isReg && (<FormField control={form.control} name='name' rules={{required: "The name is required"}}
							  render={({field}) => (
								  <FormItem>
									  <FormControl>
										  <Input placeholder='Name' disabled={isPending} {...field}/>
									  </FormControl>
									  <FormMessage/>
								  </FormItem>

							  )}
		/>
		)}
		<FormField control={form.control} name='email' rules={{required: "The email is required", pattern: {value: validEmail, message: "Invalid email address"}}}
				   render={({field}) => (
					   <FormItem>
						   <FormControl>
							   <Input placeholder='Email' type='email' disabled={isPending} {...field}/>
						   </FormControl>
						   <FormMessage/>
					   </FormItem>

				   )}
		/>
			<FormField control={form.control} name='password' rules={{required: "The password is required",
			minLength: {value: 6, message: "Password must be at least 6 characters long"}}}
					   render={({field}) => (
						   <FormItem>
							   <FormControl>
								   <Input placeholder='password' type='password' disabled={isPending} {...field}/>
							   </FormControl>
							   <FormMessage/>
						   </FormItem>

					   )}
			/>
	</>
}