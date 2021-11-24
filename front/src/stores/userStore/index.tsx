import React, { createContext, Dispatch, useReducer } from 'react';
import userReducer, { defaultUserState } from './reducer';
import { UserState } from '../../types/States';
import { UserAction } from '../../types/Actions';
import Reducer from '../../types/Reducer';

export const UserStateContext = createContext<UserState>(defaultUserState);
export const UserDispatcherContext = createContext<Dispatch<UserAction>>(() => {});

function UserStore({ children }: { children: JSX.Element }): JSX.Element {
  const [userState, userDispatcher] = useReducer<Reducer<UserState, UserAction>>(userReducer, defaultUserState);

  return (
    <UserStateContext.Provider value={userState}>
      <UserDispatcherContext.Provider value={userDispatcher}>{children}</UserDispatcherContext.Provider>
    </UserStateContext.Provider>
  );
}

export default UserStore;
