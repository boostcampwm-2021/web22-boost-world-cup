import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useHistory } from 'react-router-dom';
import Button from './Button';
import Logo from '../../images/logo.png';
import { deleteWorldcup } from '../../utils/api/worldcups';

interface DeleteModalProps {
  id: number;
  setIsDeleteModalOpen: any;
}

const DeleteModal = ({ id, setIsDeleteModalOpen }: DeleteModalProps): JSX.Element => {
  const history = useHistory();
  const theme: any = useTheme();

  const onDeleteButtonHandler = (): void => {
    deleteWorldcup(id);
    setIsDeleteModalOpen(false);
    history.push('/main');
  };

  const onCancelButtonHandler = (): void => {
    setIsDeleteModalOpen(false);
  };

  return (
    <Container>
      <img src={Logo} alt="logo" width="220px" height="220px" />
      <Title>삭제하시겠습니까?</Title>
      <Desc>삭제하시면 복구할 수 없어요!</Desc>
      <ButtonContainer>
        <Button name="삭제" onClickHandler={onDeleteButtonHandler} color={theme.color.pink} />
        <Button name="취소" onClickHandler={onCancelButtonHandler} color={theme.color.lightpink} />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 300px auto;
  background-color: white;
  border-radius: 20px;
  width: 600px;
  height: 340px;
  z-index: 9999;
  padding-bottom: 40px;
  img {
    margin-bottom: -50px;
  }
`;

const Title = styled.div`
  ${({ theme }) => theme.fontStyle.h2Bold};
`;

const Desc = styled.div`
  ${({ theme }) => theme.fontStyle.h3};
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 320px;
  margin: 20px 0;
  justify-content: space-between;
`;

export default DeleteModal;
