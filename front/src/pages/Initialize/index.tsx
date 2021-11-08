import React from 'react';
import styled from 'styled-components';
import { Header } from '../../components';
import logo from '../../images/logo.png';
import RoundSelector from './RoundSelector';

function Initialize(): JSX.Element {
  return (
    <>
      <Header type="header" isLogin />
      <Container>
        <img src={logo} alt="logo" width="220px" height="220px" />
        <Title>여자 배우 이상형 월드컵</Title>
        <Desc>정면 위주의 레전드 사진 (객관적인 얼굴 판단 가능)</Desc>
        <Temp1>총 라운드를 선택하세요.</Temp1>
        <RoundSelector />
        <Temp1>총 221명의 후보 중 무작위 32명이 대결합니다.</Temp1>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1000px;
  height: 811px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  left: 50%;
  transform: translate(-50%, 5%);
  background-color: ${({ theme }) => theme.color.primary};
`;

const Title = styled.div`
  ${({ theme }) => theme.fontStyle.h1Bold}
`;

const Desc = styled.div`
  ${({ theme }) => theme.fontStyle.h3}
`;

const Temp1 = styled.div`
  ${({ theme }) => theme.fontStyle.bodyBold}
`;

export default Initialize;
