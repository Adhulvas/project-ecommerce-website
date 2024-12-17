import { useState, useEffect } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const useFetchCart = (endpoint) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get(endpoint);
      setCart(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [endpoint]);

  return [cart, loading, error, fetchCart]; // Expose fetchCart for manual refresh
};
