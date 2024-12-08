import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SideBar = ({ isOpen }) => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);


  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  return (
    <div
      className={`bg-gray-900 text-white w-64 h-screen fixed top-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-center h-16 bg-gray-800 text-2xl font-bold">
        Larkon
      </div>
      <nav className="flex-grow mt-4">
        <ul>
          <li className="py-2 px-4 hover:bg-gray-800">
            <Link to="/seller/dashboard" className="flex items-center">
              <i className="fas fa-chart-line mr-3"></i> Dashboard
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={toggleCategoryDropdown}
              className="flex items-center py-2 px-4 w-full text-left hover:bg-gray-800"
            >
              <i className="fas fa-list mr-3"></i> Category
              <i className={`fas fa-chevron-down ml-auto ${isCategoryDropdownOpen ? 'transform rotate-180' : ''}`}></i>
            </button>
            {isCategoryDropdownOpen && (
              <ul className="bg-gray-800 ml-6 mt-2 rounded-lg shadow-lg">
                <li className="py-2 px-4 hover:bg-gray-700">
                  <Link to="/seller/category/list" className="flex items-center">
                    List
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="relative">
            <button
              onClick={toggleProductDropdown}
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
                    Details
                  </Link>
                </li>
                <li className="py-2 px-4 hover:bg-gray-700">
                  <Link to="/seller/products/edit" className="flex items-center">
                    Edit
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
            <Link to="/orders" className="flex items-center">
              <i className="fas fa-shopping-cart mr-3"></i> Orders
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};




