import React from 'react'
import { IProduct } from '@/shared/types/product.interface'
import { Catalog } from '@/components/ui/catalog/Catalog'
import { PUBLIC_URL } from '@/config/url.config'
import { Hero } from '@/app/(root)/hero/Hero'

interface HomeProps {
	products: IProduct[]
}

export function Home({ products }: HomeProps) {
	return (
		<div className='flex flex-col content-between gap-9'>
			<Hero/>
			<Catalog
				title='Bestsellers'
				description='The most popular products in the store'
				linkTitle='To see more'
				link={PUBLIC_URL.explorer()}
				products={products}/>
		</div>
	)
}

export default Home