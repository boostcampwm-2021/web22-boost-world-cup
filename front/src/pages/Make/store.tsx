import React, { useReducer, createContext } from 'react';
import { worldcupFormReducer, initialWorldcupFormState, WorldcupFormState, WorldcupFormAction } from './reducer';

interface Props {
  children: JSX.Element;
}

export const WorldcupState = createContext<WorldcupFormState>(initialWorldcupFormState);
export const WorldcupDispatcher = createContext<React.Dispatch<WorldcupFormAction>>(() => {});

function Store({ children }: Props): JSX.Element {
  const [worldcupFormState, worldcupFormDispatcher] = useReducer(worldcupFormReducer, initialWorldcupFormState);

  return (
    <WorldcupState.Provider value={worldcupFormState}>
      <WorldcupDispatcher.Provider value={worldcupFormDispatcher}>{children}</WorldcupDispatcher.Provider>
    </WorldcupState.Provider>
  );
}

export default Store;
