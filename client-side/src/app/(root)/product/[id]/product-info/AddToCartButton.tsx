import { IProduct } from '@/shared/types/product.interface'
import { Button } from '@/components/ui/Button'

interface AddToCartButtonProps {
	product: IProduct
}

export function AddToCartButton({}: AddToCartButtonProps) {
  return (
    <Button variant='primary' size='lg' className='w-full'>
		Add To Cart
    </Button>
  )
}