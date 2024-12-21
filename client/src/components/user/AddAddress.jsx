import React from "react";
import { AddressForm } from "./AddressForm";


export const AddAddress = React.memo(({ onClose, onAddAddress }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-hidden">
      <div className="flex justify-between items-center border-b pb-3 bg-white px-4 pt-4">
        <h2 className="text-xl font-bold">Add New Address</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <span className="text-3xl">&times;</span>
        </button>
      </div>
      <div className="p-6 overflow-auto max-h-[70vh]">
        <AddressForm onSubmit={onAddAddress} />
      </div>
    </div>
  </div>
));