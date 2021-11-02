import * as passport from 'passport';
import controller from '../controller/authController';
import { Router } from 'express';

const router = Router();

router.get('/github', controller.github);
router.get('/github/callback', passport.authenticate('github'), controller.githubCallback);
router.post('/signup', controller.signup);

export default router;
