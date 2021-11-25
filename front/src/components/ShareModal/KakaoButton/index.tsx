import React, { useEffect } from 'react';
import styled from 'styled-components';
import kakaoLogo from '../../../images/kakao.png';

interface kakaoProps {
  url: string;
}
const KakaoButton = ({ url }: kakaoProps): JSX.Element => {
  const createButton = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) kakao.init(process.env.REACT_APP_KAKAO_KEY);
    }
  };
  useEffect(() => {
    createButton();
  }, []);
  const onKakaoBtnClick: React.MouseEventHandler = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: 'wiziboost worldcup',
        description: '🔥🔥 선택의 갈림길에서 당신의 선택은?🔥🔥',
        imageUrl:
          'https://user-images.githubusercontent.com/56618964/139171179-d285ff52-0f06-44fb-96c1-44444c5b4761.png',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        {
          title: '앱으로 보기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };
  return (
    <button type="button" onClick={onKakaoBtnClick}>
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
