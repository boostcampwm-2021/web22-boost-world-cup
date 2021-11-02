import 'dotenv/config';
import * as passport from 'passport';
import * as passportGithub from 'passport-github';
import githubStrategyConfig from '../../config/githubStrategy';
const GitHubStrategy = passportGithub.Strategy;

import { findByProviderId, save } from '../../services/authService';

const githubPassportInit = () => {
  passport.use(
    new GitHubStrategy(githubStrategyConfig, async (accessToken, refreshToken, profile, done) => {
      const providerId = profile.id;
      const user = (await findByProviderId(providerId)) || (await save(providerId));
      done(null, user);
    }),
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

export default githubPassportInit;
