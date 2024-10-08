import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BasicQuery from './components/BasicQuery'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import InfiniteQuery from './components/InfiniteQuery'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const [count, setCount] = useState(0)
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <>
      <div>
       <h1>React Query Infinite Query and Basic Query</h1>
      </div>
      <BasicQuery />
      <InfiniteQuery />

    </>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
