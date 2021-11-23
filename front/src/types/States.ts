import { ImgInfo } from './Datas';

export interface WorldcupFormState {
  title: string;
  desc: string;
  keywords: string[];
  imgInfos: ImgInfo[];
}

export interface UserState {
  isLoggedIn: boolean;
  id: number | null;
  nickname: string | null;
  gender: number | null;
  age: number | null;
}
