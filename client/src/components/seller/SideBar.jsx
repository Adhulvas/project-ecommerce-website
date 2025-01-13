import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggleProductDropdown } from "../../redux/features/dropdownSlice";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const SideBar = ({ isOpen }) => {
  const dispatch = useDispatch()
  const isProductDropdownOpen = useSelector((state)=>state.dropdown.isProductDropdownOpen)

  const navigate = useNavigate()


  const handleLogout = async () => {
    try {
      const response = await axiosInstance.put('/seller/logout');
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/seller/login')
      } else {
        toast.error(response.data.message || "Unexpected response from the server.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred during logout.";
      toast.error(errorMessage);
    }
  };

  return (
    <div
      className={`bg-gray-900 text-white w-64 h-screen fixed top-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } transition-transform duration-300 ease-in-out`}
    >
      <nav className="flex-grow pt-20">
        <ul>
          <li className="py-2 px-4 hover:bg-gray-800">
            <Link to="/seller/dashboard" className="flex items-center">
              <i className="fas fa-chart-line mr-3"></i> Dashboard
            </Link>
          </li>

          <li className="relative">
            <button
              onClick={()=>dispatch(toggleProductDropdown())}
              className="flex items-center py-2 px-4 w-full text-left hover:bg-gray-800"
            >
              <i className="fas fa-box mr-3"></i> Products
              <i className={`fas fa-chevron-down ml-auto ${isProductDropdownOpen ? 'transform rotate-180' : ''}`}></i>
            </button>
            {isProductDropdownOpen && (
              <ul className="bg-gray-800 ml-6 mt-2 rounded-lg shadow-lg">
                <li className="py-2 px-4 hover:bg-gray-700">
                  <Link to="/seller/products/list" className="flex items-center">
                    List
                  </Link>
                </li>
                <li className="py-2 px-4 hover:bg-gray-700">
                  <Link to="/seller/products/create" className="flex items-center">
                    Create
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="py-2 px-4 hover:bg-gray-800">
            <Link to="/seller/order-management" className="flex items-center">
              <i className="fas fa-chart-line mr-3"></i> Order Management
            </Link>
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 w-full p-4">
        <button
          onClick={handleLogout}
          className="bg-white text-black py-2 px-4 w-full rounded hover:bg-red-500 hover:text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};




