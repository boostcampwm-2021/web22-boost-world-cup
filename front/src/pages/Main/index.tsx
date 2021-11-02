import React, { useState } from 'react';
import styled from 'styled-components';
import CardList from '../../components/WorldcupList';
import Header from '../../components/Header';
import TagList from '../../components/TagList';

function Main(): JSX.Element {
  const [isLogin, setIsLogin] = useState(true);
  const canSearch = true;
  return (
    <Wrapper>
      <Header isLogin={isLogin} canSearch={canSearch} />
      <TagList />
      <CardList />
    </Wrapper>
  );
}
const Wrapper = styled.body`
  background-color: #fdf8f7;
`;

export default Main;
