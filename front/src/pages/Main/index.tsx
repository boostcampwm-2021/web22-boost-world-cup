import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Keywords from '../../components/Keywords';
import WorldCupList from '../../components/WorldcupList';
import { useInfiniteScroll, useSearchBar } from '../../hooks';
import { getWorldcupList } from '../../utils/api/worldcups';
import { Worldcup } from '../../types/Datas';

function Main(): JSX.Element {
  const setOffsetRef = useRef<React.Dispatch<React.SetStateAction<number>> | null>(null);
  const [selectedTag, setSelectedTag] = useState('');

  const [searchWord, inputWord, onSubmit, onSearchWordChange] = useSearchBar(setOffsetRef.current);
  const {
    items: worldcups,
    target,
    isLoading,
    isClickMore,
    onClickMoreBtn,
    setOffset,
  } = useInfiniteScroll<Worldcup>(8, getWorldcupList, [searchWord, selectedTag]);

  const onClickTag = (keyword: string) => {
    setOffset(0);
    setSelectedTag(keyword);
    setSearchWord('');
  };
  const onResetData = () => {
    setSearchWord('');
    setSelectedTag('');
    setOffset(0);
  };

  return (
    <Wrapper>
      <Header
        type="searchHeader"
        onSubmit={onSubmit}
        onSearchWordChange={onSearchWordChange}
        searchWord={inputWord}
        onResetData={onResetData}
      />
      <Keywords onClickTag={onClickTag} selectedTag={selectedTag} />
      <WorldCupList
        type="worldcup"
        worldcups={worldcups}
        observeTarget={target}
        isLoading={isLoading}
        isClickMore={isClickMore}
        onClickMoreBtn={onClickMoreBtn}
      />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background: rgb(245, 220, 216);
  background: linear-gradient(0deg, rgba(245, 220, 216, 1) 0%, rgba(253, 248, 247, 1) 43%);
`;
export default Main;
