import React, { useReducer, createContext } from 'react';
import uploadImgReducer, { UploadState, UploadAction, initialUploadState } from './reducer';

export const UploadImgState = createContext<UploadState>(initialUploadState);
export const UploadImgDispatcher = createContext<React.Dispatch<UploadAction>>(() => {});

interface Props {
  children: JSX.Element;
}

function UploadImgStore({ children }: Props): JSX.Element {
  const [uploadImgState, uploadImgDispatcher] = useReducer(uploadImgReducer, initialUploadState);

  return (
    <UploadImgState.Provider value={uploadImgState}>
      <UploadImgDispatcher.Provider value={uploadImgDispatcher}>{children}</UploadImgDispatcher.Provider>
    </UploadImgState.Provider>
  );
}

export default UploadImgStore;
