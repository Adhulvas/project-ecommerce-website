import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const ProductDetail = () => {
  const { productId } = useParams();
  const [product, loading, error] = useFetchData(`product/productDetails/${productId}`);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [sizeError, setSizeError] = useState("");

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Failed to load product details</div>;
  }

  if (!product) {
    return <div className="text-center">No product data available</div>;
  }

  const handleAddToCart = async () => {
    setSizeError("");

    if (product.sizeRequired && !selectedSize) {
      setSizeError("Please select a size before adding to the cart.");
      return;
    }

    if (quantity <= 0) {
      setSizeError("Quantity should be at least 1.");
      return;
    }

    setIsAddingToCart(true);

    try {
      const response = await axiosInstance.post("/cart/add-to-cart", {
        productId,
        size: product.sizeRequired ? selectedSize : null,
        quantity,
      });

      toast.success(response.data.message || "Product added to cart!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add product to cart.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = async () => {
    setSizeError("");

    if (product.sizeRequired && !selectedSize) {
      setSizeError("Please select a size before adding to wishlist.");
      return;
    }

    setIsAddingToWishlist(true);

    try {
      const response = await axiosInstance.post("/wishlist/add-to-wishlist", {
        productId,
        size: product.sizeRequired ? selectedSize : null,
      });
      toast.success(response.data.message || "Product added to wishlist!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add product to wishlist.");
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row px-6 py-8 mt-28">
      {/* Left Section */}
      <div className="md:w-2/3 mb-6 md:mb-0">
        <h2 className="text-lg font-bold mb-4">Product Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.images?.map((image, index) => (
            <div key={index} className="bg-gray-200 h-72 overflow-hidden rounded-lg">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-110"/>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/3 md:pl-6">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-700 mb-2">{product.description}</p>

        {/* Ratings */}
        <div className="flex items-center mb-4">
          <span className="text-lg font-bold">{product.ratings || 0}</span>
          <span className="text-gray-500 ml-2">| {product.reviews?.length || 0} Ratings</span>
        </div>

        {/* Price */}
        <div className="text-2xl font-semibold text-green-600 mb-2">
          ₹{product.price}{" "}
          <span className="line-through text-gray-500">₹{product.originalPrice || "N/A"}</span>
        </div>
        <p className="text-gray-600 mb-4">Inclusive of all taxes</p>

        {/* Sizes */}
        {product.sizeRequired && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Select Size</h3>
            <div className="flex gap-2">
              {product.availableSizes?.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-2 rounded ${
                    selectedSize === size ? "bg-gray-800 text-white" : "hover:bg-gray-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {sizeError && <p className="text-red-500 mt-2">{sizeError}</p>}
          </div>
        )}

        {/* Quantity */}
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Quantity</h3>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            className="border px-4 py-2 w-20 rounded"
          />
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={`bg-blue-400 text-white px-8 py-2 rounded hover:bg-blue-600 ${
              isAddingToCart ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </button>
          <button
            onClick={handleAddToWishlist}
            disabled={isAddingToWishlist}
            className={`bg-pink-400 text-white px-8 py-2 rounded hover:bg-pink-600 ${
              isAddingToWishlist ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isAddingToWishlist ? "Adding..." : "Wishlist"}
          </button>
        </div>

        {/* Product Details */}
        <div>
          <h3 className="text-lg font-bold mb-2">Product Details</h3>
          <p className="text-gray-600">{product.details || "No additional details available."}</p>
        </div>

        <div className="mt-4">
          <h4 className="text-lg font-bold">Category:</h4>
          <p className="text-gray-600">{product.category}</p>
          <h4 className="text-lg font-bold">Subcategory:</h4>
          <p className="text-gray-600">{product.subcategory}</p>
          <h4 className="text-lg font-bold">Seller:</h4>
          <p className="text-gray-600">{product.seller.name}</p>
        </div>
      </div>
    </div>
  );
};
