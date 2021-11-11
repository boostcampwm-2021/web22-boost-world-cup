import React, { useEffect, useState, useCallback } from 'react';
import { Redirect } from 'react-router';
import styled, { keyframes, css } from 'styled-components';
import { Header } from '../../components';
import versusImg from '../../images/versus.png';
import { candidateData, gameInfoData } from '../../types/Datas';
import Gameover from './gameover';
import { objectDecryption, objectEncryption } from '../../utils/crypto';
import { getUser } from '../../utils/api/auth';

function Worldcup(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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

  const getUserInfo = async () => {
    const user = await getUser();
    if (Object.keys(user).length === 0) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    getUserInfo();
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
            return;
          }
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

  // eslint-disable-next-line no-nested-ternary
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  if (!isInitialized) {
    return <Redirect to="/main" />;
  }

  return !gameInfo?.isCompleted ? (
    <Wrapper>
      <Header type="header" />
      <Container>
        <Title>
          {gameInfo?.title} {gameInfo?.currentRound}/{gameInfo?.round}
        </Title>
        <Round>{makeRoundText(gameInfo?.round)}</Round>
        <ImageContainer select={pick}>
          <img src={versusImg} alt="versus" />
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
        <NameContainer>
          <LeftName select={pick}>{leftCandidate ? leftCandidate.name : ''}</LeftName>
          <RightName select={pick}>{rightCandidate ? rightCandidate.name : ''}</RightName>
        </NameContainer>
      </Container>
    </Wrapper>
  ) : (
    <Gameover winCandidate={gameInfo?.winCandidate} title={gameInfo?.title} worldcupId={gameInfo?.worldcupId} />
  );
}

const ImageContainer = styled.div<{ select: number }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 65vh;
  img {
    width: 20%;
    position: absolute;
    transform: translate(-50%, 0);
    left: 50%;
    align-self: center;
    display: ${({ select }) => (select === 0 ? 'block' : 'none')};
  }
`;

const selected = keyframes`
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
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  animation: ${({ select }) =>
    select === 2
      ? css`
          ${selected} 1s ease-in-out forwards; ;
        `
      : css``};
`;

const RightImage = styled.div<{ imageUrl: string; select: number }>`
  width: 100%;
  background: url(${(props) => props.imageUrl});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  animation: ${({ select }) =>
    select === 1
      ? css`
          ${selected} 1s ease forwards; ;
        `
      : css``};
`;

const RightName = styled.div<{ select: number }>`
  width: 150px;
  height: 70px;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  ${({ theme }) => theme.fontStyle.h2Bold};
  background-color: ${({ theme }) => theme.color.primary};
  display: ${({ select }) => (select === 1 ? 'none' : 'flex')};
`;

const LeftName = styled.div<{ select: number }>`
  width: 150px;
  height: 70px;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  ${({ theme }) => theme.fontStyle.h2Bold};
  background-color: ${({ theme }) => theme.color.primary};
  display: ${({ select }) => (select === 2 ? 'none' : 'flex')};
`;

const NameContainer = styled.div`
  width: 100%;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${({ theme }) => theme.fontStyle.h2Bold};
`;

const Round = styled.div`
  width: 150px;
  height: 70px;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  ${({ theme }) => theme.fontStyle.h2Bold};
  background-color: ${({ theme }) => theme.color.primary};
`;

const Wrapper = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.color.lightpink};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 2%;
`;

const Title = styled.div`
  ${({ theme }) => theme.fontStyle.h1Bold}
  align-self:center;
  text-align: center;
  width: 90%;
`;

export default Worldcup;
