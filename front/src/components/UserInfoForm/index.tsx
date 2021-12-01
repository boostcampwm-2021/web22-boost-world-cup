import React, { useState, useCallback, useEffect, useContext } from 'react';
import styled from 'styled-components';
import AgeSelector from './AgeSelector';
import GenderSelector from './GenderSelector';
import SignupButton from './SingupButton';
import UpdateButton from './UpdateButton';
import { UserStateContext } from '../../stores/userStore';

interface Props {
  type: 'signup' | 'profile';
}

const UserInfoForm = ({ type }: Props): JSX.Element => {
  const userState = useContext(UserStateContext);
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState(0);
  const [age, setAge] = useState(0);

  const nicknameOnchange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setNickname(value);
  }, []);

  useEffect(() => {
    if (type === 'profile') {
      setNickname(userState.nickname as string);
      setGender(userState.gender as number);
      setAge(userState.age as number);
    }
  }, []);

  return (
    <InputContainer>
      <NameInput type="text" value={nickname} placeholder="닉네임" onChange={nicknameOnchange} />
      <GenderSelector gender={gender} setGender={setGender} />
      <AgeSelector age={age} setAge={setAge} />
      {type === 'signup' ? (
        <SignupButton nickname={nickname} gender={gender} age={age} />
      ) : (
        <UpdateButton id={userState.id as number} nickname={nickname} gender={gender} age={age} />
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
