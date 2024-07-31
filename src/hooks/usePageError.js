import { useEffect, useState } from 'react';

export const usePageError = (initialError) => {
  const [error, setError] = useState(initialError);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timerId = setTimeout(() => {
      setError('');
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [error]);

  return [error, setError];
};
