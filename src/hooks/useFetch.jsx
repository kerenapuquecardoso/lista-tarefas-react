import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itemId, setItemId] = useState(null);

  const httpConfig = (data, method, id = null) => {
    let endpoint = url;
    if (method === "DELETE" && id) {
      endpoint = `${url}/${id}`;
      setItemId(id);
    }

    if (method === "POST") {
      setConfig({
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      setMethod(method);
    } else if (method === "DELETE") {
      setConfig({
        method,
      });
      setMethod(method);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error(error.message);
        setError("Houve algum erro ao carregar os dados!");
      }
      setLoading(false);
    };
    fetchData();
  }, [url, callFetch]);

  useEffect(() => {
    const httpRequest = async () => {
      if (method === 'POST' || method === 'DELETE') {
        let fetchOptions = [url, config];
        if (method === 'DELETE' && itemId) {
          fetchOptions = [`${url}/${itemId}`, config];
        }
        const res = await fetch(...fetchOptions);
        const json = await res.json();
        setCallFetch((prev) => !prev);
      }
    };
    httpRequest();
  }, [config, method, url, itemId]);

  return { data, httpConfig, loading, error };
};