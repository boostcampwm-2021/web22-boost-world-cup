import controller from '../controller/authController';

import { Router } from 'express';

const router = Router();

router.get('/github', controller.github);
router.get('/github/callback', controller.githubCallback);

export default router;
