import { useNavigate } from 'react-router-dom';
import { BsFillCartFill } from "react-icons/bs";
import { CartContext } from '../../context/CartContext'; 
import empty from '../../assets/empty-shopping-cart.png';
import { useContext } from 'react';


const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice, totalItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handlePayNow = () => {
    const totalAmount = totalPrice();
    navigate('/payment', {
      state: { cartItems: cart, totalAmount },
    });
  };

  const handleBackToShop = () => {
    navigate('/products');
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-blue-100 p-8">
        <img src={empty} alt="Empty Cart" className="w-72 h-60 mb-4" />
        <p className="text-center text-2xl font-bold text-gray-600 mb-8">Oops..! Your cart is empty. 😓</p>
        <button onClick={handleBackToShop} className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-lg font-semibold text-lg shadow-lg transition-transform duration-300 transform hover:scale-110 hover:bg-gradient-to-l hover:from-blue-500 hover:to-pink-500">Back to Shop</button>
      </div>
    );
  }

  return (
    <div className="cart-container bg-gradient-to-r from-pink-100 to-blue-100 p-8 rounded-lg shadow-lg max-w-3xl mx-auto mt-28 mb-28">
      <h1 className="text-2xl font-bold text-indigo-600 flex items-center justify-center mb-8">
        Your Shopping Cart
        <BsFillCartFill className="ml-2 text-2xl" />
      </h1>

      {cart.map((item) => (
        <div key={item.productID._id} className="flex items-center justify-between border-b-2 pb-4 mb-4">
          <div className="flex items-center gap-4">
            <img src={item.productID.image_url} alt={item.productID.name} className="w-16 h-16 object-cover rounded-lg shadow-md" />
            <div>
              <h2 className="text-base font-semibold text-indigo-600">{item.productID.name}</h2>
              <p className="text-sm text-gray-600">Price: ₹ {item.productID.price}/-</p>
            </div>
          </div>
          
          
          <div className="flex items-center gap-6">
            <button onClick={() => decreaseQuantity(item.productID._id)} className={`px-3 py-1 ${item.quantity === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'} text-white rounded-md`} disabled={item.quantity === 1}>-</button>
            <p className="text-base font-semibold text-indigo-600">{item.quantity}</p>
            <button 
              onClick={() => increaseQuantity(item.productID._id)} 
              className={`px-3 py-1 ${item.quantity >= item.stock ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} text-white rounded-md`} 
              disabled={item.quantity >= item.stock}
            >
              +
            </button>
            <p className="text-base font-semibold text-indigo-600">₹{item.productID.price * item.quantity}</p>
            <button onClick={() => removeFromCart(item.productID._id)} className="text-red-500 text-base bg-transparent border border-red-500 px-3 py-1 rounded-md hover:bg-red-500 hover:text-white">Remove</button>
          </div>
        </div>
        
      ))}
      

      <div className="flex justify-between items-center mt-8">
        <h2 className="text-xl font-bold text-indigo-600">Total Items: {totalItems()}</h2>
        <h2 className="text-xl font-bold text-indigo-600">Total: ₹{totalPrice().toFixed(2)}/-</h2>
        
        <button onClick={handlePayNow} className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg transition-transform duration-300 transform hover:scale-110 hover:bg-gradient-to-l hover:from-blue-500 hover:to-pink-500">Pay Now</button>
      </div>
    </div>
    
  );
};



export default Cart;
