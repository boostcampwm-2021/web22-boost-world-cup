import React, { useReducer } from 'react';
import { ImgInfo } from '../types/Datas';
import { ImgsAction } from '../types/Actions';
import Reducer from '../types/Reducer';

const initialImgsState: ImgInfo[] = [];

const imgsReducer: Reducer<ImgInfo[], ImgsAction> = (state, action) => {
  switch (action.type) {
    case 'CHANGE_IMG': {
      const { preKey, newKey, name: newName } = action.payload;
      const targetIdx = state.findIndex((info) => info.key === preKey);
      const newImgInfos = [
        ...state.slice(0, targetIdx),
        { ...state[targetIdx], key: newKey, name: newName, isUploaded: false },
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

    case 'SET_IMGS': {
      const { payload: newImgInfos } = action;
      return newImgInfos;
    }

    case 'RESET': {
      return [];
    }

    default: {
      throw new Error('Unexpected action type');
    }
  }
};

const useImgInfos = (): [ImgInfo[], React.Dispatch<ImgsAction>] => {
  const [imgInfos, imgInfosDispatcher] = useReducer(imgsReducer, initialImgsState);
  return [imgInfos, imgInfosDispatcher];
};

export default useImgInfos;
