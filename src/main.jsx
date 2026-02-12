import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import NavScrollExample from './NavScrollExample.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <NavScrollExample/> */}
    <App />
  </StrictMode>,
)
