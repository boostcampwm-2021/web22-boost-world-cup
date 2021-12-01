import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Redirect } from 'react-router';
import styled, { keyframes, css } from 'styled-components';
import Header from '../../components/Header';
import vsImg from '../../images/vs.png';
import { candidateData, gameInfoData } from '../../types/Datas';
import Gameover from '../Gameover';
import { sendCurrentResult, sendFinalResult } from '../../apis/ranking';
import { useApiRequest } from '../../hooks';
import { LEFT, RIGHT } from '../../constants/number';
import { MAIN } from '../../constants/route';
import { getImgURL, getBlurImgURL } from '../../utils/getImgURL';

function Worldcup(): JSX.Element {
  const [isInitialized, setIsInitialized] = useState(true);
  const [pick, setPick] = useState(0);
  const [gameInfo, setGameInfo] = useState<gameInfoData>();
  const [leftCandidate, setLeftCandidate] = useState<candidateData>();
  const [rightCandidate, setRightCandidate] = useState<candidateData>();
  const debouncerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onSendCurrentResultSuccess = () => {
    debouncerRef.current = null;
  };
  const sendCurrentResultDispatcher = useApiRequest(sendCurrentResult, onSendCurrentResultSuccess);
  const sendFinalResultDispatcher = useApiRequest(sendFinalResult);

  const setCandidates = useCallback((candidatesList: candidateData[]) => {
    candidatesList.sort(() => Math.random() - 0.5);
    setLeftCandidate(candidatesList[0]);
    setRightCandidate(candidatesList[1]);
  }, []);

  useEffect(() => {
    const sessionStorageData = sessionStorage.getItem('_wiziboost');
    if (sessionStorageData) {
      const gameData = JSON.parse(sessionStorageData);
      setGameInfo(gameData);
      setCandidates(gameData.candidatesList);
      setPick(0);
      return;
    }
    setIsInitialized(false);
  }, []);

  const setSessionStorage = useCallback((gameInfo: gameInfoData): void => {
    sessionStorage.setItem('_wiziboost', JSON.stringify(gameInfo));
  }, []);

  const onImageClick = useCallback(
    (direction: number): React.MouseEventHandler => {
      return () => {
        if (debouncerRef.current) return;
        setPick(direction);
        debouncerRef.current = setTimeout(() => {
          let winId: number | undefined;
          let loseId: number | undefined;

          if (direction === LEFT) {
            winId = leftCandidate?.id;
            loseId = rightCandidate?.id;
          } else {
            winId = rightCandidate?.id;
            loseId = leftCandidate?.id;
          }
          if (gameInfo) {
            const newGameInfo = { ...gameInfo };
            const winCandidate = gameInfo.candidatesList.find((candidate) => candidate.id === winId);
            const remainCandidateList = gameInfo.candidatesList.filter(
              (candidate) => candidate.id !== winId && candidate.id !== loseId,
            );
            newGameInfo.candidatesList = [...remainCandidateList];
            if (gameInfo.selectedCandidate && winCandidate) {
              newGameInfo.selectedCandidate = [...gameInfo.selectedCandidate, winCandidate];
            }
            if (newGameInfo.round === 1) {
              newGameInfo.isCompleted = true;
              if (winCandidate) {
                newGameInfo.winCandidate = winCandidate;
              }
              setGameInfo(newGameInfo);
              setSessionStorage(newGameInfo);
              sendFinalResultDispatcher({
                type: 'REQUEST',
                requestProps: [gameInfo.worldcupId, winId as number, loseId as number],
              });
              return;
            }
            sendCurrentResultDispatcher({ type: 'REQUEST', requestProps: [winId as number, loseId as number] });
            if (newGameInfo.currentRound === newGameInfo.round) {
              newGameInfo.round /= 2;
              newGameInfo.currentRound = 1;
              newGameInfo.candidatesList = [...newGameInfo.selectedCandidate];
              newGameInfo.selectedCandidate = [];
            } else {
              newGameInfo.currentRound = gameInfo.currentRound + 1;
            }
            setGameInfo(newGameInfo);
            setCandidates(newGameInfo.candidatesList);
            setPick(0);
            setSessionStorage(newGameInfo);
          }
        }, 1500);
      };
    },
    [leftCandidate, rightCandidate],
  );

  const makeRoundText = (round?: number) => {
    if (!round) return;
    if (round === 1) return '결승';
    return `${round * 2}강`;
  };

  if (!isInitialized) return <Redirect to={MAIN} />;

  return !gameInfo?.isCompleted ? (
    <Wrapper>
      <Header />
      <InfoContainer>
        <Title>
          {gameInfo?.title} {gameInfo?.currentRound}/{gameInfo?.round}
        </Title>
        <Round>{makeRoundText(gameInfo?.round)}</Round>
      </InfoContainer>
      <ImageContainer select={pick}>
        <VersusImage src={vsImg} select={pick} />
        <LeftImageContainer select={pick}>
          <LeftImage src={leftCandidate ? getImgURL(leftCandidate.imgKey) : ''} onClick={onImageClick(LEFT)} />
        </LeftImageContainer>
        <RightImageContainer select={pick}>
          <RightImage src={rightCandidate ? getImgURL(rightCandidate.imgKey) : ''} onClick={onImageClick(RIGHT)} />
        </RightImageContainer>
      </ImageContainer>
      <NameContainer select={pick}>
        <LeftName select={pick}>{leftCandidate ? leftCandidate.name : ''}</LeftName>
        <RightName select={pick}>{rightCandidate ? rightCandidate.name : ''}</RightName>
      </NameContainer>
    </Wrapper>
  ) : (
    <Gameover winCandidate={gameInfo?.winCandidate} title={gameInfo?.title} worldcupId={gameInfo?.worldcupId} />
  );
}

