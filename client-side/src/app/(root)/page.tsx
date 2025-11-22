import type {Metadata} from 'next'
import Home from '@/app/(root)/Home'
import { productService } from '@/services/product.service'


export const metadata: Metadata = {
	title: 'All shops in one place',
}

export const revalidate = 60

async function getProducts() {
	return (await productService.getMostPopular()).slice(0, 6)
}

export default async function HomePage() {
	const data = await getProducts()
	return <Home products={data} />

}
