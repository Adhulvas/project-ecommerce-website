import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import camera from "../../assets/camera.svg";
import toast from "react-hot-toast";

export const RatingPage = () => {
  const { productId } = useParams(); 
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const { register, handleSubmit, setValue } = useForm();

  const handleRating = (value) => {
    setRating(value);
    setValue("rating", value);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("rating", data.rating);
    formData.append("comment", data.comment);
    if (data.title) formData.append("title", data.title);


    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file)
     });
    }    

    try {
      await axiosInstance.post("/review/add-review", formData);
      toast.success("Thank you! Your review has been saved.");
      navigate("/"); 
    } catch (error) {
      console.error("Error submitting review:", error);
      const errorMessage = error.response?.data?.message || "Failed to submit review.";
      toast.error(errorMessage); 
    }
  };

  return (
     <div className="min-h-screen bg-gray-100 flex flex-col mt-20">
      <div className="flex-grow bg-white p-6 shadow-md rounded-lg">

        <h1 className="text-2xl font-bold mb-6">Ratings & Reviews</h1>

        {/* Form Section */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Section */}
          <div className="col-span-12 md:col-span-4 bg-gray-50 p-4 rounded-lg shadow-md">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">What makes a good review</h2>
              <div className="space-y-2">
                <h3 className="font-medium">Have you used this product?</h3>
                <p className="text-sm text-gray-600">
                  Your review should be about your experience with the product.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Why review a product?</h3>
                <p className="text-sm text-gray-600">
                  Your valuable feedback will help fellow shoppers decide!
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">How to review a product?</h3>
                <p className="text-sm text-gray-600">
                  Your review should include facts. An honest opinion is always appreciated. If you have an issue with the product or service, please contact us from the help centre.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-12 md:col-span-8 bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Rate this product</h2>
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleRating(value)}
                  className={`text-2xl ${
                    value <= rating ? "text-yellow-500" : "text-gray-300"
                  } focus:outline-none`}
                >
                  ★
                </button>
              ))}
              <span className="ml-4 text-red-500 font-semibold">
                {rating === 1
                  ? "Very Bad"
                  : rating === 2
                  ? "Bad"
                  : rating === 3
                  ? "Good"
                  : rating === 4
                  ? "Very Good"
                  : rating === 5
                  ? "Excellent"
                  : ""}
              </span>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="hidden"
                {...register("rating", { required: true })}
              />
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="comment"
                >
                  Review this product
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  placeholder="Description..."
                  {...register("comment", { required: true })}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="title"
                >
                  Title (optional)
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Review title..."
                  {...register("title")}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-gray-100 border border-gray-300 text-gray-600 rounded-lg p-3"
                >
                  <img src={camera} className="w-5 h-5" />
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  {...register("images")}
                  className="hidden"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-slate-700 text-white py-3 rounded-lg hover:bg-slate-900 font-semibold"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

