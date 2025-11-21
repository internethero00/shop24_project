import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet'
import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'

export function HeaderCart() {
  return (
    <Sheet>
      <SheetTrigger>
		  <Button variant='ghost'>
			  To Cart
		  </Button>
	  </SheetTrigger>
		<SheetContent>
			<Heading title='Your orders' className='text-xl'/>

		</SheetContent>
    </Sheet>
  )
}