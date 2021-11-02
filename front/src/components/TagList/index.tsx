import React from 'react';
import styled from 'styled-components';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const tagList: Array<string> = [
  '전체',
  '아이돌',
  '제일 좋아하는',
  '영화',
  '인기있는',
  '연예인',
  'BJ',
  '게임',
  '노래',
  '맛없는',
  '유행하는',
  '핫한',
  '음식',
];
function TagList() {
  const settings = {
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    draggable: false,
    speed: 300,
  };
  return (
    <TagContainer {...settings}>
      {tagList.map((tag) => (
        <div>
          <h3>{tag}</h3>
        </div>
      ))}
    </TagContainer>
  );
}

const TagContainer = styled(Slider)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto;
  margin-top: 20px;
  width: 90vw;
  .slick-slide {
    margin: 0 14px;
    background-color: ${({ theme }) => theme.color.primary};
    white-space: noWrap;
    padding: 12px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 300ms ease-in;
    &:hover {
      background-color: ${({ theme }) => theme.color.pink};
      color: ${({ theme }) => theme.color.highlight};
      transform: scale(1.1);
    }
  }
  .slick-prev:before {
    color: ${({ theme }) => theme.color.pink};
  }
  .slick-next:before {
    color: ${({ theme }) => theme.color.pink};
  }
  .slick-prev {
    left: 3% 
    z-index: 1;
  }
  .slick-next {
    right: 3% 
    z-index: 1;
  }
`;
export default TagList;
