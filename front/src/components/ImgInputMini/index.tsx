import React from 'react';
import { RiImageAddLine } from 'react-icons/ri';
import styled from 'styled-components';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function ImgInputMini({ onChange }: Props): JSX.Element {
  return (
    <Container>
      <RiImageAddLine size={50} />
      <div>
        Drop files here
        <hr />
        or
        <hr />
        click to upload.
      </div>
      <input type="file" multiple onChange={onChange} accept="image/*" />
    </Container>
  );
}

const Container = styled.div`
  width: 143px;
  height: 160px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.black};
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.fontStyle.caption};
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
  }
  div {
    text-align: center;
    margin-top: 18px;
  }
`;

export default ImgInputMini;
