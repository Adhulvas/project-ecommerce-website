// import React from "react";
// import { useFetchData } from "../../hooks/useFetch";
// import { Link } from "react-router-dom";

// export const ListCategories = () => {
//   const [categories, loading, error] = useFetchData("/category/get-categories");

//   const colors = [
//     'bg-amber-200',
//     'bg-cyan-200',
//     'bg-emerald-200',
//     'bg-lime-200',
//     'bg-purple-200'
//   ];

//   if (loading) {
//     return <p className='text-center'>Loading...</p>;
//   }

//   if (error) {
//     return <p className='text-center text-red-500'>{error}</p>;
//   }

//   return (
//     <div className='p-8 mt-16'>
//       <div className='flex justify-between items-center mb-6'>
//         <h2 className='text-2xl font-bold text-gray-800'>Categories</h2>
//         <div className="space-x-4">
//           <Link
//               to='/admin/category/create' 
//               className='bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-300'
//             >
//             Add Category
//           </Link>
//           <Link
//               to="/admin/category/create"
//               className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition duration-300"
//             >
//               Add Subcategory
//           </Link>
//         </div>
//       </div>


//       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center'>
//         {categories.map((category, index) => (
//           <div key={category._id} className={`${colors[index % colors.length]} shadow-md rounded-lg p-4 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer`}>
//             <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };



import React, { useState } from "react";
import { useFetchData } from "../../hooks/useFetch";

export const ListCategories = () => {
  const [categories, loading, error] = useFetchData("/category/get-categories");
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleToggle = (categoryId) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const colors = [
    "bg-amber-200",
    "bg-cyan-200",
    "bg-emerald-200",
    "bg-lime-200",
    "bg-purple-200",
  ];

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8 mt-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={category._id}
            className={`${colors[index % colors.length]} shadow-md rounded-lg p-4 relative`}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleToggle(category._id)}
            >
              <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
              <span
                className={`transition-transform transform ${
                  expandedCategory === category._id ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </div>

            {expandedCategory === category._id && (
              <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-2 p-4 z-10 animate-slideDown">
                <ul className="space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <li
                      key={subcategory._id}
                      className="text-gray-700 hover:text-blue-500 hover:underline cursor-pointer"
                    >
                      {subcategory.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
