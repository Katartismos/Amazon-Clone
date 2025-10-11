import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HooksContextProvider } from './components/HooksContext.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HooksContextProvider>
        <App />
      </HooksContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
