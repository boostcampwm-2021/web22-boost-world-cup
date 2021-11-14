import React, { useReducer, createContext } from 'react';
import {
  worldcupFormReducer,
  initialWorldcupFormState,
  WorldcupFormState,
  WorldcupFormAction,
  uploadReducer,
  initialUploadState,
  UploadState,
  UploadAction,
} from './reducer';

interface Props {
  children: JSX.Element;
}

export const WorldcupState = createContext<WorldcupFormState>(initialWorldcupFormState);
export const WorldcupDispatcher = createContext<React.Dispatch<WorldcupFormAction>>(() => {});
export const UploadImgState = createContext<UploadState>(initialUploadState);
export const UploadImgDispatcher = createContext<React.Dispatch<UploadAction>>(() => {});

function Store({ children }: Props): JSX.Element {
  const [worldcupFormState, worldcupFormDispatcher] = useReducer(worldcupFormReducer, initialWorldcupFormState);
  const [uploadState, uploadDispatcher] = useReducer(uploadReducer, initialUploadState);

  return (
    <WorldcupState.Provider value={worldcupFormState}>
      <WorldcupDispatcher.Provider value={worldcupFormDispatcher}>
        <UploadImgState.Provider value={uploadState}>
          <UploadImgDispatcher.Provider value={uploadDispatcher}>{children}</UploadImgDispatcher.Provider>
        </UploadImgState.Provider>
      </WorldcupDispatcher.Provider>
    </WorldcupState.Provider>
  );
}

export default Store;
