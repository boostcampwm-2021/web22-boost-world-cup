import React, { useEffect, useState, useMemo, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Header } from '../../components';
import versusImg from '../../images/versus.png';
import { getGameInfo } from '../../utils/api/game';

function Worldcup(): JSX.Element {
  const [select, setSelect] = useState(0);
  const [round, setRound] = useState(16);
  const [curRound, setCurRound] = useState(1);
  const [leftImage, setLeftImage] = useState('');
  const [rightImage, setRightImage] = useState('');
  const [leftName, setLeftName] = useState('');
  const [rightName, setRightName] = useState('');
  const [title, setTitle] = useState('');

  const getCandidates = useCallback(async () => {
    const gameInfo = await getGameInfo();
    const { round, currentRound, candidate1, candidate2, title } = gameInfo;
    setRound(round);
    setCurRound(currentRound);
    setLeftImage(candidate1.url);
    setRightImage(candidate2.url);
    setLeftName(candidate1.name);
    setRightName(candidate2.name);
    setTitle(title);
  }, []);

  useEffect(() => {
    getCandidates();
  }, [getCandidates]);

  const imageClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    const {
      dataset: { value },
    } = event.target as HTMLElement;
    if (value) {
      setSelect(parseInt(value, 10));
    }
  };

  return (
    <Wrapper>
      <Header type="header" isLogin />
      <Container>
        <Title>
          {title} {curRound}/{round}
        </Title>
        <Round>{round}강</Round>
        <ImageContainer select={select}>
          <img src={versusImg} alt="versus" />
          <LeftImage imageUrl={leftImage} select={select} onClick={imageClickHandler} data-value="1" />
          <RightImage imageUrl={rightImage} select={select} onClick={imageClickHandler} data-value="2" />
        </ImageContainer>
        <NameContainer>
          <LeftName select={select}>{leftName}</LeftName>
          <RightName select={select}>{rightName}</RightName>
        </NameContainer>
      </Container>
    </Wrapper>
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
