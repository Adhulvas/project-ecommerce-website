import logo from '../../assets/wolf.jpg'
import wishlist from '../../assets/wishlist-svgrepo-com.svg'
import cart from '../../assets/cart.svg'
import profile from '../../assets/profile.svg'
import search from '../../assets/search.svg'
import { Darkmode } from '../shared/Darkmode'
import { useFetchData } from '../../hooks/useFetch'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const Header = () => {
  const [categories, loading, error] = useFetchData("/category/get-categories");
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (categoryId) => setActiveCategory(categoryId);
  const handleMouseLeave = () => setActiveCategory(null);

  const handleSubcategoryClick = (categoryName, subcategoryName) => {
    navigate(`/categories/${encodeURIComponent(categoryName)}/${encodeURIComponent(subcategoryName)}`);
  };
  

  return (
    <div className="fixed top-0 left-0 w-full flex items-center bg-gray-900 px-8 py-4 z-50">
      <div className="flex-shrink-0 mr-8">
        <img src={logo} alt="logo" className="w-12 h-12 rounded-full object-cover" />
      </div>
      <ul className="flex space-x-12 text-white font-medium">
        {loading ? (
          <li className="text-gray-500">Loading...</li>
        ) : error ? (
          <li className="text-red-500">Error fetching categories</li>
        ) : (
          categories.map((category) => (
            <li
              key={category._id}
              className="dropdown dropdown-hover"
              onMouseEnter={() => handleMouseEnter(category._id)}
              onMouseLeave={handleMouseLeave}
            >
              <a className="text-white">{category.name}</a>
              <ul
                tabIndex={0}
                className={`dropdown-content menu bg-gray-800 rounded-box z-[1] w-52 p-2 shadow ${
                  activeCategory === category._id ? "block" : "hidden"
                }`}
                >
                {category.subcategories.map((subCategory) => (
                  <li key={subCategory._id}>
                    <a
                      className="text-white cursor-pointer"
                      onClick={() => handleSubcategoryClick(category.name,subCategory.name)}
                    >
                      {subCategory.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))
        )}
      </ul>
      <div className="flex items-center space-x-6 ml-auto">
        <div className="flex items-center border border-gray-500 rounded-full px-4 py-2 bg-gray-800">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow text-white outline-none bg-transparent placeholder-gray-400"
          />
          <img src={search} alt="" className="w-5 h-5 ml-2 cursor-pointer invert" />
        </div>
        <Darkmode />
        <img src={wishlist} alt="wishlist" className="w-6 cursor-pointer invert" />
        <img src={cart} alt="cart" className="w-6 cursor-pointer invert" />
        <img src={profile} alt="profile" className="w-5 cursor-pointer invert" />
      </div>
    </div>
  );
};



