import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import endPoints from "../../api/endPoints";

const SearchProduct = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("keyword") || ""; // Matches your controller's `searchterm`

  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === "") {
        setFilteredItems([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`${endPoints.PRODUCTS.SEARCH}?keyword=${searchQuery}`);
        console.log("searching", response);
        
        setFilteredItems(response.data.productsBySearching || []);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className="search-product p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Search Results:</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredItems.length > 0 ? (
        <div className="search-results w-auto bg-blue-100 mt-12 p-6 shadow-md rounded-lg">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="product-item p-4 mb-4 border-b border-gray-300 flex flex-col md:flex-row gap-4 items-center"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="w-32 h-32 object-contain rounded-md shadow-md"
              />
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-green-500 font-bold">₹ {item.mrp}/-</p>
                <p className="text-yellow-500 font-bold">⭐ {item.stars}</p>

                <Link to={`/product/${item._id}`}>
                  <button className="mt-2 mb-2 w-full md:w-36 px-4 py-2 text-white font-bold rounded bg-blue-500 hover:bg-blue-600">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found.</p>
      )}
    </div>
  );
};

export default SearchProduct;
