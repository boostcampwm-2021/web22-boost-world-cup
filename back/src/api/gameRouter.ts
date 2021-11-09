import { Router } from 'express';
import controller from '../controller/gameController';

const router = Router();

router.post('/start', controller.start);

export default router;
