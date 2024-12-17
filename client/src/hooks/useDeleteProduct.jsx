import { useState } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../config/axiosInstance';

export const useDeleteProduct = (onSuccess) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteProduct = async (productId) => {
    try {
      setIsDeleting(true);
      await axiosInstance.delete(`/product/delete-product/${productId}`);
      toast.success('Product Deleted Successfully');
      if (onSuccess) onSuccess(); 
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      toast.error('Failed to delete product.');
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteProduct, isDeleting };
};