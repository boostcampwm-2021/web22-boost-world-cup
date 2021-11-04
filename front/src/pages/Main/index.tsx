import React, { useState } from 'react';
import styled from 'styled-components';
import CardList from '../../components/WorldcupList';
import Header from '../../components/Header';
import Keywords from '../../components/Keywords';

function Main(): JSX.Element {
  const [isLogin, setIsLogin] = useState(true);
  const [searchWord, setSearchWord] = useState('');
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
        type="searchHeader"
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        onSubmit={onSubmit}
        onSearchWordChange={onSearchWordChange}
        searchWord={searchWord}
      />
      <Keywords />
      <CardList />
    </Wrapper>
  );
}
const Wrapper = styled.body`
  background-color: #fdf8f7;
`;
export default Main;
