import React from 'react';
import styled from 'styled-components';
import { GoMarkGithub } from 'react-icons/go';
import { SiKakaotalk } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import SocialLoginButton from '../../components/SocialLoginButton';
import logo from '../../images/logo.png';

const githubOauthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_OAUTH_GITHUB_CLIENT_ID}`;
const kakaoOauthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_OAUTH_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_OAUTH_CLIENT_ID}&response_type=code`;

const Login = (): JSX.Element => {
  return (
    <Container>
      <img src={logo} alt="logo" width="220px" height="220px" />
      <Title>Welcome to world cup</Title>
      <ButtonContainer>
        <a href={githubOauthUrl}>
          <SocialLoginButton mark={<GoMarkGithub />} contents="Continue with Github" />
        </a>
        <a href={kakaoOauthUrl}>
          <SocialLoginButton mark={<SiKakaotalk />} contents="Continue with Kakao" />
        </a>
        <SocialLoginButton mark={<FcGoogle />} contents="Continue with Google" />
      </ButtonContainer>
    </Container>
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
  transform: translate(-50%);
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
