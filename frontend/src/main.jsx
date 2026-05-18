// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './Context/AuthContext';
import { BrowserRouter } from 'react-router-dom' // <-- Importalo aquí
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter> {/* <-- Envolver App con el Router */}
      <App />
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)