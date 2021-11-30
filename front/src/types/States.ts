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

export interface RequestState<T> {
  type: 'NULL' | 'REQUEST' | 'SUCCESS' | 'FAILURE';
  requestProps?: any[];
  response?: T;
  statusCode?: number;
}

export interface UploadState {
  willUploadFiles: File[];
  presignedURLs: string[];
}

export interface WorldcupState {
  title: string;
  desc: string;
  keywords: string[];
}
