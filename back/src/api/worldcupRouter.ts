import controller from '../controller/worldcupController';
import { Router } from 'express';

const router = Router();

router.get('/', controller.all);
router.get('/:id', controller.one);
router.get('/:id/comments', controller.getComments);
router.post('/', controller.save);
router.post('/:id/comments', controller.saveComment);
router.delete('/:id', controller.remove);
router.patch('/:id/title', controller.patchTitle);
router.patch('/:id/desc', controller.patchDesc);
router.get('/:id/candidates', controller.getCandidates);
router.delete('/comments/:id', controller.deleteComment);

export default router;
