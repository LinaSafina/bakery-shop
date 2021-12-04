import { useCallback, useState } from 'react';

const useHttp = (requestFunction) => {
  const [data, setData] = useState(null);

  const sendRequest = useCallback(
    async (requestUrl, category, images) => {
      try {
        const responseData = await requestFunction(requestUrl, category);
        setData(responseData);
      } catch (e) {
        alert(e.message);
      }
    },
    [requestFunction]
  );
  return { sendRequest, data };
};

export default useHttp;
