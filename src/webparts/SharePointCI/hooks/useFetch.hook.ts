import { useEffect, useState } from "react";

interface IFetch<T> {
  fetchFunction: () => Promise<T>;
}

/** The useFetch hook will accept any asynchronous function as an argument and return the results.
 * It will also provide a loading variable so you can watch for when it finishes in your components.
 * @param fetchFunction - An async function that returns the results you are looking for.
 */
export const useFetch = <T>({ fetchFunction }: IFetch<T>) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchFunction();
      setData(response);
      setLoading(false);
    };
    fetchData();
  }, []);
  return { data, loading };
};
export default useFetch;
