import './App.css'
import Navbar from './components/Navbar/Navbar'
import { CartProvider } from './context/CartContext'

function App() {

  return (
    <>
    <CartProvider>
      <Navbar/>
    </CartProvider>
    </>
  )
}

export default App
