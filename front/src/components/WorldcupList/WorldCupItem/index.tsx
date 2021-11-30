import React from 'react';
import styled from 'styled-components';
import { FaPlay, FaList, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ShareModal from '../../ShareModal';
import { useModal } from '../../../hooks';
import Image from '../../Image';

interface Props {
  id: number;
  thumbnail1: string;
  thumbnail2: string;
  title: string;
  desc: string;
}
interface ModalProps {
  modalOn: boolean;
}
function WorldCupItem({ id, thumbnail1, thumbnail2, title, desc }: Props): JSX.Element {
  const [modalOn, onToggleModal] = useModal();
  return (
    <Item>
      <Thumbnail>
        <Image width={140} height={180} imgKey={thumbnail1} />
        <Image width={140} height={180} imgKey={thumbnail2} />
      </Thumbnail>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
      <Buttons>
        <Link to={`/initialize/${id}`}>
          <Start>
            <FaPlay />
            <span>시작하기</span>
          </Start>
        </Link>
        <Link to={`/ranking/${id}`}>
          <Ranking>
            <FaList />
            <span>랭킹보기</span>
          </Ranking>
        </Link>
        <Share onClick={onToggleModal}>
          <FaShare />
          <span>공유하기</span>
        </Share>
      </Buttons>
      <ModalBox onClick={onToggleModal} modalOn={modalOn}>
        <ShareModal id={id} />
      </ModalBox>
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
  margin-bottom: 1.6em;
`;
const Start = styled.div`
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
const Ranking = styled.div`
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99999;
  display: ${(props: ModalProps) => (props.modalOn ? 'block' : 'none')};
`;

export default WorldCupItem;
