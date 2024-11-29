import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(""); // Track selected size
  const [cartLoading, setCartLoading] = useState(false);
  const [sizeError, setSizeError] = useState(false); // Track size selection error

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/product/productDetails/${productId}`);
        console.log("API Response:", response.data);
        setProduct(response.data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const { data: productData, totalRatings } = product;

  const handleAddToCart = async () => {
    // Show error if sizeRequired and no size selected
    if (productData.sizeRequired && !selectedSize) {
      setSizeError(true);
      toast.error("Please select a size");
      return;
    }

    try {
      setCartLoading(true); // Show loader
      const response = await axiosInstance({
        method: "POST",
        url: "/cart/add-to-cart",
        data: {
          productId,
          size: productData.sizeRequired ? selectedSize : null,
          quantity: 1,
        },
      });
      toast.success("Product added to cart");
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error(error?.response?.data?.message || "Error adding product to cart");
    } finally {
      setCartLoading(false); // Hide loader
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setSizeError(false); // Clear error when size is selected
  };

  return (
    <div className="container mx-auto mt-24 p-8 grid grid-cols-2 gap-8">
      {/* Left Section: Product Image */}
      <div className="grid grid-cols-2 gap-4">
        {productData.image ? (
          <>
            <img
              src={productData.image}
              alt={productData.name}
              className="w-full h-auto border border-gray-300"
            />
          </>
        ) : (
          <p>No images available</p>
        )}
      </div>

      {/* Right Section: Product Details */}
      <div>
        <h1 className="text-3xl font-bold">{productData.name}</h1>
        <p className="text-gray-500 mb-4">{productData.description}</p>
        <div className="flex items-center space-x-4 my-4">
          <span className="text-gray-700 font-semibold">{productData.ratings}</span>
          <span className="text-yellow-500">★</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-500">{totalRatings} Ratings</span>
        </div>

        <div className="text-2xl font-bold text-green-600">
          ₹{productData.price}
        </div>
        <p className="text-gray-500 text-sm">Inclusive of all taxes</p>

        {/* Size Selector */}
        {productData.sizeRequired && (
          <div className="my-4">
            <h3 className="text-lg font-semibold mb-2">Select Size</h3>
            <div className="flex space-x-4">
              {["6", "7", "8", "9", "10"].map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  className={`border rounded-full w-12 h-12 flex items-center justify-center ${
                    selectedSize === size ? "bg-gray-300" : "hover:bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="text-red-500 text-sm mt-2">Please select a size</p>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleAddToCart}
            disabled={cartLoading}
            className={`px-6 py-2 rounded-lg ${
              cartLoading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {cartLoading ? "Adding..." : "Add to Cart"}
          </button>
          <button className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300">
            Wishlist
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <p>Category: {productData.category}</p>
          <p>Subcategory: {productData.subcategory}</p>
          <p>Seller: {productData.seller?.name || "Unknown"}</p>
        </div>
      </div>
    </div>
  );
};
