import React from 'react';
import UserStore from './userStore';

function GlobalStore({ children }: { children: JSX.Element }): JSX.Element {
  return <UserStore>{children}</UserStore>;
}

export default GlobalStore;
