import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Keywords from '../../components/Keywords';
import WorldCupList from '../../components/WorldcupList';
import { useInfiniteScroll } from '../../hooks';
import { getWorldcupList } from '../../utils/api/worldcups';
import { Worldcup } from '../../types/Datas';

function Main(): JSX.Element {
  const [inputWord, setInputWord] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const {
    items: worldcups,
    target,
    isLoading,
    isClickMore,
    onClickMoreBtn,
    setOffset,
  } = useInfiniteScroll<Worldcup>(8, getWorldcupList, [searchWord, selectedTag]);

  const onSubmit = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    setOffset(0);
    setSearchWord(inputWord);
    setInputWord('');
    setSelectedTag('');
  };
  const onSearchWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputWord(event.target.value);
  };
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
