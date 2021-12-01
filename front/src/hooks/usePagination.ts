import { useState, useEffect, useCallback } from 'react';
import { AxiosResponse } from 'axios';
import useApiRequest from './useApiRequest';

const usePagination = <T>(
  totalCnt: number,
  limit: number,
): [T[], number, number, number, (nextPage: number) => void, React.Dispatch<React.SetStateAction<T[]>>] => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageItems, setItems] = useState<T[]>([]);
  const offset = limit * (currentPage - 1);
  const lastPage = Math.ceil(totalCnt / limit);
  const onPageChange = useCallback(
    (nextPage: number) => {
      if (nextPage === currentPage) return;
      if (nextPage < 1 || nextPage > lastPage) return;
      setCurrentPage(nextPage);
    },
    [currentPage, lastPage],
  );

  useEffect(() => {
    if (currentPage > lastPage && lastPage >= 1) setCurrentPage(lastPage);
  }, [totalCnt]);

  return [pageItems, currentPage, offset, lastPage, onPageChange, setItems];
};

export const usePaginationAsync = <T>(
  totalCnt: number,
  limit: number,
  getItems: (offset: number, limit: number, ...args: any[]) => Promise<AxiosResponse>,
  requestProps: any[],
  dependencies: any[] = [],
): [T[], number, number, number, (nextPage: number) => void] => {
  const [pageItems, currentPage, offset, lastPage, onPageChange, setItems] = usePagination<T>(totalCnt, limit);
  const onGetItemsSuccess = (newItems: T[]) => setItems(newItems);
  const getItemsDispatcher = useApiRequest(getItems, onGetItemsSuccess);

  useEffect(() => {
    getItemsDispatcher({ type: 'REQUEST', requestProps: [offset, limit, ...requestProps] });
  }, [currentPage, ...dependencies]);

  return [pageItems, currentPage, offset, lastPage, onPageChange];
};

export const usePaginationSync = <T>(
  totalCnt: number,
  limit: number,
  items: T[],
  dependencies: any[] = [],
): [T[], number, number, number, (nextPage: number) => void] => {
  const [pageItems, currentPage, offset, lastPage, onPageChange, setItems] = usePagination<T>(totalCnt, limit);

  useEffect(() => {
    setItems(items.slice(offset, offset + limit));
  }, [currentPage, ...dependencies]);

  return [pageItems, currentPage, offset, lastPage, onPageChange];
};
