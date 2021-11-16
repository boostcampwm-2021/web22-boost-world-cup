import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../recoil/atom';
import { getUser } from '../../utils/api/auth';
import Header from '../../components/Header';
import WorldCupList from '../../components/WorldcupList';

const MyWorldcup = (): JSX.Element => {
  const setIsLoggedIn = useSetRecoilState(loginState);
  const [inputWord, setInputWord] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [offset, setOffset] = useState(0);
  const onSubmit = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    setSearchWord(inputWord);
    setOffset(0);
    setInputWord('');
  };
  const onSearchWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputWord(event.target.value);
  };
  const getUserInfo = async () => {
    const user = await getUser();
    if (Object.keys(user).length !== 0) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Container>
      <Header type="searchHeader" onSubmit={onSubmit} onSearchWordChange={onSearchWordChange} searchWord={inputWord} />
      <WorldCupList type="myWorldcup" offset={offset} setOffset={setOffset} searchWord={searchWord} />
    </Container>
  );
};

const Container = styled.div``;

export default MyWorldcup;
