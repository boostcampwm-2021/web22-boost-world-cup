import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '../../components';
import logo from '../../images/logo.png';
import RoundSelector from '../../components/RoundSelector';

interface Props {
  location: Location;
}

function Initialize({ location }: Props): JSX.Element {
  const [round, setRound] = useState(0);
  const worldcupId = useMemo(() => location.pathname.split('/')[2], [location]);

  const roundSelector = useCallback((newAge: number) => {
    setRound(newAge);
  }, []);

  return (
    <>
      <Header type="header" isLogin />
      <Container>
        <InfoContainer>
          <img src={logo} alt="logo" width="220px" height="200px" />
          <Title>여자 배우 이상형 월드컵여자 배우</Title>
          <Desc>정면 위주의 레전드 사진 (객관적인 얼굴 판단 가능)</Desc>
        </InfoContainer>
        <RoundContainer>
          <RoundSubContainer>
            <span>총 라운드를 선택하세요.</span>
            <RoundSelector round={round} roundSelector={roundSelector} />
            <span>총 221명의 후보 중 무작위 32명이 대결합니다.</span>
          </RoundSubContainer>
        </RoundContainer>
        <ButtonContainer>
          <StartButton>
            <Link to={`/worldcup/${worldcupId}`}>시작하기</Link>
          </StartButton>
          <MainButton>
            <Link to="/main">메인으로</Link>
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
