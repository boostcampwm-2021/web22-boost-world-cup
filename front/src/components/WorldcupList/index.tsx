import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import WorldCupItem from './WorldCupItem';
import Loader from './Loader';
import { getWorldcupList } from '../../utils/api/worldcups';

interface WorldcupType {
  id: number;
  thumbnail1: string;
  thumbnail2: string;
  title: string;
  description: string;
}
interface Props {
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}
function WorldcupList({ offset, setOffset }: Props): JSX.Element {
  const [isClickMore, setIsClickMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<WorldcupType[]>([]);
  const target = useRef<HTMLDivElement | null>(null);
  const isMounted = useRef(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const threshold = 0.4;
  const onClickMoreButton = () => {
    setIsClickMore(!isClickMore);
  };
  const fetchData = async () => {
    const newItems = await getWorldcupList({ offset, limit: 8 });
    if (newItems.length === 0 && observer.current) {
      observer.current.disconnect();
      setLoading(false);
      return;
    }
    setItems([...items, ...newItems]);
  };
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      setOffset(offset + 8);
    }
    setLoading(false);
  }, [items.length]);

  const onIntersect = ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (entry.isIntersecting && !loading) {
      setLoading(true);
      fetchData();
      observer.unobserve(entry.target);
    }
  };
  useEffect(() => {
    if (isClickMore && target.current && observer.current) {
      observer.current = new IntersectionObserver(onIntersect, { threshold });
      observer.current.observe(target.current);
    }
  }, [offset, isClickMore]);

  useEffect(() => {
    fetchData();
    observer.current = new IntersectionObserver(onIntersect, { threshold });
  }, []);

  return (
    <>
      <Container>
        {items.map((item) => (
          <WorldCupItem
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
      <div ref={target}>{loading && <Loader />}</div>
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
