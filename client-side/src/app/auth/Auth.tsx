'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useAuthForm } from '@/app/auth/useAuthForm'
import styles from './Auth.module.css'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import {Form} from '@/components/ui/form-elements/Form'
import { Button } from '@/components/ui/Button'
import { AuthFields } from '@/app/auth/AuthFields'

function Auth() {
	const [isReg, setIsReg] = useState(false)
	const {onSubmit, form, isPending} = useAuthForm(isReg)

	return (
		<div className={styles.wrapper}>
			<div className={styles.left}>
				<Image src='/images/auth.svg' alt='Shop24' width={100} height={100} />
			</div>
			<div className={styles.right}>
				<Card className={styles.card}>
					<CardHeader className={styles.header}>
						<CardTitle>{isReg? 'Sign Up' : 'Sign In'}</CardTitle>
					<CardDescription>
						Please, sign in or sign up to buy products.
					</CardDescription>
					</CardHeader>
					<CardContent className={styles.content}>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<AuthFields form={form} isPending={isPending} isReg={isReg}/>
								<Button disabled={isPending}>To Continue</Button>
							</form>
						</Form>
					</CardContent>
					<CardFooter className={styles.footer}>
						{isReg? 'Already have an account?' : 'Don\'t have an account?'}
						<Button onClick={() => setIsReg(!isReg)}>{isReg? 'Sign In' : 'Sign Up'}</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}

export default Auth