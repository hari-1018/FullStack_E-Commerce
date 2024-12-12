import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './pages/Home';
import Products from './components/Products/Products';
import ProductDetails from './components/Products/ProductDetails';
import ProductsCategory from './components/Products/ProductsCategory';
import Payment from './pages/Payment';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart/Cart';
import { WishlistProvider } from './context/WishlistContext';
import Wishlist from './components/Wishlist/Wishlist';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';
import Dashboard from './components/Admin/Dashboard';
import Sidebar from './components/Admin/Sidebar';
import AllCustomers from './components/Admin/AllCustomers';
import AllOrders from './components/Admin/AllOrders';
import CustomerOrder from './components/Admin/CustomerOrder'
import AllProducts from './components/Admin/AllProducts';
import AddProducts from './components/Admin/AddProducts';
import EditProduct from './components/Admin/EditProduct';

function App() {
  const location = useLocation();

  // Routes where the footer should not be shown (admin-related routes)
  const noFooterRoutes = [
    '/admin',
    '/admin/dashboard',
    '/all-products',
    '/all-customers',
    '/all-orders',
    '/add-product',
    '/customer-order',
    '/edit-product',
  ];
  const noNavbarRoutes = [
    '/admin',
    '/admin/dashboard',
    '/all-products',
    '/all-customers',
    '/all-orders',
    '/add-product',
    '/customer-order',
    '/edit-product',
  ];
  return (
    <>
      <CartProvider>
        <WishlistProvider>
        {!noNavbarRoutes.some((path) => location.pathname.startsWith(path)) && <Navbar />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/products/category/:categoryname" element={<ProductsCategory />} />

            {/* User Routes */}
            <Route element={<UserRoutes />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/payment" element={<Payment />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminRoutes />}>
              <Route path="/admin" element={<Sidebar />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="all-customers" element={<AllCustomers />} />
              <Route path="all-products" element={<AllProducts />} />
              <Route path="all-orders" element={<AllOrders />} />
              <Route path="add-product" element={<AddProducts />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
              <Route path="customer-order/:id" element={<CustomerOrder />} />
            </Route>
            </Route>

            <Route path='*' element={<NotFound />} />
          </Routes>
          {!noFooterRoutes.some((path) => location.pathname.startsWith(path)) && <Footer />}
        </WishlistProvider>
      </CartProvider>
    </>
  );
}

export default App;
