import { ImgInfo } from './Datas';

export interface WorldcupFormAction {
  type: string;
  payload: string | ImgInfo[];
}
