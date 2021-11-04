import controller from '../controller/tagController';

import { Router } from 'express';

const router = Router();

router.get('/', controller.all);

export default router;
