import { useState, useEffect } from "react";

export const useDebounce = (value, delay = 300) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timerDebounce = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timerDebounce);
  }, [value, delay]);

  return debounceValue;
};
