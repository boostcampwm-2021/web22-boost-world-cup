import React, { useEffect, useContext, useState } from 'react';
import { ImgInfosDispatcher } from '../store/ImgsStore';
import useApiRequest, { NULL, REQUEST, SUCCESS, FAILURE } from './useApiRequest';
import { uploadImage } from '../utils/api/image';
import { ImgInfo } from '../types/Datas';

const useUploadImg = (
  imgInfo: ImgInfo,
  file: File | null,
  presignedURL: string | null,
  onUploadSuccess?: (imgInfo: ImgInfo) => void,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isLoading, setIsLoading] = useState(true);
  const imgInfosDispatcher = useContext(ImgInfosDispatcher);
  const [uploadImageResult, uploadImageDispatcher] = useApiRequest(uploadImage);

  useEffect(() => {
    if (!file || !presignedURL) return;
    setIsLoading(true);
    const fileReader = new FileReader();
    fileReader.addEventListener('load', async ({ target }) => {
      if (!target || !target.result || typeof target.result === 'string') return;
      uploadImageDispatcher({
        type: REQUEST,
        requestProps: [presignedURL, target.result, file.type],
      });
    });
    fileReader.readAsArrayBuffer(file);
  }, [file, presignedURL]);

  useEffect(() => {
    const { type } = uploadImageResult;
    switch (type) {
      case NULL:
      case REQUEST:
        return;
      case SUCCESS: {
        imgInfosDispatcher({ type: 'FINISH_IMG_UPLOAD', payload: imgInfo.key });
        if (onUploadSuccess) onUploadSuccess(imgInfo);
        return;
      }
      case FAILURE: {
        return;
      }
      default:
        throw new Error('Unexpected request type');
    }
  }, [uploadImageResult]);

  return [isLoading, setIsLoading];
};

export default useUploadImg;
