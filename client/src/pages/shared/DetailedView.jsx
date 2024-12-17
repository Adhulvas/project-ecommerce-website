import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { useDeleteProduct } from '../../hooks/useDeleteProduct';
import { ConfirmModal } from '../../components/seller/ConfirmModal';

export const DetailedView = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { deleteProduct, isDeleting } = useDeleteProduct(() => {
    setIsDeleted(true); 
    toast.success('Product deleted successfully!');
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosInstance.get(`/product/productDetails/${productId}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const handleDelete = () => {
    deleteProduct(productId);
    setIsModalOpen(false); 
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false); 

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  if (isDeleted) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Deleted Successfully!</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!product) {
    return <div className="min-h-screen flex justify-center items-center">Product not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-16">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Product Details</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Back
          </button>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow"
            />
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Thumbnail"
                  className="w-20 h-20 rounded-lg border"
                />
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-gray-600">Product Name:</h3>
                <p className="text-gray-800">{product.name}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-600">Price:</h3>
                <p className="text-orange-500 text-lg font-bold">₹{product.price}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-600">Category:</h3>
                <p className="text-gray-800">{product.category}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-600">Subcategory:</h3>
                <p className="text-gray-800">{product.subcategory}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-600">Stock Status:</h3>
                <p className="text-gray-800">
                  {product.availableSizes.length > 0 ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-600">Sizes Available:</h3>
                <p className="text-gray-800">{product.availableSizes.join(', ')}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-600">Seller:</h3>
                <p className="text-gray-800">{product.seller?.name || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-600">Discount:</h3>
                <p className="text-gray-800">{product.discount || 0}%</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-600">Description:</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>


        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => navigate(`/seller/products/edit/${productId}`)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit Product
          </button>
          <button
            onClick={openModal}
            disabled={isDeleting}
            className={`${
              isDeleting ? 'bg-red-300' : 'bg-red-500 hover:bg-red-600'
            } text-white px-4 py-2 rounded`}
          >
            {isDeleting ? 'Deleting...' : 'Delete Product'}
          </button>
        </div>


        <ConfirmModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleDelete}
          message="Are you sure you want to delete this product?"
        />
      </div>
    </div>
  );
};