import React, { useState, useEffect } from "react";
import logo from "../../assets/wolf.jpg";
import wishlist from "../../assets/wishlist-svgrepo-com.svg";
import cart from "../../assets/cart.svg";
import profile from "../../assets/profile.svg";
import search from "../../assets/search.svg";
import { Darkmode } from "../shared/Darkmode";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useFetchData } from "../../hooks/useFetch";
import toast from "react-hot-toast";
import hamburgerMenu from "../../assets/hamburgerMenu.svg";
import closeMenu from "../../assets/closeMenu.svg";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../redux/features/userSlice";

export const Header = () => {
  const [categories, loading, error] = useFetchData("/category/get-categories");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [activeCategory, setActiveCategory] = useState(null); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  const handleDropdownItemClick = () => {
    setDropdownOpen(false); 
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logoutUser = async () => {
    try {
      const response = await axiosInstance.put("/user/logout");
      dispatch(clearUserData())
      toast.success(response.data.message || "Logout successful");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">

        <div className={`flex items-center space-x-4 ${isMobile ? "justify-center w-full" : "space-x-4"}`}>
          {isMobile && (
            <div className="absolute left-4 flex items-center space-x-4">
              <button onClick={() => setMenuOpen((prev) => !prev)}>
                {menuOpen ? (
                  <img src={closeMenu} alt="Close Menu" className="w-6 h-6" />
                ) : (
                  <img src={hamburgerMenu} alt="Hamburger Menu" className="w-6 h-6" /> 
                )}
              </button>
              <img
                src={search}
                alt="Search Icon"
                className="w-6 h-6 cursor-pointer invert"
                onClick={() => console.log("Search clicked")}
              />
            </div>
          )}
          <img
            src={logo}
            alt="logo"
            className="w-12 h-12 rounded-full object-cover cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>


        {!isMobile && (
          <div className="hidden md:flex items-center flex-grow ml-8">
            <nav className="flex space-x-8">
              {loading ? (
                <span>Loading...</span>
              ) : error ? (
                <span>Error fetching categories</span>
              ) : (
                categories.map((category) => (
                  <div
                    key={category._id}
                    className="relative group hover:text-gray-300"
                    onMouseEnter={() => setActiveCategory(category._id)}
                    onMouseLeave={() => setActiveCategory(null)}
                  >
                    {category.name}

                    {activeCategory === category._id && (
                      <ul className="absolute top-full left-0 bg-gray-800 p-2 shadow-lg rounded-md z-10">
                        {category.subcategories.map((subCategory) => (
                          <li key={subCategory._id}>
                            <Link
                              to={`/categories/${category.name}/${subCategory.name}`}
                              className="block px-4 py-2 hover:bg-gray-700"
                            >
                              {subCategory.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              )}
            </nav>
            <div className="flex items-center border border-gray-500 rounded-full px-4 py-2 bg-gray-800 max-w-60 flex-grow ml-8">
              <input
                type="text"
                placeholder="Search"
                className="flex-grow text-white bg-transparent placeholder-gray-400 outline-none"
              />
              <img
                src={search}
                alt="search"
                className="w-5 h-5 ml-2 cursor-pointer invert"
              />
            </div>
          </div>
        )}


        <div className="flex items-center space-x-4 relative">
          <Darkmode />
          {!isMobile && (
            <>
              <Link to="/user/wishlist">
                <img
                  src={wishlist}
                  alt="wishlist"
                  className="w-6 h-6 cursor-pointer filter invert"
                />
              </Link>
              <Link to="/user/cart">
                <img
                  src={cart}
                  alt="cart"
                  className="w-6 h-6 cursor-pointer filter invert"
                />
              </Link>
            </>
          )}
          <div className="relative">
            <img
              src={profile}
              alt="profile"
              className="w-5 h-5 cursor-pointer filter invert"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
            {dropdownOpen && (
              <ul className="absolute right-0 bg-gray-800 text-white rounded-md shadow-lg w-48 mt-2 z-10">
                <li>
                  <Link
                    to="/user/profile/overview"
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={handleDropdownItemClick}
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user/profile/orders"
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={handleDropdownItemClick}
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user/wishlist"
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={handleDropdownItemClick}
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logoutUser}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 p-8 z-50">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 text-white text-xl"
          >
            ✕
          </button>

          <nav className="mt-16">
            {loading ? (
              <span>Loading...</span>
            ) : error ? (
              <span>Error fetching categories</span>
            ) : (
              categories.map((category) => (
                <div key={category._id}>
                  <div
                    className="block py-4 text-white text-lg border-b border-gray-700 cursor-pointer"
                    onClick={() => {
                      setActiveCategory(activeCategory === category._id ? null : category._id);
                    }}
                  >
                    {category.name}
                  </div>
                  {activeCategory === category._id && (
                    <div className="pl-4 mt-2">
                      {category.subcategories.map((subCategory) => (
                        <Link
                          key={subCategory._id}
                          to={`/categories/${category.name}/${subCategory.name}`}
                          className="block py-2 text-white hover:bg-gray-700"
                          onClick={() => setMenuOpen(false)} 
                        >
                          {subCategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </nav>

          <div className="flex flex-col items-center mt-8">
            <Link to="/user/wishlist" 
              className="flex items-center w-full py-3 text-white hover:bg-gray-700"
              onClick={() => setMenuOpen(false)}>
              <img src={wishlist} alt="wishlist" className="w-6 h-6 mr-2 filter invert" />
              Wishlist
            </Link>
            <Link to="/user/cart" 
              className="flex items-center w-full py-3 mt-4 text-white hover:bg-gray-700"
              onClick={() => setMenuOpen(false)}>
              <img src={cart} alt="cart" className="w-6 h-6 mr-2 filter invert" />
              Cart
            </Link>
            <button
              onClick={logoutUser}
              className="block w-full py-3 mt-4 text-center bg-red-600 hover:bg-red-700 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};