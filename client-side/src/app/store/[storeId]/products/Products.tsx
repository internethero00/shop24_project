import { useParams } from 'next/navigation'
import { useGetProducts } from '@/hooks/queries/products/useGetProducts'
import { IProductColumn } from '@/app/store/[storeId]/products/ProductColumns'
import { formatPrice } from '@/utils/string/format-price'
import styles from '../Store.module.css'

export function Products(){
	const params = useParams<{storeId: string}>()

	const {products, isLoading} = useGetProducts()

	const formattedProducts: IProductColumn[] = products ?
		products.map(product =>
			({
				id: product.id,
				title: product.title,
				price: formatPrice(product.price),
				category: product.category,
				color: product.color.value,
				storeId: product.store.id
			}))
		: []
	return <div>Products</div>
}