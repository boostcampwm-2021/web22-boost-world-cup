import React from 'react';
import styled from 'styled-components';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function ImgInput({ onChange }: Props): JSX.Element {
  return (
    <Container>
      Drop files here or click to upload.
      <hr />
      여기 파일을 놓거나 클릭하여 업로드하세요.
      <input type="file" multiple onChange={onChange} accept="image/*" />
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.black};
  border-radius: 10px;
  position: relative;
  width: 1312px;
  height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.fontStyle.h3};
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
  }
`;

export default ImgInput;
