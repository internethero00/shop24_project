import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { cartSlice } from '@/store/cart/cart.slice'
import { configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER, persistStore
} from 'redux-persist'

const persistConfig = {
	key: 'shop24',
	storage,
	whitelist: ['cart'],
}

const isClient = typeof window !== 'undefined'

const combinedReducers = combineReducers({
	cart: cartSlice.reducer
})

let mainReducer = combinedReducers

if (isClient) {
	const {persistReducer} = require('redux-persist')
	const storage = require('redux-persist/lib/storage')

	mainReducer = persistReducer(persistConfig, combinedReducers)

}

export const store = configureStore({
	reducer: mainReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER
				]
			}
		})
})

export const persistor = persistStore(store)
export type TypeRootState = ReturnType<typeof mainReducer>