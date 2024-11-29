import { useState, useEffect } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance({ url: endpoint });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  return [data, loading, error];
}
