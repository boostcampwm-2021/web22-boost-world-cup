import { useRef } from 'react';

const useThrottle = (callback: (...args: any[]) => void, delay: number): ((...args: any[]) => void) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const throttledCallback = (...args: any[]) => {
    if (timerRef.current) return;
    timerRef.current = setTimeout(() => {
      callback(...args);
      timerRef.current = null;
    }, delay);
  };
  return throttledCallback;
};

export default useThrottle;
