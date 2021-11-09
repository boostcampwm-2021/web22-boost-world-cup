import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import WorldCupItem from './WorldCupItem';
import Loader from './Loader';
import { getWorldcupList, getWorldcupListByKeyword } from '../../utils/api/worldcups';

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
  selectedTag: string;
  searchWord: string;
}
function WorldcupList({ offset, setOffset, selectedTag, searchWord }: Props): JSX.Element {
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
    let newItems;
    if (searchWord) {
      newItems = await getWorldcupListByKeyword({ offset, limit, search: searchWord });
    } else newItems = await getWorldcupList({ offset, limit });
    if (newItems.length === 0 && observer.current) {
      observer.current.disconnect();
      setLoading(false);
      return;
    }
    if (offset === 0) setItems([...newItems]);
    else setItems([...items, ...newItems]);
  };
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      setOffset(offset + 8);
    }
    setLoading(false);
  }, [items.length, searchWord]);

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
