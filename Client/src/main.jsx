import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          style={{ 
            width: '400px',
            padding: '20px',
            borderRadius: '8px',
            fontSize: '16px',
            zIndex: 9999
          }}
          progressStyle={{
            backgroundColor: '#ffcc00',
          }}
        />
    <App />
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
