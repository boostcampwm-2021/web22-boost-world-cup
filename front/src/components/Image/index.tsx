import React, { useState } from 'react';
import styled from 'styled-components';
import { IMG_URL_END_POINT } from '../../commons/constants/route';

interface Props {
  width: number;
  height: number;
  imgKey: string;
  placeholder: JSX.Element;
}

function Image({ width, height, imgKey, placeholder }: Props): JSX.Element {
  const resizedImgURL = `${IMG_URL_END_POINT}/image-w${width}h${height}/${imgKey}.webp`;
  const originImgURL = `${IMG_URL_END_POINT}/wiziboost-image-raw/${imgKey}`;
  const [isLoading, setIsLoading] = useState(true);
  const [imgURL, setImgURL] = useState(resizedImgURL);
  return (
    <Container isLoading width={width} height={height}>
      {isLoading && placeholder}
      <Img
        src={imgURL}
        onLoad={() => setIsLoading(false)}
        onError={() => setImgURL(originImgURL)}
        alt={imgURL}
        isLoading={isLoading}
        width={width}
        height={height}
      />
    </Container>
  );
}

const Container = styled.div<{ isLoading: boolean; width: number; height: number }>`
  width: ${({ width }) => width}
  height: ${({ height }) => height};
  position: relative;
  border-radius: 13px;
  div {
    width: 40px;
    height: 40px;
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

export default Image;
