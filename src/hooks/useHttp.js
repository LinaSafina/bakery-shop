import { useCallback, useState } from 'react';

const useHttp = (requestFunction) => {
  const [data, setData] = useState(null);

  const sendRequest = useCallback(
    async (requestData) => {
      try {
        const responseData = await requestFunction(requestData);
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
