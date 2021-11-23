import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { GoMarkGithub } from 'react-icons/go';
import { SiKakaotalk } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import SocialLoginButton from '../../components/SocialLoginButton';
import logo from '../../images/logo.png';
import { UserStateContext } from '../../stores/userStore';

function Login(): JSX.Element {
  const { isLoggedIn } = useContext(UserStateContext);

  return isLoggedIn ? (
    <Redirect to="/main" />
  ) : (
    <Container>
      <img src={logo} alt="logo" width="220px" height="220px" />
      <Title>Welcome to world cup</Title>
      <ButtonContainer>
        <a href={process.env.REACT_APP_GITHUB_CALLBACK_URL}>
          <SocialLoginButton mark={<GoMarkGithub />} contents="Continue with Github" />
        </a>
        <a href={process.env.REACT_APP_KAKAO_CALLBACK_URL}>
          <SocialLoginButton mark={<SiKakaotalk />} contents="Continue with Kakao" />
        </a>
        <a href={process.env.REACT_APP_GOOGLE_CALLBACK_URL}>
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
