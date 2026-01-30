import { useState } from "react";

//pretty much works the same as useApi but manual updates ex(onclicks)
export function useMutation(apiFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function mutate(...args) {
    try {
      setLoading(true);
      setError(null);

      const result = await apiFunction(...args);
      setData(result);

      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { mutate, data, loading, error };
}