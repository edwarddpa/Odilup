import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './context/UserContext.jsx'
import CartProvider from './context/CartContext.jsx'
import GlobalProvider from './context/GlobalContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
        </UserProvider>
      </BrowserRouter>
    </GlobalProvider>
  </StrictMode>,
)
