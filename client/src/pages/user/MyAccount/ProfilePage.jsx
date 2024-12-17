import React from "react";
import toast from "react-hot-toast";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../config/axiosInstance";

export const ProfilePage = () => {

  const navigate=useNavigate()
  const logoutUser = async () => {
    try {
      const response = await axiosInstance.put('/user/logout');
      toast.success(response.data.message || "Logout successful");
      navigate("/");
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen mt-5">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-100 px-4 py-6 flex-shrink-0">
        <h2 className="text-xl font-bold mb-6">My Account</h2>
        <ul className="space-y-4">
          <li>
            <Link to="overview" className="flex items-center text-gray-700 hover:text-blue-500">
              <span className="mr-2">👤</span> Account Overview
            </Link>
          </li>
          <li>
            <Link to="orders" className="flex items-center text-gray-700 hover:text-blue-500">
              <span className="mr-2">📦</span> My Orders
            </Link>
          </li>
          <li>
            <Link to="/user/wishlist" className="flex items-center text-gray-700 hover:text-blue-500">
              <span className="mr-2">❤️</span> Wishlist
            </Link>
          </li>
          <li>
            <Link to="address" className="flex items-center text-gray-700 hover:text-blue-500">
              <span className="mr-2">🏠</span> Addresses
            </Link>
          </li>
          <li>
            <Link to="settings" className="flex items-center text-gray-700 hover:text-blue-500">
              <span className="mr-2">⚙️</span> Account Settings
            </Link>
          </li>
        </ul>
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2">Need Help?</h3>
          <button className="text-red-500 hover:underline" onClick={() => logoutUser()}>
            Logout
          </button>
        </div>
      </div>


      <div className="w-full md:w-3/4 bg-white p-4 md:p-8 flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

