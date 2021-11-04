import githubPassport from './githubPassport';
import kakaoPassportInit from './kakaoPassport';
import googlePassportInit from './googlePassport';

const passportInit = () => {
  githubPassport();
  kakaoPassportInit();
  googlePassportInit();
};

export default passportInit;
