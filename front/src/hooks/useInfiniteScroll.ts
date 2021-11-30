import React, { useState, useEffect, useRef } from 'react';
import { AxiosResponse } from 'axios';
import useApiRequest from './useApiRequest';
import { INTERSECT_THRESHOLD } from '../constants/number';

interface ReturnType<T> {
  items: T[];
  target: React.MutableRefObject<HTMLDivElement | null>;
  isLoading: boolean;
  isClickMore: boolean;
  onClickMoreBtn: React.MouseEventHandler;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  setIsClickMore: React.Dispatch<React.SetStateAction<boolean>>;
}

const useInfiniteScroll = <T>(
  limit: number,
  getItems: (offset: number, limit: number, ...args: any[]) => Promise<AxiosResponse>,
  requestProps: any[],
): ReturnType<T> => {
  const [offset, setOffset] = useState(0);
  const [isClickMore, setIsClickMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<T[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const target = useRef<HTMLDivElement | null>(null);
  const onGetItemsSuccess = (newItems: T[]) => {
    setIsLoading(false);
    if (!newItems.length) {
      (observer.current as IntersectionObserver).disconnect();
      if (!offset) setItems([]);
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
    getItemsDispatcher({ type: 'REQUEST', requestProps: [offset, limit, ...requestProps] });
    observer.unobserve(entry.target);
  };

  const onClickMoreBtn = () => setIsClickMore(!isClickMore);

  useEffect(() => {
    if (!isClickMore) return;
    observer.current = new IntersectionObserver(onIntersect, { threshold: INTERSECT_THRESHOLD });
    observer.current.observe(target.current as HTMLDivElement);
    return () => (observer.current as IntersectionObserver).disconnect();
  }, [offset, isClickMore, ...requestProps]);

  useEffect(() => {
    if (offset !== 0) return;
    setIsLoading(true);
    observer.current = new IntersectionObserver(onIntersect, { threshold: INTERSECT_THRESHOLD });
    getItemsDispatcher({ type: 'REQUEST', requestProps: [offset, limit, ...requestProps] });
  }, [offset, ...requestProps]);

  return { items, target, isLoading, isClickMore, onClickMoreBtn, setOffset, setItems, setIsClickMore };
};

export default useInfiniteScroll;
