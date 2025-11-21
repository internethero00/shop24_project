import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/Sheet'
import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'

export function HeaderCart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
		  <Button variant='ghost'>
			  To Cart
		  </Button>
	  </SheetTrigger>
		<SheetContent>
			<SheetHeader className="sr-only">
				<SheetTitle>Orders</SheetTitle>
			</SheetHeader>
			<Heading title='Your orders' className='text-xl'/>

		</SheetContent>
    </Sheet>
  )
}