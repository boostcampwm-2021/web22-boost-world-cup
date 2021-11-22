import React, { useEffect, useState, useCallback } from 'react';
import { Redirect } from 'react-router';
import styled, { keyframes, css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../recoil/atom';
import { Header } from '../../components';
import vsImg from '../../images/vs.png';
import { candidateData, gameInfoData } from '../../types/Datas';
import Gameover from '../Gameover';
import { objectDecryption, objectEncryption } from '../../utils/crypto';
import { sendCurrentResult, sendFinalResult } from '../../utils/api/ranking';

function Worldcup(): JSX.Element {
  const isLoggedIn = useRecoilValue(loginState);
  const [isInitialized, setIsInitialized] = useState(true);
  const [pick, setPick] = useState(0);
  const [gameInfo, setGameInfo] = useState<gameInfoData>();
  const [leftCandidate, setLeftCandidate] = useState<candidateData>();
  const [rightCandidate, setRightCandidate] = useState<candidateData>();

  const setCandidates = useCallback((candidatesList: candidateData[]) => {
    candidatesList.sort(() => Math.random() - 0.5);
    setLeftCandidate(candidatesList[0]);
    setRightCandidate(candidatesList[1]);
  }, []);

  // eslint-disable-next-line consistent-return
  const getGameInfoAndSetGameInfo = useCallback(() => {
    const sessionStorageData = sessionStorage.getItem('_wiziboost');
    if (sessionStorageData) {
      const decryptedData = objectDecryption(sessionStorageData);
      setGameInfo(decryptedData);
      setCandidates(decryptedData.candidatesList);
      setPick(0);
    } else {
      setIsInitialized(false);
    }
  }, []);

  useEffect(() => {
    getGameInfoAndSetGameInfo();
  }, [getGameInfoAndSetGameInfo]);

  const setSessionStorage = useCallback((gameInfo: gameInfoData): void => {
    const cipherText = objectEncryption(gameInfo);
    sessionStorage.setItem('_wiziboost', cipherText);
  }, []);

  const imageClickHandler = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const {
        dataset: { value },
      } = event.target as HTMLElement;
      if (value) {
        setPick(Number(value));
      }

      setTimeout(() => {
        let winId: number | undefined;
        let loseId: number | undefined;

        if (value === '1') {
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
            sendFinalResult(gameInfo.worldcupId, winId as number, loseId as number);
            return;
          }
          sendCurrentResult(winId as number, loseId as number);
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
    },
    [leftCandidate, rightCandidate],
  );

  // eslint-disable-next-line consistent-return
  const makeRoundText = (round: number | undefined) => {
    if (round) {
      if (round === 1) {
        return '결승';
      }
      return `${round * 2}강`;
    }
  };

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  if (!isInitialized) {
    return <Redirect to="/main" />;
  }

  return !gameInfo?.isCompleted ? (
    <Wrapper>
      <Header type="header" />
      <InfoContainer>
        <Title>
          {gameInfo?.title} {gameInfo?.currentRound}/{gameInfo?.round}
        </Title>
        <Round>{makeRoundText(gameInfo?.round)}</Round>
      </InfoContainer>
      <ImageContainer select={pick}>
        <img src={vsImg} alt="versus" />
        <LeftImage
          imageUrl={leftCandidate ? leftCandidate.url : ''}
          select={pick}
          onClick={imageClickHandler}
          data-value="1"
        />
        <RightImage
          imageUrl={rightCandidate ? rightCandidate.url : ''}
          select={pick}
          onClick={imageClickHandler}
          data-value="2"
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
  display: ${({ select }) => (select === 1 ? 'none' : 'flex')};
`;

const LeftName = styled.div<{ select: number }>`
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
    display: ${({ select }) => (select === 0 ? 'block' : 'none')};
  }
`;

const selected = keyframes`
  from {}
  to {
    background-size: 100% 90%;
  }
`;

const notSelected = keyframes`
  from {
    width:100%;
  }
  to {
    width:0%;
  }
`;

const LeftImage = styled.div<{ imageUrl: string; select: number }>`
  width: 100%;
  background: url(${({ imageUrl }) => imageUrl});
  background-size: 100% 60%;
  background-repeat: no-repeat;
  background-position: center;
  animation: ${({ select }) =>
    select === 1
      ? css`
          ${selected} 1s ease forwards;
        `
      : css``};
  animation: ${({ select }) =>
    select === 2
      ? css`
          ${notSelected} 1s ease forwards;
        `
      : css``};
`;

const RightImage = styled.div<{ imageUrl: string; select: number }>`
  width: 100%;
  background: url(${(props) => props.imageUrl});
  background-size: 100% 60%;
  background-repeat: no-repeat;
  background-position: center;
  animation: ${({ select }) => (select === 2 ? css`` : css``)};
  animation: ${({ select }) =>
    select === 1
      ? css`
          ${notSelected} 1s ease forwards;
        `
      : css``};
  animation: ${({ select }) =>
    select === 2
      ? css`
          ${selected} 1s ease forwards;
        `
      : css``};
`;

export default Worldcup;
