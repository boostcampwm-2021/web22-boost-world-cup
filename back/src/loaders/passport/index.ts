import githubPassport from './githubPassport';
import KakaoPassportInit from './kakaoPassport';

const passportInit = () => {
  githubPassport();
  KakaoPassportInit();
};

export default passportInit;
