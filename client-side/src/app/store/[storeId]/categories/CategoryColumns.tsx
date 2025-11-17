import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/Button'
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import Link from 'next/link'
import { STORE_URL } from '@/config/url.config'
import { ICategory } from '@/shared/types/category.interface'


export const categoryColumns: ColumnDef<ICategory>[] = [
	{
		accessorKey: 'title',
		header: ({column}) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting
				(column.getIsSorted() === 'asc')}>Category
				<ArrowUpDown className='ml-2 size-4'/>
				</Button>
			)
		}
	},
	{
		accessorKey: 'createdAt',
		header: ({column}) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting
				(column.getIsSorted() === 'asc')}>Date of create
					<ArrowUpDown className='ml-2 size-4'/>
				</Button>
			)
		}
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({row}) => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='size-8 p-0'>
						<MoreHorizontal className='size-4'/>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<Link
						href={STORE_URL.categoryEdit(row.original.storeId, row.original.id)}
					>
						<DropdownMenuItem>
							<Pencil className='size-4 mr-2'/>
							To Change
						</DropdownMenuItem>
					</Link>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}

]