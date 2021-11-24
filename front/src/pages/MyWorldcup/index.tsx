import React from 'react';
import Header from '../../components/Header';
import WorldCupList from '../../components/WorldcupList';
import { getMyWorldcupList } from '../../utils/api/worldcups';
import { useInfiniteScroll } from '../../hooks';
import { Worldcup } from '../../types/Datas';

const MyWorldcup = (): JSX.Element => {
  const {
    items: worldcups,
    target,
    isLoading,
    isClickMore,
    onClickMoreBtn,
  } = useInfiniteScroll<Worldcup>(8, getMyWorldcupList, []);

  return (
    <>
      <Header type="header" />
      <WorldCupList
        type="myWorldcup"
        worldcups={worldcups}
        observeTarget={target}
        isLoading={isLoading}
        isClickMore={isClickMore}
        onClickMoreBtn={onClickMoreBtn}
      />
    </>
  );
};

export default MyWorldcup;
