import React, { useEffect, useState } from "react";
import { AddAddress } from "../../../components/user/AddAddress";
import { EditAddress } from "../../../components/user/EditAddress";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../config/axiosInstance";
import editIcon from "../../../assets/edit.svg";
import removeIcon from "../../../assets/delete.svg";

export const Address = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(null);

  const fetchAddresses = async () => {
    try {
      const response = await axiosInstance.get("/user/profile");
      setAddresses(response.data.data.addresses || []);
    } catch (error) {
      toast.error("Failed to fetch addresses.");
    }
  };

  const handleAddAddress = async (newAddress) => {
    try {
      const response = await axiosInstance.post("/user/add-address", { address: newAddress });
      setAddresses((prev) => [...prev, response.data.data[0]]); 
      toast.success("Address added successfully.");
    } catch (error) {
      toast.error("Failed to add address.");
    } finally {
      setAddModalOpen(false); 
    }
  };


  const handleUpdateAddress = async (updatedAddress) => {
    try {
      const response = await axiosInstance.put(`/user/update-address/${updatedAddress._id}`, updatedAddress);
      setAddresses((prev) =>
        prev.map((address) => (address._id === updatedAddress._id ? response.data.data : address))
      );
      toast.success("Address updated successfully.");
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed to update address.");
    }finally {
      setEditModalOpen(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await axiosInstance.delete(`/user/delete-address/${addressId}`);
      setAddresses((prev) => prev.filter((address) => address._id !== addressId));
      toast.success("Address deleted successfully.");
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address.");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-white rounded shadow-md mt-10">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Addresses</h1>
      <div className="bg-gray-100 p-4 md:p-6 rounded flex flex-col items-center justify-center mb-6">
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <p className="text-gray-500 mb-6">You have no addresses yet.</p>
      ) : (
        <ul className="space-y-4">
          {addresses.map((address) => (
            <li key={address._id} className="border p-4 rounded shadow-sm">
              <p className="font-semibold">{address.addressTitle}</p>
              <p>
                {address.addressLine1}, {address.city}, {address.state}, {address.country} - {address.pincode}
              </p>
              <div className="flex justify-end mt-2 space-x-2">
                <button onClick={() => setCurrentAddress(address) || setEditModalOpen(true)}>
                  <img src={editIcon} alt="Edit" className="w-5 h-5" />
                </button>
                <button onClick={() => handleDeleteAddress(address._id)}>
                  <img src={removeIcon} alt="Delete" className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isAddModalOpen && <AddAddress onClose={() => setAddModalOpen(false)} onAddAddress={handleAddAddress} />}
      {isEditModalOpen && (
        <EditAddress
          onClose={() => setEditModalOpen(false)}
          address={currentAddress}
          onUpdateAddress={handleUpdateAddress}
        />
      )}
    </div>
  );
};