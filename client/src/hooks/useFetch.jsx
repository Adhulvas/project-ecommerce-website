import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance({ url: endpoint });
        setData(response?.data?.data || {});
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }, [endpoint]);


    useEffect(() => {
      fetchData(); 
    }, [fetchData]);

  return [data, loading, error, fetchData];
}
