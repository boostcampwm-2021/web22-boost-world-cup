import React from 'react';
import { Redirect } from 'react-router';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { GoMarkGithub } from 'react-icons/go';
import { SiKakaotalk } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import { loginState } from '../../recoil/atom';
import SocialLoginButton from '../../components/SocialLoginButton';
import logo from '../../images/logo.png';

interface locationState {
  from: string;
}

function Login(): JSX.Element {
  const isLoggedIn = useRecoilValue(loginState);
  const location = useLocation();
  let prevPage;
  if (location.state) {
    const { from } = location.state as locationState;
    prevPage = from;
  }
  const githubCallbackUrl = prevPage
    ? `${process.env.REACT_APP_GITHUB_CALLBACK_URL}?redirect_url=${prevPage}`
    : `${process.env.REACT_APP_GITHUB_CALLBACK_URL}`;
  const kakaoCallbackUrl = prevPage
    ? `${process.env.REACT_APP_KAKAO_CALLBACK_URL}?redirect_url=${prevPage}`
    : `${process.env.REACT_APP_KAKAO_CALLBACK_URL}`;
  const googleCallbackUrl = prevPage
    ? `${process.env.REACT_APP_GOOGLE_CALLBACK_URL}?redirect_url=${prevPage}`
    : `${process.env.REACT_APP_GOOGLE_CALLBACK_URL}`;

  return isLoggedIn ? (
    <Redirect to="/main" />
  ) : (
    <Container>
      <img src={logo} alt="logo" width="220px" height="220px" />
      <Title>Welcome to world cup</Title>
      <ButtonContainer>
        <a href={githubCallbackUrl}>
          <SocialLoginButton mark={<GoMarkGithub />} contents="Continue with Github" />
        </a>
        <a href={kakaoCallbackUrl}>
          <SocialLoginButton mark={<SiKakaotalk />} contents="Continue with Kakao" />
        </a>
        <a href={googleCallbackUrl}>
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
