import 'dotenv/config';
import * as passport from 'passport';
import * as passportGoogle from 'passport-google-oauth2';
const GoogleStrategy = passportGoogle.Strategy;
import googleStrategyConfig from '../../config/googleStrategy';
import { findById, findByProviderId, saveInitUser } from '../../services/authService';

const googlePassportInit = () => {
  passport.use(
    new GoogleStrategy(googleStrategyConfig, async (accessToken, refreshToken, profile, done) => {
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

export default googlePassportInit;
