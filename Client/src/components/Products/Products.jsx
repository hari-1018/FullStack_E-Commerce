import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../api/axiosInstance";
import endPoints from "../../api/endPoints";
import { WishlistContext } from "../../context/WishlistContext";

const Products = () => {
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useContext(WishlistContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(
          endPoints.PRODUCTS.GET_ALL_PRODUCTS
        );

        if (Array.isArray(response.data.allProducts)) {
          setProducts(response.data.allProducts);
        } else {
          setError("Data format is incorrect");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products", err);
        setError(
          "An error occurred while fetching products. Please try again."
        );
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleWishlist = (productID) => {
    if (isInWishlist(productID)) {
      removeFromWishlist(productID);
      toast.success("Removed from Wishlist! ❌", {
        autoClose: 2000,
        style: {
          backgroundColor: "#ffe5b4",
          border: "1px solid #ffcc00",
          borderRadius: "8px",
          padding: "10px",
        },
        bodyStyle: { fontWeight: "bold", color: "black" },
      });
    } else {
      addToWishlist(productID);
      toast.success("Added to Wishlist! ✨🎉", {
        autoClose: 2000,
        style: {
          backgroundColor: "#ffe5b4",
          border: "1px solid #ffcc00",
          borderRadius: "8px",
          padding: "10px",
        },
        bodyStyle: { fontWeight: "bold", color: "black" },
      });
    }
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="shop-container mb-12 mt-28 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-2 text-pink-400 tracking-wide">
        Our Products
      </h1>
      <p className="text-center font-semibold text-md text-blue-400 mb-8">
        Explore our wide range of premium baby products, designed for your
        little one&apos;s comfort and care 🎉.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="relative flex flex-col p-4 border border-gray-200 shadow-lg rounded-xl hover:bg-blue-100 hover:scale-105 transition-transform duration-300 ease-in-out bg-white"
            >
              <Link to={`/products/${product._id}`}>
                <div className="w-full h-40 mb-4 flex items-center justify-center">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                </div>
                <h2 className="text-md font-bold mb-2 text-center text-gray-900">
                  {product.name}
                </h2>
                <p className="text-center text-md font-semibold text-green-600 mb-2">
                  ₹ {product.mrp.toFixed(2)}/-
                </p>
                <p className="text-center text-lg font-semibold text-yellow-500 mb-2">
                  ⭐ {product.stars}
                </p>
              </Link>
              <button
                className="mt-auto py-2 w-full text-white font-bold rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-600 shadow-md hover:shadow-xl"
              >
                View Details
              </button>

              {/* Wishlist Icon */}
              <button
                className="absolute right-4 top-4 text-red-500 text-xl focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation to product link
                  toggleWishlist(product._id);
                }}
              >
                {isInWishlist(product._id) ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-red-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
