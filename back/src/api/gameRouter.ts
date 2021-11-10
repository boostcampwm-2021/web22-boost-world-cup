import { Router } from 'express';
import controller from '../controller/gameController';

const router = Router();

router.get('/candidates', controller.getCandidate);
router.post('/start', controller.start);
router.post('/result', controller.result);

export default router;
