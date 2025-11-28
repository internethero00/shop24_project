'use client'
import { PropsWithChildren, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/store/store'

export function Providers({children}: PropsWithChildren){
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
				}
			}
		})
	)

	return (
		<QueryClientProvider client={client}>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					<Toaster />
					{children}
				</PersistGate>
			</Provider>
			</QueryClientProvider>
	)
}