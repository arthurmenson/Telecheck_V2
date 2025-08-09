import { Router } from 'express';

const router = Router();

router.get('/medications');
router.post('/medications');
router.put('/medications/:id');
router.delete('/medications/:id');
router.get('/medications/interactions');
router.get('/medications/search');
router.get('/medications/reminders');

export default router;


