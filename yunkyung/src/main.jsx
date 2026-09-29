import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter로 감싸야 App 안에서 라우팅(페이지 이동)을 쓸 수 있다 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
