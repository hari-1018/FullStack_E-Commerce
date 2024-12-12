import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { MdAdminPanelSettings, MdLocalShipping } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import axiosInstance from '../../api/axiosInstance';
import endPoints from '../../api/endPoints';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const fetchTotalProducts = async () => {
    try {
      const response = await axiosInstance.get(endPoints.ADMIN.GET_TOTAL_PRODUCTS);
      setTotalProducts(response.data.data[0].totalProducts);
    } catch (error) {
      console.error('Error fetching total products:', error);
    }
  };

  const fetchTotalCustomers = async () => {
    try {
      const response = await axiosInstance.get(endPoints.ADMIN.GET_TOTAL_USERS);
      setTotalCustomers(response.data.userCount[0].userCount);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchTotalOrders = async () => {
    try {
      const response = await axiosInstance.get(endPoints.ADMIN.GET_TOTAL_ORDERS);
      setTotalOrders(response.data.totalOrders[0].totalOrders);
    } catch (error) {
      console.error('Error fetching total orders:', error);
    }
  };

  const fetchTotalEarnings = async () => {
    try {
      const response = await axiosInstance.get(endPoints.ADMIN.GET_EARNINGS);
      setTotalEarnings(response.data.data[0].totalRevenue);
    } catch (error) {
      console.error('Error fetching total earnings:', error);
    }
  };

  const fetchRecentOrders = async () => {
    try {
      const response = await axiosInstance.get(endPoints.ADMIN.GET_RECENT_ORDER);
      setRecentOrders(response.data.data.orders);
    } catch (error) {
      console.error('Error fetching total earnings:', error);
    }
  };

  useEffect(() => {
    fetchTotalProducts();
    fetchTotalCustomers();
    fetchTotalOrders();
    fetchTotalEarnings();
    fetchRecentOrders();
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('adminToken'); // Replace with your actual token key
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login'; // Redirect to admin login page
  };

  const barData = {
    labels: ["Users", "Products", "Orders", "Earnings(In k)"],
    datasets: [
      {
        label: 'Statistics',
        data: [totalCustomers, totalProducts, totalOrders, totalEarnings / 1000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        barThickness: 75,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow p-8 bg-gray-100 mt-2 ml-0">
        <h1 className="text-3xl font-bold text-center text-pink-500 mb-1">
          Admin Dashboard
          <MdAdminPanelSettings className='ml-[700px] -mt-8' />
        </h1>

        <button
          onClick={handleLogoutClick}
          className="mt-6 font-bold bg-pink-400 text-white py-2 px-4 justify-center mb-4 rounded hover:bg-pink-500 w-24 ml-[510px]"
        >
          Logout
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-md shadow-md flex items-center space-x-4">
            <div>
              <h3 className="text-xl font-bold">Total Products<BsCartCheckFill className='ml-[140px] -mt-7 size-6' /></h3>
              <p className="text-3xl font-semibold">{totalProducts}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md flex items-center space-x-4">
            <div>
              <h3 className="text-xl font-bold">Total Customers<FaUsers className='ml-[165px] -mt-7 size-7' /></h3>
              <p className="text-3xl font-semibold">{totalCustomers}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md flex items-center space-x-4">
            <div>
              <h3 className="text-xl font-bold">Total Orders<MdLocalShipping className='ml-[125px] -mt-7 size-7' /></h3>
              <p className="text-3xl font-semibold">{totalOrders}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md flex items-center space-x-4">
            <div>
              <h3 className="text-xl font-bold">Total Earnings<GiMoneyStack className='ml-[140px] -mt-7 size-7' /></h3>
              <p className="text-3xl font-semibold">₹ {totalEarnings.toFixed(2)}/-</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-md shadow-md mb-6">
          <h3 className="text-xl font-bold mb-4">Sales Report</h3>
          <div className="h-96">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-md shadow-md mb-6">
          <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left">Ordered Date</th>
                <th className="px-4 py-2 text-left">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2 text-gray-700">{order._id}</td>
                  <td className="px-4 py-2 text-gray-700">{order.username}</td>
                  <td className="px-4 py-2 text-gray-700">{new Date(order.orderDate).toLocaleString()}</td>
                  <td className="px-4 py-2 text-gray-700 font-semibold">₹ {order.totalAmount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 ml-20">
            <h2 className="text-lg font-bold mb-4 text-pink-400 text-center">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleCancelLogout}
                className="bg-green-300 text-gray-700 py-2 px-4 rounded hover:bg-green-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
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

export default Dashboard;
