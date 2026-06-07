import { useEffect, useState } from "react";
import axios from "axios";

const useApiCall = <T,>(url: string, initialData: T) => {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const productListData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get<T>(url);
        setData(response.data);
      } catch (err) {
        const axiosError = err as { response?: { data?: { message?: string } }; message?: string };
        setError(
          axiosError.response?.data?.message ||
          axiosError.message ||
          "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      productListData();
    }
  }, [url]);

  return { data, loading, error };
};

export default useApiCall;