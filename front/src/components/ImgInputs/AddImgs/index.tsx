import React from 'react';
import styled from 'styled-components';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function AddImgs({ onChange }: Props): JSX.Element {
  return (
    <Container>
      <div>
        Drop files here or click to upload.
        <hr />
        여기 파일을 놓거나 클릭하여 업로드하세요.
      </div>
      <Input value="" type="file" multiple onChange={onChange} accept="image/*" />
    </Container>
  );
}

const Container = styled.div`
  border-radius: 10px;
  position: relative;
  width: 100%;
  height: 190px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
  &:hover {
    background-color: #f5f5f5;
  }
  ${({ theme }) => theme.fontStyle.h3};
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.black};
`;

const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`;

export default AddImgs;
