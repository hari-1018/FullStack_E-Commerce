import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import endPoints from '../../api/endPoints';

const ProductsCategory = () => {
  const { categoryname } = useParams(); 
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // console.log(categoryname);
  useEffect(() => {
    const fetchCategoryItems = async () => {
      try {
        const response = await axiosInstance.get(endPoints.PRODUCTS.GET_CATEGORY(categoryname));
        // console.log(response)
        setItems(response.data.productsByCategory);
      } catch (error){
        console.error('Error Fetching Categories', error);
        setError("An error occurred while fetching items. Please try again.");
      }finally{
        setLoading(false);
      }
    };

    fetchCategoryItems();
  }, [categoryname]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="category-page-container mb-12 mt-28 px-4">
      <p className="text-center text-2xl font-bold text-pink-400 mb-4">Search Results</p>

      <p className="text-center text-lg text-blue-400 mb-8">{items.length} Items Available</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {items.length > 0 ? (
          items.map(item => (
            <Link key={item._id} to={`/products/${item._id}`}>
              <div 
                className="flex flex-col p-4 border border-gray-200 shadow-lg rounded-xl hover:bg-blue-100 hover:scale-105 transition-transform duration-300 ease-in-out bg-white"
              >
                <div className="w-full h-40 mb-4 flex items-center justify-center">
                  <img 
                    src={item.image_url} 
                    alt={item.name} 
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                </div>
                <h2 className="text-lg font-semibold mb-2 text-center text-pink-500">{item.name}</h2>
                <p className="text-center text-base font-semibold text-green-500 mb-4">₹ {item.mrp.toFixed(2)}/-</p>
                <p className="text-center text-base font-semibold text-yellow-500 mb-2">⭐ {item.stars}</p>

                <button className="mt-auto py-2 w-full text-white font-bold rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-600 shadow-md hover:shadow-xl">
                  View Details
                </button>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex items-center justify-center h-52">
            <p className="text-4xl font-bold text-center">No items available in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsCategory;
