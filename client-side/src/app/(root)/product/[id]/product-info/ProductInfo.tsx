import { IProduct } from '@/shared/types/product.interface'
import { FavoriteButton } from '@/app/(root)/product/[id]/product-info/FavoriteButton'
import styles from './ProductInfo.module.css'
import { formatPrice } from '@/utils/string/format-price'
import Link from 'next/link'
import { PUBLIC_URL } from '@/config/url.config'
import { AddToCartButton } from '@/app/(root)/product/[id]/product-info/AddToCartButton'

interface ProductInfoProps {
	product: IProduct
}

export function ProductInfo({product}: ProductInfoProps) {
	const rating = Math.round(product.reviews.reduce((acc, curr) => acc + curr.rating, 0)
	/product.reviews.length ) || 0;

	return (
		<div className={styles.product_info}>
			<h1 className={styles.title}>{product.title}</h1>
			<div className={styles.price}>{formatPrice(product.price)}</div>
			<hr/>
			<div className={styles.description}>{product.description}</div>
			<hr/>
			<div className={styles.label}>
				<h3>Color: </h3>
				<div
					className={styles.color}
					style={{
						backgroundColor: product.color.value,
					}}
				/>
			</div>
			<div className={styles.label}>
				<h3>Category: </h3>
				<Link
					className='text-sm'
					href={PUBLIC_URL.category(product.category.id)}
				>
					{product.category.title}
				</Link>
			</div>
			<div className={styles.label}>
				<h3>Rating: </h3>
				<div className='text-sm'>
					⭐ {rating.toFixed(1)} |{' '}
					{product.reviews.length === 1 ? `${product.reviews.length} review` : `${product.reviews.length} reviews`}
				</div>
			</div>
			<hr/>
			<div className={styles.actions}>
				<AddToCartButton product={product}/>
				<FavoriteButton product={product}/>
			</div>
		</div>
	)
}