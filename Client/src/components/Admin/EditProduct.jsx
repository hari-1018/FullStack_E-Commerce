import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../api/axiosInstance';
import endPoints from '../../api/endPoints';

function EditProduct() {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(endPoints.ADMIN.GET_SINGLE_PRODUCT(id));
      setProduct(response.data.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['price', 'discount', 'stars', 'quantity', 'stock', 'mrp'].includes(name)) {
      setProduct({ ...product, [name]: Number(value) });
    } else if (name === 'in_stock') {
      setProduct({ ...product, [name]: value === 'true' });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(endPoints.ADMIN.EDIT_PRODUCT(id), product);
      navigate('/admin/all-products');
      toast.success(
        <div style={{ backgroundColor: '#ffe5b4', border: '1px solid #ffcc00', borderRadius: '8px', padding: '10px' }}>
          <span style={{ fontWeight: 'bold', color: 'black' }}>Updated Product Successfully! 👍</span>
        </div>
      );
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-8 bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md mt-2">
        <h1 className="text-2xl font-bold text-center text-pink-500 mb-4">Edit Product</h1>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={product.name || ''}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Description:</label>
          <textarea
            name="description"
            value={product.description || ''}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">₹ Price:</label>
          <input
            type="number"
            name="price"
            value={product.price || ''}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Image URL:</label>
          <input
            type="text"
            name="image_url"
            value={product.image_url || ''}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Flip Image URL:</label>
          <input
            type="text"
            name="flip_image_url"
            value={product.flip_image_url || ''}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">In Stock:</label>
          <select
            name="in_stock"
            value={product.in_stock ? 'true' : 'false'}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Additional Details:</label>
          <input
            type="text"
            name="additional_details"
            value={product.additional_details || ''}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-gray-700"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition duration-300"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
