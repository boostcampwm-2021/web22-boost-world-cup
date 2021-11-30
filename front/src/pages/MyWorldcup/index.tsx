import React from 'react';
import Header from '../../components/Header';
import MyWorldCupItem from '../../components/MyWorldCupItem';
import { WorldcupList } from '../../components';
import { getMyWorldcupList } from '../../apis/worldcups';
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
      <Header />
      <WorldcupList
        observeTarget={target}
        isLoading={isLoading}
        isClickMore={isClickMore}
        onClickMoreBtn={onClickMoreBtn}
      >
        {worldcups.map(({ id, thumbnail1, thumbnail2, title, description }) => (
          <MyWorldCupItem
            key={id}
            id={id}
            thumbnail1={thumbnail1}
            thumbnail2={thumbnail2}
            title={title}
            desc={description}
          />
        ))}
      </WorldcupList>
    </>
  );
};

export default MyWorldcup;
