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
  };

  useEffect(() => {
    setOffsetRef.current = setOffset;
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Wrapper>
      <Header type="searchHeader" onSubmit={onSubmit} onSearchWordChange={onSearchWordChange} searchWord={inputWord} />
      <Keywords onClickTag={onClickTag} />
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
