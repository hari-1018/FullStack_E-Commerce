import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { WishlistContext } from "../../context/WishlistContext";
import { useContext } from "react";

const Wishlist = () => {
  const wishlistContext = useContext(WishlistContext);

  // Add a fallback if the context is undefined
  if (!wishlistContext) {
    console.error("WishlistContext is undefined. Ensure WishlistProvider is wrapping the component tree.");
    return <p>Error: WishlistContext is not available.</p>;
  }

  const { wishlist, removeFromWishlist, clearWishlist } = wishlistContext;

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-container text-center mt-28">
        <h1 className="text-4xl font-extrabold text-pink-400">Your Wishlist</h1>
        <p className="text-md text-blue-400 mt-4">
          Your wishlist is currently empty. Start adding products! 🎉
        </p>
      </div>
    );
  }

  return (
    <div className="wishlist-container mb-12 mt-28 px-4">
      <h1 className="text-4xl font-extrabold text-center text-pink-400">
        Your Wishlist
      </h1>
      <button
        className="mt-4 mb-6 py-2 px-4 bg-red-500 text-white font-bold rounded-lg"
        onClick={() => {
          clearWishlist();
          toast.success("Wishlist cleared!");
        }}
      >
        Clear Wishlist
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {wishlist.map(({ productID }) => (
          <div
            key={productID._id}
            className="flex flex-col p-4 border shadow-lg bg-white"
          >
            <Link
              to={`/products/${productID._id}`}
              className="block w-full h-full"
            >
              <img
                src={productID.image_url || "/placeholder-image.jpg"} // Use a placeholder if image_url is not available
                alt={productID.name}
                className="w-full h-40 object-contain rounded-lg"
              />
              <h2 className="text-md font-bold text-center text-gray-900">
                {productID.name}
              </h2>
              <p className="text-center text-green-600 font-semibold">
                ₹ {productID.price}/-
              </p>
            </Link>
            <button
              className="mt-4 py-2 px-4 bg-red-500 text-white font-bold rounded-lg"
              onClick={() => {
                removeFromWishlist(productID._id);
                toast.success("Removed from Wishlist!");
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
