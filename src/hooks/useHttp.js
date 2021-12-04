import { useCallback, useState } from 'react';

const useHttp = (requestFunction) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(
    async (requestUrl, requestBody) => {
      setIsLoading(true);
      setError(null);
      try {
        const responseData = await requestFunction(requestUrl, requestBody);
        setData(responseData);
      } catch (e) {
        setError(e.message || 'Something went wrong');
        alert(e.message || 'Something went wrong');
      }
      setIsLoading(false);
    },
    [requestFunction]
  );
  return { sendRequest, data, isLoading, error };
};

export default useHttp;
