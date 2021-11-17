import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import RankingItem from './RankingItem';
import { TabBar, SearchBar, RankingModal } from '../../components';
import { getCandidateList } from '../../utils/api/ranking';
import { useTabBar } from '../../hooks';
import { RankingData } from '../../types/Datas';

interface RankingProps {
  worldcupId: string;
}
interface InfoType {
  total: number;
  male: number;
  female: number;
  teens: number;
  twenties: number;
  thirties: number;
  forties: number;
  etc: number;
}
function RankingList({ worldcupId }: RankingProps): JSX.Element {
  const tabTitle = ['연령별', '성별'];
  const [currentTab, onTabChange] = useTabBar();
  const [inputWord, setInputWord] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [data, setData] = useState<RankingData[]>([]);
  const [info, setInfo] = useState<InfoType[]>([]);
  const handleClick = () => {
    setIsOpenModal(!isOpenModal);
  };
  useEffect(() => {
    const fetchData = async () => {
      const newData = await getCandidateList(worldcupId);
      setData(newData);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (data) {
      const newAcc = getInfoAcc();
      setInfo(newAcc);
    }
  }, [data]);

  const getInfoAcc = () => {
    const infoAcc = data.map((v) => ({
      total: v.info_total,
      male: v.info_male,
      female: v.info_female,
      teens: v.info_teens,
      twenties: v.info_twenties,
      thirties: v.info_thirties,
      forties: v.info_forties,
      etc: v.info_etc,
    }));
    return infoAcc;
  };

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
                key={v.candidate_id}
                id={index + 1}
                url={v.candidate_url}
                name={v.candidate_name}
                winCnt={v.candidate_win_cnt}
                showCnt={v.candidate_show_cnt}
                victoryCnt={v.candidate_victory_cnt}
                info={info[index]}
                handleClick={handleClick}
              />
              {index + 1 < data.length ? <Divider /> : ''}
            </>
          );
        })}
      </RankingItems>
      {isOpenModal ? <RankingModal handleClick={handleClick} /> : ''}
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
