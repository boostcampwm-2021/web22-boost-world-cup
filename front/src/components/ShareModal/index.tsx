import React, { useEffect } from 'react';
import styled from 'styled-components';
import KakaoButton from './KakaoButton';

const ShareModal = (): JSX.Element => {
  return (
    <ModalBox>
      <KakaoButton />
      <KakaoButton />
      <KakaoButton />
    </ModalBox>
  );
};
const ModalBox = styled.div`
  margin: auto;
  padding; 0px;
  display: flex;
`;
export default ShareModal;
