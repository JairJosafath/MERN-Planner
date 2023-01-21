import { useEffect, useState } from "react";

export function useFecth() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [req, setReq] = useState<{
    url: string;
    headers?: HeadersInit;
    body?: object;
    method?: string;
  }>();

  useEffect(() => {
    async function fetchData() {
      if (req?.url) {
        setLoading(true);
        console.log("fetching", req.url, req?.body);
        const res = await fetch(req.url, req?.body);
        const { body } = await res.json().catch((err) => {
          setError(err);
          setLoading(false);
          return err;
        });
        setData(body);
        setLoading(false);
      }
    }

    fetchData();
  }, [req?.url, req?.body]);

  useEffect(() => (data ? console.log(data, "data") : undefined), [data]);
  return {
    loading,
    error,
    setError,
    data,
    setReq,
  };
}
