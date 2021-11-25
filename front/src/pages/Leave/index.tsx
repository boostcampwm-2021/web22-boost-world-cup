import React, { useContext } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import logo from '../../images/logo.png';
import { deleteUser } from '../../utils/api/auth';
import { UserStateContext, UserDispatcherContext } from '../../stores/userStore';
import useApiRequest, { REQUEST } from '../../hooks/useApiRequest';

const Leave = (): JSX.Element => {
  const { id: userId } = useContext(UserStateContext);
  const userDispatcher = useContext(UserDispatcherContext);
  const onDeleteUserSuccess = () => userDispatcher({ type: 'LOGOUT' });
  const deleteUserDispatcher = useApiRequest(deleteUser, onDeleteUserSuccess);

  const onLeaveBtnClick = () => deleteUserDispatcher({ type: REQUEST, requestProps: [userId] });

  return (
    <>
      <Header type="header" />
      <Container>
        <img src={logo} alt="logo" width="220px" height="220px" />
        <Title>탈퇴하시겠습니까?</Title>
        <Contents>탈퇴하시면 복구할 수 없어요!</Contents>
        <Menu onClick={onLeaveBtnClick}>탈퇴하기</Menu>
      </Container>
    </>
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
  margin: 20px 0;
`;

const Contents = styled.div`
  ${({ theme }) => theme.fontStyle.h3}
  color : ${({ theme }) => theme.color.gray[0]};
`;

const Menu = styled.button`
  ${({ theme }) => theme.fontStyle.h3};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 402px;
  height: 75px;
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 10px;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.2);
  margin-top: 260px;

  &:hover {
    background-color: ${({ theme }) => theme.color.pink};
  }
`;

export default Leave;
