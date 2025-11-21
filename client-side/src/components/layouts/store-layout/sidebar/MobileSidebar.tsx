import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/Sheet'
import { Menu } from 'lucide-react'
import { Sidebar } from '@/components/layouts/store-layout/sidebar/Sidebar'

export function MobileSidebar() {
	return <Sheet>
		<SheetTrigger className='lg:hidden pr-4 hover:opacity-75 transition'>
			<Menu/>
		</SheetTrigger>
		<SheetContent side='left' className='p-0 bg-white'>
			<SheetHeader className="sr-only">
				<SheetTitle>Mobile sidebar</SheetTitle>
			</SheetHeader>
			<Sidebar/>
		</SheetContent>
	</Sheet>
}