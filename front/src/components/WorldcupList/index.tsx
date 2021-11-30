import React from 'react';
import styled from 'styled-components';
import Loader from '../Loader';

interface Props {
  children: React.ReactNode;
  observeTarget: React.MutableRefObject<HTMLDivElement | null>;
  isLoading: boolean;
  isClickMore: boolean;
  onClickMoreBtn: React.MouseEventHandler;
}

function WorldcupList({ children, observeTarget, isLoading, isClickMore, onClickMoreBtn }: Props): JSX.Element {
  return (
    <>
      <Container>{children}</Container>
      {!isClickMore ? (
        <MoreButton onClick={onClickMoreBtn}>
          <Title>더보기</Title>
        </MoreButton>
      ) : (
        ''
      )}
      <div ref={observeTarget} style={{ width: '10px', height: '10px' }}>
        {isLoading && <Loader />}
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
  margin-top: 2em;
  margin-bottom: 2em;
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
