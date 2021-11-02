import React from 'react';
import { MdCancel } from 'react-icons/md';
import styled from 'styled-components';

interface Props {
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
  src: string;
}

function ImgPreView({ onDelete, src }: Props): JSX.Element {
  return (
    <Container>
      <Btn type="button" onClick={onDelete}>
        <MdCancel size={40} color="red" />
      </Btn>
      <img src={src} width="143px" height="160px" style={{ borderRadius: '20px' }} alt="" />
    </Container>
  );
}

const Container = styled.li`
  position: relative;
`;

const Btn = styled.button`
  position: absolute;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 50%;
  height: 40px;
  right: -20px;
  top: -20px;
`;

export default ImgPreView;
