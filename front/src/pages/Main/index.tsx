import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router';
import Header from '../../components/Header';
import Keywords from '../../components/Keywords';
import WorldcupList from '../../components/WorldcupList';
import SearchBar from '../../components/SearchBar';
import { useInfiniteScroll } from '../../hooks';
import { getWorldcupList } from '../../apis/worldcups';
import { Worldcup } from '../../types/Datas';
import { FETCH_WORLDCUPS_LIMIT } from '../../constants/number';
import WorldCupItem from '../../components/WorldCupItem';

function Main(): JSX.Element {
  const location = useLocation();
  const history = useHistory();
  const searchWord = useMemo(() => {
    const params = new URLSearchParams(location.search).get('title');
    if (params) {
      return params;
    }
    return '';
  }, [location]);
  const keyword = useMemo(() => {
    const params = new URLSearchParams(location.search).get('keyword');
    if (params) {
      return params;
    }
    return '';
  }, [location]);
  const [inputWord, setInputWord] = useState('');
  const {
    items: worldcups,
    target,
    isLoading,
    isClickMore,
    onClickMoreBtn,
    setOffset,
    setIsClickMore,
  } = useInfiniteScroll<Worldcup>(FETCH_WORLDCUPS_LIMIT, getWorldcupList, [searchWord, keyword]);

  const onSubmit: React.MouseEventHandler = (event) => {
    event.preventDefault();
    setOffset(0);
    setInputWord('');
    setIsClickMore(false);
    history.push(`/search?title=${inputWord}`);
  };
  const onSearchWordChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setInputWord(target.value);
  };
  const onClickKeyword = (keyword: string) => {
    setOffset(0);
    setIsClickMore(false);
    history.push(`/search?keyword=${keyword}`);
  };

  return (
    <Wrapper>
      <Header>
        <SearchBar onSubmit={onSubmit} onSearchWordChange={onSearchWordChange} searchWord={inputWord} />
      </Header>
      <Keywords onClickKeyword={onClickKeyword} selectedKeyword={keyword} />
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
