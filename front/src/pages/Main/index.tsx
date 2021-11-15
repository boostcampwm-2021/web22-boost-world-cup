import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../recoil/atom';
import { getUser } from '../../utils/api/auth';
import Header from '../../components/Header';
import Keywords from '../../components/Keywords';
import WorldCupList from '../../components/WorldcupList';

function Main(): JSX.Element {
  const setIsLoggedIn = useSetRecoilState(loginState);
  const [inputWord, setInputWord] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
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
  const onClickTag = (keyword: string) => {
    setOffset(0);
    setSelectedTag(keyword);
  };
  const getUserInfo = async () => {
    const user = await getUser();
    if (Object.keys(user).length !== 0) {
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <Wrapper>
      <Header type="searchHeader" onSubmit={onSubmit} onSearchWordChange={onSearchWordChange} searchWord={inputWord} />
      <Keywords onClickTag={onClickTag} />
      <WorldCupList
        type="worldcup"
        offset={offset}
        setOffset={setOffset}
        selectedTag={selectedTag}
        searchWord={searchWord}
      />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background: rgb(245, 220, 216);
  background: linear-gradient(0deg, rgba(245, 220, 216, 1) 0%, rgba(253, 248, 247, 1) 43%);
`;
export default Main;
