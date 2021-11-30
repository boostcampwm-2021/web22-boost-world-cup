import React, { useState } from 'react';
import styled from 'styled-components';
import { Header, Keywords, WorldcupList, SearchBar } from '../../components';
import { useInfiniteScroll } from '../../hooks';
import { getWorldcupList } from '../../apis/worldcups';
import { Worldcup } from '../../types/Datas';
import { FETCH_WORLDCUPS_LIMIT } from '../../constants/number';
import WorldCupItem from '../../components/WorldCupItem';

function Main(): JSX.Element {
  const [searchWord, setSearchWord] = useState('');
  const [inputWord, setInputWord] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const {
    items: worldcups,
    target,
    isLoading,
    isClickMore,
    onClickMoreBtn,
    setOffset,
    setIsClickMore,
  } = useInfiniteScroll<Worldcup>(FETCH_WORLDCUPS_LIMIT, getWorldcupList, [searchWord, selectedKeyword]);

  const onSubmit: React.MouseEventHandler = (event) => {
    event.preventDefault();
    setOffset(0);
    setSearchWord(inputWord);
    setSelectedKeyword('');
    setInputWord('');
    setIsClickMore(false);
  };
  const onSearchWordChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setInputWord(target.value);
  };
  const onClickKeyword = (keyword: string) => {
    setOffset(0);
    setSelectedKeyword(keyword);
    setSearchWord('');
    setIsClickMore(false);
  };
  const onResetData = () => {
    setSearchWord('');
    setSelectedKeyword('');
    setOffset(0);
    setIsClickMore(false);
  };

  return (
    <Wrapper>
      <Header onResetData={onResetData}>
        <SearchBar onSubmit={onSubmit} onSearchWordChange={onSearchWordChange} searchWord={inputWord} />
      </Header>
      <Keywords onClickKeyword={onClickKeyword} selectedKeyword={selectedKeyword} />
      <WorldcupList
        observeTarget={target}
        isLoading={isLoading}
        isClickMore={isClickMore}
        onClickMoreBtn={onClickMoreBtn}
      >
        {worldcups.map(({ id, thumbnail1, thumbnail2, title, description }) => (
          <WorldCupItem
            key={id}
            id={id}
            thumbnail1={thumbnail1}
            thumbnail2={thumbnail2}
            title={title}
            desc={description}
          />
        ))}
      </WorldcupList>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background: rgb(245, 220, 216);
  background: linear-gradient(0deg, rgba(245, 220, 216, 1) 0%, rgba(253, 248, 247, 1) 43%);
`;
export default Main;
