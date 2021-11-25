import controller from '../controller/worldcupController';
import { Router } from 'express';

const router = Router();

router.get('/', controller.getWorldcups);
router.get('/user', controller.getMyWorldcups);
router.get('/:id', controller.getWorldcup);
router.get('/:id/comments', controller.getComments);
router.post('/', controller.saveWorldcup);
router.post('/:id/comments', controller.saveComment);
router.delete('/:id', controller.deleteWorldcup);
router.patch('/:id/title', controller.patchWorldcupTitle);
router.patch('/:id/desc', controller.patchWorldcupDesc);
router.get('/:id/candidates', controller.getCandidates);
router.delete('/comments/:id', controller.deleteComment);

export default router;
