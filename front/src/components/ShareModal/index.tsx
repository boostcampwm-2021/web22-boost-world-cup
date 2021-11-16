import React, { useState } from 'react';
import styled from 'styled-components';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import KakaoButton from './KakaoButton';

interface ShareModalProps {
  id: number;
}
const ShareModal = ({ id }: ShareModalProps): JSX.Element => {
  const [clipBoardModal, setClipBoardModal] = useState(false);
  const url = `${window.location.origin}/initialize/${id}`;
  const clipBoardHandler = () => {
    setClipBoardModal(true);
    setTimeout(() => {
      setClipBoardModal(false);
    }, 1000);
  };
  return (
    <ModalBox>
      <KakaoButton url={url} />
      <Facebookbutton url={url}>
        <FacebookIcon size={48} borderRadius={24} />
      </Facebookbutton>
      <CopyToClipboard text={url}>
        <URLButton onClick={clipBoardHandler} type="button">
          URL
        </URLButton>
      </CopyToClipboard>
      {clipBoardModal ? <ClipBordModal>링크를 복사했습니다.</ClipBordModal> : ''}
    </ModalBox>
  );
};
const ModalBox = styled.div`
  margin: auto;
  padding; 0px;
  display: flex;
  width: 200px;
  justify-content: space-between;
`;
const Facebookbutton = styled(FacebookShareButton).attrs((props) => ({
  url: props.url,
}))`
  transition: all 300ms ease-in;
  &:hover {
    transform: scale(1.1);
  }
`;
const URLButton = styled.button`
  width: 48px;
  height: 48px;
  line-height: 48px;
  font-size: 18px;
  font-weight: 800;
  background-color: #8fbc8f;
  color: white;
  border-radius: 24px;
  cursor: pointer;
  transition: all 300ms ease-in;
  &:hover {
    transform: scale(1.1);
  }
`;
const ClipBordModal = styled.p`
  position: absolute;
  top: 40vh;
  left: 40vw;
  background-color: black;
  color: white;
  border-radius: 12px;
  font-size: 2em;
  padding: 6vh 6vw;
`;
export default ShareModal;
