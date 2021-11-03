import 'dotenv/config';
import * as passport from 'passport';
import * as passportKakao from 'passport-kakao';
import KakaoStrategyConfig from '../../config/kakaoStrategy';
const KakaoStrategy = passportKakao.Strategy;
import { findById, findByProviderId, saveInitUser } from '../../services/authService';

const KakaoPassportInit = () => {
  passport.use(
    new KakaoStrategy(KakaoStrategyConfig, async (accessToken, refreshToken, profile, done) => {
      const providerId = profile.id.toString();
      const user = (await findByProviderId(providerId)) || (await saveInitUser(providerId));
      done(null, user);
    }),
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await findById(id);
    done(null, user);
  });
};

export default KakaoPassportInit;
