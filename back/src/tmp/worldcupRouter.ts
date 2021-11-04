import controller from '../controller/worldcupController';
import { Router } from 'express';

const router = Router();

router.get('/', controller.all);

export default router;
