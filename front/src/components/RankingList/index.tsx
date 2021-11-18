import React, { useState } from 'react';
import styled from 'styled-components';
import RankingItem from './RankingItem';
import { TabBar, SearchBar, RankingModal } from '../../components';
import { useTabBar } from '../../hooks';

function RankingList(): JSX.Element {
  const tabTitle = ['연령별', '성별'];
  const [currentTab, onTabChange] = useTabBar();
  const [inputWord, setInputWord] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const data = [
    {
      id: 1,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi5-XdRNNOnCbp5VlefGMkAvwJ9QB1s8s-xg&usqp=CAU',
      name: '수지',
      winCnt: 100,
      showCnt: 200,
      info: {
        infoTotal: 234,
        infoMale: 143,
        infoFemale: 152,
        infoTeens: 24,
        infoTwenties: 24,
        infoThirties: 24,
        infoFourties: 24,
        infoEtc: 24,
      },
    },
    {
      id: 2,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgM4tBBPl27cEIk5OjmAYbF7ialtFwLej46w&usqp=CAU',
      name: '고윤정',
      winCnt: 123,
      showCnt: 178,
      info: {
        infoTotal: 210,
        infoMale: 87,
        infoFemale: 23,
        infoTeens: 43,
        infoTwenties: 43,
        infoThirties: 43,
        infoFourties: 43,
        infoEtc: 43,
      },
    },
  ];
  const onSubmit = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    setSearchWord(inputWord);
    setInputWord('');
  };
  const onSearchWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputWord(event.target.value);
  };
  return (
    <>
      <Navigation>
        <TabBar tabTitle={tabTitle} currentTab={currentTab} onTabChange={onTabChange} />
        <SearchBar onSubmit={onSubmit} onSearchWordChange={onSearchWordChange} searchWord={inputWord} />
      </Navigation>
      <Caption>
        <LeftCaption>
          <span>순위</span>
          <span>이미지</span>
          <span>이름</span>
          <div />
        </LeftCaption>
        <RightCaption>
          <div>
            <p>우승비율</p>
            <span>(최종 우승 횟수 / 전체 게임 수)</span>
          </div>
          <div>
            <p>승률</p>
            <span>(승리 횟수 / 전체 1:1 대결 수)</span>
          </div>
        </RightCaption>
      </Caption>
      <RankingItems>
        {data.map((v, index) => {
          return (
            <>
              <RankingItem
                key={v.id}
                id={index + 1}
                url={v.url}
                name={v.name}
                winCnt={v.winCnt}
                showCnt={v.showCnt}
                info={v.info}
              />
              {index + 1 < data.length ? <Divider /> : ''}
            </>
          );
        })}
      </RankingItems>
      {/* <RankingModal /> */}
    </>
  );
}
const Navigation = styled.nav`
  position: absolute;
  top: -74px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 4em;
`;
const Caption = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  font-size: 1.8em;
  font-weight: bold;
  margin-bottom: 2em;
`;
const LeftCaption = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-evenly;
`;
const RightCaption = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-around;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      font-weight: 400;
      font-size: 0.5em;
    }
  }
`;
const RankingItems = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Divider = styled.hr`
  height: 1px;
  width: 90%;
  background-color: ${({ theme }) => theme.color.gray[0]};
  margin-bottom: 1em;
`;

export default RankingList;
