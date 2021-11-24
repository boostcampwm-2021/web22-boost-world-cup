import React, { useContext } from 'react';
import styled from 'styled-components';
import { putUser } from '../../../utils/api/auth';
import { UserDispatcherContext } from '../../../stores/userStore';

interface Props {
  id: number;
  nickname: string;
  gender: number;
  age: number;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function UpdateButton({ id, nickname, gender, age, setAuthenticated }: Props): JSX.Element {
  const userDispatcher = useContext(UserDispatcherContext);
  const onSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (nickname === '' || gender === 0 || age === 0) {
      // eslint-disable-next-line no-alert
      alert('정보를 모두 입력해주세요.');
      return;
    }

    const { result } = await putUser(id, nickname, gender, age);

    if (result === 'success') {
      userDispatcher({ type: 'LOGIN', payload: { id, nickname, gender, age, isLoggedIn: true } });
      setAuthenticated(true);
    }
  };

  return (
    <>
      <Container onClick={onSubmit}>저장하기</Container>
    </>
  );
}

const Container = styled.button`
  background-color: ${({ theme }) => theme.color.pink};
  width: 100%;
  height: 61px;
  border-radius: 10px;
`;

export default UpdateButton;
