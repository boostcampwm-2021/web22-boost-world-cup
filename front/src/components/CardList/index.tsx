import React from 'react';
import styled from 'styled-components';
import CardItem from './CardItem';
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
  },
  {
    thumbnail: thumbnailImg,
    title: '여자배우 이상형 월드컵',
    desc: '나의 이상형은 누구? 여배우 중 나의 이상형을 찾아보자. 가나다라마바사아',
  },
  {
    thumbnail: thumbnailImg,
    title: '여자배우 이상형 월드컵',
    desc: '나의 이상형은 누구? 여배우 중 나의 이상형을 찾아보자. 가나다라마바사아',
  },
  {
    thumbnail: thumbnailImg,
    title: '여자배우 이상형 월드컵',
    desc: '나의 이상형은 누구? 여배우 중 나의 이상형을 찾아보자. 가나다라마바사아',
  },
  {
    thumbnail: thumbnailImg,
    title: '여자배우 이상형 월드컵',
    desc: '나의 이상형은 누구? 여배우 중 나의 이상형을 찾아보자. 가나다라마바사아',
  },
  {
    thumbnail: thumbnailImg,
    title: '여자배우 이상형 월드컵',
    desc: '나의 이상형은 누구? 여배우 중 나의 이상형을 찾아보자. 가나다라마바사아',
  },
  {
    thumbnail: thumbnailImg,
    title: '여자배우 이상형 월드컵',
    desc: '나의 이상형은 누구? 여배우 중 나의 이상형을 찾아보자. 가나다라마바사아',
  },

  {
    thumbnail: thumbnailImg,
    title: '여자배우 이상형 월드컵',
    desc: '나의 이상형은 누구? 여배우 중 나의 이상형을 찾아보자. 가나다라마바사아',
  },
];
function CardList(): JSX.Element {
  return (
    <Container>
      {items.map((item) => (
        <CardItem thumbnail={item.thumbnail} title={item.title} desc={item.desc} />
      ))}
    </Container>
  );
}
export default CardList;
