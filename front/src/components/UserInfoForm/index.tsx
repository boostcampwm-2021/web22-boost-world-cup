import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router';
import AgeSelector from './AgeSelector';
import GenderSelector from './GenderSelector';
import SignupButton from './SingupButton';

const UserInfoForm = (): JSX.Element => {
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState(0);
  const [age, setAge] = useState(0);
  const [authenticated, setAuthenticated] = useState(false);

  const nicknameOnchange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setNickname(value);
  }, []);

  return authenticated ? (
    <Redirect to="/main" />
  ) : (
    <InputContainer>
      <NameInput type="text" placeholder="닉네임" onChange={nicknameOnchange} />
      <GenderSelector gender={gender} setGender={setGender} />
      <AgeSelector age={age} setAge={setAge} />
      <SignupButton nickname={nickname} gender={gender} age={age} setAuthenticated={setAuthenticated} />
    </InputContainer>
  );
};

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

export default UserInfoForm;
