import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import endPoints from "../api/endPoints";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const fetchCartFromServer = async () => {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (loggedInUser) {
        try {
          const endpoint = endPoints.CART.GET_CART(loggedInUser.userID);
          const response = await axiosInstance.get(endpoint);
          const serverCart = response.data.cart?.products || [];
          setCart(serverCart);
        } catch (err) {
          if (err.response?.status === 404) {
            console.warn("Cart not found for this user. Setting an empty cart.");
            setCart([]); // If no cart exists, initialize it as empty
          } else {
            console.error("Error fetching cart from server", err);
          }
        }
      }
    };

    fetchCartFromServer();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const syncWithServer = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      try {
        await axiosInstance.put(endPoints.CART.UPDATE_CART(loggedInUser.userID), {
          products: cart,
        });
      } catch (err) {
        console.error("Error syncing cart with server", err);
      }
    }
  };

  const addToCart = async (product, quantity = 1) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      try {
        const response = await axiosInstance.post(
          endPoints.CART.ADD_TO_CART(loggedInUser.userID),
          { productID: product._id, quantity }
        );
        setCart(response.data.cart.products);
      } catch (err) {
        console.error("Error adding product to cart", err);
      }
    }
  };

  const removeFromCart = async (productID) => {
    console.log("productID rem", productID);
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      try {
        const response = await axiosInstance.delete(
          endPoints.CART.REMOVE_FROM_CART(loggedInUser.userID, productID)
        );
        setCart(response.data.cart.products);
      } catch (err) {
        console.error("Error removing product from cart", err);
      }
    }
  };

  const increaseQuantity = async (productID) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log("user",cart);
    const product = cart.find((item) => item.productID._id === productID);
    console.log(product,"product")
    if (loggedInUser && product) {
      if (product.quantity > 0) {
        try {
          await axiosInstance.put(endPoints.CART.INCREASE_CART(loggedInUser.userID), {
            productID: product.productID._id,
          });
          setCart((prevCart) =>
            prevCart.map((item) =>
              item.productID._id === productID
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          );
        } catch (err) {
          console.error("Error increasing product quantity", err);
        }
      }
    }
  };

  const decreaseQuantity = async (productID) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const product = cart.find((item) => item.productID._id === productID);
    if (loggedInUser && product) {
      if (product.quantity > 1) {
        try {
          await axiosInstance.put(endPoints.CART.DECREASE_CART(loggedInUser.userID), {
            productID,
            quantity: product.quantity - 1,
          });
          setCart((prevCart) =>
            prevCart.map((item) =>
              item.productID._id === productID
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          );
        } catch (err) {
          console.error("Error decreasing product quantity", err);
        }
      } else {
        removeFromCart(productID);
      }
    }
  };

  const clearCart = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      try {
        await axiosInstance.get(endPoints.CART.CLEAR_CART(loggedInUser.userID));
        setCart([]);
        localStorage.removeItem("cart");
      } catch (err) {
        console.error("Error clearing cart", err);
      }
    } else {
      setCart([]);
      localStorage.removeItem("cart");
    }
  };

  const totalItems = () => {
    return cart.length;
  };

  const totalPrice = () => {
    return cart.reduce((total, item) => total + (item.productID.price || 0) * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
