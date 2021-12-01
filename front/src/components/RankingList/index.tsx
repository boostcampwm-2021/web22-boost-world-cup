import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import RankingItem from './RankingItem';
import SearchBar from '../SearchBar';
import RankingModal from '../RankingModal';
import Pagination from '../Pagination';
import BackDrop from '../BackDrop';
import { usePaginationAsync, useThrottle, useApiRequest, useModal } from '../../hooks';
import { getCandidateList } from '../../apis/ranking';
import { getWorldcupMetadata } from '../../apis/worldcups';
import { RankingData, WorldcupMetaData } from '../../types/Datas';
import { PAGINATION_LIMIT } from '../../constants/number';

interface Props {
  worldcupId: string;
}

function RankingList({ worldcupId }: Props): JSX.Element {
  const [inputWord, setInputWord] = useState('');
  const [totalCnt, setTotalCnt] = useState<number>(0);
  const candidateRef = useRef<number | null>(null);
  const [candidateList, currentPage, offset, lastPage, onPageChange] = usePaginationAsync<RankingData>(
    totalCnt,
    PAGINATION_LIMIT,
    getCandidateList,
    [inputWord, worldcupId],
    [totalCnt],
  );
  const [modalOn, onToggleModal] = useModal();
  const onGetWorldcupMetadataSuccess = ({ totalCnt }: WorldcupMetaData) => setTotalCnt(totalCnt);
  const getWorldcupMetaDataDispatcher = useApiRequest(getWorldcupMetadata, onGetWorldcupMetadataSuccess);
  const throttledGetWorldcupMetaData = useThrottle(
    () => getWorldcupMetaDataDispatcher({ type: 'REQUEST', requestProps: [worldcupId, inputWord] }),
    500,
  );
  const onShowRankingDetail = (event: React.MouseEvent<Element>) => {
    onToggleModal(event);
    const candidateName = event.currentTarget.children[2].innerHTML;
    candidateRef.current = candidateList.findIndex((v) => v.name === candidateName);
  };

  const getInfoAcc = useCallback((candidate: RankingData) => {
    return {
      id: candidate.id,
      name: candidate.name,
      male: Number(candidate.male),
      female: Number(candidate.female),
      teens: Number(candidate.teens),
      twenties: Number(candidate.twenties),
      thirties: Number(candidate.thirties),
      forties: Number(candidate.forties),
      fifties: Number(candidate.fifties),
      etc: Number(candidate.etc),
    };
  }, []);

  const onSubmit = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    setInputWord('');
  };

  const onSearchWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputWord(inputValue);
  };

  useEffect(() => {
    throttledGetWorldcupMetaData();
  }, [inputWord]);

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
      <RankingItemContainer>
        {candidateList.map((v, index) => {
          return (
            <Wrapper key={v.id}>
              <RankingItem
                id={offset + index + 1}
                imgKey={v.imgKey}
                name={v.name}
                victoryRatio={v.victoryRatio}
                winRatio={v.winRatio}
                onClick={onShowRankingDetail}
              />
              {index + 1 < candidateList.length ? <Divider /> : ''}
            </Wrapper>
          );
        })}
        <Pagination lastPage={lastPage} currentPage={currentPage} onPageChange={onPageChange} />
      </RankingItemContainer>
      {modalOn && (
        <BackDrop modalOn={modalOn} onToggleModal={onToggleModal}>
          <RankingModal info={getInfoAcc(candidateList[candidateRef.current as number])} />
        </BackDrop>
      )}
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
const RankingItemContainer = styled.section`
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
