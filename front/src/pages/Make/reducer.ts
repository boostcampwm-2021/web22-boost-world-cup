import { ImgInfo } from '../../types/Datas';

export interface WorldcupFormState {
  title: string;
  desc: string;
  keywords: string[];
  imgInfos: ImgInfo[];
}

export type WorldcupFormAction =
  | { type: 'CHANGE_TITLE'; payload: string }
  | { type: 'CHANGE_DESC'; payload: string }
  | { type: 'CHANGE_IMG'; payload: { preKey: string; newKey: string; name: string } }
  | { type: 'CHANGE_IMG_NAME'; payload: { key: string; name: string } }
  | { type: 'ADD_KEYWORD'; payload: string }
  | { type: 'ADD_IMGS'; payload: ImgInfo[] }
  | { type: 'DELETE_IMG'; payload: string }
  | { type: 'FINISH_IMG_UPLOAD'; payload: string };

export const initialWorldcupFormState: WorldcupFormState = {
  title: '',
  desc: '',
  keywords: [],
  imgInfos: [],
};

export const worldcupFormReducer = (state: WorldcupFormState, action: WorldcupFormAction): WorldcupFormState => {
  switch (action.type) {
    case 'CHANGE_TITLE': {
      const { payload: newTitle } = action;
      return { ...state, title: newTitle };
    }

    case 'CHANGE_DESC': {
      const { payload: newDesc } = action;
      return { ...state, desc: newDesc };
    }

    case 'CHANGE_IMG': {
      const { preKey, newKey, name: newName } = action.payload;
      const { imgInfos: preImgInfos } = state;
      const targetIdx = preImgInfos.findIndex((info) => info.key === preKey);
      const newImgInfos = [
        ...preImgInfos.slice(0, targetIdx),
        { key: newKey, name: newName, isUploaded: false },
        ...preImgInfos.slice(targetIdx + 1),
      ];
      return { ...state, imgInfos: newImgInfos };
    }

    case 'CHANGE_IMG_NAME': {
      const { key, name: newName } = action.payload;
      const { imgInfos: preImgInfos } = state;
      const targetIdx = preImgInfos.findIndex((info) => info.key === key);
      const newImgInfos = [
        ...preImgInfos.slice(0, targetIdx),
        { ...preImgInfos[targetIdx], name: newName },
        ...preImgInfos.slice(targetIdx + 1),
      ];
      return { ...state, imgInfos: newImgInfos };
    }

    case 'ADD_KEYWORD': {
      const { payload: newKeyword } = action;
      return { ...state, keywords: [newKeyword] };
    }

    case 'ADD_IMGS': {
      const { payload: newImgInfos } = action;
      const { imgInfos: preImgInfos } = state;
      return { ...state, imgInfos: [...preImgInfos, ...newImgInfos] };
    }

    case 'DELETE_IMG': {
      const { payload: key } = action;
      const { imgInfos: preImgInfos } = state;
      const targetIdx = preImgInfos.findIndex((info) => info.key === key);
      const newImgInfos = [...preImgInfos.slice(0, targetIdx), ...preImgInfos.slice(targetIdx + 1)];
      return { ...state, imgInfos: newImgInfos };
    }

    case 'FINISH_IMG_UPLOAD': {
      const { payload: key } = action;
      const { imgInfos: preImgInfos } = state;
      const targetIdx = preImgInfos.findIndex((info) => info.key === key);
      const newImgInfos = [
        ...preImgInfos.slice(0, targetIdx),
        { ...preImgInfos[targetIdx], isUploaded: true },
        ...preImgInfos.slice(targetIdx + 1),
      ];
      return { ...state, imgInfos: newImgInfos };
    }

    default: {
      throw new Error('Unexpected action type');
    }
  }
};

export interface UploadState {
  willUploadFiles: File[];
  presignedURLs: string[];
}

export type UploadAction =
  | { type: 'ADD_FILES'; payload: File[] }
  | { type: 'ADD_PRESIGNED_URL'; payload: string[] }
  | { type: 'RESET' };

export const initialUploadState: UploadState = {
  willUploadFiles: [],
  presignedURLs: [],
};

export const uploadReducer = (state: UploadState, action: UploadAction): UploadState => {
  switch (action.type) {
    case 'ADD_FILES': {
      const { payload: newFiles } = action;
      return { ...state, willUploadFiles: [...state.willUploadFiles, ...newFiles] };
    }
    case 'ADD_PRESIGNED_URL': {
      const { payload: newPresignedURLs } = action;
      return { ...state, presignedURLs: [...state.presignedURLs, ...newPresignedURLs] };
    }
    case 'RESET': {
      return { willUploadFiles: [], presignedURLs: [] };
    }
    default:
      throw new Error('Unexpected action type');
  }
};
