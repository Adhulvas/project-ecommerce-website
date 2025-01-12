import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export const ProductDetail = () => {
  const { isUserAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [sizeError, setSizeError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosInstance.get(`product/productDetails/${productId}`);
        setProduct(response.data.data); 
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

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
    if (!isUserAuth) {
      navigate("/login");  
      return;
    }

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
    if (!isUserAuth) {
      navigate("/login");
      return;
    }

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
            <div key={index} className="bg-gray-200 h-full overflow-hidden">
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
        <p className="mb-2">{product.description}</p>

        {/* Ratings */}
        <div className="flex items-center mb-4">
          <span className="text-lg font-bold flex align-middle">{product.ratings || 0}★</span>
          <span className="text-gray-500 ml-2">| {product.reviews?.length || 0} Ratings</span>
        </div>


        {/* Price */}
        <div className="text-2xl font-semibold text-green-600 mb-2">
          ₹{product.price || "N/A"}
        </div>
        <p className="mb-4">Inclusive of all taxes</p>

        {/* Sizes */}
        {product.sizeRequired && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Select Size</h3>
            <div className="flex gap-2 flex-wrap">
              {product.availableSizes?.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-2 ${
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

        <div className="flex flex-col mb-8">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={`bg-blue-400 text-white font-bold w-full px-8 py-5 rounded hover:bg-blue-500 ${
              isAddingToCart ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isAddingToCart ? "Adding..." : "ADD TO CART"}
          </button>
          <button
            onClick={handleAddToWishlist}
            disabled={isAddingToWishlist}
            className={`bg-pink-400 text-white font-bold w-full mt-4 px-8 py-5 rounded hover:bg-pink-500 ${
              isAddingToWishlist ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isAddingToWishlist ? "Adding..." : "WISHLIST"}
          </button>
        </div>

        {/* Product Details */}
        <div>
          <h3 className="text-lg font-bold mb-2">Product Details</h3>
          <p>{product.description || "No additional details available."}</p>
        </div>

        <div className="mt-4">
          <h4 className="text-lg font-bold">Category:</h4>
          <p>{product.category}</p>
          <h4 className="text-lg font-bold">Subcategory:</h4>
          <p>{product.subcategory}</p>
          <h4 className="text-lg font-bold">Seller:</h4>
          <p>{product.seller.name}</p>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Ratings & Reviews</h3>
          {product.reviews?.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review, index) => {
                const rating = review.rating ? parseFloat(review.rating).toFixed(1) : "N/A"; 
                return (
                  <div key={index} className="p-4 border rounded shadow relative">
                    <div className="flex items-center justify-between mb-2">

                      <div className="flex items-center">
                        <span className="font-bold">{review.name}</span>
                        <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                          {rating} ★
                        </span>
                      </div>
                    </div>
                    <p>{review.comment}</p>

                    {review.images && review.images.length > 0 && (
                      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
                        {review.images.map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img}
                            alt={`Review Image ${imgIndex + 1}`}
                            className="object-cover h-24 rounded"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600">No reviews available for this product.</p>
          )}
        </div>
      </div>
    </div>
  );
};
