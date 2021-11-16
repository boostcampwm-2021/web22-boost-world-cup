import { useState, useEffect } from 'react';

const usePagination = (
  totalCnt: number,
  limit: number,
  changeEffect?: () => void,
): [number, number, number, (nextPage: number) => void] => {
  const [currentPage, setCurrentPage] = useState(1);
  const offset = limit * (currentPage - 1);
  const lastPage = Math.ceil(totalCnt / limit);
  const onPageChange = (nextPage: number) => setCurrentPage(nextPage);

  useEffect(() => {
    if (!changeEffect) return;
    changeEffect();
  }, [currentPage]);

  useEffect(() => {
    if (currentPage > lastPage && lastPage >= 1) setCurrentPage(lastPage);
  }, [totalCnt]);

  return [currentPage, offset, lastPage, onPageChange];
};

export default usePagination;
