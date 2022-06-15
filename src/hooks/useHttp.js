import { useState, useCallback } from "react";

function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const request = useCallback(async (
    { method, body, headers, url },
    fn = (data) => data
  ) => {
    setIsLoading(true);
    const response = await fetch(url, {
      method: method ? method : "GET",
      body: body ? body : null,
      headers: headers ? headers : {},
    });

    if (!response.ok) {
      setIsLoading(false);
      setHasError(true);
      throw new Error(response.statusText);
    }

    const responseData = await response.json();
    fn(responseData);
    setIsLoading(false);
  }, []);

  return { isLoading, hasError, request };
}

export default useHttp;
