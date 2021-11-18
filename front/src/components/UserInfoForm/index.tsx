import React, { useState, useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Redirect } from 'react-router';
import AgeSelector from './AgeSelector';
import GenderSelector from './GenderSelector';
import SignupButton from './SingupButton';
import UpdateButton from './UpdateButton';
import { userState } from '../../recoil/atom';

interface Props {
  type: 'signup' | 'profile';
}

const UserInfoForm = ({ type }: Props): JSX.Element => {
  const userInfo = useRecoilValue<any>(userState);
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

  useEffect(() => {
    if (type === 'profile') {
      setNickname(userInfo.nickname);
      setGender(userInfo.gender);
      setAge(userInfo.age);
    }
  }, []);

  return authenticated ? (
    <Redirect to="/main" />
  ) : (
    <InputContainer>
      <NameInput type="text" value={nickname} placeholder="닉네임" onChange={nicknameOnchange} />
      <GenderSelector gender={gender} setGender={setGender} />
      <AgeSelector age={age} setAge={setAge} />
      {type === 'signup' ? (
        <SignupButton nickname={nickname} gender={gender} age={age} setAuthenticated={setAuthenticated} />
      ) : (
        <UpdateButton
          id={userInfo.id}
          nickname={nickname}
          gender={gender}
          age={age}
          setAuthenticated={setAuthenticated}
        />
      )}
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
