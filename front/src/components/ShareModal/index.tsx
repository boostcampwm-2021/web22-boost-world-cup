import React, { useState, useEffect } from 'react';
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
  const onURLBtnClick = () => {
    setClipBoardModal(true);
    setTimeout(() => {
      setClipBoardModal(false);
    }, 1000);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <ModalBox>
      <Header>
        <h1>공유하기</h1>
        <span>월드컵을 SNS에 공유해보세요.</span>
      </Header>
      <Content>
        <KakaoButton url={url} />
        <Facebookbutton url={url}>
          <FacebookIcon size={48} borderRadius={24} />
        </Facebookbutton>
        <CopyToClipboard text={url}>
          <URLButton onClick={onURLBtnClick}>URL</URLButton>
        </CopyToClipboard>
        {clipBoardModal ? <ClipBordModal>클립보드에 복사되었습니다.</ClipBordModal> : ''}
      </Content>
    </ModalBox>
  );
};
const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 350px;
  height: 300px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  margin: auto;
  padding; 0px;
`;
const Header = styled.header`
  text-align: center;
  h1 {
    font-size: 2em;
    font-weight: 800;
    margin-bottom: 10px;
  }
  span {
    font-size: 1.1em;
  }
`;
const Content = styled.div`
  width: 260px;
  display: flex;
  justify-content: space-around;
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
  position: fixed;
  top: 53px;
  background-color: ${({ theme }) => theme.color.pink};
  color: white;
  border-radius: 12px;
  font-size: 1em;
  padding: 2em 4em;
`;
export default ShareModal;
