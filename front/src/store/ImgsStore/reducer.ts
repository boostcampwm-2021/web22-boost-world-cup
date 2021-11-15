import { ImgInfo } from '../../types/Datas';

export type ImgsState = ImgInfo[];

export type ImgsAction =
  | { type: 'CHANGE_IMG'; payload: { preKey: string; newKey: string; name: string } }
  | { type: 'CHANGE_IMG_NAME'; payload: { key: string; name: string } }
  | { type: 'ADD_IMGS'; payload: ImgInfo[] }
  | { type: 'DELETE_IMG'; payload: string }
  | { type: 'FINISH_IMG_UPLOAD'; payload: string };

export const initialImgsState: ImgsState = [];

export default (state: ImgsState, action: ImgsAction): ImgsState => {
  switch (action.type) {
    case 'CHANGE_IMG': {
      const { preKey, newKey, name: newName } = action.payload;
      const targetIdx = state.findIndex((info) => info.key === preKey);
      const newImgInfos = [
        ...state.slice(0, targetIdx),
        { key: newKey, name: newName, isUploaded: false },
        ...state.slice(targetIdx + 1),
      ];
      return newImgInfos;
    }

    case 'CHANGE_IMG_NAME': {
      const { key, name: newName } = action.payload;
      const targetIdx = state.findIndex((info) => info.key === key);
      const newImgInfos = [
        ...state.slice(0, targetIdx),
        { ...state[targetIdx], name: newName },
        ...state.slice(targetIdx + 1),
      ];
      return newImgInfos;
    }

    case 'ADD_IMGS': {
      const { payload: newImgInfos } = action;
      return [...state, ...newImgInfos];
    }

    case 'DELETE_IMG': {
      const { payload: key } = action;
      const targetIdx = state.findIndex((info) => info.key === key);
      const newImgInfos = [...state.slice(0, targetIdx), ...state.slice(targetIdx + 1)];
      return newImgInfos;
    }

    case 'FINISH_IMG_UPLOAD': {
      const { payload: key } = action;
      const targetIdx = state.findIndex((info) => info.key === key);
      const newImgInfos = [
        ...state.slice(0, targetIdx),
        { ...state[targetIdx], isUploaded: true },
        ...state.slice(targetIdx + 1),
      ];
      return newImgInfos;
    }

    default: {
      throw new Error('Unexpected action type');
    }
  }
};
