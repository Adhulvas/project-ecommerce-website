import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { axiosInstance } from '../../config/axiosInstance';

export const Success = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get('/cart/get-cartItems');
        const { items, totalPrice } = response.data;

        setCartItems(items);
        setTotalAmount(totalPrice);
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast.error("Failed to fetch cart data.");
      }
    };

    fetchCart();
  }, []);


  const clearCartAfterPayment = async () => {
    try {
      const response = await axiosInstance.delete('/cart/clear-cart');
      console.log(response.data?.message || "Cart cleared successfully");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error(error.response?.data?.message || "Failed to clear cart");
    }
  };

  
  const handleOrderCreation = async () => {
    try {
      const formattedCartItems = cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: parseFloat(item.price.replace(/,/g, '').trim()), 
        images: item.images 
      }));
  

      const orderData = {
        items: formattedCartItems,
        totalAmount: parseFloat(totalAmount.replace(/,/g, '').trim()), 
      };
  
      console.log('Order data being sent:', orderData); 
  

      const response = await axiosInstance.post('/order/create-order', orderData);
      console.log('Order created successfully:', response.data);

      await clearCartAfterPayment();
    } catch (error) {
      console.error('Error creating order:', error); 
    }
  };
  

  useEffect(() => {
    if (cartItems.length > 0) {
      handleOrderCreation(); 
    }
  }, [cartItems]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
    <p className="mt-4 text-lg text-gray-700">Thank you for your purchase. Your order is being processed.</p>
    <div className="mt-6">
      <button
        onClick={() => navigate('/user/profile/orders')}
        className="px-6 py-2 mr-4 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
      >
        View Orders
      </button>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 text-white bg-green-500 rounded hover:bg-green-600 transition duration-200"
      >
        Go Back to Home
      </button>
    </div>
  </div>
);
};