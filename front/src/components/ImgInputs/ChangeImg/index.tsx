import React from 'react';
import styled from 'styled-components';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function ChangeImg({ onChange }: Props): JSX.Element {
  return (
    <Container>
      Drop file here or click to upload.
      <hr />
      변경할 사진 파일을 놓거나 클릭하여 업로드하세요.
      <Input value="" type="file" accept="image/*" onChange={onChange} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  height: 80px;
  text-align: center;
  padding: 5px 5px 5px 5px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  ${({ theme }) => theme.fontStyle.body};
  font-size: 15px;
  border: 1px solid ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.white};
  transition: background-color 0.3s;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`;

export default ChangeImg;
