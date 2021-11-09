import { Router } from 'express';
import controller from '../controller/gameController';

const router = Router();

router.get('/worldcup/:id', controller.temp);

export default router;
