import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/index.css'
import StoreProvider from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StoreProvider>
    <App />
  </StoreProvider>
)
