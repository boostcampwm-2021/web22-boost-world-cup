import { Router } from 'express';
import controller from '../controller/candidateController';

const router = Router();

router.post('/', controller.create);
router.patch('/:key', controller.update);
router.delete('/:key', controller.remove);

export default router;
