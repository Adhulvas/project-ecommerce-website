import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/wolf.jpg";
import { Darkmode } from "../shared/Darkmode";
import { Link, useNavigate } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";
import { FaRegUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";


export const LogoutHeader = () => {
  const [categories, loading, error] = useFetchData("/category/get-categories");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [activeCategory, setActiveCategory] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [isSearchPanelVisible, setIsSearchPanelVisible] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false); 
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside); 
    return () => {
      window.removeEventListener("click", handleClickOutside); 
    };
  }, []);

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

  const handleSearch = async (term) => {
    setSearchTerm(term); 
    if (term) {
      try {
        const response = await axiosInstance.get(`/product/search?search=${term}`);
        setSearchResults(response.data);
        setIsPanelVisible(true); 
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
        setIsPanelVisible(true); 
      }
    } else {
      setSearchResults([]); 
      setIsPanelVisible(false); 
    }
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">

        <div className={`flex items-center space-x-4 ${isMobile ? "justify-center w-full" : "space-x-4"}`}>

          {isMobile && (
            <div className="absolute left-4 flex items-center">
              <button onClick={() => setMenuOpen((prev) => !prev)}>
                {menuOpen ? <AiOutlineClose /> : <GiHamburgerMenu  className="text-2xl mr-3"/>}
              </button>
              <button onClick={() => setIsSearchPanelVisible(true)}>
                <IoSearch className="text-2xl"/>
              </button>
            </div>
          )}

          {isSearchPanelVisible && (
            <div className="fixed top-0 left-0 w-full h-full bg-white p-4 z-50 flex flex-col !ml-0">
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-grow text-black bg-transparent placeholder-gray-500 outline-none"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <button onClick={() => {
                  setSearchResults([]);
                  setIsSearchPanelVisible(false);
                }} className="text-black">
                  <AiOutlineClose className="text-xl"/>
                </button>
              </div>
              <div className="overflow-y-auto h-full">
                {searchTerm ? (
                  searchResults.length > 0 ? (
                    <ul>
                      {searchResults.map((product) => (
                        <li key={product._id} className="py-4 flex border-b border-gray-600">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-20 h-20 object-cover mr-4"
                          />
                          <div className="flex-grow">
                            <Link
                              to={`/productDetails/${product._id}`}
                              className="text-black hover:underline text-lg font-semibold"
                              onClick={() => {
                                setIsSearchPanelVisible(false);
                              }}
                            >
                              {product.name}
                            </Link>
                            <p className="text-black text-sm">{product.description}</p>
                            <p className="text-black font-bold mt-1">
                              ₹{parseFloat(product.price.replace(/,/g, '')).toFixed(2)}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-black">No results found.</p>
                  )
                ) : null}
              </div>
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
            <div className="flex items-center border border-gray-500 rounded-full px-4 py-2 bg-gray-800 max-w-60 flex-grow    ml-8">
              <input
                type="text"
                placeholder="Search"
                className="flex-grow text-white bg-transparent placeholder-gray-500 outline-none"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <IoSearch className="text-2xl"/>
            </div>
              {isPanelVisible && (
                <div className="search-panel">
                  <div className="fixed top-16 left-0 w-full h-[80vh] bg-white p-4 overflow-y-auto z-50">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-black text-lg">Related Products:</h2>
                      <button 
                        onClick={() => {
                          setSearchResults([]); 
                          setIsPanelVisible(false); 
                        }} 
                        className="text-black"
                      >
                        <AiOutlineClose className="text-2xl"/>
                      </button>
                    </div>
                    {searchResults.length > 0 ? (
                      <ul>
                        {searchResults.map((product) => (
                          <li key={product._id} className="py-4 flex border-b border-gray-600">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-20 h-20 object-cover mr-4" 
                            />
                            <div className="flex-grow">
                              <Link
                                to={`/productDetails/${product._id}`}
                                className="text-black hover:underline text-lg font-semibold"
                                onClick={() => { 
                                  setIsPanelVisible(false); 
                                }}
                              >
                                {product.name}
                              </Link>
                              <p className="text-black text-sm">{product.description}</p>
                              <p className="text-black font-bold mt-1">
                                ₹{parseFloat(product.price.replace(/,/g, '')).toFixed(2)}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-black">No results found.</p>
                    )}
                  </div>
                </div>
              )}
          </div>
        )}


        <div className="flex items-center space-x-4 relative">
          <Darkmode />
          <div className="relative" ref={dropdownRef}>
            <FaRegUser className="text-xl" onClick={() => setDropdownOpen((prev) => !prev)}/>
            {dropdownOpen && (
              <ul className="absolute right-0 bg-gray-800 text-white rounded-md shadow-lg w-48 mt-2 z-10">
                <li>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={()=>{
                      handleDropdownItemClick();
                    }}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={()=>{
                      handleDropdownItemClick();
                    }}
                  >
                    Signup
                  </Link>
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
            <AiOutlineClose className="text-2xl"/>
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
                    onClick={() => handleCategoryClick(category._id)}
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
          <div className="mt-8">
            <Link
              to="/login"
              className="block w-full py-3 text-center bg-black text-white rounded-md hover:bg-gray-700"
              onClick={() => {
                setMenuOpen(false);
                navigate("/login");
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block w-full py-3 mt-4 text-center bg-white text-black rounded-md border border-gray-700 hover:bg-gray-200"
              onClick={() => {
                setMenuOpen(false);
                navigate("/signup");
              }}
            >
              Register Here
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
