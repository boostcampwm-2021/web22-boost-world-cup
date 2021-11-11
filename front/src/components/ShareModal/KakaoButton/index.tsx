import React, { useEffect } from 'react';
import styled from 'styled-components';
import kakaoLogo from '../../../images/kakao.png';

const KakaoButton = (): JSX.Element => {
  const createButton = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) kakao.init(process.env.REACT_APP_KAKAO_KEY);
    }
  };
  useEffect(() => {
    createButton();
  }, []);
  const handleButton = () => {
    window.Kakao.Link.sendScrap({
      requestUrl: window.location.href,
    });
  };
  return (
    <button type="button" onClick={handleButton}>
      <KaKaoLogo />
    </button>
  );
};
const KaKaoLogo = styled.img.attrs({
  src: `${kakaoLogo}`,
  alt: 'kakao-log',
})`
  width: 48px;
  height: 48px;
  transition: all 300ms ease-in;
  &:hover {
    transform: scale(1.1);
  }
`;
export default KakaoButton;
