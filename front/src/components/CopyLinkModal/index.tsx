import React from 'react';
import styled from 'styled-components';

const CopyLinkModal = () => {
  return <Container>링크를 복사했습니다!</Container>;
};

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 200px;
  background-color: #ffffff;
  top: 50%;
  left: 45%;
  border-radius: 10px;
  border: 1px solid black;
`;

export default CopyLinkModal;
