import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: React.ReactNode;
  modalOn: boolean;
  onToggleModal?: React.MouseEventHandler;
}
function BackDrop({ children, modalOn, onToggleModal }: Props): JSX.Element {
  return (
    <Container modalOn={modalOn} onClick={onToggleModal}>
      {children}
    </Container>
  );
}
const Container = styled.section<{ modalOn: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99999;
  display: ${({ modalOn }) => (modalOn ? 'block' : 'none')};
`;

export default BackDrop;
