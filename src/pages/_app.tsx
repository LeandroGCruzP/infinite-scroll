import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
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
