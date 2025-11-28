import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/Sheet'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'
import styles from './HeaderCart.module.css'
import { CartItem } from '@/components/layouts/main-layout/header/header-menu/header-cart/cart-item/CartItem'
import { formatPrice } from '@/utils/string/format-price'
import { useRouter } from 'next/navigation'
import { useCheckout } from '@/components/layouts/main-layout/header/header-menu/header-cart/useCheckout'
import { useProfile } from '@/hooks/useProfile'
import { PUBLIC_URL } from '@/config/url.config'

export function HeaderCart() {
	const {items, total} = useCart()
	const {push} = useRouter()
	const {user} = useProfile()
	const {createPayment, isLoadingCreate} = useCheckout()

	const handleClick = () => {
		user ? createPayment(): push(PUBLIC_URL.auth())
	}

  return (
    <Sheet>
      <SheetTrigger asChild>
		  <Button variant='ghost'>
			  To Cart
		  </Button>
	  </SheetTrigger>
		<SheetContent className={styles.cart}>
			<SheetHeader className="s">
				<SheetTitle>Orders</SheetTitle>
				<SheetDescription></SheetDescription>
			</SheetHeader>
			<div className={styles.items}>
				{items.length ? (
					items.map(item => (
						<CartItem item={item} key={item.id} />
					))
				) : (
					<div className={styles.not_found}>Empty cart</div>
				)}
			</div>
			{items.length ? (
				<div className={styles.buttons}>
					<div className={styles.total}>
						Total: {formatPrice(total)}
					</div>
					<Button
						onClick={handleClick}
						variant='primary'
						disabled={isLoadingCreate}
					>
						To pay
					</Button>
				</div>
			): null}
		</SheetContent>
    </Sheet>
  )
}