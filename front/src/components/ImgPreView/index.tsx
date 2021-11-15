import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Loading from 'react-loading';
import { ImgInfo } from '../../types/Datas';
import useApiRequest from '../../hooks/useApiRequest';
import { uploadImage } from '../../utils/api/image';
import { WorldcupDispatcher } from '../../pages/Make/store';

interface Props {
  info: ImgInfo;
  tab: 1 | 2;
  willUploadFile?: File;
  presignedURL?: string;
  onUploadSuccess?: (info: ImgInfo) => void;
}

function ImgPreView({ info, tab, willUploadFile, presignedURL, onUploadSuccess }: Props): JSX.Element {
  const IMG_URL_END_POINT = 'https://kr.object.ncloudstorage.com';
  const resizedImgURL = `${IMG_URL_END_POINT}/image-w120h120/${info.key}.webp`;
  const originImgURL = `${IMG_URL_END_POINT}/wiziboost-image-raw/${info.key}`;
  const initialImgURL = tab === 1 ? originImgURL : resizedImgURL;

  const [isLoading, setIsLoading] = useState(true);
  const [imgURL, setImgURL] = useState(initialImgURL);
  const [uploadImageResult, uploadImageDispatcher] = useApiRequest(uploadImage);
  const worldcupFormDispatcher = useContext(WorldcupDispatcher);

  const placeholder = <Loading type="spin" color="black" />;
  const onError = () => setImgURL(originImgURL);

  useEffect(() => {
    if (tab !== 1 || !willUploadFile) return;
    const fileReader = new FileReader();
    fileReader.addEventListener('load', async ({ target }) => {
      if (!target || !target.result || typeof target.result === 'string') return;
      uploadImageDispatcher({
        type: 'REQUEST',
        requestProps: [presignedURL, target.result, willUploadFile.type],
      });
    });
    fileReader.readAsArrayBuffer(willUploadFile);
  }, []);

  useEffect(() => {
    if (!worldcupFormDispatcher) return;
    const { type } = uploadImageResult;
    switch (type) {
      case 'NULL':
      case 'REQUEST':
        return;
      case 'SUCCESS': {
        worldcupFormDispatcher({ type: 'FINISH_IMG_UPLOAD', payload: info.key });
        if (onUploadSuccess) onUploadSuccess(info);
        return;
      }
      case 'FAILURE': {
        return;
      }
      default:
        throw new Error('Unexpected request type');
    }
  }, [uploadImageResult]);

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
