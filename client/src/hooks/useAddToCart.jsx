import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";

export const useAddToCart = () => {

  const addToCart = async (productId, size = null, quantity = 1) => {
    if (!productId || quantity <= 0) {
      toast.error("Invalid product or quantity");
      return;
    }

    try {
      const response = await axiosInstance.post("/cart/add-to-cart", {
        productId,
        size,
        quantity,
      });
      toast.success("Product added to cart successfully!");
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to add product to cart";
      toast.error(errorMessage);
    }
  };

  return { addToCart };
};
