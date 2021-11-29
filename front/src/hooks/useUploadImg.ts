import React, { useEffect, useState } from 'react';
import useApiRequest, { REQUEST } from './useApiRequest';
import { ImgsAction } from '../types/Actions';
import { uploadImage } from '../apis/image';
import { ImgInfo } from '../types/Datas';

const useUploadImg = (
  imgInfo: ImgInfo,
  file: File | null,
  presignedURL: string | null,
  imgInfosDispatcher: React.Dispatch<ImgsAction>,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isLoading, setIsLoading] = useState(true);

  const onUploadImgSuccess = () => imgInfosDispatcher({ type: 'FINISH_IMG_UPLOAD', payload: imgInfo.key });
  const uploadImageDispatcher = useApiRequest(uploadImage, onUploadImgSuccess);

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

  return [isLoading, setIsLoading];
};

export default useUploadImg;
