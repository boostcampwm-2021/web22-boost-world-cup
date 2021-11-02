import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import WorldCupItem from './WorldCupItem';
import thumbnailImg from '../../images/logo.png';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px 10px;
`;
const items = [
  {
    thumbnail: thumbnailImg,
    title: '여자배우 이상형 월드컵',
    desc: '나의 이상형은 누구? 여배우 중 나의 이상형을 찾아보자. 가나다라마바사아',
    keyword: '연예인',
  },
  {
    thumbnail: thumbnailImg,
    title: '재미있는 영화 이상형 월드컵',
    desc: '나의 이상형은 누구? 여배우 중 나의 이상형을 찾아보자. 가나다라마바사아',
    keyword: '영화',
  },
  {
    thumbnail: thumbnailImg,
    title: '맛없는 음식 이상형 월드컵',
    desc: '나의 이상형은 누구? 여배우 중 나의 이상형을 찾아보자. 가나다라마바사아',
    keyword: '음식',
  },
  {
    thumbnail: thumbnailImg,
    title: '여자배우 이상형 월드컵',
    desc: '나의 이상형은 누구? 여배우 중 나의 이상형을 찾아보자. 가나다라마바사아',
    keyword: '연예인',
  },
  {
    thumbnail: thumbnailImg,
    title: '재미있는 영화 이상형 월드컵',
    desc: '나의 이상형은 누구? 여배우 중 나의 이상형을 찾아보자. 가나다라마바사아',
    keyword: '영화',
  },
  {
    thumbnail: thumbnailImg,
    title: '맛없는 음식 이상형 월드컵',
    desc: '나의 이상형은 누구? 여배우 중 나의 이상형을 찾아보자. 가나다라마바사아',
    keyword: '음식',
  },
  {
    thumbnail: thumbnailImg,
    title: '여자배우 이상형 월드컵',
    desc: '나의 이상형은 누구? 여배우 중 나의 이상형을 찾아보자. 가나다라마바사아',
    keyword: '연예인',
  },
  {
    thumbnail: thumbnailImg,
    title: '재미있는 영화 이상형 월드컵',
    desc: '나의 이상형은 누구? 여배우 중 나의 이상형을 찾아보자. 가나다라마바사아',
    keyword: '영화',
  },
];
function WorldcupList(): JSX.Element {
  return (
    <Container>
      {items.map((item) => (
        <WorldCupItem thumbnail={item.thumbnail} title={item.title} desc={item.desc} />
      ))}
    </Container>
  );
}
export default WorldcupList;
