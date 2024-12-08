import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetchData } from '../../hooks/useFetch';
import { axiosInstance } from '../../config/axiosInstance';
import upload from '../../assets/upload.svg'

export const UpdateProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [images, setImages] = useState([]);
    const [categories, loading, error] = useFetchData("/category/get-categories");

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };
    

    const onSubmit = async (data) => {
        
      const formData = new FormData();
      images.forEach((image) => {
          formData.append('image', image);
      });
  
      Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
      });
  
      try {
          const response = await axiosInstance.post(`product/update-product/${productId}`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
          console.log('Product added:', response.data);
      } catch (error) {
          console.error('Error adding product:', error.response ? error.response.data : error.message);
      }
  };
  

    return (
        <div className="container mx-auto p-6 bg-gray-100 mt-16">
          <h1 className="text-start text-2xl font-bold mb-6">Edit Product</h1>


            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleImageChange} 
                    className="hidden" 
                    id="file-upload" 
                />
                <label htmlFor="file-upload" className="flex flex-col items-center border-dashed border-2 border-gray-300 rounded-lg p-8 cursor-pointer">
                    <img src={upload} alt="" className='w-12 h-12'/>
                    <p className="mt-4 text-gray-600">Click to upload images (PNG, JPG)</p>
                </label>
            </div>


            <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 mx-auto">
                <h2 className="text-lg font-semibold mb-4">Product Information</h2>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="name">Product Name</label>
                        <input 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" 
                            type="text" 
                            id="name" 
                            {...register('name', { required: 'Product name is required' })} 
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
                        <textarea 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" 
                            id="description" 
                            {...register('description', { required: 'Description is required' })} 
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="category">Category</label>
                        <select 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" 
                            id="category" 
                            {...register('category', { required: 'Category is required' })}
                        >
                            <option value="">Select Category</option>
                            {Array.isArray(categories) && categories.map((category) => (
                                <option key={category._id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="subcategory">Subcategory</label>
                        <input 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" 
                            type="text" 
                            id="subcategory" 
                            {...register('subcategory', { required: 'Subcategory is required' })} 
                        />
                        {errors.subcategory && <p className="text-red-500 text-sm">{errors.subcategory.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="sizeRequired">Size Required</label>
                        <input 
                            type="checkbox" 
                            id="sizeRequired" 
                            {...register('sizeRequired')} 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="availableSizes">Available Sizes</label>
                        <input 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" 
                            type="text" 
                            id="availableSizes" 
                            {...register('availableSizes')} 
                            placeholder="e.g., S, M, L" 
                        />
                    </div>

                    <h2 className="text-lg font-semibold mb-4">Pricing Details</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="price">Price</label>
                        <input 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" 
                            type="text" 
                            id="price" 
                            {...register('price', { 
                                required: 'Price is required'
                            })} 
                        />
                        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="discount">Discount</label>
                        <input 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" 
                            type="number" 
                            id="discount" 
                            {...register('discount')} 
                            placeholder="e.g., 10%" 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="tax">Tax</label>
                        <input 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" 
                            type="number" 
                            id="tax" 
                            {...register('tax')} 
                            placeholder="e.g., 5%" 
                        />
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Update Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

