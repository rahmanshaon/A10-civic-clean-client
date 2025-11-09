import { useEffect, useState } from "react";
import axios from "axios";
import axiosSecure from "../api/axiosSecure";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (endpoint) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axiosSecure.get(endpoint);
          console.log(`Data fetched from ${endpoint}:`, response.data);
          setData(response.data);
        } catch (err) {
          console.error(`Error fetching from ${endpoint}:`, err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetch;
