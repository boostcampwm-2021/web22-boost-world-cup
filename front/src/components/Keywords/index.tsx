import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getWorldcupList } from '../../utils/api/keywords';

function Keywords(): JSX.Element {
  const settings = {
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    draggable: false,
    speed: 300,
  };
  const [tagList, setTagList] = useState<Array<string>>([]);
  const getTagList = async () => {
    const data = await getWorldcupList();
    setTagList(data);
  };

  useEffect(() => {
    getTagList();
  }, []);
  return (
    <TagContainer {...settings}>
      {tagList.map((tag) => (
        <div key={tagList.indexOf(tag)}>
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
  margin: auto;
  margin-top: 20px;
  width: 80vw;
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
    z-index: 10;
  }
  .slick-next {
    right: 3% 
    z-index: 10;
  }
`;
export default Keywords;
