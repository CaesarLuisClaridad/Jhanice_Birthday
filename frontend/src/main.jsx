import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GreetingsContextProvider } from './context/greetingsContext.jsx';
import './index.css'
import './responsive.css'
import "swiper/css";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GreetingsContextProvider>
      <App />
    </GreetingsContextProvider>
  </StrictMode>,
)
