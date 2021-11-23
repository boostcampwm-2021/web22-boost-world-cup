import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import WorldCupList from '../../components/WorldcupList';
import { getWorldcupList } from '../../utils/api/worldcups';
import { useInfiniteScroll } from '../../hooks';
import { Worldcup } from '../../types/Datas';

const MyWorldcup = (): JSX.Element => {
  const [inputWord, setInputWord] = useState('');
  const [searchWord, setSearchWord] = useState('');

  const {
    items: worldcups,
    target,
    isLoading,
    isClickMore,
    onClickMoreBtn,
    setOffset,
  } = useInfiniteScroll<Worldcup>(8, getWorldcupList, [searchWord]);

  const onSubmit = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    setSearchWord(inputWord);
    setOffset(0);
    setInputWord('');
  };
  const onSearchWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputWord(event.target.value);
  };

  return (
    <Container>
      <Header type="searchHeader" onSubmit={onSubmit} onSearchWordChange={onSearchWordChange} searchWord={inputWord} />
      <WorldCupList
        type="worldcup"
        worldcups={worldcups}
        observeTarget={target}
        isLoading={isLoading}
        isClickMore={isClickMore}
        onClickMoreBtn={onClickMoreBtn}
      />
    </Container>
  );
};

const Container = styled.div``;

export default MyWorldcup;
