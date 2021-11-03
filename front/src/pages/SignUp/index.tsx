import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import qs from 'qs';
import axios from 'axios';
import logo from '../../images/logo.png';
import AgeSelector from './AgeSelector';
import GenderSelector from './GenderSelector';

interface Props {
  location: Location;
}

const SignUp = ({ location }: Props): JSX.Element => {
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState(0);
  const [age, setAge] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { client_id: clientId } = query;

  const ageSelector = (newAge: string) => {
    setAge(newAge);
  };

  const genderSelector = (newGender: number) => {
    setGender(newGender);
  };

  const nicknameOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setNickname(value);
  };

  const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const response = await axios.post('/api/auth/signup', {
      clientId,
      nickname,
      gender,
      age: 1,
    });
    const {
      data: { result },
    } = response;

    if (result === 'success') {
      setAuthenticated(true);
    }
  };

  return authenticated ? (
    <Redirect to="/" />
  ) : (
    <Container>
      <img src={logo} alt="logo" width="220px" height="220px" />
      <Title>Welcome to world cup</Title>
      <InputContainer>
        <NameInput type="text" placeholder="닉네임" onChange={nicknameOnchange} />
        <GenderSelector gender={gender} genderSelector={genderSelector} />
        <AgeSelector age={age} ageSelector={ageSelector} />
        <SubmitButton onClick={onSubmit}>회원가입</SubmitButton>
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
  position: relative;
  left: 50%;
  transform: translate(-50%, 5%);
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

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.color.pink};
  width: 100%;
  height: 61px;
  border-radius: 10px;
`;

export default SignUp;
