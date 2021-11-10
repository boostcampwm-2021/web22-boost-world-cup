import React, { useEffect } from 'react';
import styled from 'styled-components';
import KakaoButton from './KakaoButton';

const ShareModal = (): JSX.Element => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
      <KakaoButton />
    </>
  );
};

export default ShareModal;
