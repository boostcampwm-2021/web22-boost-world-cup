import { UserState } from './States';
import { ImgInfo } from './Datas';

export type UserAction = { type: 'LOGOUT' } | { type: 'LOGIN'; payload: UserState };

export type ImgsAction =
  | { type: 'CHANGE_IMG'; payload: { preKey: string; newKey: string; name: string } }
  | { type: 'CHANGE_IMG_NAME'; payload: { key: string; name: string } }
  | { type: 'ADD_IMGS'; payload: ImgInfo[] }
  | { type: 'DELETE_IMG'; payload: string }
  | { type: 'FINISH_IMG_UPLOAD'; payload: string }
  | { type: 'SET_IMGS'; payload: ImgInfo[] }
  | { type: 'RESET' };

export type UploadAction =
  | { type: 'ADD_FILES'; payload: File[] }
  | { type: 'ADD_PRESIGNED_URL'; payload: string[] }
  | { type: 'RESET' };

export type WorldcupAction =
  | { type: 'CHANGE_TITLE'; payload: string }
  | { type: 'CHANGE_DESC'; payload: string }
  | { type: 'ADD_KEYWORD'; payload: string }
  | { type: 'ADD_KEYWORDS'; payload: string[] }
  | { type: 'DELETE_KEYWORD' };
