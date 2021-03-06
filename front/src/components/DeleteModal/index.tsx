import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Logo from '../../images/logo.png';
import { deleteWorldcup } from '../../apis/worldcups';
import { useApiRequest } from '../../hooks';
import { MAIN } from '../../constants/route';

interface Props {
  id: number;
  onToggleDeleteModal: React.MouseEventHandler;
}

const DeleteModal = ({ id, onToggleDeleteModal }: Props): JSX.Element => {
  const history = useHistory();
  const onDeleteWorldcupSuccess = () => history.push(MAIN);
  const deleteWorldcupDispatcher = useApiRequest(deleteWorldcup, onDeleteWorldcupSuccess);
  const onDeleteMyWorldcup: React.MouseEventHandler = () =>
    deleteWorldcupDispatcher({ type: 'REQUEST', requestProps: [id] });

  return (
    <Container>
      <img src={Logo} alt="logo" width="220px" height="220px" />
      <Title>삭제하시겠습니까?</Title>
      <Desc>삭제하면 복구할 수 없어요!</Desc>
      <ButtonContainer>
        <Button onClick={onDeleteMyWorldcup} colorType="pink">
          삭제
        </Button>
        <Button onClick={onToggleDeleteModal} colorType="lightpink">
          취소
        </Button>
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

const Button = styled.button<{ colorType: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, colorType }) => theme.color[colorType]};
  width: 145px;
  height: 45px;
  border-radius: 10px;
`;

export default DeleteModal;
