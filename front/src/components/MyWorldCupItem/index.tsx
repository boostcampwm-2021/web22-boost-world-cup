import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { FaTrash, FaPen, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Image from '../Image';
import Loader from '../Loader';
import { useModal } from '../../hooks';

const ShareModal = lazy(() => import('../ShareModal'));
const DeleteModal = lazy(() => import('../DeleteModal'));
const BackDrop = lazy(() => import('../BackDrop'));
interface Props {
  id: number;
  thumbnail1: string;
  thumbnail2: string;
  title: string;
  desc: string;
}
function MyWorldCupItem({ id, thumbnail1, thumbnail2, title, desc }: Props): JSX.Element {
  const [deleteModalOn, onToggleDeleteModal] = useModal();
  const [shareModalOn, onToggleShareModal] = useModal();
  return (
    <Item>
      <Thumbnail>
        <Image width={140} height={180} imgKey={thumbnail1} />
        <Image width={140} height={180} imgKey={thumbnail2} />
      </Thumbnail>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
      <Buttons>
        <Delete onClick={onToggleDeleteModal}>
          <FaTrash />
          <span>삭제하기</span>
        </Delete>
        <Link to={`/edit/${id}`}>
          <Edit>
            <FaPen />
            <span>수정하기</span>
          </Edit>
        </Link>
        <Share onClick={onToggleShareModal}>
          <FaShare />
          <span>공유하기</span>
        </Share>
      </Buttons>
      {shareModalOn && (
        <Suspense fallback={<Loader />}>
          <BackDrop modalOn={shareModalOn} onToggleModal={onToggleShareModal}>
            <ShareModal id={id} />
          </BackDrop>
        </Suspense>
      )}
      {deleteModalOn && (
        <Suspense fallback={<Loader />}>
          <BackDrop modalOn={deleteModalOn}>
            <DeleteModal id={id} onToggleDeleteModal={onToggleDeleteModal} />
          </BackDrop>
        </Suspense>
      )}
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
export default MyWorldCupItem;
