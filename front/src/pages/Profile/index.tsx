import React from 'react';
import styled from 'styled-components';
import { Header, UserInfoForm } from '../../components';
import logo from '../../images/logo.png';

const Profile = (): JSX.Element => {
  return (
    <>
      <Header type="header" />
      <Container>
        <img src={logo} alt="logo" width="220px" height="220px" />
        <Title>내 정보 수정하기</Title>
        <UserInfoForm type="profile" />
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
`;

export default Profile;
