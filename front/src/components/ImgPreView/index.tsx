import React, { useState } from 'react';
import styled from 'styled-components';
import Loading from 'react-loading';
import { ImgInfo } from '../../types/Datas';

interface Props {
  info: ImgInfo;
}

function ImgPreView({ info }: Props): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const imgURL = `https://kr.object.ncloudstorage.com/wiziboost-image-raw/${info.key}`;

  return (
    <Container isLoading={isLoading}>
      {isLoading && <Loading type="spin" color="black" />}
      {info.isUploaded && (
        <Img src={imgURL} onLoad={() => setIsLoading(false)} alt="" isLoading={isLoading} width={143} height={160} />
      )}
    </Container>
  );
}

const Container = styled.li<{ isLoading: boolean }>`
  width: 143px;
  height: 160px;
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

const Img = styled.img<{ isLoading: boolean }>`
  border-radius: 13px;
  visibility: ${({ isLoading }) => (isLoading ? 'hidden' : 'visible')};
`;

export default ImgPreView;
