import './App.css'
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './pages/Home'
import Products from './components/Products/Products'
import ProductDetails from './components/Products/ProductDetails';
import ProductsCategory from './components/Products/ProductsCategory'
import About from './pages/About';
import { CartProvider } from './context/CartContext'

function App() {

  return (
    <>
    <CartProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/category/:categoryname" element={<ProductsCategory />} />
      </Routes>  
    <Footer/>
    </CartProvider>
    </>
  )
}

export default App
