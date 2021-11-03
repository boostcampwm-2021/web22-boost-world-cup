import React, { useState, useEffect } from 'react';
import { MdCancel } from 'react-icons/md';
import styled from 'styled-components';
import Loading from 'react-loading';
import axios from 'axios';
import { ImgInfo } from '../../types/Datas';

interface Props {
  onDelete: (key: string) => void;
  info: ImgInfo;
}

function ImgPreView({ onDelete, info }: Props): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const uploadImg = async () => {
      const { preSignedURL, fields, file, key } = info;
      const fileData = new FormData();
      Object.keys(fields).forEach((key) => {
        fileData.append(key, fields[key]);
      });
      fileData.append('file', file);
      await axios.post(preSignedURL, fileData);
      info.url = `https://uhwan-test.s3.ap-northeast-2.amazonaws.com/raw/${key}`;
      setIsLoading(false);
    };
    uploadImg();
  }, []);
  return (
    <Container isLoading={isLoading}>
      {isLoading ? (
        <Loading type="spin" color="black" />
      ) : (
        <>
          <Btn type="button" onClick={() => onDelete(info.key)}>
            <MdCancel size={40} color="red" />
          </Btn>
          <img src={info.url} width="143px" height="160px" style={{ borderRadius: '20px' }} alt="" />
        </>
      )}
    </Container>
  );
}

const Container = styled.li<{ isLoading: boolean }>`
  position: relative;
  width: 143px;
  height: 160px;
  border-radius: 20px;
  border: ${({ isLoading }) => (isLoading ? `1px solid black` : `none`)};
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
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
