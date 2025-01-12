import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { axiosInstance } from "../../config/axiosInstance";
import { useFetchCart } from "../../hooks/useFetchCart";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const CheckoutPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [cart, loading, error] = useFetchCart("/cart/get-cartItems");

  const fetchAddresses = async () => {
    try {
      const response = await axiosInstance.get("/user/profile");
      const fetchedAddresses = response.data.data.addresses || [];
      setAddresses(fetchedAddresses);

      if (fetchedAddresses.length === 0) {
        setShowNewAddressForm(true);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Failed to fetch addresses.");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  
  const makePayment = async () => {
    try {
      const response = await axiosInstance.post("/payment/create-payment-session", {
        items: cart.items,
      });

      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        toast.error("Payment session creation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error initiating payment:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Payment initiation failed.");
    }
  };

  
  const isAddressValid =
    selectedAddress ||
    (showNewAddressForm &&
      newAddress?.addressTitle?.trim() &&
      newAddress?.country?.trim() &&
      newAddress?.addressLine1?.trim() &&
      newAddress?.addressLine2?.trim() &&
      newAddress?.city?.trim() &&
      newAddress?.pincode?.trim() &&
      newAddress?.state?.trim());

  return (
    <div className="min-h-screen p-4 md:p-8 mt-20 mx-4 sm:mx-8 lg:mx-16">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">CHECKOUT</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
        <div className="lg:col-span-2">
          <div className="p-4 md:p-8 bg-white rounded shadow-md">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">ADDRESSES</h1>
            <h2 className="text-base sm:text-lg font-semibold mb-4">
              Enter a Shipping Address
            </h2>

            {addresses.length > 0 && (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address._id}
                    className="border p-4 rounded shadow-sm flex flex-col sm:flex-row sm:items-center items-start"
                  >
                    <input
                      type="radio"
                      name="address"
                      value={address._id}
                      onChange={() => {
                        setSelectedAddress(address);
                        setShowNewAddressForm(false);
                      }}
                      className="mb-2 sm:mb-0"
                    />
                    <div className="sm:ml-4">
                      <p className="font-semibold">{address.addressTitle}</p>
                      <p className="text-sm">
                        {address.addressLine1}, {address.addressLine2}, {address.city},{" "} 
                        {address.state}, {address.country} - {address.pincode}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {addresses.length > 0 && (
              <div className="border p-4 rounded shadow-sm mt-4 ">
                <label className="flex flex-col sm:flex-row sm:items-center items-start">
                  <input
                    type="radio"
                    name="address"
                    onChange={() => {
                      setShowNewAddressForm(true);
                      setSelectedAddress(null);
                    }}
                  />
                  <div className="sm:ml-4 mt-2 sm:mt-0">Enter New Address</div>
                </label>
              </div>
            )}

            {showNewAddressForm && (
              <div className="mt-4 bg-white p-4 rounded shadow">
                <div className="space-y-4">
                  {[
                    { label: "Address Title", name: "addressTitle" },
                    { label: "Country", name: "country" },
                    { label: "Address Line 1", name: "addressLine1" },
                    { label: "Address Line 2", name: "addressLine2" },
                    { label: "City", name: "city" },
                    { label: "Pincode", name: "pincode" },
                    { label: "State", name: "state" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-gray-600 mb-1">{field.label} *</label>
                      <input
                        type="text"
                        name={field.name}
                        onChange={handleNewAddressChange}
                        className="w-full border p-2 rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white p-4 rounded shadow mt-4">
              <h2 className="text-base sm:text-lg font-semibold mb-4">Enter Contact Info</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 mb-1">Email *</label>
                  <input type="email" className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Phone Number *</label>
                  <input type="tel" className="w-full border p-2 rounded" />
                </div>
              </div>
            </div>

            <button
              onClick={makePayment}
              disabled={!isAddressValid}
              className={`p-5 mt-6 w-full sm:w-80 font-bold text-white rounded ${
                isAddressValid ? "bg-black" : "bg-gray-700 cursor-not-allowed"
              }`}
            >
              CONTINUE TO PAYMENT METHOD
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-base sm:text-lg font-semibold mb-4">Order Details</h2>
            {loading ? (
              <p>Loading Order details...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              <>
                {cart.items?.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center space-x-4 mb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.productDescription}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded"
                    />
                    <div>
                      <p className="text-sm sm:text-base text-gray-700">
                        {item.productDescription}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Size: {item.size}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Qnty: {item.quantity}
                      </p>
                      <p className="text-red-600 font-semibold">₹{item.price}</p>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between mt-4 border-t pt-4">
                  <p className="font-semibold">Total Price:</p>
                  <p className="text-red-600 font-semibold">₹{cart.totalPrice}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

