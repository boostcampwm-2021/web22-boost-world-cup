import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTrash, FaPen, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ShareModal from '../../ShareModal';
import DeleteModal from '../../DeleteModal';

interface Props {
  id: number;
  thumbnail1: string;
  thumbnail2: string;
  title: string;
  desc: string;
}
interface ModalProps {
  isOpenModal: boolean;
}
interface DeleteModalProps {
  isDeleteModalOpen: boolean;
}
function MyWorldCupItem({ id, thumbnail1, thumbnail2, title, desc }: Props): JSX.Element {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const deleteModalHandler = () => {
    setIsDeleteModalOpen((isDeleteModalOpen) => !isDeleteModalOpen);
  };

  const openModal = () => {
    setIsOpenModal((isOpenModal) => !isOpenModal);
  };
  return (
    <Item>
      <Thumbnail>
        <img src={thumbnail1} alt={thumbnail1} />
        <img src={thumbnail2} alt={thumbnail2} />
      </Thumbnail>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
      <Buttons>
        <Delete onClick={deleteModalHandler}>
          <FaTrash />
          <span>삭제하기</span>
        </Delete>
        <Link to={`/edit/${id}`}>
          <Edit>
            <FaPen />
            <span>수정하기</span>
          </Edit>
        </Link>
        <Share onClick={openModal}>
          <FaShare />
          <span>공유하기</span>
        </Share>
      </Buttons>
      <ModalBox isOpenModal={isOpenModal}>
        <ShareModal id={id} />
      </ModalBox>
      <DeleteModalContainer isDeleteModalOpen={isDeleteModalOpen}>
        <DeleteModal id={id} setIsDeleteModalOpen={setIsDeleteModalOpen} />
      </DeleteModalContainer>
    </Item>
  );
}

const Item = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 0.5em;
  padding: 0px 1em;
  background-color: ${({ theme }) => theme.color.white};
`;
const Thumbnail = styled.div`
  width: 280px;
  height: 180px;
  display: flex;
  margin-top: 1em;
  img {
    width: 140px;
  }
`;
const Title = styled.p`
  font: ${({ theme }) => theme.fontStyle.h3Bold};
  width: 280px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 0.5em;
`;
const Desc = styled.p`
  font: ${({ theme }) => theme.fontStyle.caption};
  color: ${({ theme }) => theme.color.gray[0]};
  padding-top: 0.2em;
  width: 280px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Buttons = styled.div`
  display: flex;
  padding-top: 1em;
`;
const Delete = styled.div`
  display: flex;
  padding: 0.5em;
  color: red;
  font-size: 0.8em;
  border: 1px solid red;
  border-radius: 4px;
  margin-right: 10px;
  span {
    margin-left: 4px;
  }
  cursor: pointer;
  transition: all 300ms ease-in;
  &:hover {
    color: white;
    background-color: red;
  }
`;
const Edit = styled.div`
  display: flex;
  padding: 0.5em;
  color: orange;
  font-size: 0.8em;
  border: 1px solid orange;
  border-radius: 4px;
  margin-right: 10px;
  span {
    margin-left: 4px;
  }
  cursor: pointer;
  transition: all 300ms ease-in;
  &:hover {
    color: white;
    background-color: orange;
  }
`;
const Share = styled.div`
  display: flex;
  padding: 0.5em;
  color: blue;
  font-size: 0.8em;
  border: 1px solid blue;
  border-radius: 4px;
  span {
    margin-left: 4px;
  }
  cursor: pointer;
  transition: all 300ms ease-in;
  &:hover {
    color: white;
    background-color: blue;
  }
`;

const ModalBox = styled.div`
  margin: 1em;
  visibility: ${(props: ModalProps) => {
    return props.isOpenModal ? 'visible' : 'hidden';
  }};
`;

const DeleteModalContainer = styled.div`
  display: ${(props: DeleteModalProps) => {
    return props.isDeleteModalOpen ? 'block' : 'none';
  }};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default MyWorldCupItem;
