import { productService } from '@/services/product.service'
import type { Metadata } from 'next'
import { Product } from '@/app/(root)/product/[id]/Product'
import { notFound } from 'next/navigation'

// export const revalidate = 60;

// export async function generateStaticParams() {
// 	const products = await productService.getAll()
//
// 	const paths = products.map(product => ({
// 		id: product.id
// 	}))
// 	return paths
// }

async function getProducts(id: string) {
	try {
		const product = await productService.getById(id)
		const similarProducts = await productService.getSimilar(id)
		return {product, similarProducts}
	}
	catch (error) {
		return notFound()
	}
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }>}): Promise<Metadata> {
	const { id } = await params;
	const { product} = await getProducts(id);
	return {
		title: product.title,
		description: product.description,
		openGraph: {
			images: [
				{
					url: product.images[0],
					width: 1000,
					height: 1000,
					alt: product.title,
				},
			],
		},
	};
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }>}) {
	const { id } = await params;
	const { product, similarProducts } = await getProducts(id);

	return (
		<Product initialProduct={product} similarProducts={similarProducts} id={id} />
	);
}
