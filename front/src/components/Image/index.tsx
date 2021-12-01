import React, { useState } from 'react';
import styled from 'styled-components';
import { BsImage } from 'react-icons/bs';
import { getImgURL } from '../../utils/getImgURL';

interface Props {
  width: number;
  height: number;
  imgKey: string;
  placeholder?: JSX.Element;
}

function Image({ width, height, imgKey, placeholder }: Props): JSX.Element {
  const resizedImgURL = getImgURL(imgKey, width, height);
  const originImgURL = getImgURL(imgKey);
  const [isLoading, setIsLoading] = useState(true);
  const [imgURL, setImgURL] = useState(resizedImgURL);
  return (
    <Container isLoading width={width} height={height}>
      {isLoading &&
        (placeholder || (
          <div>
            <BsImage size={20} />
          </div>
        ))}
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
