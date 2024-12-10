import './App.css'
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './pages/Home'
import Products from './components/Products/Products'
import ProductDetails from './components/Products/ProductDetails';
import ProductsCategory from './components/Products/ProductsCategory';
import Payment from './pages/Payment';
import About from './pages/About';
import Contact from './pages/Contact'
import { CartProvider } from './context/CartContext'
import Cart from './components/Cart/Cart'
import { WishlistProvider } from './context/WishlistContext';
import Wishlist from './components/Wishlist/Wishlist'


function App() {

  return (
    <>
    <CartProvider>
    <WishlistProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/category/:categoryname" element={<ProductsCategory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />

      </Routes>  
    <Footer/>
    </WishlistProvider>
    </CartProvider>
    </>
  )
}

export default App
