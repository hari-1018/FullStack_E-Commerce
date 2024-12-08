// import { createContext, useContext, useState, useEffect } from "react";

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
//     // Load wishlist from localStorage on mount
//     const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//     console.log("Loaded wishlist from localStorage:", storedWishlist); // Debugging line
//     setWishlist(storedWishlist);
//   }, []);

//   const addToWishlist = (product) => {
//     setWishlist((prevWishlist) => {
//       const updatedWishlist = [...prevWishlist, product];
//       localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//       console.log("Updated wishlist after adding:", updatedWishlist); // Debugging line
//       return updatedWishlist;
//     });
//   };

//   const removeFromWishlist = (productID) => {
//     setWishlist((prevWishlist) => {
//       const updatedWishlist = prevWishlist.filter((product) => product._id !== productID);
//       localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//       console.log("Updated wishlist after removal:", updatedWishlist); // Debugging line
//       return updatedWishlist;
//     });
//   };

//   const isInWishlist = (productID) => wishlist.some((product) => product._id === productID);

//   return (
//     <WishlistContext.Provider
//       value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishlistContext);
