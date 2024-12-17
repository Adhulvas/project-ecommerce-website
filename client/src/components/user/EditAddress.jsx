import React from "react";
import { AddressForm } from "./AddressForm";


export const EditAddress = React.memo(({ onClose, address, onUpdateAddress }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4">Edit Address</h2>
      <AddressForm defaultValues={address} onSubmit={onUpdateAddress} onClose={onClose} />
    </div>
  </div>
));