import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CardItem from './WorldCupItem';
import Loader from './Loader';
import useInfiniteScroll from '../../utils/hooks/useInfinityScroll';
import { get } from '../../utils/api/worldcups';

interface WorldcupType {
  createdAt: string;
  description: string;
  id: number;
  isTemp: boolean;
  thumbnail1: string;
  thumbnail2: string;
  title: string;
  totalCnt: number;
}
function WorldcupList(): JSX.Element {
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState<WorldcupType[]>([]);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [isClickMore, setIsClickMore] = useState(false);
  const threshold = 0.4;
  const onClickMoreButton = () => {
    setIsClickMore(true);
  };
  const fetchData = async () => {
    setLoading(true);
    const newItems = await get({ offset, limit: 8 });
    setItems([...items, ...newItems]);
    console.log(items);
    setOffset(offset + 8);
    setLoading(false);
  };
  const onIntersect = async ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (entry.isIntersecting && !loading) {
      observer.unobserve(entry.target);
      await fetchData();
      observer.observe(entry.target);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useInfiniteScroll(target, onIntersect, threshold, isClickMore);
  return (
    <>
      <Container>
        {items.map((item) => (
          <CardItem
            key={item.id}
            thumbnail1={item.thumbnail1}
            thumbnail2={item.thumbnail2}
            title={item.title}
            desc={item.description}
          />
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
