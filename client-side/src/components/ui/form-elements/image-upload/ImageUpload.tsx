import { useUpload } from '@/components/ui/form-elements/image-upload/useUpload'
import styles from './ImageUpload.module.css'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { ImagePlus } from 'lucide-react'

interface ImageUploadProps {
	isDisabled: boolean;
	onChange: (value: string[]) => void;
	value: string[]
}

export function ImageUpload({isDisabled, onChange, value}: ImageUploadProps){
	const {isUploading, fileInputRef, handleFileChange, handleButtonClick} = useUpload(onChange)

	return <div>
		<div className={styles.image_container}>
			{value.map(url=> (
				<div key={url} className={styles.image_wrapper}>
					<Image src={url} alt='page' fill/>
				</div>
			))}
		</div>
		<Button type='button' disabled={isDisabled || isUploading}
				variant='secondary' onClick={handleButtonClick}
				className={cn(styles.upload, {'mt-4' : value.length})}>
			<ImagePlus/>
			Add images
		</Button>
		<input type={'file'} multiple className='hidden' ref={fileInputRef}
			   onChange={handleFileChange} disabled={isDisabled}/>
	</div>
}