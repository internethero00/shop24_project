import type { Metadata } from 'next'
import { productService } from '@/services/product.service'
import { Explorer } from '@/app/(root)/explorer/Explorer'

export const metadata: Metadata = {
	title: 'Catalogs',
}

export const revalidate = 60;

async function getProducts() {
	return await productService.getAll();

}

export default async function ExplorerPage() {
	const data = await getProducts();

	return <Explorer products={data} />

}
