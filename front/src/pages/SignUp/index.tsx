import React, { useState, useCallback, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { getUser } from '../../utils/api/auth';
import logo from '../../images/logo.png';
import AgeSelector from './AgeSelector';
import GenderSelector from './GenderSelector';
import SignupButton from './SingupButton';

interface Props {
  location: Location;
}

const SignUp = ({ location }: Props): JSX.Element => {
  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState(0);
  const [age, setAge] = useState(0);
  const [authenticated, setAuthenticated] = useState(false);

  const getUserInfo = async () => {
    const user = await getUser();
    if (Object.keys(user).length !== 0) {
      setIsLogin(true);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const ageSelector = useCallback((newAge: number) => {
    setAge(newAge);
  }, []);

  const genderSelector = useCallback((newGender: number) => {
    setGender(newGender);
  }, []);

  const changeAuthenticated = useCallback((newAuthenticated: boolean) => {
    setAuthenticated(newAuthenticated);
  }, []);

  const nicknameOnchange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setNickname(value);
  }, []);

  return authenticated || isLogin ? (
    <Redirect to="/" />
  ) : (
    <Container>
      <img src={logo} alt="logo" width="220px" height="220px" />
      <Title>Welcome to world cup</Title>
      <InputContainer>
        <NameInput type="text" placeholder="닉네임" onChange={nicknameOnchange} />
        <GenderSelector gender={gender} genderSelector={genderSelector} />
        <AgeSelector age={age} ageSelector={ageSelector} />
        <SignupButton
          location={location}
          nickname={nickname}
          gender={gender}
          age={age}
          changeAuthenticated={changeAuthenticated}
        />
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

export default SignUp;
