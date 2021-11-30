import controller from '../controller/keywordController';
import { Router } from 'express';
const router = Router();

router.get('/', controller.all);

export default router;
