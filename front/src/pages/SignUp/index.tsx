import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../images/logo.png';
import AgeSelector from './AgeSelector';

const SignUp = (): JSX.Element => {
  const [age, setAge] = useState('');

  const ageSelector = (newAge: string) => {
    setAge(newAge);
  };

  return (
    <Container>
      <img src={logo} alt="logo" width="220px" height="220px" />
      <Title>Welcome to world cup</Title>
      <InputContainer>
        <NameInput type="text" placeholder="닉네임" />
        <GenderContainer>
          <div>남자</div>
          <div>여자</div>
        </GenderContainer>
        <AgeSelector age={age} ageSelector={ageSelector} />
        <SubmitButton type="submit">회원가입</SubmitButton>
      </InputContainer>
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
`;

const Title = styled.div`
  ${({ theme }) => theme.fontStyle.h1Bold}
  position : relative;
  top: -60px;
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 389px;
  height: 360px;
`;

const NameInput = styled.input`
  ${({ theme }) => theme.fontStyle.h3}
  background-color: ${({ theme }) => theme.color.primary};
  padding-left: 32px;
  width: 100%;
  height: 61px;
  border: 0;
  border-radius: 10px;
`;

const GenderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 61px;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ theme }) => theme.fontStyle.h3}
    color: ${({ theme }) => theme.color.gray[0]};
    background-color: ${({ theme }) => theme.color.primary};
    height: 100%;
    width: 186px;
    border-radius: 10px;
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.color.pink};
  width: 100%;
  height: 61px;
  border-radius: 10px;
`;

export default SignUp;
