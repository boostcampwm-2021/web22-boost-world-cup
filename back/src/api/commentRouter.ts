import { Router } from 'express';
import controller from '../controller/commentController';

const router = Router();

router.get('/:worldcupId', controller.getComments);
router.post('/', controller.saveComment);

export default router;
