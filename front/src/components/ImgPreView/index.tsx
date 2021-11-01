import React from 'react';

interface Props {
  src: string;
}

function ImgPreView({ src }: Props): JSX.Element {
  return <img src={src} width="143px" height="160px" style={{ borderRadius: '20px' }} alt="" />;
}

export default ImgPreView;
