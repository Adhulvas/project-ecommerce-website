import React from "react";

export const Address = () => {
  return (
    <div className="p-4 md:p-8 bg-white rounded shadow-md mt-10">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Addresses</h1>
      <p className="text-gray-500 mb-6">You have no addresses yet.</p>

      <div className="bg-gray-100 p-4 md:p-6 rounded flex flex-col items-center justify-center">
        <button className="text-3xl md:text-4xl text-gray-500 mb-2 md:mb-4">+</button>
        <button className="text-blue-500 font-semibold hover:underline">
          Add New Address
        </button>
      </div>
    </div>
  );
};

