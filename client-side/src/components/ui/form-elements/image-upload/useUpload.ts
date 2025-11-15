import { ChangeEvent, useMemo, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { fileService } from '@/services/file.service'
import toast from 'react-hot-toast'

export function uploadImage(onChange: (value: string[]) => void) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const {mutate: uploadFiles, isPending: isUploading} = useMutation({
		mutationKey: ['uploads files'],
		mutationFn: (formData: FormData) => fileService.upload(formData),
		onSuccess(data){
			onChange(data.map(file => file.url))
		},
		onError() {
			toast.error('Error uploading file')
		}
	})

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		console.log(event)
		const selectedFiles = event.target.files
		if (selectedFiles) {
			const fileArray = Array.from(selectedFiles)
			const formData = new FormData()
			fileArray.forEach(file => formData.append('files', file))

			uploadFiles(formData)
		}
	}

	const handleButtonClick = () => {
		fileInputRef.current?.click()
	}

	return useMemo(() => ({handleButtonClick, isUploading, fileInputRef, handleFileChange}),
		[handleButtonClick, isUploading, fileInputRef, handleFileChange])

}