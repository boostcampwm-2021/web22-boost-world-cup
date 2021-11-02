import React from 'react';
import styled from 'styled-components';
import { GoMarkGithub } from 'react-icons/go';
import { SiKakaotalk } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import SocialLoginButton from '../../components/SocialLoginButton';
import logo from '../../images/logo.png';

const Login = (): JSX.Element => {
  return (
    <Container>
      <img src={logo} alt="logo" width="220px" height="220px" />
      <Title>Welcome to world cup</Title>
      <ButtonContainer>
        <SocialLoginButton
          mark={<GoMarkGithub />}
          contents="Continue with Github"
          onClickEventHandler={githubLoginBtnClickEventHandler}
        />
        <SocialLoginButton
          mark={<FcGoogle />}
          contents="Continue with Google"
          onClickEventHandler={googleLoginBtnClickEventHandler}
        />
        <SocialLoginButton
          mark={<SiKakaotalk />}
          contents="Continue with Kakao"
          onClickEventHandler={kakaoLoginBtnClickEventHandler}
        />
      </ButtonContainer>
    </Container>
  );
};

const githubLoginBtnClickEventHandler = (event: React.MouseEvent) => {
  event.stopPropagation();
};

const googleLoginBtnClickEventHandler = (event: React.MouseEvent) => {
  event.stopPropagation();
};

const kakaoLoginBtnClickEventHandler = (event: React.MouseEvent) => {
  event.stopPropagation();
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 628px;
  height: 811px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
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
