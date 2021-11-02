import React, { useState } from 'react';
import styled from 'styled-components';
import CardList from '../../components/WorldcupList';
import Header from '../../components/Header';
import TagList from '../../components/TagList';

function Main(): JSX.Element {
  const [isLogin, setIsLogin] = useState(true);
  const [searchWord, setSearchWord] = useState('');
  const canSearch = true;
  const onSubmit = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    setSearchWord('');
  };
  const onSearchWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };
  return (
    <Wrapper>
      <Header
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        canSearch={canSearch}
        onSubmit={onSubmit}
        onSearchWordChange={onSearchWordChange}
        searchWord={searchWord}
      />
      <TagList />
      <CardList />
    </Wrapper>
  );
}
const Wrapper = styled.body`
  background-color: #fdf8f7;
`;

export default Main;
