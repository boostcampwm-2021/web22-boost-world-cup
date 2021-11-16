import { Router } from 'express';
import controller from '../controller/candidateController';

const router = Router();

router.delete('/:key', controller.remove);
router.patch('/:key', controller.patchCandidate);

export default router;
