import { Router } from 'express';

const router = Router();

router.post('/chat');
router.get('/chat/history');
router.get('/chat/sessions');
router.delete('/chat/sessions/:id');

export default router;


