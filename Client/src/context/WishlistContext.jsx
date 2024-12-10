import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import endPoints from "../api/endPoints";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
          const response = await axiosInstance.get(endPoints.WISHLIST.VIEW_WISHLIST(loggedInUser.userID));
          setWishlist(response.data.wishlist.products || []);
        }
      } catch (error) {
        console.error("Error loading wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const addToWishlist = async (productID) => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!loggedInUser) return;
      const response = await axiosInstance.post(endPoints.WISHLIST.ADD_TO_WISHLIST(loggedInUser.userID), { productID });
      setWishlist(response.data.wishlist.products);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (productID) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      try {
        const response = await axiosInstance.delete(
          endPoints.WISHLIST.REMOVE_FROM_WISHLIST(loggedInUser.userID, productID)
        );
        setWishlist(response.data.wishlist.products || []);
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      }
    }
  };

  const clearWishlist = async () => {
    try {
      const userID = localStorage.getItem("userID");
      if (!userID) return;
      const response = await axiosInstance.delete(
        endPoints.WISHLIST.CLEAR_WISHLIST(userID)
      );
      setWishlist(response.data.wishlist.products || []);
    } catch (error) {
      console.error("Error clearing wishlist:", error);
    }
  };

  const isInWishlist = (productID) => {
    console.log('Checking if product is in wishlist:', productID);
    return wishlist.some((product) => product.productID._id === productID);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
