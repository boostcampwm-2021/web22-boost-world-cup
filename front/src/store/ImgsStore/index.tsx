import React, { useReducer, createContext } from 'react';
import imgsReducer, { ImgsState, ImgsAction, initialImgsState } from './reducer';

export const ImgInfosState = createContext<ImgsState>(initialImgsState);
export const ImgInfosDispatcher = createContext<React.Dispatch<ImgsAction>>(() => {});

interface Props {
  children: JSX.Element;
}

function ImgsStore({ children }: Props): JSX.Element {
  const [imgInfos, imgInfosDispatcher] = useReducer(imgsReducer, initialImgsState);

  return (
    <ImgInfosState.Provider value={imgInfos}>
      <ImgInfosDispatcher.Provider value={imgInfosDispatcher}>{children}</ImgInfosDispatcher.Provider>
    </ImgInfosState.Provider>
  );
}

export default ImgsStore;
