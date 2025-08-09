import { Router } from 'express';

const router = Router();

router.get('/insights');
router.post('/insights/generate');
router.post('/insights/:id/dismiss');
router.get('/insights/:id');

export default router;


