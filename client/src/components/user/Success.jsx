import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-28">
      <h1 className="text-2xl font-bold mb-4 text-green-600">Payment Successful!</h1>
      <p className="text-gray-600">Thank you for your purchase! Your order has been confirmed.</p>
      <button
        onClick={() => navigate('/user/profile/orders')}
        className="mt-4 py-2 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
      >
        View My Orders
      </button>
    </div>
  );
};