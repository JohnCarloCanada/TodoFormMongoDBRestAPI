import axios from "axios";
import { useEffect, useState } from "react";

const useAxiosFetch = (baseUrl, todos) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (error) {
        if (isMounted) {
          setFetchError(error.message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    fetchData(baseUrl);

    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [baseUrl, todos]);

  return { data, fetchError, isLoading };
};

export default useAxiosFetch;
