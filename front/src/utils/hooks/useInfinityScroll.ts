import { useEffect } from 'react';

const useInfiniteScroll = (
  target: HTMLDivElement | null,
  onIntersect: (callback: IntersectionObserverEntry[], observer: IntersectionObserver) => void,
  threshold: number,
  condition: boolean | null,
) => {
  useEffect(() => {
    let observer: IntersectionObserver;
    if (condition && target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, onIntersect]);
};

export default useInfiniteScroll;
