import { Router } from 'express';
import controller from '../controller/gameController';

const router = Router();

router.get('/candidates', controller.getCandidates);
router.post('/result', controller.result);

export default router;
