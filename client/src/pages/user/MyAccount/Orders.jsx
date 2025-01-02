import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosInstance';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/order/get-orders');
        setOrders(response.data.orders); 
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);


  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-500';
      case 'Processing':
        return 'text-blue-500';
      case 'Shipped':
        return 'text-lightblue-500'; 
      case 'Delivered':
        return 'text-green-500';
      case 'Cancelled':
        return 'text-red-500';
      case 'Returned':
        return 'text-purple-500'; 
      default:
        return 'text-gray-500'; 
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-16">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">My Orders</h1>
      {loading ? (
        <p className="text-gray-700 text-center">Loading...</p>
      ) : orders.length > 0 ? (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="p-4 bg-white rounded shadow">
                <p className="text-sm md:text-base text-gray-500">
                  Placed On: {new Date(order.createdAt).toLocaleString()} <span className={`font-semibold ${getStatusColor(order.status)}`}>{order.status}</span>
                </p>
              <div className="mt-4 space-y-4">
                {order.items.map((item) => {
                  const { productId, price, quantity } = item;
                  const description = productId?.description || 'Description not available';
                  const imageUrl =
                    productId?.images && productId.images.length > 0
                      ? productId.images[0]
                      : 'https://via.placeholder.com/64';

                  return (
                    <div
                      key={productId?._id || item._id}
                      className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4"
                    >
                      <img
                        src={imageUrl}
                        alt={description}
                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded"
                      />
                      <div className="flex-1 text-center md:text-left">
                        <p className="font-semibold text-gray-800">{description}</p>
                        <p className="text-gray-600">Price: ₹{price?.toFixed(2) || 'N/A'}</p>
                        <p className="text-gray-600">Quantity: {quantity || 0}</p>
                      </div>
                      <button
                        className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                        onClick={() =>
                          navigate(`/rate-review/${productId?._id}`, {
                            state: {
                              productDetails: {
                                name: description,
                                image: imageUrl,
                              },
                            },
                          })
                        }
                      >
                        Rate & Review Product
                      </button>
                    </div>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-gray-700 text-center">No orders found.</p>
      )}
    </div>
  );
};