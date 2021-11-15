import React from 'react';
import WorldcupFormStore from './WorldcupFormStore';

interface Props {
  children: JSX.Element;
}

function GlobalStore({ children }: Props): JSX.Element {
  return <WorldcupFormStore>{children}</WorldcupFormStore>;
}

export default GlobalStore;
