import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useApiRequest } from '../../hooks';
import { getKeywordList } from '../../apis/keyword';

interface Props {
  onClickKeyword: (keyword: string) => void;
  selectedKeyword: string;
}
function Keywords({ onClickKeyword, selectedKeyword }: Props): JSX.Element {
  const settings = {
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    draggable: false,
    speed: 300,
  };
  const [keywordList, setKeywordList] = useState<Array<string>>([]);
  const onGetKeywordListSuccess = (keywordList: string[]) => setKeywordList(keywordList);
  const getKeywordListDispatcher = useApiRequest(getKeywordList, onGetKeywordListSuccess);
  const onToggleKeyword = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const element = event.target as HTMLElement;
    if (element.innerText === selectedKeyword) {
      onClickKeyword('');
      return;
    }
    onClickKeyword(element.innerText);
  };

  useEffect(() => {
    getKeywordListDispatcher({ type: REQUEST });
  }, []);

  return (
    <KeywordContainer {...settings}>
      {keywordList.map((keyword) => (
        <div key={keywordList.indexOf(keyword)} onClick={onToggleKeyword} aria-hidden="true">
          <KeywordName selected={selectedKeyword === keyword}>{keyword}</KeywordName>
        </div>
      ))}
    </KeywordContainer>
  );
}

const KeywordContainer = styled(Slider)`
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

const KeywordName = styled.h3<{ selected: boolean }>`
  color: ${(props) => (props.selected ? '#524847' : 'white')};
  font-weight: ${(props) => (props.selected ? 'bold' : '400')};
  &:hover {
    color: ${({ theme }) => theme.color.gray[2]};
  }
`;
export default Keywords;
