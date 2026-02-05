import { useEffect, useRef, useState } from "react";

//IMPORTANT it creates a useEffect so dont have it in a useEFFECT
export function useApi(apiFunction, deps = [], enabled = true) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const [loading, setIsInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const hasFetchedOnce = useRef(false);

  const run = async (signalOverride) => {
    if (!enabled) return;

    const controller = new AbortController();
    const signal = signalOverride || controller.signal;

    let active = true;
    setIsFetching(true);

    if (!hasFetchedOnce.current) {
      setIsInitialLoading(true);
    }

    try {
      setError(null);

      const result = await apiFunction({ signal });

      // API-specific error handling
      if (result?.error) {
        throw new Error(result.error);
      }

      if (active) {
        setData(result);
        hasFetchedOnce.current = true;
      }
    } catch (err) {
      if (err.name !== "AbortError" && active) {
        setError(err.message);
      }
    } finally {
      if (active) {
        setIsFetching(false);
        setIsInitialLoading(false);
      }
    }

    return () => {
      active = false;
      controller.abort();
    };
  };

  useEffect(() => {
    run();
  }, deps);

  return {
    data,
    error,
    loading, // only first load
    isFetching,       // any request
    refetch: run      //to run again ex wiki updated refetch
  };
}

/* EXEMPEL 

witouth dependancy
const { data, loading, error } = useApi(() =>
  apiFetch("/wiki/pages")
);

With dependancy
const { data, loading, error } = useApi(
  () => getWikiPage(id),
  [id]
);

with different names for data loading and error
const {
  data: pageData,
  loading: pageLoading,
  error: pageError,
} = useApi(() => getWikiPage(id), [id]);

another example of how to store the data
const pageRequest = useApi(() => getWikiPage(id), [id]);

pageRequest.data
pageRequest.loading
pageRequest.error
*/

/* guard inside hook call 

EXEMPLE
const { data } = useApi(
  ({ signal }) => getBlog(personToken, blogId, { signal }),
  [personToken, blogId],
  !!personToken && !!blogId //true or false check
);
!! Converts value into a real boolean (true or false)
*/
