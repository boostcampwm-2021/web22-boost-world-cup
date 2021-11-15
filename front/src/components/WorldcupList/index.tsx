import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import WorldCupItem from './WorldCupItem';
import MyWorldCupItem from './MyWorldCupItem';
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
  type: 'worldcup' | 'myWorldcup';
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  searchWord?: string;
  selectedTag?: string;
}

function WorldcupList({ type, offset, setOffset, selectedTag, searchWord }: Props): JSX.Element {
  const [isClickMore, setIsClickMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<WorldcupType[]>([]);
  const target = useRef<HTMLDivElement | null>(null);
  const isMounted = useRef(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const threshold = 0.4;
  const limit = 8;
  const onClickMoreButton = () => {
    setIsClickMore(!isClickMore);
  };
  const fetchData = async () => {
    const newItems = await getWorldcupList({ offset, limit, search: searchWord, keyword: selectedTag });
    if (!newItems.length && observer.current) {
      observer.current.disconnect();
      setLoading(false);
      return;
    }
    if (!offset) setItems([...newItems]);
    else setItems([...items, ...newItems]);
  };
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      setOffset(offset + 8);
    }
    setLoading(false);
  }, [items.length, searchWord, selectedTag]);

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
    if (offset === 0) {
      fetchData();
      observer.current = new IntersectionObserver(onIntersect, { threshold });
    }
  }, [offset]);
  return (
    <>
      <Container>
        {items.map((item) =>
          type === 'worldcup' ? (
            <WorldCupItem
              id={item.id}
              thumbnail1={item.thumbnail1}
              thumbnail2={item.thumbnail2}
              title={item.title}
              desc={item.description}
            />
          ) : (
            <MyWorldCupItem
              id={item.id}
              thumbnail1={item.thumbnail1}
              thumbnail2={item.thumbnail2}
              title={item.title}
              desc={item.description}
            />
          ),
        )}
      </Container>
      {!isClickMore ? (
        <MoreButton onClick={onClickMoreButton}>
          <Title>더보기</Title>
        </MoreButton>
      ) : (
        ''
      )}
      <div ref={target} style={{ width: '10px', height: '10px' }}>
        {loading && <Loader />}
      </div>
    </>
  );
}

const Container = styled.div`
  margin: 1em;
  display: grid;
  width: calc(100vw-1em);
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 2fr);
  }
`;
const MoreButton = styled.div`
  width: 100%;
  height: 5em;
  line-height: 3em;
  text-align: center;
  margin: 2em;
  padding-top: 1em;
`;
const Title = styled.p`
  margin: auto;
  background-color: ${({ theme }) => theme.color.lightpink};
  color: ${({ theme }) => theme.color.gray[0]};
  width: 30em;
  height: 3em;
  border-radius: 12px;
  cursor: pointer;
  transition: all 300ms ease-in;
  &:hover {
    background-color: ${({ theme }) => theme.color.pink};
    color: ${({ theme }) => theme.color.gray[2]};
  }
`;

export default WorldcupList;
