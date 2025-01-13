import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useAddToCart } from "../../hooks/useAddToCart";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlistFailure, fetchWishlistRequest, fetchWishlistSuccess, removeFromWishlist } from "../../redux/features/wishlistSlice";


export const Wishlist = () => {
  const dispatch = useDispatch();
  const { items: wishlistItems, loading, error } = useSelector((state) => state.wishlist);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const { addToCartHandler } = useAddToCart();


  useEffect(() => {
    const fetchWishlist = async () => {
      dispatch(fetchWishlistRequest());
      try {
        const response = await axiosInstance.get("/wishlist/get-wishlist");
        dispatch(fetchWishlistSuccess(response.data.wishlist.products || []));
      } catch (err) {
        dispatch(fetchWishlistFailure(err.response?.data?.message || "Failed to fetch wishlist"));
      }
    };

    fetchWishlist();
  }, [dispatch]);


  const handleAddToCart = async (item) => {
    const size = item.size || null;
    const productId = item.productId._id;


    setLoadingItemId(item._id);

    try {
      await addToCartHandler(productId, size, 1); 
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product to cart");
    } finally {
      setLoadingItemId(null);
    }
  };


  const handleRemoveFromWishlist = async (item) => {
    const productId = item.productId._id;
    const size = item.size || null;
    try {
      await axiosInstance.delete(`/wishlist/remove-from-wishlist`, {
        data: { productId, size },
      });
      dispatch(removeFromWishlist(item._id));
      toast.success("Product removed from wishlist successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to remove product from wishlist");
    }
  };

  if (loading) return <p>Loading wishlist...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl p-4 sm:p-8 mt-28 mb-12 mx-auto bg-gray-200 rounded-md shadow-md">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
      <h1 className="text-xl font-bold text-center sm:text-left">MY WISHLIST</h1>
      <span className="text-gray-700 text-center sm:text-right mt-2 sm:mt-0">
        {wishlistItems.length} items
      </span>
      </div>

      <hr className="border-gray-300 my-4" />

      {wishlistItems.length === 0 ? (
        <div className="text-center text-gray-500 text-lg font-semibold">
          Your Wishlist is Empty
        </div>
      ) : (
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row bg-white rounded-lg p-4 shadow-sm"
            >
              <div className="w-full sm:w-56 h-56 bg-gray-300 rounded-md flex items-center justify-center">
                <img
                  src={item.productId.images?.[0] || "https://via.placeholder.com/100"}
                  alt={item.productId.name}
                  className="object-cover rounded-md h-full w-full"
                />
              </div>


              <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 flex flex-col justify-between">
                <div>
                  <h1 className="text-gray-600 text-sm">{item.productId.name}</h1>
                  <p className="text-gray-800 font-medium mt-2">
                    {item.productId.description || "No description available"}
                  </p>
                  <p className="text-lg font-semibold text-green-600 mt-1">
                    ₹{item.productId.price}
                  </p>
                  {item.size && (
                    <p className="text-sm text-gray-600 mt-1">Size: {item.size}</p>
                  )}
                </div>


                <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={loadingItemId === item._id}
                    className={`bg-black text-white w-full sm:w-1/2 px-4 py-2 rounded-md hover:bg-gray-800 ${
                      loadingItemId === item._id ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loadingItemId === item._id ? "Adding..." : "ADD TO CART"}
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(item)}
                    className="bg-red-500 text-white w-full sm:w-1/2 px-4 py-2 rounded-md hover:bg-red-600 mt-2 sm:mt-0"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

