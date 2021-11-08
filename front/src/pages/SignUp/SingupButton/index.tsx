import React from 'react';
import styled from 'styled-components';
import qs from 'qs';

import { signup } from '../../../utils/api/auth';

interface Props {
  location: Location;
  nickname: string;
  gender: number;
  age: number;
  changeAuthenticated: (authenticated: boolean) => void;
}

function SignupButton({ location, nickname, gender, age, changeAuthenticated }: Props): JSX.Element {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { client_id: clientId } = query;

  const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (nickname === '' || gender === 0 || age === 0) {
      alert('정보를 모두 입력해주세요.');
      return;
    }
    const response = await signup(clientId, nickname, gender, age);
    const { result } = response;
    if (result === 'success') {
      changeAuthenticated(true);
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
