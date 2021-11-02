import React, { useState } from 'react';
import CardList from '../../components/WorldcupList';
import Header from '../../components/Header';
import TagList from '../../components/TagList';

function Main(): JSX.Element {
  const [isLogin, setIsLogin] = useState(true);
  const canSearch = true;
  return (
    <>
      <Header isLogin={isLogin} canSearch={canSearch} />
      <TagList />
      <CardList />
    </>
  );
}

export default Main;
