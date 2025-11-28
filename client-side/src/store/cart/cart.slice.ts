import type { IAddToCartPayload, ICartInitialState, IChangeQuantityPayload } from '@/store/cart/cart.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ICartInitialState = {
	items: [],
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
			const isExist = state.items.some((item) => item.product.id === action.payload.product.id)
			if (!isExist) {
				state.items.push({...action.payload, id: state.items.length})
			}
		},
		removeFromCart: (state, action: PayloadAction<{id: string}>) => {
			state.items = state.items.filter((item) => item.product.id !== action.payload.id)
		},
		changeQuantity: (state, action: PayloadAction<IChangeQuantityPayload>) => {
			const { id, type } = action.payload
			const item = state.items.find((item) => item.id === id)
			if (item) type === 'plus' ? item.quantity++ : item.quantity--
		},
		reset: state => {
			state.items = []
		}
	}
})