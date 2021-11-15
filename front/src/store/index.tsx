import React from 'react';
import ImgsStore from './ImgsStore';
import UploadImgStore from './UploadImgStore';
import WorldcupFormStore from './WorldcupFormStore';

interface Props {
  children: JSX.Element;
}

function GlobalStore({ children }: Props): JSX.Element {
  return (
    <WorldcupFormStore>
      <UploadImgStore>
        <ImgsStore>{children}</ImgsStore>
      </UploadImgStore>
    </WorldcupFormStore>
  );
}

export default GlobalStore;
