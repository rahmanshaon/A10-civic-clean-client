import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import axiosSecure from "../api/axiosSecure";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (endpoint) {
      setLoading(true);
      try {
        const response = await axiosSecure.get(endpoint);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setData([]);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, setData, mutate: fetchData };
};

export default useFetch;
