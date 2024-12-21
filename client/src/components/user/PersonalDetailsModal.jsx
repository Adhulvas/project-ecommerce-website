import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const PersonalDetailsModal = ({ userProfile, onClose, onSuccess }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: userProfile.name || "",
      gender: userProfile.gender || "",
      dobYear: userProfile.dob?.split("-")[0] || "",
      dobMonth: userProfile.dob?.split("-")[1] || "",
      dobDay: userProfile.dob?.split("-")[2] || "",
    },
  });
  

  const onSubmit = async (data) => {
    const dob = `${data.dobYear}-${data.dobMonth}-${data.dobDay}`;
    try {
      await axiosInstance.put("/user/personal-details", {
        name: data.name,
        gender: data.gender,
        dob,
      });
      toast.success("Personal details were successfully saved!");
      onSuccess()
      onClose();
    } catch (error) {
      toast.error("Failed to save personal details");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold">Personal Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <span className="text-3xl">&times;</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              {...register("name")}
              className="w-full px-3 py-4 border focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gender *</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Male"
                  {...register("gender")}
                  className="form-radio"
                  required
                />
                <span>Male</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Female"
                  {...register("gender")}
                  className="form-radio"
                  required
                />
                <span>Female</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth *</label>
            <div className="flex space-x-2">
              <select
                {...register("dobYear")}
                className="w-1/3 px-3 py-4 border focus:outline-none focus:ring focus:ring-blue-500"
                required
              >
                <option value="">Year</option>
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i} value={2024 - i}>
                    {2024 - i}
                  </option>
                ))}
              </select>
              <select
                {...register("dobMonth")}
                className="w-1/3 px-3 py-4 border focus:outline-none focus:ring focus:ring-blue-500"
                required
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={(i + 1).toString().padStart(2, "0")}>
                    {new Date(0, i).toLocaleString("default", { month: "long" })}
                  </option>
                ))}
              </select>
              <select
                {...register("dobDay")}
                className="w-1/3 px-3 py-4 border focus:outline-none focus:ring focus:ring-blue-500"
                required
              >
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i} value={(i + 1).toString().padStart(2, "0")}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800"
            >
              SAVE CHANGES
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};