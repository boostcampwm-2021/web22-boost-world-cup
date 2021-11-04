import { Router } from 'express';
import authRouter from './authRouter';
import userRouter from './userRouter';
import worldcupRouter from './worldcupRouter';
import tagRouter from './tagRouter';


const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/worldcups', worldcupRouter);
router.use('/tags', tagRouter);

export default router;
