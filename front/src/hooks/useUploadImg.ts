import React, { useEffect, useState } from 'react';
import useApiRequest, { NULL, REQUEST, SUCCESS, FAILURE } from './useApiRequest';
import { ImgsAction } from './useImgInfos';
import { uploadImage } from '../utils/api/image';
import { ImgInfo } from '../types/Datas';

const useUploadImg = (
  imgInfo: ImgInfo,
  file: File | null,
  presignedURL: string | null,
  imgInfosDispatcher: React.Dispatch<ImgsAction>,
  onUploadSuccess?: (imgInfo: ImgInfo) => void,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isLoading, setIsLoading] = useState(true);
  const [uploadImageResult, uploadImageDispatcher] = useApiRequest(uploadImage);

  useEffect(() => {
    if (!file || !presignedURL) return;
    const upload = async () => {
      const fileBuffer = await file.arrayBuffer();
      uploadImageDispatcher({
        type: REQUEST,
        requestProps: [presignedURL, fileBuffer, file.type],
      });
    };
    setIsLoading(true);
    upload();
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
