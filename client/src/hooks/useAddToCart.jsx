import { useDispatch } from "react-redux";
import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";
import { addToCart } from "../redux/features/cartSlice";

export const useAddToCart = () => {
  const dispatch = useDispatch();

  const addToCartHandler = async (productId, size = null, quantity = 1) => {
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


      dispatch(addToCart(response.data.cart));

      toast.success("Product added to cart successfully!");
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to add product to cartada";
      toast.error(errorMessage);
    }
  };

  return { addToCartHandler };
};
