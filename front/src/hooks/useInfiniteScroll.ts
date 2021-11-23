import { useState, useEffect, useRef } from 'react';
import { AxiosResponse } from 'axios';
import useApiRequest, { REQUEST } from './useApiRequest';

const THRESHOLD = 0.4;

const useInfiniteScroll = <T>(
  limit: number,
  getItems: (offset: number, limit: number, ...args: any[]) => Promise<AxiosResponse>,
  requestProps: any[],
) => {
  const [offset, setOffset] = useState(0);
  const [isClickMore, setIsClickMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<T[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const target = useRef<HTMLDivElement | null>(null);
  const onGetItemsSuccess = (data: any) => {
    const newItems = data.data;
    setIsLoading(false);
    if (!newItems.length) {
      (observer.current as IntersectionObserver).disconnect();
      return;
    }
    setOffset(offset + limit);
    if (!offset) {
      setItems([...newItems]);
      return;
    }
    setItems([...items, ...newItems]);
  };
  const getItemsDispatcher = useApiRequest(getItems, onGetItemsSuccess);

  const onIntersect = ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (!entry.isIntersecting || isLoading) return;
    setIsLoading(true);
    getItemsDispatcher({ type: REQUEST, requestProps: [offset, limit, ...requestProps] });
    observer.unobserve(entry.target);
  };

  const onClickMoreBtn = () => setIsClickMore(!isClickMore);

  useEffect(() => {
    if (!isClickMore) return;
    observer.current = new IntersectionObserver(onIntersect, { threshold: THRESHOLD });
    observer.current.observe(target.current as HTMLDivElement);
    return () => (observer.current as IntersectionObserver).disconnect();
  }, [offset, isClickMore]);

  useEffect(() => {
    if (offset !== 0) return;
    setIsLoading(true);
    getItemsDispatcher({ type: REQUEST, requestProps: [offset, limit, ...requestProps] });
  }, [offset]);

  return { items, target, isLoading, isClickMore, onClickMoreBtn, setOffset, setItems };
};

export default useInfiniteScroll;
