import * as passport from 'passport';
import controller from '../controller/authController';
import { Router } from 'express';

const router = Router();

router.get('/info', controller.info);
router.post('/signup', controller.signup);
router.get('/logout', controller.logout);
router.put('/user/:id', controller.update);
router.delete('/user/:id', controller.leave);
router.get('/github', controller.temp, passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github'), controller.githubCallback);
router.get('/kakao', controller.temp, passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao'), controller.kakaoCallback);
router.get('/google', controller.temp, passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', passport.authenticate('google'), controller.googleCallback);

export default router;
