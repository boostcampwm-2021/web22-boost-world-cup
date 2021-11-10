import { Router } from 'express';
import authRouter from './authRouter';
import userRouter from './userRouter';
import worldcupRouter from './worldcupRouter';
import tagRouter from './tagRouter';
import gameRouter from './gameRouter';
import bucketRouter from './bucketRouter';
import candidateRouter from './candidateRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/worldcups', worldcupRouter);
router.use('/tags', tagRouter);
router.use('/game', gameRouter);
router.use('/bucket', bucketRouter);
router.use('/candidates', candidateRouter);

export default router;
