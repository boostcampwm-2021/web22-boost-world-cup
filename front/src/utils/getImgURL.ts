import { IMG_URL_END_POINT } from '../constants/route';

export const getImgURL = (imgKey: string, width?: number, height?: number): string => {
  if (!width) return `${IMG_URL_END_POINT}/wiziboost-image-raw/${imgKey}`;
  return `${IMG_URL_END_POINT}/image-w${width}h${height}/${imgKey}.webp`;
};

export const getBlurImgURL = (imgKey: string): string => {
  return `${IMG_URL_END_POINT}/image-blur/${imgKey}.webp`;
};
