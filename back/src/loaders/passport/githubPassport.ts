import 'dotenv/config';
import * as passport from 'passport';
import * as passportGithub from 'passport-github';
import githubStrategyConfig from '../../config/githubStrategy';
const GitHubStrategy = passportGithub.Strategy;
import { findById, findByProviderId, saveInitUser } from '../../services/authService';

const githubPassportInit = () => {
  passport.use(
    new GitHubStrategy(githubStrategyConfig, async (accessToken, refreshToken, profile, done) => {
      const providerId = profile.id;
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

export default githubPassportInit;
