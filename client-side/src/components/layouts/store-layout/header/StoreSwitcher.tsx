'use client'
import { IStore } from '@/shared/types/store.interface'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { STORE_URL } from "@/config/url.config";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover'
import { Button } from '@/components/ui/Button'
import { Plus, StoreIcon } from 'lucide-react'
import { ChevronsUpDownIcon } from 'lucide-react'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '@/components/ui/Command'
import { CreateStoreModal } from '@/components/ui/modals/CreateStoreModal'

interface StoreSwitcherProps {
	items: IStore[]
}

export function StoreSwitcher({items}: StoreSwitcherProps) {
	const router = useRouter()
	const [isOpen, setIsOpen] = useState(false)
	const onStoreSelect = (storeId: string) => {
		setIsOpen(false)
		router.push(STORE_URL.home(storeId))
	}
	return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' aria-expanded={isOpen}
				role='combobox' aria-label='Shoose store' className='w-52'>
          <StoreIcon className='mr-2 size-4 shrink-0 opacity-50'/>
          Current store
          <ChevronsUpDownIcon className='ml-auto size-4 shrink-0 opacity-50'/>
        </Button>
      </PopoverTrigger>
		<PopoverContent className='w-52 p-0'>
			<Command>
				<CommandList>
					<CommandInput placeholder="To search store..."/>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Shops">
						{items.map(store => (
							<CommandItem key={store.id} onSelect={() => onStoreSelect(store.id)}
							className='text-sm'>
								<StoreIcon className='mr-2 size-4'/>
								<div className='line-clamp-1'>{store.title}</div>
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
				<CommandSeparator />
				<CommandList>
					<CommandGroup>
						<CreateStoreModal>
							<CommandItem>
								<Plus className='mr-2 size-4'/>
								Create new store
							</CommandItem>
						</CreateStoreModal>
					</CommandGroup>
				</CommandList>
			</Command>
		</PopoverContent>
    </Popover>
  );
}