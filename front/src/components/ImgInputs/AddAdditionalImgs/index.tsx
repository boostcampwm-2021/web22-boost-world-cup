import React from 'react';
import styled from 'styled-components';
import { RiImageAddLine } from 'react-icons/ri';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function AddAdditionalImg({ onChange }: Props): JSX.Element {
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
      <Input value="" type="file" multiple onChange={onChange} accept="image/*" />
    </Container>
  );
}

const Container = styled.div`
  flex: none;
  width: 150px;
  height: 150px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.black};
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
  &:hover {
    background-color: #f5f5f5;
  }
  ${({ theme }) => theme.fontStyle.caption};
  div {
    text-align: center;
    margin-top: 18px;
  }
`;

const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`;

export default AddAdditionalImg;
