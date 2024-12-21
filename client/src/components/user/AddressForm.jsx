import React from "react";
import { useForm } from "react-hook-form";

export const AddressForm = ({ defaultValues = {}, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {[
        { label: "Address Title", name: "addressTitle", required: true },
        { label: "Country", name: "country", required: true },
        { label: "Address Line 1", name: "addressLine1", required: true },
        { label: "Address Line 2", name: "addressLine2" },
        { label: "City", name: "city", required: true },
        { label: "Pincode", name: "pincode", required: true },
        { label: "State", name: "state", required: true },
        { label: "Phone Number", name: "phoneNumber", required: true },
      ].map(({ label, name, required }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-700">{label}</label>
          <input
            type={name === "phoneNumber" ? "tel" : "text"}
            {...register(name, { required })}
            className={`mt-1 block w-full px-2 py-4 border ${
              errors[name] ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors[name] && <p className="text-red-500 text-sm">{label} is required</p>}
        </div>
      ))}

      <button type="submit" className="w-full px-4 py-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800">
        SAVE CHANGES
      </button>
    </form>
  );
};