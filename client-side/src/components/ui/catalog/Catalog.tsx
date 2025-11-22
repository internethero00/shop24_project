import { ICatalog } from '@/components/ui/catalog/catalog.interface'
import styles from './Catalog.module.css'
import Link from 'next/link'
import { ProductCard } from '@/components/ui/catalog/product-card/ProductCard'

export function Catalog({link, linkTitle, title, products, description}: ICatalog) {
  return (
    <div>
      <div className={styles.header}>
		  <div className={styles.info}>
			  <h1>{title}</h1>
			  {description &&
				  <p>{description}</p>}
		  </div>
			  {link && linkTitle &&
			  	<Link href={link}>{linkTitle}</Link>
			  }
	  </div>

		  <div className={styles.catalog}>
			  <div className={styles.products}>
				  {products.length ? (
					  products.map(product => (
						  <ProductCard key={product.id} product={product} />
					  ))
				  ) : (<div>Products not found</div>)}
			  </div>
		  </div>
    </div>
  )
}