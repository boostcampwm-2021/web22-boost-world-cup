import controller from '../controller/worldcupController';
import { Router } from 'express';

const router = Router();

router.get('/', controller.all);
router.get('/:id', controller.one);
router.post('/', controller.save);
router.delete('/:id', controller.remove);

export default router;
