    import React, { useState, useEffect } from 'react';
    import { useForm } from 'react-hook-form';
    import { useFetchData } from '../../hooks/useFetch';
    import { axiosInstance } from '../../config/axiosInstance';
    import upload from '../../assets/upload.svg';
    import { useParams } from 'react-router-dom';
    import toast from 'react-hot-toast';

    export const UpdateProduct = () => {
        const { productId } = useParams();
        const { register, handleSubmit, setValue, formState: { errors } } = useForm();
        const [images, setImages] = useState([]);
        const [categories] = useFetchData("/category/get-categories");
        const [productData] = useFetchData(`/product/productDetails/${productId}`);

        useEffect(() => {
            if (productData) {
                Object.keys(productData).forEach((key) => {
                    if (key === 'discount') {
                        const discountValue = productData[key] || '0%';
                        setValue(key, discountValue);
                    } else {
                        setValue(key, productData[key]);
                    }
                });
            }
        }, [productData, setValue]);


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
                const response = await axiosInstance.put(`product/update-product/${productId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success('Product updated successfully');
            } catch (error) {
                console.error('Error updating product:', error.response ? error.response.data : error.message);
            }
        };

        return (
        <div className="container mx-auto p-6 bg-gray-100 mt-16">
            <h1 className="text-start text-2xl font-bold mb-6">Edit Product</h1>
            <div className="flex">

                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-1/3 mr-4">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="flex flex-col items-center border-dashed border-2 border-gray-300 rounded-lg p-8 cursor-pointer">
                        <img src={upload} alt="Upload" className='w-12 h-12' />
                        <p className="mt-4 text-gray-600">Click to upload images (PNG, JPG)</p>
                    </label>
                </div>


                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-2/3 overflow-auto" style={{ maxHeight: '600px' }}>
                    <h2 className="text-lg font-semibold mb-4">Product Information</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="name">Product Name</label>
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    type="text"
                                    id="name"
                                    {...register('name', { required: 'Product name is required' })}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>
                            <div>
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
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
                                <textarea
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    id="description"
                                    {...register('description', { required: 'Description is required' })}
                                />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="subcategory">Subcategory</label>
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    type="text"
                                    id="subcategory"
                                    {...register('subcategory', { required: 'Subcategory is required' })}
                                />
                                {errors.subcategory && <p className="text-red-500 text-sm">{errors.subcategory.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="sizeRequired">Size Required</label>
                                <input
                                    type="checkbox"
                                    id="sizeRequired"
                                    {...register('sizeRequired')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="isTrending">
                                    Is Trending
                                </label>
                                <input
                                    type="checkbox"
                                    id="isTrending"
                                    className="mt-1"
                                    {...register('isTrending')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="isFeatured">
                                    Is Featured
                                </label>
                                <input
                                    type="checkbox"
                                    id="isFeatured"
                                    className="mt-1"
                                    {...register('isFeatured')}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="availableSizes">Available Sizes</label>
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    type="text"
                                    id="availableSizes"
                                    {...register('availableSizes')}
                                    placeholder="e.g., S, M, L"
                                />
                            </div>
                            <div className="col-span-2">
                                <h2 className="text-lg font-semibold mb-4">Pricing Details</h2>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="price">Price</label>
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    type="text"
                                    id="price"
                                    {...register('price', { required: 'Price is required' })}
                                />
                                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="discount">Discount</label>
                                <input
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    type="text"
                                    id="discount"
                                    {...register('discount',{
                                        pattern: {
                                            value: /^-?\d+%$/,
                                            message: 'Discount must be in the format -30% or 10%',
                                        }
                                    })}
                                    placeholder="e.g., 10%"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Update Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        );
    };