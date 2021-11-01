import React, { useState } from 'react';
import Header from '../../components/Header';

function Main(): JSX.Element {
  const [isLogin, setIsLogin] = useState(true);
  const canSearch = true;
  return <Header isLogin={isLogin} canSearch={canSearch} />;
}

export default Main;
