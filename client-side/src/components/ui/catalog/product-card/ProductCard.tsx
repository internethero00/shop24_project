import { IProduct } from '@/shared/types/product.interface'
import styles from './ProductCard.module.css'
import Link from 'next/link'
import { PUBLIC_URL } from '@/config/url.config'
import Image from 'next/image'
import { formatPrice } from '@/utils/string/format-price'

interface ProductCardProps{
	product: IProduct;
}

export function ProductCard({product}: ProductCardProps) {
  return (
    <div className={styles.card}>
		<Link href={PUBLIC_URL.product(product.id)}>
			<div className={styles.imageWrapper}>
				<Image
					src={product.images[0]}
					alt={product.title}
					fill
					className={styles.image}
				/>
			</div>
		</Link>
		<h3 className={styles.title}>{product.title}</h3>
		<Link
			className={styles.category}
			href={PUBLIC_URL.category(product.category.id)}>
			{product.category.title}
		</Link>
		<p className={styles.price}>{formatPrice(product.price)}</p>
    </div>
  )
}