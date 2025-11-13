import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/Button'
import { ArrowUpDown } from 'lucide-react'

export interface IProductColumn {
	id: string
	title: string
	price: string
	category: string
	color: string
	storeId: string
}

export const columns: ColumnDef<IProductColumn>[] = [
	{
		accessorKey: 'title',
		header: ({column}) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting
				(column.getIsSorted() === 'asc')}>Title
				<ArrowUpDown className='ml-2 size-4'/>
				</Button>
			)
		}
	},
	{
		accessorKey: 'price',
		header: ({column}) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting
				(column.getIsSorted() === 'asc')}>Price
					<ArrowUpDown className='ml-2 size-4'/>
				</Button>
			)
		}
	},
	{
		accessorKey: 'category',
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
		accessorKey: 'color',
		header: ({column}) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting
				(column.getIsSorted() === 'asc')}>Color
					<ArrowUpDown className='ml-2 size-4'/>
				</Button>
			)
		},
		cell: ({row}) => (
			<div className='flex items-center gap-x-3'>
				{row.original.color}
				<div className='size-5 rounded-full border' style={{backgroundColor: row.original.color}}></div>
			</div>
		)
	}

]