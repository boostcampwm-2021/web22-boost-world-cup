import React from 'react';
import styled from 'styled-components';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import KakaoButton from './KakaoButton';

const ShareModal = (): JSX.Element => {
  return (
    <ModalBox>
      <KakaoButton />
      <Facebookbutton>
        <FacebookIcon size={48} borderRadius={24} />
      </Facebookbutton>
      <TwitterButton>
        <TwitterIcon size={48} borderRadius={24} />
      </TwitterButton>
      <CopyToClipboard text={window.location.href}>
        <URLButton type="button">URL</URLButton>
      </CopyToClipboard>
    </ModalBox>
  );
};
const ModalBox = styled.div`
  margin: auto;
  padding; 0px;
  display: flex;
  width: 250px;
  justify-content: space-between;
`;
const Facebookbutton = styled(FacebookShareButton).attrs({ url: window.location.href })`
  transition: all 300ms ease-in;
  &:hover {
    transform: scale(1.1);
  }
`;
const TwitterButton = styled(TwitterShareButton).attrs({ url: window.location.href })`
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
export default ShareModal;
