import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}${endpoint}`);
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
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetch;
