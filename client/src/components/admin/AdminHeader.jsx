import React, { useEffect, useRef, useState } from "react";
import logo from '../../assets/wolf.jpg'
import { FaRegUserCircle } from "react-icons/fa";

export const AdminHeader = ({ toggleSidebar }) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
    const dropdownRef = useRef(null);
  
    const handleDropdownToggle = () => {
      setIsDropdownOpen((prev) => !prev); 
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
  
    const handleOptionClick = () => {
      setIsDropdownOpen(false);
    };
  
    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);

  return (
    <div className="navbar bg-slate-300 fixed top-0 left-0 w-full z-10 shadow">
      <div className="navbar-start">
        <div
          role="button"
          tabIndex={0}
          className="btn btn-ghost btn-circle"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
      </div>
      <div className="navbar-center">
        <img src={logo} alt="" className="w-12 h-12 rounded-full object-cover cursor-pointer" />
      </div>
      <div className="navbar-end" ref={dropdownRef}>
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <button className="btn btn-ghost btn-circle" onClick={handleDropdownToggle}>
          <FaRegUserCircle  className="h-5 w-5" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-6 mt-32 w-48 bg-white border rounded shadow-lg">
            <ul className="py-1">
              <li>
                <a 
                href="/admin/login" 
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={handleOptionClick}>Login</a>
              </li>
              <li>
                <a 
                href="/admin/signup" 
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={handleOptionClick}>Signup</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
