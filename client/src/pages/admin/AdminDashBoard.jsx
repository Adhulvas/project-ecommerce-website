import React from 'react';

export const AdminDashBoard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Manage your products, track orders, and view sales reports all in one place.
        </p>
      </div>
    </div>
  );
};