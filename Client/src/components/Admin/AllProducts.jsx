import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsFillPenFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { IoMdAddCircle } from 'react-icons/io';
import axiosInstance from '../../api/axiosInstance';
import endPoints from '../../api/endPoints';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterProducts(query);
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get(endPoints.ADMIN.GET_ALL_PRODUCTS);
      setProducts(response.data.data);
      setFilteredProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = (query, category) => {
    let filtered = products;

    if (query.trim() !== '') {
      filtered = filtered.filter(product =>
        product.name && product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    setFilteredProducts(filtered);
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    setSelectedProduct(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (selectedProduct) { 
      try {
        const response = await axiosInstance.delete(endPoints.ADMIN.DELETE_PRODUCT(selectedProduct));
        setProducts(response);
        setShowConfirmModal(false);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleAdd = () => {
    navigate('/admin/add-product');
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-pink-500 mt-1 mb-4 text-center">All Products</h1>

      <div className="flex flex-col md:flex-row justify-center items-center mb-4">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar text-gray-800 w-full md:w-[250px] border-2 border-pink-400 rounded-full px-3 py-2 focus:outline-pink-400 mb-2 md:mb-0"
        />
      </div>

      <div className="flex justify-center mb-4 mt-2">
        <button onClick={handleAdd} className="bg-pink-400 text-white font-bold rounded-full py-2 px-4 flex items-center">
          Add New Product
          <IoMdAddCircle className="inline ml-1 mb-1" />
        </button>
      </div>

      <table className="w-[1200px] bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border w-[300px]">Item</th>
            <th className="py-2 px-4 border w-[300px]">Name</th>
            <th className="py-2 px-4 border w-[300px]">Price</th>
            <th className="py-2 px-4 border w-[300px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <td className="py-2 px-2 border w-[150px]">
                  <img src={product.image_url} alt={product.name} className="w-20 h-20 mx-auto object-cover" />
                </td>
                <td className="py-2 px-2 border font-bold w-[300px] text-gray-600">{product.name}</td>
                <td className="py-2 px-2 border font-semibold text-gray-600">₹ {product.mrp.toFixed(2)} /-</td>
                <td className="py-2 px-2 border">
                  <button
                    className="bg-blue-500 border-2 p-2 text-white mr-2"
                    onClick={() => handleEdit(product._id)}
                  >
                    Edit
                    <BsFillPenFill className="inline ml-1 mb-1" />
                  </button>

                  <button
                    className="bg-red-500 border-2 p-2 text-white"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                    <MdDelete className="inline mb-1" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 ml-52">
            <h2 className="text-lg font-bold mb-4 text-pink-400 text-center">
              Are you sure you want to delete this product?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-green-300 text-gray-700 py-2 px-4 rounded hover:bg-green-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllProducts;
