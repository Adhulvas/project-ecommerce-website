import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-28">
      <h1 className="text-2xl font-bold mb-4">Payment Canceled</h1>
      <p className="text-gray-600">Your payment has been canceled. Please try again.</p>
      <button
        onClick={() => navigate('/user/cart')}
        className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Return to Cart
      </button>
    </div>
  );
};

