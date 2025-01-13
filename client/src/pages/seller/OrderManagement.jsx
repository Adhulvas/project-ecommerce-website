import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';

export const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/seller/orders');
        setOrders(response.data.orders);
      } catch (err) {
        setError('Failed to fetch orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axiosInstance.put(`/order/${orderId}/status`, {
        status: newStatus,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      toast.error('Failed to update order status. Please try again.');
    }
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const truncateOrderId = (orderId) => {
    return `${orderId.slice(0, 4)}${orderId.slice(-4)}`;
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="mt-28 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Order Management</h1>
        <span className="text-lg font-semibold">Total Orders: {orders.length}</span>
      </div>
      <div className="bg-white p-4 rounded shadow-md">
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Product Image</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                {order.items.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`bg-gray-50 hover:bg-gray-100 transition-colors duration-200 ${
                      index === 0 ? 'border-t-2' : ''
                    }`}
                  >
                    {index === 0 && (
                      <td
                        className="border p-2"
                        rowSpan={order.items.length}
                        style={{ verticalAlign: 'middle' }}
                      >
                        {truncateOrderId(order._id)}
                      </td>
                    )}
                    <td className="border p-2 text-center">
                      <img
                        src={item.productId.images[0]}
                        alt={item.productId.description}
                        className="w-16 h-16 object-cover rounded mx-auto"
                      />
                    </td>
                    <td className="border p-2">{item.productId.description}</td>
                    {index === 0 && (
                      <>
                        <td
                          className="border p-2"
                          rowSpan={order.items.length}
                          style={{ verticalAlign: 'middle' }}
                        >
                          {order.userId?.name}
                        </td>
                        <td
                          className="border p-2"
                          rowSpan={order.items.length}
                          style={{ verticalAlign: 'middle' }}
                        >
                          {new Date(order.createdAt).toLocaleString()}
                        </td>
                        <td
                          className="border p-2"
                          rowSpan={order.items.length}
                          style={{ verticalAlign: 'middle' }}
                        >
                          ₹{calculateTotalPrice(order.items).toLocaleString()}
                        </td>
                        <td
                          className="border p-2"
                          rowSpan={order.items.length}
                          style={{ verticalAlign: 'middle' }}
                        >
                          {order.status}
                        </td>
                        <td
                          className="border p-2"
                          rowSpan={order.items.length}
                          style={{ verticalAlign: 'middle' }}
                        >
                          <select
                            className="border p-2 rounded"
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Returned">Returned</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};