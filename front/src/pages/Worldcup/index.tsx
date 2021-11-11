import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { setTimeout } from 'timers';
import { Header } from '../../components';
import versusImg from '../../images/versus.png';
import { sendGameResult } from '../../utils/api/game';
import { candidateData, gameInfoData } from '../../types/Datas';
import Gameover from './gameover';
import { objectDecryption, objectEncryption } from '../../utils/crypto';

function Worldcup(): JSX.Element {
  const [pick, setPick] = useState(0);
  const [title, setTitle] = useState('');
  const [round, setRound] = useState(16);
  const [curRound, setCurRound] = useState(1);
  const [worldcupId, setWorldcupId] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [leftCandidate, setLeftCandidate] = useState<candidateData>();
  const [rightCandidate, setRightCandidate] = useState<candidateData>();
  const [winCandidate, setWinCandidate] = useState<candidateData>();

  // eslint-disable-next-line consistent-return
  const gameInfo = useMemo(() => {
    const decryptedData = sessionStorage.getItem('_wiziboost');
    if (decryptedData) {
      return objectDecryption(decryptedData);
    }
  }, []);

  const setGameState = useCallback((gameInfo) => {
    if (gameInfo) {
      const { title, round, currentRound, candidatesList } = gameInfo;
      setPick(0);
      setTitle(title);
      setRound(round);
      setCurRound(currentRound);
      candidatesList.sort(() => Math.random() - 0.5);
      setLeftCandidate(candidatesList[0]);
      setRightCandidate(candidatesList[1]);
    }
  }, []);

  const setGameInfo = useCallback(() => {
    if (gameInfo) {
      const { isCompleted } = gameInfo;
      if (isCompleted) {
        return;
      }
      setGameState(gameInfo);
    }
  }, [gameInfo]);

  useEffect(() => {
    setGameInfo();
  }, [setGameInfo]);

  const gameover = useCallback((gameInfo: gameInfoData) => {
    const { winCandidate, title, worldcupId } = gameInfo;
    setCompleted(true);
    setTitle(title);
    setWinCandidate(winCandidate);
    setWorldcupId(Number(worldcupId));
  }, []);

  const imageClickHandler = (event: React.MouseEvent<HTMLElement>) => {
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
        if (newGameInfo.currentRound === newGameInfo.round) {
          newGameInfo.round /= 2;
          newGameInfo.currentRound = 1;
          newGameInfo.candidatesList = [...newGameInfo.selectedCandidate];
          newGameInfo.selectedCandidate = [];
        } else {
          newGameInfo.currentRound = gameInfo.currentRound + 1;
        }
        const cipherText = objectEncryption(newGameInfo);
        sessionStorage.setItem('_wiziboost', cipherText);
        setGameState(newGameInfo);
      }
    }, 1500);
  };

  const makeRoundText = () => {
    if (round === 1) {
      return '결승';
    }
    return `${round * 2}강`;
  };

  return !completed ? (
    <Wrapper>
      <Header type="header" isLogin />
      <Container>
        <Title>
          {title} {curRound}/{round}
        </Title>
        <Round>{makeRoundText()}</Round>
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
    <Gameover winCandidate={winCandidate} title={title} worldcupId={worldcupId} />
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
