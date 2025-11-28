'use client'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/Sheet'
import { Menu } from 'lucide-react'
import {
	HeaderItemsMobileVersion
} from '@/components/layouts/main-layout/header/header-menu/mobileMenu/HeaderItemsMobileVersion'
import { useState } from 'react'

export function MobileMenu() {
	const [open, setOpen] = useState(false);
	console.log(open)
	return <Sheet open={open} onOpenChange={setOpen}>
		<SheetTrigger className='lg:hidden pr-4 hover:opacity-75 transition'>
			<Menu/>
		</SheetTrigger>
		<SheetContent side='right' className='p-0 bg-white'>
			<SheetHeader className="sr-only">
				<SheetTitle>Mobile sidebar</SheetTitle>
			</SheetHeader>
			<HeaderItemsMobileVersion onClose={() => setOpen(false)}/>
		</SheetContent>
	</Sheet>
}