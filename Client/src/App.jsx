import './App.css'
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import About from './pages/About';
import { CartProvider } from './context/CartContext'

function App() {

  return (
    <>
    <CartProvider>
      <Navbar/>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} /> */}
        <Route path="/about" element={<About />} />
      </Routes>  
    </CartProvider>
    </>
  )
}

export default App
