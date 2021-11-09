import React from 'react';
import styled from 'styled-components';
import { RiImageAddLine } from 'react-icons/ri';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type: 'addImgs' | 'addAdditionalImgs' | 'changeImg';
}

function ImgInput({ onChange, type }: Props): JSX.Element {
  if (type === 'addImgs')
    return (
      <AddImgsContainer>
        <div>
          Drop files here or click to upload.
          <hr />
          여기 파일을 놓거나 클릭하여 업로드하세요.
        </div>
        <Input value="" type="file" multiple onChange={onChange} accept="image/*" />
      </AddImgsContainer>
    );

  if (type === 'addAdditionalImgs')
    return (
      <AddAdditionalImgsContainer>
        <RiImageAddLine size={50} />
        <div>
          Drop files here
          <hr />
          or
          <hr />
          click to upload.
        </div>
        <Input value="" type="file" multiple onChange={onChange} accept="image/*" />
      </AddAdditionalImgsContainer>
    );

  if (type === 'changeImg')
    return (
      <ChangeImgContainer>
        Drop file here or click to upload.
        <hr />
        여기 변경할 사진 파일을 놓거나 클릭하여 업로드하세요.
        <Input value="" type="file" accept="image/*" onChange={onChange} />
      </ChangeImgContainer>
    );

  return <div />;
}

const AddImgsContainer = styled.div`
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
`;

const AddAdditionalImgsContainer = styled.div`
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
  div {
    text-align: center;
    margin-top: 18px;
  }
`;

const ChangeImgContainer = styled.div`
  width: 440px;
  height: 100px;
  border: 1px solid ${({ theme }) => theme.color.black};
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.fontStyle.body};
`;

const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`;

export default ImgInput;
