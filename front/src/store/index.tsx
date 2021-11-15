import React from 'react';
import UploadImgStore from './UploadImgStore';
import WorldcupFormStore from './WorldcupFormStore';

interface Props {
  children: JSX.Element;
}

function GlobalStore({ children }: Props): JSX.Element {
  return (
    <WorldcupFormStore>
      <UploadImgStore>{children}</UploadImgStore>
    </WorldcupFormStore>
  );
}

export default GlobalStore;
