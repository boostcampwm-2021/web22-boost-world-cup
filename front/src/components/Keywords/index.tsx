import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getTagList } from '../../apis/keyword';
import { useApiRequest } from '../../hooks';

interface Props {
  onClickTag: (keyword: string) => void;
  selectedTag: string;
}
function Keywords({ onClickTag, selectedTag }: Props): JSX.Element {
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
  const onGetTagListSuccess = (tagList: string[]) => setTagList(tagList);
  const getTagListDispatcher = useApiRequest(getTagList, onGetTagListSuccess);
  const onToggleKeyword = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const element = event.target as HTMLElement;
    if (element.innerText === selectedTag) {
      onClickTag('');
    } else {
      onClickTag(element.innerText);
    }
  };

  useEffect(() => {
    getTagListDispatcher({ type: 'REQUEST' });
  }, []);

  return (
    <TagContainer {...settings}>
      {tagList.map((tag) => (
        <div key={tagList.indexOf(tag)} onClick={onToggleKeyword} aria-hidden="true">
          <TagName selected={selectedTag === tag}>{tag}</TagName>
        </div>
      ))}
    </TagContainer>
  );
}

const TagContainer = styled(Slider)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 20px;
  width: 80%;

  .slick-slide {
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 1em;
    background-color: ${({ theme }) => theme.color.pink};
    white-space: noWrap;
    padding: 1em;
    border-radius: 25px;
    cursor: pointer;
    transition: all 300ms ease-in;
    &:hover {
      background-color: ${({ theme }) => theme.color.pink};
    }
  }
  .slick-prev {
    left: 3% 
    z-index: 10;
  }
  .slick-next {
    right: 3% 
    z-index: 10;
  }
  .slick-prev:before {
    color: ${({ theme }) => theme.color.pink};
  }
  .slick-next:before {
    color: ${({ theme }) => theme.color.pink};
  }
`;

const TagName = styled.h3<{ selected: boolean }>`
  color: ${(props) => (props.selected ? '#524847' : 'white')};
  font-weight: ${(props) => (props.selected ? 'bold' : '400')};
  &:hover {
    color: ${({ theme }) => theme.color.gray[2]};
  }
`;
export default Keywords;
