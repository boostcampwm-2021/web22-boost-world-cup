import React from 'react';
import styled from 'styled-components';
import { FaPlay, FaList, FaShare } from 'react-icons/fa';
import theme from '../../commons/style/theme';

const Item = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
  padding: 0px 20px;
  background-color: ${theme.color.white};
`;
const Thumbnail = styled.img`
  width: 280px;
  height: 180px;
`;
const Title = styled.p`
  font: ${theme.fontStyle.h3Bold};
`;
const Desc = styled.p`
  font: ${theme.fontStyle.caption};
`;
const Buttons = styled.div`
  display: flex;
  padding-top: 20px;
`;
const Start = styled.div`
  display: flex;
  padding: 8px;
  color: red;
  font-size: 12px;
  border: 1px solid red;
  border-radius: 4px;
  margin-right: 10px;
  span {
    margin-left: 4px;
  }
  cursor: pointer;
`;
const Ranking = styled.div`
  display: flex;
  padding: 8px;
  color: orange;
  font-size: 12px;
  border: 1px solid orange;
  border-radius: 4px;
  margin-right: 10px;
  span {
    margin-left: 4px;
  }
  cursor: pointer;
`;
const Share = styled.div`
  display: flex;
  padding: 8px;
  color: blue;
  font-size: 12px;
  border: 1px solid blue;
  border-radius: 4px;
  span {
    margin-left: 4px;
  }
  cursor: pointer;
`;

interface Props {
  thumbnail: string;
  title: string;
  desc: string;
}
function CardItem({ thumbnail, title, desc }: Props): JSX.Element {
  return (
    <Item>
      <Thumbnail src={thumbnail} alt="thumbnail" />
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
      <Buttons>
        <Start>
          <FaPlay />
          <span>시작하기</span>
        </Start>
        <Ranking>
          <FaList />
          <span>랭킹보기</span>
        </Ranking>
        <Share>
          <FaShare />
          <span>공유하기</span>
        </Share>
      </Buttons>
    </Item>
  );
}

export default CardItem;
