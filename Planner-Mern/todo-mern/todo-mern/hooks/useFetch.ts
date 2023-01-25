import { useEffect, useState } from "react";

export function useFecth() {
  const [data, setData] = useState<any>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
        try {
          const res = await fetch(req.url, req?.body);
          const { body } = await res.json().catch((err) => {
            setError(true);
            setLoading(false);
            return err;
          });
          setData(body);

          setLoading(false);
          setSuccess(true);
        } catch (e) {
          setError(true);
          setLoading(false);
        }
      }
    }

    fetchData();
    return () => {
      setData(undefined);
      setReq(undefined);
    };
  }, [req?.url, req?.body]);

  useEffect(() => (data ? console.log(data, "data") : undefined), [data]);
  useEffect(() => {
    const t = setTimeout(() => {
      if (success) setSuccess(false);
    }, 5000);
    return () => clearTimeout(t);
  }, [success]);
  return {
    loading,
    error,
    setError,
    data,
    setReq,
    success,
  };
}
