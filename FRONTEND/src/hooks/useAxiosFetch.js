import axios from "axios";
import { useEffect, useState } from "react";

const useAxiosFetch = (baseUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    let controller = new AbortController();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          signal: controller.signal,
        });
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (error) {
        if (isMounted) {
          if (error.name === "AbortError") {
            console.log("Fetch Aborted:", error.message);
          } else {
            setFetchError(error.message);
            setData([]);
          }
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    fetchData(baseUrl);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [baseUrl]);

  return { data, fetchError, isLoading };
};

export default useAxiosFetch;
