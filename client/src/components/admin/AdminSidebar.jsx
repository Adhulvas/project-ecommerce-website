import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleCategoryDropdown } from "../../redux/features/dropdownSlice";

export const AdminSidebar = ({ isOpen }) => {
  const dispatch = useDispatch()
  const { isCategoryDropdownOpen } = useSelector((state)=>state.dropdown)

  return (
    <div
      className={`bg-gray-900 text-white w-64 h-screen fixed top-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } transition-transform duration-300 ease-in-out`}
    >
      <nav className="flex-grow pt-20">
        <ul>
          <li className="py-2 px-4 hover:bg-gray-800">
            <Link to="/admin/dashboard" className="flex items-center">
              <i className="fas fa-chart-line mr-3"></i> Dashboard
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={()=>dispatch(toggleCategoryDropdown())}
              className="flex items-center py-2 px-4 w-full text-left hover:bg-gray-800"
            >
              <i className="fas fa-list mr-3"></i> Category
              <i className={`fas fa-chevron-down ml-auto ${isCategoryDropdownOpen ? 'transform rotate-180' : ''}`}></i>
            </button>
            {isCategoryDropdownOpen && (
              <ul className="bg-gray-800 ml-6 mt-2 rounded-lg shadow-lg">
                <li className="py-2 px-4 hover:bg-gray-700">
                  <Link to="/admin/category/list" className="flex items-center">
                    List
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="py-2 px-4 hover:bg-gray-800">
            <Link to="/admin/products/list" className="flex items-center">
              <i className="fas fa-chart-line mr-3"></i> Products
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};