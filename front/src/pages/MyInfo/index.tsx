import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import logo from '../../images/logo.png';
import { PROFILE, LEAVE } from '../../constants/route';

const MyInfo = (): JSX.Element => {
  return (
    <>
      <Header />
      <Container>
        <img src={logo} alt="logo" width="220px" height="220px" />
        <Title>내 정보</Title>
        <MenuContainer>
          <Link to={PROFILE}>
            <Menu>내 정보 수정</Menu>
          </Link>
          <Link to={LEAVE}>
            <Menu>회원 탈퇴</Menu>
          </Link>
        </MenuContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 628px;
  height: 811px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  left: 50%;
  transform: translate(-50%, 5%);
`;

const Title = styled.div`
  ${({ theme }) => theme.fontStyle.h1Bold}
  position : relative;
  top: -60px;
`;

const MenuContainer = styled.div`
  display: flex;
  height: 200px;
  flex-direction: column;
  justify-content: space-between;
  margin: 140px 0;
`;

const Menu = styled.div`
  ${({ theme }) => theme.fontStyle.h3};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 402px;
  height: 75px;
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 10px;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.pink};
  }
`;

export default MyInfo;
