import React, { useEffect, useState } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { axiosInstance } from '../../config/axiosInstance';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const SellerDashBoard = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/seller/orders');
        setOrders(response.data.orders);
      } catch (err) {
        console.log('Failed to fetch orders. Please try again.');
      }
    };

    fetchOrders();
  }, []);

  const pendingOrdersCount = orders.filter((order) => order.status === 'Pending').length;
  const shippedOrdersCount = orders.filter((order) => order.status === 'Shipped').length;
  const returnedOrdersCount = orders.filter((order) => order.status === 'Returned').length;

  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Page Views',
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Clicks',
        data: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Data for Donut Chart
  const donutData = {
    labels: ['Direct', 'Referral', 'Social'],
    datasets: [
      {
        label: 'Traffic Sources',
        data: [55, 25, 20],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-20">
      {/* Alert Banner */}
      <div className="bg-orange-100 text-orange-800 p-4 rounded mb-6">
        Welcome to the Seller Dashboard.
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-600">Total Orders</p>
          <h3 className="text-2xl font-bold">{orders.length}</h3>
          <p className="text-green-500 text-sm">▲ 2.3% Last Week</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-600">Pending Orders</p>
          <h3 className="text-2xl font-bold">{pendingOrdersCount}</h3>
          <p className="text-green-500 text-sm">▲ 8.1% Last Month</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-600">Delivered Orders</p>
          <h3 className="text-2xl font-bold">{shippedOrdersCount}</h3>
          <p className="text-red-500 text-sm">▼ 0.3% Last Month</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-600">Returned Orders</p>
          <h3 className="text-2xl font-bold">{returnedOrdersCount}</h3>
          <p className="text-red-500 text-sm">▼ 10.6% Last Month</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Performance</h2>
          <Bar data={performanceData} />
        </div>

        {/* Donut Chart */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Conversions</h2>
          <Doughnut data={donutData} />
        </div>
      </div>
    </div>
  );
};

