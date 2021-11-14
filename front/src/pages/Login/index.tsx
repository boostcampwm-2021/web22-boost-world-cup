import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { GoMarkGithub } from 'react-icons/go';
import { SiKakaotalk } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import { getUser } from '../../utils/api/auth';
import SocialLoginButton from '../../components/SocialLoginButton';
import logo from '../../images/logo.png';

function Login(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getUserInfo = async () => {
    const user = await getUser();
    if (Object.keys(user).length !== 0) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return isLoggedIn ? (
    <Redirect to="/main" />
  ) : (
    <Container>
      <img src={logo} alt="logo" width="220px" height="220px" />
      <Title>Welcome to world cup</Title>
      <ButtonContainer>
        <a href="/api/auth/github">
          <SocialLoginButton mark={<GoMarkGithub />} contents="Continue with Github" />
        </a>
        <a href="/api/auth/kakao">
          <SocialLoginButton mark={<SiKakaotalk />} contents="Continue with Kakao" />
        </a>
        <a href="/api/auth/google">
          <SocialLoginButton mark={<FcGoogle />} contents="Continue with Google" />
        </a>
      </ButtonContainer>
    </Container>
  );
}

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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 220px;
`;

export default Login;
