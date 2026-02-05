import { useEffect, useState } from "react";

//IMPORTANT it creates a useEffect so dont have it in a useEFFECT
export function useApi(apiFunction, deps = [],enabled=true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    let active = true;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        const result = await apiFunction({
          signal: controller.signal,
        });
        // console.log(result)



        if (active && !(result?.error)) {
          setData(result);
        } 
        //error
        else{
          setError(result.error)
        }

      } catch (err) {
        if (err.name === "AbortError") return;

        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    run();

    return () => {
      active = false;
      controller.abort();
    };
  }, deps);

  return { data, loading, error };
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
