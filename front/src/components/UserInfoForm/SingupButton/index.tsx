import React from 'react';
import styled from 'styled-components';
import { signup } from '../../../utils/api/auth';

interface Props {
  nickname: string;
  gender: number;
  age: number;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignupButton({ nickname, gender, age, setAuthenticated }: Props): JSX.Element {
  const url = new URL(window.location.href);
  const clientId = url.searchParams.get('client_id');

  const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (nickname === '' || gender === 0 || age === 0) {
      alert('정보를 모두 입력해주세요.');
      return;
    }
    const response = await signup(clientId, nickname, gender, age);
    const { result } = response;
    if (result === 'success') {
      setAuthenticated(true);
    }
  };

  return (
    <>
      <Container onClick={onSubmit}>회원가입</Container>
    </>
  );
}

const Container = styled.button`
  background-color: ${({ theme }) => theme.color.pink};
  width: 100%;
  height: 61px;
  border-radius: 10px;
`;

export default SignupButton;
