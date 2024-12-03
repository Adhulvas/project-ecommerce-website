import React from "react";
import { useFetchData } from "../../hooks/useFetch";

export const ListCategories = () => {
  const [categories, loading, error] = useFetchData("/category/get-categories");

  const colors = [
    'bg-amber-200',
    'bg-cyan-200',
    'bg-emerald-200',
    'bg-lime-200',
    'bg-purple-200'
  ];

  if (loading) {
    return <p className='text-center'>Loading...</p>;
  }

  if (error) {
    return <p className='text-center text-red-500'>{error}</p>;
  }

  return (
    <div className='p-8 mt-16'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800'>Categories</h2>
        <a href="/category/create" className='bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-300'>Add Category</a>
      </div>


      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center'>
        {categories.map((category, index) => (
          <div key={category._id} className={`${colors[index % colors.length]} shadow-md rounded-lg p-4 hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer`}>
            <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
