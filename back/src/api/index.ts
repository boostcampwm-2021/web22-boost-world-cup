import { Router } from 'express';
import authRouter from './authRouter';
import userRouter from './userRouter';
import worldcupRouter from './worldcupRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/worldcups', worldcupRouter);

export default router;
