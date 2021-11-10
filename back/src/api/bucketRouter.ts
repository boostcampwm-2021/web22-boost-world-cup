import { Router } from 'express';
import controller from '../controller/bucketController';

const router = Router();

router.post('/url', controller.getSignedURL);

export default router;
