import React, { useState } from 'react';
import styled from 'styled-components';
import CardItem from './WorldCupItem';
import Loader from './Loader';
import items from './dummy';
import infiniteScroll from '../../utils/hooks';

function WorldcupList(): JSX.Element {
  const [itemList, setItemList] = useState(items.slice(0, 8));
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [isClickMore, setIsClickMore] = useState(false);
  const onClickMoreButton = () => {
    setIsClickMore(true);
  };
  const getItems = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setItemList((prevList) => items.slice(0, prevList.length + 4 < items.length ? prevList.length + 4 : items.length));
    setLoading(false);
  };
  const onIntersect = async ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (entry.isIntersecting && !loading) {
      observer.unobserve(entry.target);
      await getItems();
      observer.observe(entry.target);
    }
  };
  infiniteScroll(target, onIntersect, 0.4, isClickMore);
  return (
    <>
      <Container>
        {itemList.map((item) => (
          <CardItem thumbnail={item.thumbnail} title={item.title} desc={item.desc} />
        ))}
      </Container>
      {!isClickMore ? (
        <MoreButton onClick={onClickMoreButton}>
          <Title>더보기</Title>
        </MoreButton>
      ) : (
        ''
      )}
      <div ref={setTarget}>{loading && <Loader />}</div>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px 10px;
`;
const MoreButton = styled.div`
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 20px;
`;
const Title = styled.p`
  margin: auto;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.gray[0]};
  width: 70%;
  height: 40px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 300ms ease-in;
  &:hover {
    background-color: ${({ theme }) => theme.color.pink};
    color: ${({ theme }) => theme.color.black};
  }
`;

export default WorldcupList;
