import { IProduct } from '@/shared/types/product.interface'

export interface ICartItem {
  id: number;
  product: IProduct;
  price: number;
  quantity: number;
}