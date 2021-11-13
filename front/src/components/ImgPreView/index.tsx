import React, { useState } from 'react';
import styled from 'styled-components';
import Loading from 'react-loading';
import { ImgInfo } from '../../types/Datas';

interface Props {
  info: ImgInfo;
  tab: 1 | 2;
}

function ImgPreView({ info, tab }: Props): JSX.Element {
  const imgURLEndPoint = 'https://kr.object.ncloudstorage.com';
  const resizedImgURL = `${imgURLEndPoint}/image-w120h120/${info.key}.webp`;
  const originImgURL = `${imgURLEndPoint}/wiziboost-image-raw/${info.key}`;
  const initialImgURL = tab === 1 ? originImgURL : resizedImgURL;
  const [isLoading, setIsLoading] = useState(true);
  const [imgURL, setImgURL] = useState(initialImgURL);
  const placeholder = <Loading type="spin" color="black" />;
  const onError = () => setImgURL(originImgURL);

  return (
    <Container isLoading={isLoading} tab={tab}>
      {isLoading && placeholder}
      {info.isUploaded && (
        <Img src={imgURL} onLoad={() => setIsLoading(false)} onError={onError} alt="" isLoading={isLoading} tab={tab} />
      )}
    </Container>
  );
}

const Container = styled.li<{ isLoading: boolean; tab: number }>`
  width: ${({ tab }) => (tab === 1 ? '143px' : '120px')};
  height: ${({ tab }) => (tab === 1 ? '160px' : '120px')};
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

const Img = styled.img<{ isLoading: boolean; tab: number }>`
  border-radius: 13px;
  visibility: ${({ isLoading }) => (isLoading ? 'hidden' : 'visible')};
  width: ${({ tab }) => (tab === 1 ? '143px' : '120px')};
  height: ${({ tab }) => (tab === 1 ? '160px' : '120px')};
`;

export default ImgPreView;
