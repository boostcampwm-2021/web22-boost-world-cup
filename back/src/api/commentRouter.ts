import { Router } from 'express';
import controller from '../controller/commentController';

const router = Router();

router.get('/:worldcupId', controller.get);
router.post('/', controller.save);
router.delete('/:commentId', controller.delete);

export default router;
