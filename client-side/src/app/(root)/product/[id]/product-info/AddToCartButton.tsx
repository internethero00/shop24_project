import { IProduct } from '@/shared/types/product.interface'
import { Button } from '@/components/ui/Button'
import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

interface AddToCartButtonProps {
	product: IProduct
}

export function AddToCartButton({product}: AddToCartButtonProps) {
	const { addToCart, removeFromCart } = useActions();
	const {items} = useCart()

	const currentElement = items.find(element => element.product.id === product.id)
	console.log(currentElement)

	return (
    <Button onClick={() => currentElement ? removeFromCart({id: product.id}) : addToCart({product, price: product.price, quantity: 1})} variant='primary' size='lg' className='lg:w-full sm:w-100'>
		{currentElement ? 'Remove from Cart' : 'Add To Cart'}
    </Button>
  )
}