import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider, focusManager } from 'react-query'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from './components/ui/toaster'

const queryClient = new QueryClient()
focusManager.setFocused(false)
ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        <Toaster />
    </QueryClientProvider>
)
