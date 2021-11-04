import React, { useState, useEffect } from 'react';
import { MdCancel } from 'react-icons/md';
import styled from 'styled-components';
import Loading from 'react-loading';
import { ImgInfo } from '../../types/Datas';

interface Props {
  onDelete: (key: string) => void;
  info: ImgInfo;
  deleteBtnExist: boolean;
  width: 143 | 120;
  height: 160 | 120;
}

function ImgPreView({ onDelete, info, width, height, deleteBtnExist }: Props): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [imgURL, setImgURL] = useState('');

  useEffect(() => {
    const { key } = info;
    const intervalId = setInterval(() => {
      if (!isLoading) {
        clearInterval(intervalId);
        return;
      }
      const newImgURL = `https://uhwan-test.s3.ap-northeast-2.amazonaws.com/w${width}h${height}/${key}?${Date.now()}`;
      setImgURL(newImgURL);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isLoading]);

  return (
    <Container isLoading={isLoading} style={{ width, height }}>
      {isLoading && <Loading type="spin" color="black" />}
      {!isLoading && deleteBtnExist && (
        <Btn type="button" onClick={() => onDelete(info.key)}>
          <MdCancel size={40} color="red" />
        </Btn>
      )}
      <Img src={imgURL} onLoad={() => setIsLoading(false)} alt="" isLoading={isLoading} />
    </Container>
  );
}

const Container = styled.li<{ isLoading: boolean }>`
  position: relative;
  border-radius: 13px;
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

const Img = styled.img<{ isLoading: boolean }>`
  border-radius: 13px;
  display: ${({ isLoading }) => (isLoading ? `none` : `inline`)};
`;

export default ImgPreView;
