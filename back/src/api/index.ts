import { Router } from 'express';
import authRouter from './authRouter';
import worldcupRouter from './worldcupRouter';
import keywordRouter from './keywordRouter';
import bucketRouter from './bucketRouter';
import candidateRouter from './candidateRouter';
import rankingRouter from './rankingRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/worldcups', worldcupRouter);
router.use('/keywords', keywordRouter);
router.use('/bucket', bucketRouter);
router.use('/candidates', candidateRouter);
router.use('/ranking', rankingRouter);

export default router;
