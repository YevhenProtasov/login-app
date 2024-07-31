import { useEffect, useState } from 'react';

export const usePageSuccess = (initialSuccess) => {
  const [success, setSuccess] = useState(initialSuccess);

  useEffect(() => {
    if (!success) {
      return;
    }

    const timerId = setTimeout(() => {
      setSuccess('');
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [success]);

  return [success, setSuccess];
};
