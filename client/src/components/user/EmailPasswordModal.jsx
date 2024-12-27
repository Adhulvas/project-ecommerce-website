import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const EmailPasswordModal = ({ userProfile, onClose }) => {
  const { register, handleSubmit, watch, formState: {errors} } = useForm({
    defaultValues: {
      email: userProfile.email,
    },
  });

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      await axiosInstance.put("/user/login-details", { ...data });
      toast.success("Credentials successfully saved!");
      onClose();
    } catch (error) {
      toast.error("Failed to save credentials");
    }
  };

  const newPassword = watch("newPassword");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold">Login Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <span className="text-3xl">&times;</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-4 border focus:outline-none focus:ring focus:ring-blue-500"
              disabled
            />
          </div>
          <hr />
          <h3 className="text-lg font-medium">Change Password</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Current Password *</label>
            <input
              type="password"
              {...register("currentPassword", { required: "Current password is required" })}
              className="w-full px-3 py-4 border focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Current password"
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Password *</label>
            <input
              type="password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters long",
                },
              })}
              className="w-full px-3 py-4 border focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="New password"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password *</label>
            <input
              type="password"
              {...register("confirmNewPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              className="w-full px-3 py-4 border focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Confirm new password"
            />
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword.message}</p>
            )}
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
