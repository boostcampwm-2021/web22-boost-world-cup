import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Redirect } from 'react-router';
import styled, { keyframes, css } from 'styled-components';
import Header from '../../components/Header';
import vsImg from '../../images/vs.png';
import { CandidateData, GameInfoData } from '../../types/Datas';
import Gameover from '../Gameover';
import { sendCurrentResult, sendFinalResult } from '../../apis/ranking';
import { useApiRequest } from '../../hooks';
import { LEFT, RIGHT } from '../../constants/number';
import { MAIN } from '../../constants/route';
import getImgURL from '../../utils/getImgURL';

function Worldcup(): JSX.Element {
  const [isInitialized, setIsInitialized] = useState(true);
  const [pick, setPick] = useState(0);
  const [gameInfo, setGameInfo] = useState<GameInfoData>();
  const [leftCandidate, setLeftCandidate] = useState<CandidateData>();
  const [rightCandidate, setRightCandidate] = useState<CandidateData>();
  const debouncerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onSendCurrentResultSuccess = () => {
    debouncerRef.current = null;
  };
  const sendCurrentResultDispatcher = useApiRequest(sendCurrentResult, onSendCurrentResultSuccess);
  const sendFinalResultDispatcher = useApiRequest(sendFinalResult);

  const setCandidates = useCallback((candidatesList: CandidateData[]) => {
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

  const setSessionStorage = useCallback((gameInfo: GameInfoData): void => {
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
        <img src={vsImg} alt="versus" />
        <LeftImage
          imageUrl={leftCandidate ? getImgURL(leftCandidate.imgKey) : ''}
          select={pick}
          onClick={onImageClick(LEFT)}
        />
        <RightImage
          imageUrl={rightCandidate ? getImgURL(rightCandidate.imgKey) : ''}
          select={pick}
          onClick={onImageClick(RIGHT)}
        />
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
  img {
    width: 8%;
    position: absolute;
    transform: translate(-50%, 0);
    left: 50%;
    align-self: center;
    visibility: ${({ select }) => (select === 0 ? 'visible' : 'hidden')};
  }
`;

const notSelected = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

const LeftImage = styled.div<{ imageUrl: string; select: number }>`
  width: 100%;
  background: url(${({ imageUrl }) => imageUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: ${({ select }) => (select === 1 ? `center` : `right`)};
  animation: ${({ select }) =>
    select === 2
      ? css`
          ${notSelected} 1s ease forwards
        `
      : css``};
`;

const RightImage = styled.div<{ imageUrl: string; select: number }>`
  width: 100%;
  background: url(${(props) => props.imageUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: ${({ select }) => (select === 2 ? `center` : `left`)};
  animation: ${({ select }) =>
    select === 1
      ? css`
          ${notSelected} 1s ease forwards
        `
      : css``};
`;

export default Worldcup;
