import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useAddToCart } from "../../hooks/useAddToCart";

export const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const { addToCart } = useAddToCart();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/wishlist/get-wishlist");
        setWishlistItems(response.data.wishlist.products || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleAddToCart = async (item) => {
    const size = item.size || null;
    const productId = item.productId._id;


    setLoadingItemId(item._id);

    try {
      await addToCart(productId, size, 1); 
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
      setWishlistItems((prevItems) => prevItems.filter((i) => i._id !== item._id));
      toast.success("Product removed from wishlist successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to remove product from wishlist");
    }
  };

  if (loading) return <p>Loading wishlist...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl p-8 mt-28 mb-12 mx-auto bg-gray-200 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">MY WISHLIST</h1>
        <span className="text-gray-700">{wishlistItems.length} items</span>
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
              className="flex bg-white rounded-lg p-4 shadow-sm"
            >
              <div className="w-56 h-56 bg-gray-300 rounded-md flex items-center justify-center">
                <img
                  src={item.productId.images?.[0] || "https://via.placeholder.com/100"}
                  alt={item.productId.name}
                  className="object-cover rounded-md h-full w-full"
                />
              </div>

              <div className="ml-6 flex-1 flex flex-col justify-between">
                <div>
                  <h1 className="text-gray-600 text-sm">{item.productId.name}</h1>
                  <p className="text-gray-800 font-medium">
                    {item.productId.description || "No description available"}
                  </p>
                  <p className="text-lg font-semibold text-green-600 mt-1">
                    ₹{item.productId.price}
                  </p>
                  {item.size && (
                    <p className="text-sm text-gray-600 mt-1">Size: {item.size}</p>
                  )}
                </div>

                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={loadingItemId === item._id}
                    className={`bg-black text-white w-2/4 px-4 py-2 rounded-md hover:bg-gray-800 ${
                      loadingItemId === item._id ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loadingItemId === item._id ? "Adding..." : "ADD TO CART"}
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(item)}
                    className="bg-red-500 text-white w-2/4 px-4 py-2 rounded-md hover:bg-red-600"
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

