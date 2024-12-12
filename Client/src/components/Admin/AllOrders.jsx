import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import endPoints from '../../api/endPoints';
const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(endPoints.ADMIN.GET_ALL_ORDERS); 
        console.log("getting orders", response.data.data)
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);


  console.log("Orders", orders)

  return (
    <div className="p-8 bg-gray-100 ">
      <h1 className="text-3xl font-bold text-center text-pink-500 mt-12 mb-4">All Orders</h1>
      <table className="bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Username</th>
            <th className="py-2 px-4 border">Order ID</th>
            <th className="py-2 px-4 border">Ordered Items</th>
            <th className="py-2 px-4 border">Total Amount</th>
            <th className="py-2 px-4 border">Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border w-[150px] text-gray-600">{order.userID?.username}</td>
              <td className="py-2 px-4 border w-[200px] text-gray-600">{order.orderID}</td>
              <td className="py-2 px-4 border w-[350px] text-gray-600">
                {order.products.map(item => (
                  <div key={item._id} className="flex items-center mb-1">
                    <span>{item.productID.name} (Qty: {item.quantity})</span>
                  </div>
                ))}
              </td>
              <td className="py-2 px-4 border w-[200px] text-gray-600 font-semibold">₹ {order.totalAmount.toFixed(2)} /-</td>
              <td className="py-2 px-4 border w-[200px] text-gray-600">{new Date(order.orderedDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