const LeftImageContainer = styled.div<{ select: number }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${({ select }) => (select === LEFT ? `center` : `flex-end`)};
  animation: ${({ select }) =>
    select === RIGHT
      ? css`
          ${notSelected} 1s ease forwards
        `
      : css``};
`;

const RightImageContainer = styled.div<{ select: number }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  justify-content: ${({ select }) => (select === RIGHT ? `center` : `flex-start`)};
  animation: ${({ select }) =>
    select === LEFT
      ? css`
          ${notSelected} 1s ease forwards
        `
      : css``};
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
`;

const Wrapper = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.color.lightpink};
`;

const Title = styled.div`
  ${({ theme }) => theme.fontStyle.h2Bold};
`;

const Round = styled.div`
  width: 100px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  ${({ theme }) => theme.fontStyle.h3Bold};
  background-color: ${({ theme }) => theme.color.primary};
`;

const NameContainer = styled.div<{ select: number }>`
  position: absolute;
  width: 40%;
  top: 70%;
  display: flex;
  flex-direction: row;
  justify-content: ${({ select }) => (select === 0 ? 'space-between' : 'center')};
  left: 50%;
  transform: translate(-50%);
  ${({ theme }) => theme.fontStyle.bodyBold};
  div {
    padding-left: 10px;
    padding-right: 10px;
    height: 40px;
    align-self: center;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.color.primary};
  }
`;

const RightName = styled.div<{ select: number }>`
  flex: none;
  display: ${({ select }) => (select === 1 ? 'none' : 'flex')};
`;

const LeftName = styled.div<{ select: number }>`
  flex: none;
  display: ${({ select }) => (select === 2 ? 'none' : 'flex')};
`;

const ImageContainer = styled.div<{ select: number }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100% - 100px);
`;

const notSelected = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

const VersusImage = styled.img<{ select: number }>`
  width: 8%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  align-self: center;
  object-fit: contain;
  background-repeat: no-repeat;
  visibility: ${({ select }) => (select === 0 ? 'visible' : 'hidden')};
`;

const LeftImage = styled.img`
  max-width: 100%;
  object-fit: contain;
  background-repeat: no-repeat;
`;

const RightImage = styled.img`
  max-width: 100%;
  object-fit: contain;
  background-repeat: no-repeat;
`;

export default Worldcup;
