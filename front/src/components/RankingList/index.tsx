import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import RankingItem from './RankingItem';
import { SearchBar, RankingModal } from '../../components';
import { getCandidateList } from '../../utils/api/ranking';
import { RankingData, RankingSummaryData, InfoData } from '../../types/Datas';

interface RankingProps {
  worldcupId: string;
}
function RankingList({ worldcupId }: RankingProps): JSX.Element {
  const [inputWord, setInputWord] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [data, setData] = useState<RankingData[]>([]);
  const [renderData, setRenderData] = useState<RankingSummaryData[]>([]);
  const [info, setInfo] = useState<InfoData[]>([]);
  const candidateRef = useRef<number | null>(null);
  const handleClick = (event: React.MouseEvent<Element>) => {
    setIsOpenModal(!isOpenModal);
    if (event.currentTarget.children[2]) {
      const candidateName = event.currentTarget.children[2].innerHTML;
      candidateRef.current = data.findIndex((v) => v.name === candidateName);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const newData = await getCandidateList(worldcupId);
      setData(newData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setRenderData(getRenderData(data));
    setInfo(getInfoAcc(data));
  }, [data]);
  const getRenderData = useCallback((dataset: RankingData[]) => {
    return dataset
      .map((v) => ({
        id: v.id,
        url: v.url,
        name: v.name,
        victoryRatio: v.total > 0 ? v.victoryCnt / v.total : 0,
        winRatio: v.total > 0 ? v.winCnt / v.showCnt : 0,
      }))
      .sort((a, b) => b.victoryRatio - a.victoryRatio);
  }, []);

  const getInfoAcc = useCallback((dataset: RankingData[]) => {
    return dataset.map((v) => ({
      name: v.name,
      total: v.winCnt,
      male: v.male,
      female: v.female,
      teens: v.teens,
      twenties: v.twenties,
      thirties: v.thirties,
      forties: v.forties,
      etc: v.etc,
    }));
  }, []);

  const onSubmit = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    const filteredData = getRenderData(data.filter((value) => value.name.indexOf(inputWord) !== -1));
    setRenderData([...filteredData]);
    setInputWord('');
  };
  const onSearchWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputWord(event.target.value);
  };
  return (
    <>
      <Navigation>
        <SearchBar onSubmit={onSubmit} onSearchWordChange={onSearchWordChange} searchWord={inputWord} />
      </Navigation>
      <Caption>
        <LeftCaption>
          <span>순위</span>
          <span>이미지</span>
          <p>이름</p>
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
        {renderData.map((v, index) => {
          return (
            <Wrapper key={v.id}>
              <RankingItem
                id={index + 1}
                url={v.url}
                name={v.name}
                victoryRatio={v.victoryRatio}
                winRatio={v.winRatio}
                handleClick={handleClick}
              />
              {index + 1 < renderData.length ? <Divider /> : ''}
            </Wrapper>
          );
        })}
      </RankingItems>
      {isOpenModal ? <RankingModal handleClick={handleClick} info={info[candidateRef.current as number]} /> : ''}
    </>
  );
}
const Navigation = styled.div`
  position: absolute;
  right: 3vw;
  top: -80px;
  width: 230px;
  display: flex;
`;
const Caption = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  font-size: 1.8em;
  font-weight: bold;
  padding: 10px 0 30px 0;
`;
const LeftCaption = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-evenly;
  p {
    width: 150px;
    padding-left: 30px;
  }
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
      padding-top: 10px;
      font-weight: 400;
      font-size: 0.5em;
    }
  }
`;
const Wrapper = styled.div`
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RankingItems = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Divider = styled.hr`
  height: 1px;
  width: 90%;
  background-color: gray;
  margin-bottom: 1em;
`;

export default RankingList;
