import { Router } from 'express';
import controller from '../controller/commentController';

const router = Router();

router.post('/', controller.saveComment);

export default router;
