import React, { useReducer, createContext } from 'react';
import worldcupFormReducer, { WorldcupState, WorldcupAction, initialWorldcupState } from './reducer';

export const WorldcupFormState = createContext<WorldcupState>(initialWorldcupState);
export const WorldcupFormDispatcher = createContext<React.Dispatch<WorldcupAction>>(() => {});

interface Props {
  children: JSX.Element;
}

function WorldcupFormStore({ children }: Props): JSX.Element {
  const [worldcupFormState, worldcupFormDispatcher] = useReducer(worldcupFormReducer, initialWorldcupState);

  return (
    <WorldcupFormState.Provider value={worldcupFormState}>
      <WorldcupFormDispatcher.Provider value={worldcupFormDispatcher}>{children}</WorldcupFormDispatcher.Provider>
    </WorldcupFormState.Provider>
  );
}

export default WorldcupFormStore;
