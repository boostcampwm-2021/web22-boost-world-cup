import { Router } from 'express';
import authRouter from './authRouter';
import userRouter from './userRouter';
import worldcupRouter from './worldcupRouter';
import tagRouter from './tagRouter';
import gameRouter from './gameRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/worldcups', worldcupRouter);
router.use('/tags', tagRouter);
router.use('/game', gameRouter);

export default router;
