import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { useSessionStore } from './store/sessionStore'
import './index.css'

document.documentElement.lang = useSessionStore.getState().locale

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
