import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/Baby_Buds.png';
import { BsFillCartFill, BsClipboardHeart, BsPersonCircle } from "react-icons/bs";
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import { MdMenu } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import NavMobile from './NavbarMobile';
import ProfileData from '../Profile/ProfileData';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showUserData, setShowUserData] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(cart.length);
  const [wishlistCount, setWishlistCount] = useState(wishlist.length);

  const checkLoginState = () => {
    const userInfo = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userInfo) {
      setIsLoggedIn(true);
      setUserData(userInfo);
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  useEffect(() => {
    checkLoginState();
    window.addEventListener('loginChange', checkLoginState);

    const updateCartCount = () => setCartCount(cart.length);
    const updateWishlistCount = () => setWishlistCount(wishlist.length);
    updateCartCount();
    updateWishlistCount();

    return () => {
      window.removeEventListener('loginChange', checkLoginState);
    };
  }, [cart, wishlist]);

  const handleLogout = () => {
    clearCart();
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('wishlist');
    window.dispatchEvent(new Event('loginChange'));
    setShowUserData(false);
    setIsLoggedIn(false);
    setUserData(null);
    setCartCount(0);
    setWishlistCount(0);
    navigate('/');
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-20 z-50 bg-white text-white p-2 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <img className="w-28 h-24" src={logo} alt="Baby-Buds Logo" />
          <p
            onClick={() => navigate('/')}
            className="text-lg font-bold tracking-wider cursor-pointer text-pink-500"
          >
            BABY-BUDS
          </p>
        </div>

        <ul className="items-center gap-10 font-bold hidden md:flex">
          <li className="cursor-pointer text-base text-pink-500 hover:text-blue-400"><Link to="/">HOME</Link></li>
          <li className="cursor-pointer text-base text-pink-500 hover:text-blue-400"><Link to="/products">SHOP</Link></li>
          <li className="cursor-pointer text-base text-pink-500 hover:text-blue-400"><Link to="/about">ABOUT US</Link></li>
          <li className="cursor-pointer text-base text-pink-500 hover:text-blue-400"><Link to="/contact">CONTACT US</Link></li>
        </ul>

        <div className="items-center gap-4 hidden md:flex">
          <form onSubmit={handleSearchSubmit} className="relative group">
            <input
              type="text"
              placeholder="Search Products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-bar text-gray-800 w-0 transition-all duration-300 rounded-full px-3 py-1 focus:outline-none group-hover:w-[300px] group-hover:border-2 group-hover:border-pink-400 pr-10"
            />
            <button type="submit">
              <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-pink-400 size-6" />
            </button>
          </form>

          {!isLoggedIn ? (
            <button
              className="px-4 py-2 bg-pink-400 text-white font-bold rounded"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <BsPersonCircle
                className="text-3xl cursor-pointer text-pink-400"
                onClick={() => setShowUserData(!showUserData)}
              />
              {showUserData && (
                <ProfileData
                  userData={userData}
                  handleLogout={handleLogout}
                  closeProfile={() => setShowUserData(false)}
                />
              )}
            </div>
          )}

          {isLoggedIn && (
            <>
              <div className="relative flex items-center">
                <div className="absolute bottom-6 right-0 bg-pink-400 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center border border-gray-300">
                  {cartCount}
                </div>
                <Link to="/cart">
                  <BsFillCartFill className="text-3xl cursor-pointer text-pink-400" />
                </Link>
              </div>

              <div className="relative flex items-center">
                <div className="absolute bottom-6 right-0 bg-pink-400 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center border border-gray-300">
                  {wishlistCount}
                </div>
                <Link to="/wishlist">
                  <BsClipboardHeart className="text-2xl cursor-pointer text-pink-400" />
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-2xl">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="inline-block md:hidden text-3xl font-extrabold text-black">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ display: isMobileMenuOpen ? 'none' : 'inline-block' }}
          >
            <MdMenu />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ display: isMobileMenuOpen ? 'inline-block' : 'none' }}
          >
            <IoClose />
          </button>
        </div>
      </nav>
      <NavMobile open={isMobileMenuOpen} />
    </>
  );
};

export default Navbar;
