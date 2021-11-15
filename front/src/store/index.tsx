import React from 'react';
import ImgsStore from './ImgsStore';
import UploadImgStore from './UploadImgStore';

interface Props {
  children: JSX.Element;
}

function GlobalStore({ children }: Props): JSX.Element {
  return (
    <UploadImgStore>
      <ImgsStore>{children}</ImgsStore>
    </UploadImgStore>
  );
}

export default GlobalStore;
