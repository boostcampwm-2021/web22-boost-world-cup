import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Header, RoundSelector } from '../../components';
import logo from '../../images/logo.png';
import { getWorldcupMetadata } from '../../apis/worldcups';
import { getCandidateList } from '../../apis/game';
import { candidateData, gameInfoData, WorldcupMetaData } from '../../types/Datas';
import { objectEncryption } from '../../utils/crypto';
import { useApiRequest } from '../../hooks';
import { MAIN, WORLDCUP } from '../../constants/route';

function Initialize(): JSX.Element {
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ready, setReady] = useState(false);
  const [round, setRound] = useState(0);
  const [candidatesSize, setCandidatesSize] = useState(1);
  const [possibleRound, setPossibleRound] = useState([] as string[]);

  const worldcupId = useMemo(() => location.pathname.split('/')[2], [location]);
  const gameRound = 2 ** (round + 2);

  const onGetWorldcupMetadataSuccess = ({ totalCnt, title, description }: WorldcupMetaData) => {
    setTitle(title);
    setDescription(description);
    setCandidatesSize(totalCnt);
  };
  const getWorldcupMetadataDispatcher = useApiRequest(getWorldcupMetadata, onGetWorldcupMetadataSuccess);
  const onGetCandidateListSuccess = (candidateList: candidateData[]) => {
    const gameInfo = makeGameInfo(gameRound, candidateList);
    const secretKey = process.env.REACT_APP_SECRET_KEY;
    if (!secretKey) return;
    sessionStorage.clear();
    const cipherText = objectEncryption(gameInfo);
    sessionStorage.setItem('_wiziboost', cipherText);
    setReady(true);
  };
  const getCandidateListDispatcher = useApiRequest(getCandidateList, onGetCandidateListSuccess);

  const initializePossibleRound = useCallback(() => {
    const tempNumber = Math.floor(Math.log2(candidatesSize));
    const tempRoundList = Array.from({ length: tempNumber - 1 }, (_, i) => i + 2).map((index) => String(2 ** index));
    setPossibleRound([...possibleRound, ...tempRoundList]);
  }, [candidatesSize]);

  const roundSelector = (newAge: number) => setRound(newAge);

  const makeGameInfo = (gameRound: number, candidatesList: candidateData[]): gameInfoData => ({
    isCompleted: false,
    worldcupId,
    title,
    round: gameRound / 2,
    currentRound: 1,
    candidatesList,
    selectedCandidate: [],
    winCandidate: { id: 0, name: '', imgKey: '' },
  });

  const onStartBtnClick = () => getCandidateListDispatcher({ type: 'REQUEST', requestProps: [worldcupId, gameRound] });

  useEffect(() => {
    getWorldcupMetadataDispatcher({ type: 'REQUEST', requestProps: [Number(worldcupId)] });
    initializePossibleRound();
  }, [initializePossibleRound]);

  return ready ? (
    <Redirect to={WORLDCUP} />
  ) : (
    <>
      <Header type="header" />
      <Container>
        <InfoContainer>
          <img src={logo} alt="logo" width="220px" height="200px" />
          <Title>{title}</Title>
          <Desc>{description}</Desc>
        </InfoContainer>
        <RoundContainer>
          <RoundSubContainer>
            <span>총 라운드를 선택하세요.</span>
            <RoundSelector round={round} roundSelector={roundSelector} possibleRound={possibleRound} />
            <span>
              총 {candidatesSize}명의 후보 중 무작위 {possibleRound[round]}명이 대결합니다.
            </span>
          </RoundSubContainer>
        </RoundContainer>
        <ButtonContainer>
          <StartButton onClick={onStartBtnClick}>시작하기</StartButton>
          <MainButton>
            <Link to={MAIN}>메인으로</Link>
          </MainButton>
        </ButtonContainer>
      </Container>
      <BackWindow />
    </>
  );
}

const MainButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  color: ${({ theme }) => theme.color.black};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 1000px;
  justify-content: space-evenly;
  padding-top: 3%;
  div {
    width: 40%;
    height: 60px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const StartButton = styled.div`
  display: flex;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.pink};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  height: 610px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  left: 50%;
  transform: translate(-50%, 5%);
  background-color: ${({ theme }) => theme.color.white};
  z-index: 3;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 3%;
  padding-right: 3%;
`;

const RoundContainer = styled.div`
  background-color: ${({ theme }) => theme.color.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1%;
`;

const RoundSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3%;
  padding-bottom: 3%;
  width: 80%;
  span {
    align-self: baseline;
    margin-top: 1%;
    margin-bottom: 1%;
    ${({ theme }) => theme.fontStyle.bodyBold}
  }
`;

const BackWindow = styled.div`
  position: fixed;
  background-color: gray;
  opacity: 0.3;
  width: 100%;
  height: 100%;
  z-index: 2;
  top: 0;
  left: 0;
`;

const Title = styled.div`
  text-align: center;
  ${({ theme }) => theme.fontStyle.h1Bold}
`;

const Desc = styled.div`
  text-align: center;
  ${({ theme }) => theme.fontStyle.h3}
`;

export default Initialize;
