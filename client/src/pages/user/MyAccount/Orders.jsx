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

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-16">
      <h1 className="text-3xl font-bold mb-4">My Orders</h1>
      {loading ? (
        <p className="text-gray-700">Loading...</p>
      ) : orders.length > 0 ? (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="p-4 bg-white rounded shadow">
              <p className="text-gray-500">Placed On: {new Date(order.createdAt).toLocaleString()}</p>
              <div className="mt-4 space-y-4">
                {order.items.map((item) => {
                  const { productId, price, quantity } = item;
                  const description = productId?.description || 'Description not available';
                  const imageUrl =
                    productId?.images && productId.images.length > 0
                      ? productId.images[0] 
                      : 'https://via.placeholder.com/64'; 

                  return (
                    <div key={productId?._id || item._id} className="flex items-center space-x-4">
                      <img
                        src={imageUrl}
                        alt={description}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{description}</p>
                        <p className="text-gray-600">Price: ₹{price?.toFixed(2) || 'N/A'}</p>
                        <p className="text-gray-600">Quantity: {quantity || 0}</p>
                      </div>
                      <button
                        className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                        onClick={() => 
                          navigate(`/rate-review/${productId?._id}`,{
                            state: {
                              productDetails: {
                                name:description,
                                image:imageUrl,
                              }
                            }}
                          )}
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
        <p className="mt-4 text-gray-700">No orders found.</p>
      )}
    </div>
  );
};