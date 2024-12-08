// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useWishlist } from "../../context/WishlistContext";

// const Wishlist = () => {
//   const { wishlist, removeFromWishlist } = useWishlist();

//   if (wishlist.length === 0) {
//     return (
//       <div className="wishlist-container text-center mt-28">
//         <h1 className="text-4xl font-extrabold text-pink-400">Your Wishlist</h1>
//         <p className="text-md text-blue-400 mt-4">
//           Your wishlist is currently empty. Start adding products! 🎉
//         </p>
//       </div>
//     );
//   }

//   // Filter out invalid or null entries
//   const validWishlist = wishlist.filter((product) => product && product._id);

//   console.log("Wishlist products:", validWishlist); // Debugging line

//   return (
//     <div className="wishlist-container mb-12 mt-28 px-4">
//       <h1 className="text-4xl font-extrabold text-center text-pink-400">
//         Your Wishlist
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//         {validWishlist.map((product) => (
//           <div
//             key={product._id}
//             className="flex flex-col p-4 border shadow-lg bg-white"
//           >
//             <Link
//               to={`/products/${product._id}`} // Ensure valid `_id`
//               className="block w-full h-full"
//             >
//               <img
//                 src={product.image_url}
//                 alt={product.name}
//                 className="w-full h-40 object-contain rounded-lg"
//               />
//               <h2 className="text-md font-bold text-center text-gray-900">
//                 {product.name}
//               </h2>
//               <p className="text-center text-green-600 font-semibold">
//                 ₹ {product.mrp}/-
//               </p>
//             </Link>
//             <button
//               className="mt-4 py-2 px-4 bg-red-500 text-white font-bold rounded-lg"
//               onClick={() => {
//                 removeFromWishlist(product._id); // Ensure valid `_id`
//                 toast.success("Removed from Wishlist! ❌");
//               }}
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Wishlist;
