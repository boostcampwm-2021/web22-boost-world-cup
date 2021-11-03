import * as passport from 'passport';
import controller from '../controller/authController';
import { Router } from 'express';

const router = Router();

router.post('/signup', controller.signup);
router.get('/github/callback', passport.authenticate('github'), controller.githubCallback);
router.get('/kakao/callback', passport.authenticate('kakao'), controller.kakaoCallback);

export default router;
