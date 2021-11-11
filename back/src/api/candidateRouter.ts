import { Router } from 'express';
import controller from '../controller/candidateController';

const router = Router();

router.delete('/:key', controller.remove);

export default router;
