import React from 'react';
import styled from 'styled-components';
import { RiImageAddLine } from 'react-icons/ri';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type: 'addImgs' | 'addAdditionalImgs' | 'changeImg';
}

function ImgInput({ onChange, type }: Props): JSX.Element {
  switch (type) {
    case 'addImgs':
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
    case 'addAdditionalImgs':
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
    case 'changeImg':
      return (
        <ChangeImgContainer>
          Drop file here or click to upload.
          <hr />
          여기 변경할 사진 파일을 놓거나 클릭하여 업로드하세요.
          <Input value="" type="file" accept="image/*" onChange={onChange} />
        </ChangeImgContainer>
      );
    default:
      return <div />;
  }
}

const AddImgsContainer = styled.div`
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

const AddAdditionalImgsContainer = styled.div`
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

const ChangeImgContainer = styled.div`
  display: flex;
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
`;

const Input = styled.input`
  position: absolute;
  cursor: pointer;
  opacity: 0;
`;

export default ImgInput;
