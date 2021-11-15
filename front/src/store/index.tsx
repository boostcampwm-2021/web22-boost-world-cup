import React from 'react';
import ImgsStore from './ImgsStore';

interface Props {
  children: JSX.Element;
}

function GlobalStore({ children }: Props): JSX.Element {
  return <ImgsStore>{children}</ImgsStore>;
}

export default GlobalStore;
