import { PropsWithChildren } from 'react'
import {
	AlertDialog, AlertDialogAction, AlertDialogCancel,
	AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'

interface ConfirmModalProps {
	handleClick: () => void;
}

export function ConfirmModal({children, handleClick}: PropsWithChildren<ConfirmModalProps>) {
	return <AlertDialog>
		<AlertDialogTrigger asChild>
			{children}
		</AlertDialogTrigger>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
				<AlertDialogDescription>
					This action cannot be undone. This will permanently delete your
					store and remove your data from our servers.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction
					className='bg-blue-900 hover:bg-blue-900/90' onClick={() => handleClick()}>
					Continue
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
}