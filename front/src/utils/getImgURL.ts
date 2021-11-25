import { IMG_URL_END_POINT } from '../commons/constants/route';

const getImgURL = (imgKey: string, width?: number, height?: number) => {
  if (!width) return `${IMG_URL_END_POINT}/wiziboost-image-raw/${imgKey}`;
  return `${IMG_URL_END_POINT}/image-w${width}h${height}/${imgKey}.webp`;
};

export default getImgURL;
