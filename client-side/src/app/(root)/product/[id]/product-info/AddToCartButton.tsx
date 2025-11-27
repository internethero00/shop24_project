import { IProduct } from '@/shared/types/product.interface'
import { Button } from '@/components/ui/Button'

interface AddToCartButtonProps {
	product: IProduct
}

export function AddToCartButton({}: AddToCartButtonProps) {
  return (
    <Button variant='primary' size='lg' className='lg:w-full sm:w-100'>
		Add To Cart
    </Button>
  )
}