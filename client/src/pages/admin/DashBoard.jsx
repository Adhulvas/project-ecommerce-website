import React from "react";

export const DashBoard = () => {
  return (
    <div className="bg-gray-100 min-h-screen pt-16 pl-64">
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-gray-700 text-lg font-bold">Total Orders</h3>
            <p className="text-orange-500 text-3xl font-semibold">13,647</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-gray-700 text-lg font-bold">New Leads</h3>
            <p className="text-orange-500 text-3xl font-semibold">9,526</p>
          </div>
        </div>

        <div className='bg-white shadow rounded-lg p-8'>
          <h2 className='text-gray-700 font-bold text-xl mb-4'>Performance</h2>
          <div className='h-48 bg-gray-100 rounded-lg flex items-center justify-center'>
            <p className='text-gray-500'>Performance Chart Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
};