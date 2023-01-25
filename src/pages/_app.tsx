import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import '~/styles/globals.css'

const querClient = new QueryClient()

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={querClient}>
      <Component {...pageProps} />

      <ReactQueryDevtools position='bottom-right' />
    </QueryClientProvider>
  )
}
