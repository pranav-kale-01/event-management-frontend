import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { NotificationProvider } from './demo/notification-context.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <NotificationProvider>
      <App />
    </NotificationProvider>
  </StrictMode>,
)
