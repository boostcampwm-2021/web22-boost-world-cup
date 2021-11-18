import { Router } from 'express';
import controller from '../controller/rankingController';

const router = Router();

router.get('/:id', controller.get);
router.post('/current', controller.saveCurrentResult);
router.post('/final', controller.saveFinalResult);

export default router;
